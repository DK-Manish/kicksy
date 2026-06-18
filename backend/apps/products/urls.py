from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    path('brands/', views.BrandListView.as_view(), name='brand_list'),
    path('', views.ProductListView.as_view(), name='product_list'),
    path('featured/', views.FeaturedProductsView.as_view(), name='featured_products'),
    path('new-arrivals/', views.NewArrivalsView.as_view(), name='new_arrivals'),
    path('limited-drops/', views.LimitedDropsView.as_view(), name='limited_drops'),
    path('facets/', views.ProductFacetsView.as_view(), name='product_facets'),
    path('<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('<slug:slug>/related/', views.RelatedProductsView.as_view(), name='related_products'),
]  