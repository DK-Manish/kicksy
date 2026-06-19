from apps.products.models import Product, ProductImage

# Original Unsplash source URLs (source of truth), keyed by product id
source_urls = {
    1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    2: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    3: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    4: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    5: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    6: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    7: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    8: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    9: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80",
    10: "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=800&q=80",
    11: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    12: "https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=800&q=80",
    14: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80",
}

print(f"Resetting ProductImage records for {len(source_urls)} products.\n")

for pid, url in source_urls.items():
    try:
        p = Product.objects.get(id=pid)
    except Product.DoesNotExist:
        print(f"SKIP: Product {pid} does not exist")
        continue

    img = p.images.filter(is_primary=True).first()
    if img:
        img.image = url
        img.alt_text = p.name
        img.save()
        print(f"RESET #{pid}: {p.name} -> Unsplash source restored")
    else:
        ProductImage.objects.create(
            product=p, image=url, alt_text=p.name,
            is_primary=True, order=0
        )
        print(f"CREATED #{pid}: {p.name} -> ProductImage created with Unsplash source")

print("\nDone. Now re-run migrate_to_cloudinary.py to upload all 13 to Cloudinary with correct slugs.")
