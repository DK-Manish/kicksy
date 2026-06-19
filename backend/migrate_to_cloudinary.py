import cloudinary
import cloudinary.uploader
from django.conf import settings
from apps.products.models import ProductImage

cloudinary.config(
    cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
    api_secret=settings.CLOUDINARY_STORAGE['API_SECRET'],
)

images = ProductImage.objects.filter(is_primary=True).select_related('product')
print(f"Found {images.count()} primary images to migrate.\n")

for img in images:
    current_url = str(img.image)

    if 'res.cloudinary.com' in current_url:
        print(f"SKIP (already on Cloudinary): {img.product.name}")
        continue

    if not current_url.startswith('http'):
        print(f"SKIP (not a URL): {img.product.name} -> {current_url}")
        continue

    try:
        result = cloudinary.uploader.upload(
            current_url,
            folder="kicksy/products",
            public_id=img.product.slug,
            overwrite=True,
        )
        new_url = result['secure_url']
        img.image = new_url
        img.save()
        print(f"OK: {img.product.name} -> {new_url}")
    except Exception as e:
        print(f"FAILED: {img.product.name} -> {e}")

print("\nDone.")
