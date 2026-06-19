from apps.products.models import Category, Brand, Product, ProductImage, ProductVariant

PRODUCTS = [
  {
    "name": "Nike Star Runner 4", "slug": "nike-star-runner-4",
    "description": "The Nike Air Max 270 delivers an all-day comfortable ride with the largest Air unit yet. The heel Air unit is Nike's biggest yet, offering a super-soft ride that feels as good as it looks.",
    "category": "Lifestyle", "brand": "Nike", "gender": "men", "price": "119.99",
    "discount_percent": 25, "is_active": True, "is_featured": True, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 14, "sku": "KICKSY-NIKE-AIR-M-UK10"},
      {"size": "11", "stock": 8, "sku": "KICKSY-NIKE-AIR-M-UK11"},
      {"size": "12", "stock": 5, "sku": "KICKSY-NIKE-AIR-M-UK12"},
      {"size": "6", "stock": 14, "sku": "KICKSY-NIKE-AIR-M-UK6"},
      {"size": "7", "stock": 1, "sku": "KICKSY-NIKE-AIR-M-UK7"},
      {"size": "8", "stock": 3, "sku": "KICKSY-NIKE-AIR-M-UK8"},
      {"size": "9", "stock": 5, "sku": "KICKSY-NIKE-AIR-M-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898490/kicksy/products/nike-star-runner-4.jpg", "alt_text": "Nike Star Runner 4", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Puma Smash 3.0", "slug": "puma-smash-30",
    "description": "Built for runners who want the ultimate combination of comfort and performance. Features a full-length midsole for incredible energy return with every stride.",
    "category": "Running", "brand": "Puma", "gender": "unisex", "price": "159.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": True, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 6, "sku": "KICKSY-ADIDAS-ULT-UK10"},
      {"size": "11", "stock": 15, "sku": "KICKSY-ADIDAS-ULT-UK11"},
      {"size": "12", "stock": 12, "sku": "KICKSY-ADIDAS-ULT-UK12"},
      {"size": "6", "stock": 10, "sku": "KICKSY-ADIDAS-ULT-UK6"},
      {"size": "7", "stock": 10, "sku": "KICKSY-ADIDAS-ULT-UK7"},
      {"size": "8", "stock": 6, "sku": "KICKSY-ADIDAS-ULT-UK8"},
      {"size": "9", "stock": 13, "sku": "KICKSY-ADIDAS-ULT-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898491/kicksy/products/puma-smash-30.jpg", "alt_text": "Puma Smash 3.0", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Nike MC Trainer 3", "slug": "nike-mc-trainer-3",
    "description": "A legend reborn. This iconic silhouette continues to inspire generations of sneakerheads worldwide.",
    "category": "Basketball", "brand": "Nike", "gender": "men", "price": "179.99",
    "discount_percent": 15, "is_active": True, "is_featured": True, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 11, "sku": "KICKSY-AIR-JORDAN-UK10"},
      {"size": "11", "stock": 6, "sku": "KICKSY-AIR-JORDAN-UK11"},
      {"size": "12", "stock": 2, "sku": "KICKSY-AIR-JORDAN-UK12"},
      {"size": "6", "stock": 7, "sku": "KICKSY-AIR-JORDAN-UK6"},
      {"size": "7", "stock": 5, "sku": "KICKSY-AIR-JORDAN-UK7"},
      {"size": "8", "stock": 0, "sku": "KICKSY-AIR-JORDAN-UK8"},
      {"size": "9", "stock": 4, "sku": "KICKSY-AIR-JORDAN-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898492/kicksy/products/nike-mc-trainer-3.jpg", "alt_text": "Nike MC Trainer 3", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Nike Air Max", "slug": "nike-air-max",
    "description": "Clean lines, premium leather upper, and that unmistakable heritage. A triumphant return to a classic silhouette.",
    "category": "Lifestyle", "brand": "Nike", "gender": "unisex", "price": "109.99",
    "discount_percent": 0, "is_active": True, "is_featured": True, "is_new_arrival": True, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 6, "sku": "KICKSY-NEW-BALANC-UK10"},
      {"size": "11", "stock": 3, "sku": "KICKSY-NEW-BALANC-UK11"},
      {"size": "12", "stock": 6, "sku": "KICKSY-NEW-BALANC-UK12"},
      {"size": "6", "stock": 11, "sku": "KICKSY-NEW-BALANC-UK6"},
      {"size": "7", "stock": 9, "sku": "KICKSY-NEW-BALANC-UK7"},
      {"size": "8", "stock": 3, "sku": "KICKSY-NEW-BALANC-UK8"},
      {"size": "9", "stock": 11, "sku": "KICKSY-NEW-BALANC-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898493/kicksy/products/nike-air-max.jpg", "alt_text": "Nike Air Max", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Nike Airforce Kids", "slug": "nike-airforce-kids",
    "description": "A streetwear staple. Brings back an iconic silhouette with a slightly oversized sole unit for a modern twist on a timeless classic.",
    "category": "Lifestyle", "brand": "Nike", "gender": "unisex", "price": "74.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": True, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 8, "sku": "KICKSY-PUMA-SUEDE-UK10"},
      {"size": "11", "stock": 9, "sku": "KICKSY-PUMA-SUEDE-UK11"},
      {"size": "12", "stock": 15, "sku": "KICKSY-PUMA-SUEDE-UK12"},
      {"size": "6", "stock": 15, "sku": "KICKSY-PUMA-SUEDE-UK6"},
      {"size": "7", "stock": 11, "sku": "KICKSY-PUMA-SUEDE-UK7"},
      {"size": "8", "stock": 11, "sku": "KICKSY-PUMA-SUEDE-UK8"},
      {"size": "9", "stock": 10, "sku": "KICKSY-PUMA-SUEDE-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898493/kicksy/products/nike-airforce-kids.jpg", "alt_text": "Nike Airforce Kids", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Vans Old Skool Pro", "slug": "vans-old-skool-pro",
    "description": "The skate-ready version of the classic Old Skool. Built with Pro Vulc construction for superior board feel and durability on and off the board.",
    "category": "Lifestyle", "brand": "Vans", "gender": "unisex", "price": "79.99",
    "discount_percent": 25, "is_active": True, "is_featured": False, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 4, "sku": "KICKSY-VANS-OLD-S-UK10"},
      {"size": "11", "stock": 2, "sku": "KICKSY-VANS-OLD-S-UK11"},
      {"size": "12", "stock": 8, "sku": "KICKSY-VANS-OLD-S-UK12"},
      {"size": "6", "stock": 4, "sku": "KICKSY-VANS-OLD-S-UK6"},
      {"size": "7", "stock": 1, "sku": "KICKSY-VANS-OLD-S-UK7"},
      {"size": "8", "stock": 7, "sku": "KICKSY-VANS-OLD-S-UK8"},
      {"size": "9", "stock": 9, "sku": "KICKSY-VANS-OLD-S-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781894303/kicksy/products/vans-old-skool-pro.jpg", "alt_text": "Vans Old Skool Pro", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Nike Air Force 1 Low", "slug": "nike-air-force-1-low",
    "description": "The b-ball icon that first debuted in 1982. Crossing hardwood to linoleum to concrete, this low-cut version keeps the classic look intact.",
    "category": "Lifestyle", "brand": "Nike", "gender": "unisex", "price": "99.99",
    "discount_percent": 0, "is_active": True, "is_featured": True, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 13, "sku": "KICKSY-NIKE-AIR-F-UK10"},
      {"size": "11", "stock": 5, "sku": "KICKSY-NIKE-AIR-F-UK11"},
      {"size": "12", "stock": 5, "sku": "KICKSY-NIKE-AIR-F-UK12"},
      {"size": "6", "stock": 12, "sku": "KICKSY-NIKE-AIR-F-UK6"},
      {"size": "7", "stock": 13, "sku": "KICKSY-NIKE-AIR-F-UK7"},
      {"size": "8", "stock": 11, "sku": "KICKSY-NIKE-AIR-F-UK8"},
      {"size": "9", "stock": 4, "sku": "KICKSY-NIKE-AIR-F-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781894303/kicksy/products/nike-air-force-1-low.jpg", "alt_text": "Nike Air Force 1 Low", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "New Balance Trainer 3", "slug": "new-balance-trainer-3",
    "description": "Transcended sport to become one of the most iconic sneakers in history. Clean, minimal, and endlessly versatile.",
    "category": "Lifestyle", "brand": "New Balance", "gender": "unisex", "price": "84.99",
    "discount_percent": 10, "is_active": True, "is_featured": False, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 8, "sku": "KICKSY-ADIDAS-STA-UK10"},
      {"size": "11", "stock": 2, "sku": "KICKSY-ADIDAS-STA-UK11"},
      {"size": "12", "stock": 7, "sku": "KICKSY-ADIDAS-STA-UK12"},
      {"size": "6", "stock": 11, "sku": "KICKSY-ADIDAS-STA-UK6"},
      {"size": "7", "stock": 2, "sku": "KICKSY-ADIDAS-STA-UK7"},
      {"size": "8", "stock": 12, "sku": "KICKSY-ADIDAS-STA-UK8"},
      {"size": "9", "stock": 7, "sku": "KICKSY-ADIDAS-STA-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898487/kicksy/products/new-balance-trainer-3.jpg", "alt_text": "New Balance Trainer 3", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Converse All Star", "slug": "converse-all-star",
    "description": "A chunky, statement silhouette that pushes boundaries with a layered upper and dramatic midsole.",
    "category": "Limited Drops", "brand": "Converse", "gender": "unisex", "price": "139.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": False, "is_limited_drop": True,
    "variants": [],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898488/kicksy/products/converse-all-star.jpg", "alt_text": "Converse All Star", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Converse Chuck Taylor All Star", "slug": "converse-chuck-taylor-all-star",
    "description": "The most iconic sneaker in history. Canvas upper, rubber toe cap, and that unmistakable ankle patch. A true original since 1917.",
    "category": "Lifestyle", "brand": "Converse", "gender": "unisex", "price": "59.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": False, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 1, "sku": "KICKSY-10-UK10"},
      {"size": "11", "stock": 9, "sku": "KICKSY-10-UK11"},
      {"size": "12", "stock": 8, "sku": "KICKSY-10-UK12"},
      {"size": "6", "stock": 10, "sku": "KICKSY-10-UK6"},
      {"size": "7", "stock": 4, "sku": "KICKSY-10-UK7"},
      {"size": "8", "stock": 7, "sku": "KICKSY-10-UK8"},
      {"size": "9", "stock": 8, "sku": "KICKSY-10-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781894305/kicksy/products/converse-chuck-taylor-all-star.jpg", "alt_text": "Converse Chuck Taylor All Star", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Nike Air Max X90", "slug": "nike-air-max-x90",
    "description": "Built for long-distance stability. Featuring advanced cushioning technology, it delivers a smooth, stable ride mile after mile.",
    "category": "Running", "brand": "Nike", "gender": "unisex", "price": "149.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": True, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 15, "sku": "KICKSY-11-UK10"},
      {"size": "11", "stock": 1, "sku": "KICKSY-11-UK11"},
      {"size": "12", "stock": 4, "sku": "KICKSY-11-UK12"},
      {"size": "6", "stock": 2, "sku": "KICKSY-11-UK6"},
      {"size": "7", "stock": 0, "sku": "KICKSY-11-UK7"},
      {"size": "8", "stock": 1, "sku": "KICKSY-11-UK8"},
      {"size": "9", "stock": 0, "sku": "KICKSY-11-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898496/kicksy/products/nike-air-max-x90.jpg", "alt_text": "Nike Air Max X90", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Asics Gel-Kayano 30", "slug": "asics-gel-kayano-30",
    "description": "One of the most sought-after colourways in sneaker history. A standout silhouette with bold styling.",
    "category": "Limited Drops", "brand": "Asics", "gender": "men", "price": "219.99",
    "discount_percent": 0, "is_active": True, "is_featured": True, "is_new_arrival": False, "is_limited_drop": True,
    "variants": [
      {"size": "10", "stock": 3, "sku": "KICKSY-12-UK10"},
      {"size": "11", "stock": 12, "sku": "KICKSY-12-UK11"},
      {"size": "12", "stock": 5, "sku": "KICKSY-12-UK12"},
      {"size": "6", "stock": 1, "sku": "KICKSY-12-UK6"},
      {"size": "7", "stock": 11, "sku": "KICKSY-12-UK7"},
      {"size": "8", "stock": 1, "sku": "KICKSY-12-UK8"},
      {"size": "9", "stock": 13, "sku": "KICKSY-12-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898497/kicksy/products/asics-gel-kayano-30.jpg", "alt_text": "Asics Gel-Kayano 30", "is_primary": True, "order": 0},
    ],
  },
  {
    "name": "Jordan 4 Retro Thunder", "slug": "jordan-4-retro-thunder",
    "description": "A timeless icon. Features a soft leather upper and die-cut midsole for lightweight cushioning that's stood the test of time.",
    "category": "Lifestyle", "brand": "Jordan", "gender": "unisex", "price": "89.99",
    "discount_percent": 0, "is_active": True, "is_featured": False, "is_new_arrival": True, "is_limited_drop": False,
    "variants": [
      {"size": "10", "stock": 5, "sku": "REEBOK-CLASSIC-LEATH-UK10"},
      {"size": "8", "stock": 10, "sku": "REEBOK-CLASSIC-LEATH-UK8"},
      {"size": "9", "stock": 10, "sku": "REEBOK-CLASSIC-LEATH-UK9"},
    ],
    "images": [
      {"image": "https://res.cloudinary.com/dvksslkld/image/upload/v1781898498/kicksy/products/jordan-4-retro-thunder.jpg", "alt_text": "Jordan 4 Retro Thunder", "is_primary": True, "order": 0},
    ],
  },
]

