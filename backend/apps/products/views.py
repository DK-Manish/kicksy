from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Brand, Product
from .serializers import (
    CategorySerializer, BrandSerializer,
    ProductListSerializer, ProductDetailSerializer,
    ProductAdminWriteSerializer
)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'brand__name', 'category__name']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related(
            'brand', 'category'
        ).prefetch_related('images', 'variants')

        category = self.request.query_params.get('category')
        brand = self.request.query_params.get('brand')
        gender = self.request.query_params.get('gender')
        size = self.request.query_params.get('size')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        is_featured = self.request.query_params.get('featured')
        is_new_arrival = self.request.query_params.get('new_arrival')
        is_limited_drop = self.request.query_params.get('limited_drop')
        on_sale = self.request.query_params.get('on_sale')

        if category:
            queryset = queryset.filter(category__slug=category)
        if brand:
            queryset = queryset.filter(brand__slug=brand)
        if gender:
            queryset = queryset.filter(gender=gender)
        if size:
            queryset = queryset.filter(variants__size=size, variants__stock__gt=0)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        if is_new_arrival == 'true':
            queryset = queryset.filter(is_new_arrival=True)
        if is_limited_drop == 'true':
            queryset = queryset.filter(is_limited_drop=True)
        if on_sale == 'true':
            queryset = queryset.filter(discount_percent__gt=0)

        return queryset.distinct()


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related(
            'brand', 'category'
        ).prefetch_related('images', 'variants')


class FeaturedProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(
            is_active=True, is_featured=True
        ).select_related('brand', 'category').prefetch_related('images', 'variants')[:8]


class NewArrivalsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(
            is_active=True, is_new_arrival=True
        ).select_related('brand', 'category').prefetch_related('images', 'variants')[:8]


class LimitedDropsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(
            is_active=True, is_limited_drop=True
        ).select_related('brand', 'category').prefetch_related('images', 'variants')[:4]


class RelatedProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        try:
            product = Product.objects.get(slug=slug)
            return Product.objects.filter(
                is_active=True,
                category=product.category
            ).exclude(slug=slug).select_related(
                'brand', 'category'
            ).prefetch_related('images', 'variants')[:4]
        except Product.DoesNotExist:
            return Product.objects.none()
        
class ProductFacetsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        from .models import Category, Brand
        from django.db.models import Q

        def apply_common_filters(queryset, exclude=None):
            params = request.query_params
            if exclude != 'category' and params.get('category'):
                queryset = queryset.filter(category__slug=params.get('category'))
            if exclude != 'brand' and params.get('brand'):
                queryset = queryset.filter(brand__slug=params.get('brand'))
            if params.get('gender'):
                queryset = queryset.filter(gender=params.get('gender'))
            if params.get('size'):
                queryset = queryset.filter(variants__size=params.get('size'), variants__stock__gt=0)
            if params.get('min_price'):
                queryset = queryset.filter(price__gte=params.get('min_price'))
            if params.get('max_price'):
                queryset = queryset.filter(price__lte=params.get('max_price'))
            if params.get('on_sale') == 'true':
                queryset = queryset.filter(discount_percent__gt=0)
            return queryset.filter(is_active=True).distinct()

        category_counts = {}
        for cat in Category.objects.filter(is_active=True):
            qs = apply_common_filters(Product.objects.filter(category=cat), exclude='category')
            category_counts[cat.slug] = qs.count()

        brand_counts = {}
        for brand in Brand.objects.filter(is_active=True):
            qs = apply_common_filters(Product.objects.filter(brand=brand), exclude='brand')
            brand_counts[brand.slug] = qs.count()

        return Response({
            'categories': category_counts,
            'brands': brand_counts,
        })

class AdminProductListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Product.objects.all().select_related(
            'brand', 'category'
        ).prefetch_related('images', 'variants').order_by('-created_at')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductAdminWriteSerializer
        return ProductDetailSerializer


class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.all().select_related(
            'brand', 'category'
        ).prefetch_related('images', 'variants')

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductAdminWriteSerializer
        return ProductDetailSerializer