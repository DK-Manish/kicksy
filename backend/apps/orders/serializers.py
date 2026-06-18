from rest_framework import serializers
from .models import Order, OrderItem, OrderStatusHistory


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'variant', 'product_name',
            'product_image', 'size', 'quantity',
            'unit_price', 'line_total'
        ]


class OrderStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatusHistory
        fields = ['id', 'status', 'note', 'created_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    history = OrderStatusHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status',
            'full_name', 'email', 'phone',
            'address_line1', 'address_line2', 'city',
            'county', 'postcode', 'country',
            'subtotal', 'shipping_cost', 'total',
            'stripe_payment_intent_id', 'paid_at',
            'notes', 'items', 'history',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'order_number', 'status',
            'stripe_payment_intent_id', 'paid_at',
            'created_at', 'updated_at'
        ]


class OrderListSerializer(serializers.ModelSerializer):
    item_count = serializers.SerializerMethodField()
    first_item_name = serializers.SerializerMethodField()
    first_item_image = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total',
            'item_count', 'first_item_name', 'first_item_image',
            'created_at'
        ]

    def get_item_count(self, obj):
        return obj.items.count()

    def get_first_item_name(self, obj):
        first = obj.items.first()
        return first.product_name if first else ''

    def get_first_item_image(self, obj):
        first = obj.items.first()
        return first.product_image if first else ''


class CreateOrderSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    address_line1 = serializers.CharField(max_length=255)
    address_line2 = serializers.CharField(max_length=255, required=False, allow_blank=True)
    city = serializers.CharField(max_length=100)
    county = serializers.CharField(max_length=100, required=False, allow_blank=True)
    postcode = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=100, default='United Kingdom')
    notes = serializers.CharField(required=False, allow_blank=True)