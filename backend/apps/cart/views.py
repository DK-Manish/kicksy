import uuid
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


def get_or_create_cart(request):
    """
    Resolves the cart for either an authenticated user or a guest.
    Guests are identified via the X-Guest-Id header (a client-generated UUID).
    Returns (cart, error_response). error_response is None on success.
    """
    if request.user and request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return cart, None

    guest_id = request.headers.get('X-Guest-Id')
    if not guest_id:
        return None, Response(
            {'error': 'X-Guest-Id header is required for guest cart access'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        guest_uuid = uuid.UUID(guest_id)
    except ValueError:
        return None, Response(
            {'error': 'X-Guest-Id must be a valid UUID'},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart, _ = Cart.objects.get_or_create(guest_id=guest_uuid)
    return cart, None


class CartView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        cart, error = get_or_create_cart(request)
        if error:
            return error
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request):
        cart, error = get_or_create_cart(request)
        if error:
            return error
        cart.items.all().delete()
        return Response({'message': 'Cart cleared'})


class CartItemAddView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cart, error = get_or_create_cart(request)
        if error:
            return error

        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data['product']
        variant = serializer.validated_data['variant']
        quantity = serializer.validated_data.get('quantity', 1)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            variant=variant,
            defaults={'product': product, 'quantity': quantity}
        )

        if not created:
            new_qty = cart_item.quantity + quantity
            if new_qty > variant.stock:
                return Response(
                    {'error': f'Only {variant.stock} items in stock'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            cart_item.quantity = new_qty
            cart_item.save()

        cart.refresh_from_db()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class CartItemUpdateView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request, item_id):
        cart, error = get_or_create_cart(request)
        if error:
            return error

        try:
            cart_item = CartItem.objects.get(id=item_id, cart=cart)
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Cart item not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        quantity = request.data.get('quantity')
        if not quantity or int(quantity) < 1:
            return Response(
                {'error': 'Quantity must be at least 1'},
                status=status.HTTP_400_BAD_REQUEST
            )

        quantity = int(quantity)
        if quantity > cart_item.variant.stock:
            return Response(
                {'error': f'Only {cart_item.variant.stock} items in stock'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item.quantity = quantity
        cart_item.save()

        return Response(CartSerializer(cart).data)

    def delete(self, request, item_id):
        cart, error = get_or_create_cart(request)
        if error:
            return error

        try:
            cart_item = CartItem.objects.get(id=item_id, cart=cart)
        except CartItem.DoesNotExist:
            return Response(
                {'error': 'Cart item not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        cart_item.delete()
        return Response(CartSerializer(cart).data)