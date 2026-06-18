from django.urls import path
from . import views

urlpatterns = [
    path('products/<slug:slug>/reviews/', views.ProductReviewListView.as_view(), name='product_reviews'),
    path('products/<slug:slug>/reviews/create/', views.CreateReviewView.as_view(), name='create_review'),
    path('reviews/<int:pk>/', views.UpdateDeleteReviewView.as_view(), name='review_detail'),
    path('wishlist/', views.WishlistView.as_view(), name='wishlist'),
    path('products/<slug:slug>/wishlist/', views.WishlistToggleView.as_view(), name='wishlist_toggle'),
]