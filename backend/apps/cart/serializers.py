from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.serializers import ProductListSerializer, ProductVariantSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    variant = ProductVariantSerializer(read_only=True)
    unit_price = serializers.ReadOnlyField()
    line_total = serializers.ReadOnlyField()
    product_id = serializers.IntegerField(write_only=True)
    variant_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'variant', 'quantity',
            'unit_price', 'line_total', 'product_id',
            'variant_id', 'added_at'
        ]

    def validate(self, attrs):
        from apps.products.models import Product, ProductVariant
        try:
            product = Product.objects.get(id=attrs['product_id'], is_active=True)
        except Product.DoesNotExist:
            raise serializers.ValidationError({'product_id': 'Product not found'})

        try:
            variant = ProductVariant.objects.get(
                id=attrs['variant_id'], product=product
            )
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError({'variant_id': 'Variant not found for this product'})

        if variant.stock < attrs.get('quantity', 1):
            raise serializers.ValidationError(
                {'quantity': f'Only {variant.stock} items in stock'}
            )

        attrs['product'] = product
        attrs['variant'] = variant
        return attrs


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()
    subtotal = serializers.ReadOnlyField()
    total = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_items', 'subtotal', 'total', 'updated_at']