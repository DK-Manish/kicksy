from rest_framework import serializers
from .models import Review, Wishlist
from apps.accounts.serializers import UserSerializer
from apps.products.serializers import ProductListSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_full_name', 'rating', 'title',
            'body', 'is_verified_purchase', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'is_verified_purchase', 'created_at']

    def get_user_full_name(self, obj):
        return obj.user.full_name

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError('Rating must be between 1 and 5')
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        product = self.context['product']

        from apps.orders.models import Order
        is_verified = Order.objects.filter(
            user=user,
            items__product=product,
            status__in=['delivered', 'confirmed', 'shipped']
        ).exists()

        return Review.objects.create(
            user=user,
            product=product,
            is_verified_purchase=is_verified,
            **validated_data
        )


class WishlistSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'added_at']