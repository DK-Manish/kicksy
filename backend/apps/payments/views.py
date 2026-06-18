import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from apps.orders.models import Order, OrderStatusHistory

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_number = request.data.get('order_number')

        try:
            order = Order.objects.get(
                order_number=order_number,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if order.status != 'pending':
            return Response(
                {'error': f'Order is already {order.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        intent = stripe.PaymentIntent.create(
            amount=int(order.total * 100),
            currency='gbp',
            metadata={
                'order_number': order.order_number,
                'user_id': str(request.user.id),
            }
        )

        order.stripe_payment_intent_id = intent.id
        order.save()

        return Response({
            'client_secret': intent.client_secret,
            'publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
            'amount': order.total,
            'order_number': order.order_number,
        })


@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError:
            return Response({'error': 'Invalid payload'}, status=400)
        except stripe.error.SignatureVerificationError:
            return Response({'error': 'Invalid signature'}, status=400)

        if event['type'] == 'payment_intent.succeeded':
            intent = event['data']['object']
            order_number = intent.metadata['order_number']

            try:
                order = Order.objects.get(order_number=order_number)
                order.status = 'confirmed'
                order.paid_at = timezone.now()
                order.save()

                OrderStatusHistory.objects.create(
                    order=order,
                    status='confirmed',
                    note='Payment confirmed via Stripe'
                )
            except Order.DoesNotExist:
                pass

        elif event['type'] == 'payment_intent.payment_failed':
            intent = event['data']['object']
            order_number = intent.metadata['order_number']

            try:
                order = Order.objects.get(order_number=order_number)
                OrderStatusHistory.objects.create(
                    order=order,
                    status='pending',
                    note='Payment failed — customer may retry'
                )
            except Order.DoesNotExist:
                pass

        return Response({'status': 'ok'})


class PaymentConfigView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
        })