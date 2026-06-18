from django.contrib import admin
from .models import Review, Wishlist


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'product', 'rating',
        'is_verified_purchase', 'is_approved', 'created_at'
    ]
    list_editable = ['is_approved']
    list_filter = ['rating', 'is_verified_purchase', 'is_approved']
    search_fields = ['user__email', 'product__name', 'title']


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'added_at']
    search_fields = ['user__email', 'product__name']