from django.utils.text import slugify
from apps.products.models import Product

products = Product.objects.all().order_by('id')
print(f"Fixing slugs for {products.count()} products.\n")

for p in products:
    old_slug = p.slug
    new_slug = slugify(p.name)

    # ensure uniqueness in case two products would generate the same slug
    base_slug = new_slug
    counter = 2
    while Product.objects.filter(slug=new_slug).exclude(id=p.id).exists():
        new_slug = f"{base_slug}-{counter}"
        counter += 1

    p.slug = new_slug
    p.save(update_fields=['slug'])
    print(f"#{p.id}: '{old_slug}' -> '{new_slug}'  ({p.name})")

print("\nDone.")
