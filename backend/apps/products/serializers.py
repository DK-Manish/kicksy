from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'product_count']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class BrandSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'product_count']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()

 
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'order']

    def get_image(self, obj):
        return str(obj.image)
 

class ProductVariantSerializer(serializers.ModelSerializer):
    is_in_stock = serializers.ReadOnlyField()

    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'stock', 'sku', 'is_in_stock']


class ProductListSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    primary_image = serializers.ReadOnlyField()
    discounted_price = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    available_sizes = serializers.ReadOnlyField()
    is_wishlisted = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'brand', 'category', 'gender',
            'price', 'discount_percent', 'discounted_price',
            'primary_image', 'average_rating', 'review_count',
            'available_sizes', 'is_featured', 'is_new_arrival',
            'is_limited_drop', 'created_at', 'is_wishlisted'
        ]

    def get_is_wishlisted(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return obj.wishlisted_by.filter(user=request.user).exists()


class ProductDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    discounted_price = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    available_sizes = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'brand', 'category',
            'gender', 'price', 'discount_percent', 'discounted_price',
            'images', 'variants', 'average_rating', 'review_count',
            'available_sizes', 'is_featured', 'is_new_arrival',
            'is_limited_drop', 'created_at', 'updated_at'
        ]

class ProductImageWriteSerializer(serializers.ModelSerializer):
    image = serializers.URLField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'order']


class ProductVariantWriteSerializer(serializers.ModelSerializer):
    sku = serializers.CharField(validators=[])

    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'stock', 'sku']


class ProductAdminWriteSerializer(serializers.ModelSerializer):
    images = ProductImageWriteSerializer(many=True, required=False)
    variants = ProductVariantWriteSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'category', 'brand',
            'gender', 'price', 'discount_percent', 'is_active',
            'is_featured', 'is_new_arrival', 'is_limited_drop',
            'images', 'variants'
        ]
        read_only_fields = ['id', 'slug']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        variants_data = validated_data.pop('variants', [])
        product = Product.objects.create(**validated_data)
        for img in images_data:
            ProductImage.objects.create(product=product, **img)
        for variant in variants_data:
            ProductVariant.objects.create(product=product, **variant)
        return product

    def update(self, instance, validated_data):
        from django.db import transaction

        images_data = validated_data.pop('images', None)
        variants_data = validated_data.pop('variants', None)

        with transaction.atomic():
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()

            if images_data is not None:
                instance.images.all().delete()
                for img in images_data:
                    ProductImage.objects.create(product=instance, **img)

            if variants_data is not None:
                instance.variants.all().delete()
                for variant in variants_data:
                    ProductVariant.objects.create(product=instance, **variant)

        return instance