from django.urls import path
from . import views

urlpatterns = [
    path('config/', views.PaymentConfigView.as_view(), name='payment_config'),
    path('create-intent/', views.CreatePaymentIntentView.as_view(), name='create_payment_intent'),
    path('webhook/', views.StripeWebhookView.as_view(), name='stripe_webhook'),
] 