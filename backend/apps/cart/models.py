import uuid
from django.db import models
from apps.accounts.models import User
from apps.products.models import Product, ProductVariant


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart', null=True, blank=True)
    guest_id = models.UUIDField(default=None, null=True, blank=True, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'carts'
        constraints = [
            models.CheckConstraint(
                condition=(
                    models.Q(user__isnull=False, guest_id__isnull=True) |
                    models.Q(user__isnull=True, guest_id__isnull=False)
                ),
                name='cart_has_user_or_guest_id_not_both'
            )
        ]

    def __str__(self):
        if self.user:
            return f'Cart ({self.user.email})'
        return f'Guest Cart ({self.guest_id})'

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def subtotal(self):
        return sum(item.line_total for item in self.items.all())

    @property
    def total(self):
        return self.subtotal


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'cart_items'
        unique_together = ['cart', 'variant']

    def __str__(self):
        return f'{self.quantity}x {self.product.name} (UK {self.variant.size})'

    @property
    def unit_price(self):
        return self.product.discounted_price

    @property
    def line_total(self):
        return round(self.unit_price * self.quantity, 2)