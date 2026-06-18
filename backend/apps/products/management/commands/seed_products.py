from django.core.management.base import BaseCommand
from apps.products.models import Category, Brand, Product, ProductImage, ProductVariant


class Command(BaseCommand):
    help = 'Seed the database with Kicksy products'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding categories...')
        categories = {
            'running': Category.objects.get_or_create(name='Running', slug='running', order=1)[0],
            'basketball': Category.objects.get_or_create(name='Basketball', slug='basketball', order=2)[0],
            'lifestyle': Category.objects.get_or_create(name='Lifestyle', slug='lifestyle', order=3)[0],
            'limited-drops': Category.objects.get_or_create(name='Limited Drops', slug='limited-drops', order=4)[0],
            'kids': Category.objects.get_or_create(name='Kids', slug='kids', order=5)[0],
            'sale': Category.objects.get_or_create(name='Sale', slug='sale', order=6)[0],
        }

        self.stdout.write('Seeding brands...')
        brands = {
            'nike': Brand.objects.get_or_create(name='Nike', slug='nike')[0],
            'adidas': Brand.objects.get_or_create(name='Adidas', slug='adidas')[0],
            'jordan': Brand.objects.get_or_create(name='Jordan', slug='jordan')[0],
            'new-balance': Brand.objects.get_or_create(name='New Balance', slug='new-balance')[0],
            'puma': Brand.objects.get_or_create(name='Puma', slug='puma')[0],
            'vans': Brand.objects.get_or_create(name='Vans', slug='vans')[0],
            'converse': Brand.objects.get_or_create(name='Converse', slug='converse')[0],
            'asics': Brand.objects.get_or_create(name='Asics', slug='asics')[0],
        }

        self.stdout.write('Seeding products...')
        products_data = [
            {
                'name': 'Nike Air Max 270',
                'slug': 'nike-air-max-270',
                'description': 'The Nike Air Max 270 delivers an all-day comfortable ride with the largest Air unit yet. The heel Air unit is Nike\'s biggest yet, offering a super-soft ride that feels as good as it looks.',
                'category': categories['lifestyle'],
                'brand': brands['nike'],
                'gender': 'men',
                'price': 119.99,
                'discount_percent': 20,
                'is_featured': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
            },
            {
                'name': 'Adidas Ultraboost 24',
                'slug': 'adidas-ultraboost-24',
                'description': 'Built for runners who want the ultimate combination of comfort and performance. The Ultraboost 24 features a full-length Boost midsole for incredible energy return with every stride.',
                'category': categories['running'],
                'brand': brands['adidas'],
                'gender': 'unisex',
                'price': 159.99,
                'discount_percent': 0,
                'is_new_arrival': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
            },
            {
                'name': 'Air Jordan 1 Retro High OG',
                'slug': 'air-jordan-1-retro-high-og',
                'description': 'The Air Jordan 1 Retro High OG is a legend reborn. Originally designed for Michael Jordan in 1985, this iconic silhouette continues to inspire generations of sneakerheads worldwide.',
                'category': categories['basketball'],
                'brand': brands['jordan'],
                'gender': 'men',
                'price': 179.99,
                'discount_percent': 15,
                'is_featured': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
            },
            {
                'name': 'New Balance 550 White Green',
                'slug': 'new-balance-550-white-green',
                'description': 'Originally designed as a basketball shoe in 1989, the 550 makes its triumphant return. Clean lines, premium leather upper, and that unmistakable NB heritage.',
                'category': categories['lifestyle'],
                'brand': brands['new-balance'],
                'gender': 'unisex',
                'price': 109.99,
                'discount_percent': 0,
                'is_new_arrival': True,
                'is_featured': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
            },
            {
                'name': 'Puma Suede Classic XL',
                'slug': 'puma-suede-classic-xl',
                'description': 'A streetwear staple since 1968. The Puma Suede Classic XL brings back the iconic silhouette with a slightly oversized sole unit for a modern twist on a timeless classic.',
                'category': categories['lifestyle'],
                'brand': brands['puma'],
                'gender': 'unisex',
                'price': 74.99,
                'discount_percent': 0,
                'is_new_arrival': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
            },
            {
                'name': 'Vans Old Skool Pro',
                'slug': 'vans-old-skool-pro',
                'description': 'The Vans Old Skool Pro is the skate-ready version of the classic Old Skool. Built with Pro Vulc construction for superior board feel and durability on and off the board.',
                'category': categories['lifestyle'],
                'brand': brands['vans'],
                'gender': 'unisex',
                'price': 79.99,
                'discount_percent': 25,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=80',
            },
            {
                'name': 'Nike Air Force 1 Low',
                'slug': 'nike-air-force-1-low',
                'description': 'The radiance lives on in the Nike Air Force 1 Low, the b-ball icon that first debuted in 1982. Crossing hardwood to linoleum to concrete, this low-cut version keeps the classic look intact.',
                'category': categories['lifestyle'],
                'brand': brands['nike'],
                'gender': 'unisex',
                'price': 99.99,
                'discount_percent': 0,
                'is_featured': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
            },
            {
                'name': 'Adidas Stan Smith',
                'slug': 'adidas-stan-smith',
                'description': 'Originally a tennis shoe, the Stan Smith has transcended sport to become one of the most iconic sneakers in history. Clean, minimal, and endlessly versatile.',
                'category': categories['lifestyle'],
                'brand': brands['adidas'],
                'gender': 'unisex',
                'price': 84.99,
                'discount_percent': 10,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
            },
            {
                'name': 'New Balance 9060',
                'slug': 'new-balance-9060',
                'description': 'The New Balance 9060 is a chunky, dad-shoe-inspired silhouette that pushes boundaries. With its layered upper and dramatic ABZORB midsole, it is the ultimate statement sneaker.',
                'category': categories['limited-drops'],
                'brand': brands['new-balance'],
                'gender': 'unisex',
                'price': 139.99,
                'discount_percent': 0,
                'is_limited_drop': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
            },
            {
                'name': 'Converse Chuck Taylor All Star',
                'slug': 'converse-chuck-taylor-all-star',
                'description': 'The Converse Chuck Taylor All Star is the most iconic sneaker in history. Canvas upper, rubber toe cap, and that unmistakable ankle patch. A true original since 1917.',
                'category': categories['lifestyle'],
                'brand': brands['converse'],
                'gender': 'unisex',
                'price': 59.99,
                'discount_percent': 0,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=800&q=80',
            },
            {
                'name': 'Asics Gel-Kayano 30',
                'slug': 'asics-gel-kayano-30',
                'description': 'The Asics Gel-Kayano 30 is built for long-distance stability. Featuring FF BLAST PLUS ECO cushioning and PureGEL technology, it delivers a smooth, stable ride mile after mile.',
                'category': categories['running'],
                'brand': brands['asics'],
                'gender': 'unisex',
                'price': 149.99,
                'discount_percent': 0,
                'is_new_arrival': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
            },
            {
                'name': 'Jordan 4 Retro Thunder',
                'slug': 'jordan-4-retro-thunder',
                'description': 'The Air Jordan 4 Retro Thunder is one of the most sought-after colourways in sneaker history. Black and Tour Yellow never looked so good on the iconic AJ4 silhouette.',
                'category': categories['limited-drops'],
                'brand': brands['jordan'],
                'gender': 'men',
                'price': 219.99,
                'discount_percent': 0,
                'is_limited_drop': True,
                'is_featured': True,
                'is_active': True,
                'image_url': 'https://images.unsplash.com/photo-1556906781-9a412961a28d?w=800&q=80',
            },
        ]

        sizes = ['6', '7', '8', '9', '10', '11', '12']

        for i, data in enumerate(products_data):
            image_url = data.pop('image_url')
            product, created = Product.objects.get_or_create(
                slug=data['slug'],
                defaults=data
            )

            if created:
                ProductImage.objects.create(
                    product=product,
                    image=image_url,
                    alt_text=product.name,
                    is_primary=True,
                    order=0
                )

                for size in sizes:
                    import random 
                    ProductVariant.objects.get_or_create(
                        product=product,
                        size=size,
                        defaults={
                            'stock': random.randint(0, 15),
                            'sku': f'KICKSY-{product.id}-UK{size}'
                        }
                    )

                self.stdout.write(f'  Created: {product.name}')
            else:
                self.stdout.write(f'  Skipped (exists): {product.name}')

        self.stdout.write(self.style.SUCCESS('Seeding complete!'))