CATEGORIES = ["Running", "Basketball", "Lifestyle", "Limited Drops", "Kids", "Sale"]

print(f"Seeding {len(PRODUCTS)} products into production database...\n")

# Ensure categories exist
for cat_name in CATEGORIES:
    Category.objects.get_or_create(
        name=cat_name,
        defaults={'slug': cat_name.lower().replace(' ', '-')}
    )

created_count = 0
skipped_count = 0

for item in PRODUCTS:
    if Product.objects.filter(slug=item['slug']).exists():
        print(f"SKIP (already exists): {item['name']}")
        skipped_count += 1
        continue

    category, _ = Category.objects.get_or_create(
        name=item['category'],
        defaults={'slug': item['category'].lower().replace(' ', '-')}
    )
    brand, _ = Brand.objects.get_or_create(
        name=item['brand'],
        defaults={'slug': item['brand'].lower().replace(' ', '-')}
    )

    product = Product.objects.create(
        name=item['name'],
        slug=item['slug'],
        description=item['description'],
        category=category,
        brand=brand,
        gender=item['gender'],
        price=item['price'],
        discount_percent=item['discount_percent'],
        is_active=item['is_active'],
        is_featured=item['is_featured'],
        is_new_arrival=item['is_new_arrival'],
        is_limited_drop=item['is_limited_drop'],
    )

    for img in item['images']:
        ProductImage.objects.create(
            product=product,
            image=img['image'],
            alt_text=img['alt_text'],
            is_primary=img['is_primary'],
            order=img['order'],
        )

    for v in item['variants']:
        ProductVariant.objects.create(
            product=product,
            size=v['size'],
            stock=v['stock'],
            sku=v['sku'],
        )

    print(f"CREATED: {item['name']} ({len(item['variants'])} variants, {len(item['images'])} images)")
    created_count += 1

print(f"\nDone. Created {created_count}, skipped {skipped_count}.")
