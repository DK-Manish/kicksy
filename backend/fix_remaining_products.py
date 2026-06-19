from apps.products.models import Product, ProductImage, Brand

fixes = {
    12: ("Asics", "Asics Gel-Kayano 30", "https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=800&q=80"),
    14: ("Jordan", "Jordan 4 Retro Thunder", "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80"),
}

for pid, (brand_name, new_name, image_url) in fixes.items():
    p = Product.objects.get(id=pid)

    brand, created = Brand.objects.get_or_create(
        name=brand_name,
        defaults={'slug': brand_name.lower().replace(' ', '-')}
    )
    p.brand = brand
    p.name = new_name
    p.save()

    img = p.images.filter(is_primary=True).first()
    if img:
        img.image = image_url
        img.alt_text = new_name
        img.save()
    else:
        ProductImage.objects.create(
            product=p, image=image_url, alt_text=new_name,
            is_primary=True, order=0
        )

    print(f"Fixed #{pid}: {brand_name} | {new_name}")

print("Done.")
