from django.contrib import admin
from .models import Order, OrderItem, OrderStatusHistory


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product_name', 'size', 'quantity', 'unit_price', 'line_total']


class OrderStatusHistoryInline(admin.TabularInline):
    model = OrderStatusHistory
    extra = 0
    readonly_fields = ['status', 'note', 'created_at']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'order_number', 'user', 'status', 'total',
        'shipping_cost', 'created_at'
    ]
    list_filter = ['status', 'created_at']
    search_fields = ['order_number', 'user__email', 'full_name']
    readonly_fields = ['order_number', 'stripe_payment_intent_id', 'paid_at']
    inlines = [OrderItemInline, OrderStatusHistoryInline]