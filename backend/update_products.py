from apps.products.models import Product, Brand, ProductImage

updates = {
    1: ("Nike", "Nike Star Runner 4", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"),
    2: ("Puma", "Puma Smash 3.0", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"),
    3: ("Nike", "Nike MC Trainer 3", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"),
    4: ("Nike", "Nike Air Max", "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80"),
    5: ("Nike", "Nike Airforce Kids", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"),
    6: ("Vans", "Vans Old Skool Pro", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"),
    7: ("Nike", "Nike Air Force 1 Low", "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80"),
    8: ("New Balance", "New Balance Trainer 3", "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"),
    9: ("Converse", "Converse All Star", "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80"),
    10: ("Converse", "Converse Chuck Taylor All Star", "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=800&q=80"),
    11: ("Nike", "Nike Air Max X90", "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80"),
    12: ("Asics", "Asics Gel-Kayano 30", "https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJ1bm5pbmclMjBzaG9lfGVufDB8fDB8fHww"),
    14: ("Jordan", "Jordan 4 Retro Thunder", "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1bm5pbmclMjBzaG9lfGVufDB8fDB8fHww"),
}

for pid, (brand_name, new_name, image_url) in updates.items():
    try:
        p = Product.objects.get(id=pid)
    except Product.DoesNotExist:
        print(f"SKIP: Product {pid} does not exist")
        continue

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

    print(f"Updated #{pid}: {brand_name} | {new_name}")

print("Done.")
