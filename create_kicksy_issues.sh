#!/bin/bash
# Auto-generated script to bulk-create Kicksy GitHub Issues
# Run from inside the kicksy repo directory
set -e

echo "[1/142] Creating: Define tech stack and system architecture..."
gh issue create --title 'Define tech stack and system architecture' --body 'Django REST Framework + React/Vite/Tailwind + PostgreSQL + Stripe, scoped as customer-facing shop only (no seller portal)

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[2/142] Creating: Set up Django project structure..."
gh issue create --title 'Set up Django project structure' --body '`config/` with split settings (`base.py`, `dev.py`, `prod.py`), `apps/` folder pattern instead of flat app layout

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[3/142] Creating: Create 6 Django apps..."
gh issue create --title 'Create 6 Django apps' --body 'accounts, products, cart, orders, payments, reviews

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[4/142] Creating: Configure PostgreSQL database..."
gh issue create --title 'Configure PostgreSQL database' --body 'create `kicksy_db`, connect via `.env`

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[5/142] Creating: Set up .gitignore at repo root..."
gh issue create --title 'Set up .gitignore at repo root' --body 'before any files were committed, covering Python, Node, env files, media

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[6/142] Creating: Install and configure core dependencies..."
gh issue create --title 'Install and configure core dependencies' --body 'DRF, simplejwt, django-cors-headers, django-filter, Pillow, psycopg2, Cloudinary, Stripe SDK

**Epic:** EPIC 1: Project Architecture & Setup
**Source:** Part 1 backlog' --label "backend" --label "setup"

echo "[7/142] Creating: As a user, I can register an account..."
gh issue create --title 'As a user, I can register an account' --body 'with email, name, and password

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[8/142] Creating: As a user, I can log in..."
gh issue create --title 'As a user, I can log in' --body 'and receive JWT access + refresh tokens

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[9/142] Creating: As a user, I can log out..."
gh issue create --title 'As a user, I can log out' --body ', blacklisting my refresh token

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[10/142] Creating: As a user, my expired access token refreshes automatically..."
gh issue create --title 'As a user, my expired access token refreshes automatically' --body 'without me noticing (frontend Axios interceptor)

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[11/142] Creating: As a user, I can view and update my profile..."
gh issue create --title 'As a user, I can view and update my profile' --body '(name, phone, avatar)

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[12/142] Creating: As a user, I can change my password..."
gh issue create --title 'As a user, I can change my password' --body '
**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[13/142] Creating: As a user, I can add, update, and delete shipping addresses..."
gh issue create --title 'As a user, I can add, update, and delete shipping addresses' --body ', with one marked as default

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[14/142] Creating: As an admin, I have a role field distinguishing me from cust..."
gh issue create --title 'As an admin, I have a role field distinguishing me from customers' --body '
**Epic:** EPIC 2: Authentication & User Accounts
**Section:** User Stories
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[15/142] Creating: Build Login page..."
gh issue create --title 'Build Login page' --body 'with form validation and error display

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[16/142] Creating: Build Register page..."
gh issue create --title 'Build Register page' --body 'with field-level error mapping from API

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[17/142] Creating: Build AuthContext..."
gh issue create --title 'Build AuthContext' --body 'global auth state, localStorage token persistence, auto-fetch profile on load

**Epic:** EPIC 2: Authentication & User Accounts
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "auth"

echo "[18/142] Creating: Design product data model..."
gh issue create --title 'Design product data model' --body 'Category, Brand, Product, ProductImage, ProductVariant (size + stock)

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[19/142] Creating: Build product list endpoint..."
gh issue create --title 'Build product list endpoint' --body 'with search, filtering (category, brand, gender, size, price range, on-sale), sorting, and pagination

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[20/142] Creating: Build product detail endpoint..."
gh issue create --title 'Build product detail endpoint' --body 'by slug

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[21/142] Creating: Build featured / new-arrivals / limited-drops endpoints..."
gh issue create --title 'Build featured / new-arrivals / limited-drops endpoints' --body '
**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[22/142] Creating: Build categories and brands list endpoints..."
gh issue create --title 'Build categories and brands list endpoints' --body '
**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[23/142] Creating: Build related products endpoint..."
gh issue create --title 'Build related products endpoint' --body '(same category, excluding current product)

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[24/142] Creating: Build dynamic facet counts endpoint..."
gh issue create --title 'Build dynamic facet counts endpoint' --body 'category/brand counts that respect currently-active filters

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[25/142] Creating: Write seed script..."
gh issue create --title 'Write seed script' --body '(`seed_products` management command) — 6 categories, 8 brands, 12 sneakers with variants and images

**Epic:** EPIC 3: Product Catalog
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[26/142] Creating: Build Homepage..."
gh issue create --title 'Build Homepage' --body 'rotating hero banner (auto-cycles featured products), limited drop banner, trending now grid, new arrivals with category pill filtering

**Epic:** EPIC 3: Product Catalog
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[27/142] Creating: Build Product Listing page..."
gh issue create --title 'Build Product Listing page' --body 'sidebar filters, removable filter chips, sort dropdown, dynamic facet counts

**Epic:** EPIC 3: Product Catalog
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[28/142] Creating: Build Product Detail page..."
gh issue create --title 'Build Product Detail page' --body 'image gallery, size selector, description, related products

**Epic:** EPIC 3: Product Catalog
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[29/142] Creating: Build reusable ProductCard component..."
gh issue create --title 'Build reusable ProductCard component' --body 'hover effects (image zoom, wishlist heart, "view details" overlay)

**Epic:** EPIC 3: Product Catalog
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "products"

echo "[30/142] Creating: As a user, I can add a product (with size) to my cart..."
gh issue create --title 'As a user, I can add a product (with size) to my cart' --body '
**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[31/142] Creating: As a user, I cannot add more than available stock..."
gh issue create --title 'As a user, I cannot add more than available stock' --body '
**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[32/142] Creating: As a user, I can update the quantity of a cart item..."
gh issue create --title 'As a user, I can update the quantity of a cart item' --body '
**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[33/142] Creating: As a user, I can remove an item from my cart..."
gh issue create --title 'As a user, I can remove an item from my cart' --body '
**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[34/142] Creating: As a user, I can clear my entire cart..."
gh issue create --title 'As a user, I can clear my entire cart' --body '
**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[35/142] Creating: As a user, I can see my cart total and item count update liv..."
gh issue create --title 'As a user, I can see my cart total and item count update live' --body '(CartContext)

**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[36/142] Creating: Build Cart page..."
gh issue create --title 'Build Cart page' --body 'quantity controls, remove item, order summary, free-shipping-over-£60 messaging

**Epic:** EPIC 4: Cart
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "cart"

echo "[37/142] Creating: Design Order data model..."
gh issue create --title 'Design Order data model' --body 'Order, OrderItem, OrderStatusHistory, auto-generated order number (`KSY########`)

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[38/142] Creating: Build order creation endpoint..."
gh issue create --title 'Build order creation endpoint' --body 'snapshots cart into order items, decrements stock, calculates shipping, clears cart

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[39/142] Creating: Build order list / detail endpoints..."
gh issue create --title 'Build order list / detail endpoints' --body 'for the logged-in user

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[40/142] Creating: Build order cancellation endpoint..."
gh issue create --title 'Build order cancellation endpoint' --body '(only while pending/confirmed)

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[41/142] Creating: Build admin order list and status update endpoints..."
gh issue create --title 'Build admin order list and status update endpoints' --body '
**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[42/142] Creating: Integrate Stripe PaymentIntent creation..."
gh issue create --title 'Integrate Stripe PaymentIntent creation' --body 'tied to an order

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[43/142] Creating: Integrate Stripe webhook handler..."
gh issue create --title 'Integrate Stripe webhook handler' --body 'to confirm orders on successful payment

**Epic:** EPIC 5: Checkout & Orders
**Section:** Backend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[44/142] Creating: Build Checkout page..."
gh issue create --title 'Build Checkout page' --body 'two-step flow: shipping address form → Stripe Payment Element

**Epic:** EPIC 5: Checkout & Orders
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[45/142] Creating: Integrate Stripe Elements..."
gh issue create --title 'Integrate Stripe Elements' --body '(Card, Revolut Pay, Klarna, Amazon Pay rendered automatically)

**Epic:** EPIC 5: Checkout & Orders
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[46/142] Creating: Build Order Confirmation state..."
gh issue create --title 'Build Order Confirmation state' --body 'success banner after payment redirect

**Epic:** EPIC 5: Checkout & Orders
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[47/142] Creating: Build Order History page..."
gh issue create --title 'Build Order History page' --body 'list of past orders with status badges

**Epic:** EPIC 5: Checkout & Orders
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[48/142] Creating: Build Order Detail page..."
gh issue create --title 'Build Order Detail page' --body 'full breakdown, shipping address, items, totals

**Epic:** EPIC 5: Checkout & Orders
**Section:** Frontend
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[49/142] Creating: As a user, I can leave a review (rating + title + body) on a..."
gh issue create --title 'As a user, I can leave a review (rating + title + body) on a product' --body '
**Epic:** EPIC 6: Reviews & Wishlist
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "reviews"

echo "[50/142] Creating: As a system, I auto-detect "verified purchase"..."
gh issue create --title 'As a system, I auto-detect "verified purchase"' --body 'based on the user'"'"'s order history

**Epic:** EPIC 6: Reviews & Wishlist
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "reviews"

echo "[51/142] Creating: As a user, I can view all reviews for a product..."
gh issue create --title 'As a user, I can view all reviews for a product' --body '
**Epic:** EPIC 6: Reviews & Wishlist
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "reviews"

echo "[52/142] Creating: As a user, I can toggle a product in/out of my wishlist..."
gh issue create --title 'As a user, I can toggle a product in/out of my wishlist' --body '
**Epic:** EPIC 6: Reviews & Wishlist
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "reviews"

echo "[53/142] Creating: As a user, I can view my wishlist..."
gh issue create --title 'As a user, I can view my wishlist' --body '*(endpoint built, page not yet built)*

**Epic:** EPIC 6: Reviews & Wishlist
**Source:** Part 1 backlog' --label "backend" --label "frontend" --label "reviews"

echo "[54/142] Creating: Customize Django admin..."
gh issue create --title 'Customize Django admin' --body 'for all models — list displays, filters, inline editing (products with image/variant inlines, orders with item/history inlines)

**Epic:** EPIC 7: Admin & Tooling
**Source:** Part 1 backlog' --label "admin" --label "tooling"

echo "[55/142] Creating: Create Postman collection "Kicksy API"..."
gh issue create --title 'Create Postman collection "Kicksy API"' --body 'with environment variables (`base_url`, `access_token`, `refresh_token`, `order_number`)

**Epic:** EPIC 7: Admin & Tooling
**Source:** Part 1 backlog' --label "admin" --label "tooling"

echo "[56/142] Creating: Add post-response scripts..."
gh issue create --title 'Add post-response scripts' --body 'to auto-save JWT tokens and order numbers in Postman

**Epic:** EPIC 7: Admin & Tooling
**Source:** Part 1 backlog' --label "admin" --label "tooling"

echo "[57/142] Creating: Set up Stripe CLI webhook forwarding..."
gh issue create --title 'Set up Stripe CLI webhook forwarding' --body 'for local development testing

**Epic:** EPIC 7: Admin & Tooling
**Source:** Part 1 backlog' --label "admin" --label "tooling"

echo "[58/142] Creating: startapp CommandError on pre-created __init__.py files..."
gh issue create --title 'startapp CommandError on pre-created __init__.py files' --body 'Django'"'"'s `startapp` refused to overlay into folders that already had `__init__.py`; resolved by deleting first, then running `startapp`

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[59/142] Creating: .env values not loading — Stripe AuthenticationError: Invali..."
gh issue create --title '.env values not loading — Stripe AuthenticationError: Invalid API Key' --body 'root cause: a stale `STRIPE_SECRET_KEY` was set as a real shell environment variable, silently overriding `.env` since `load_dotenv()` doesn'"'"'t override existing env vars by default. Fixed with `unset` commands added to `~/.zshrc`

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[60/142] Creating: AttributeError: Cannot find 'reviews' on Product object in p..."
gh issue create --title 'AttributeError: Cannot find '"'"'reviews'"'"' on Product object in prefetch_related' --body 'views.py referenced a `reviews` relation before the reviews app/model existed; removed from `prefetch_related` calls until the relation was built

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[61/142] Creating: Product images rendering as broken/malformed URLs (/https%3A..."
gh issue create --title 'Product images rendering as broken/malformed URLs (/https%3A/images.unsplash.com/...)' --body 'Django'"'"'s `ImageField.url` was incorrectly URL-encoding externally-hosted image URLs stored as raw strings. Fixed in two places: `Product.primary_image` model property (return `str(image)` instead of `.url`) and `ProductImageSerializer` (custom `SerializerMethodField` returning raw string)

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[62/142] Creating: Dead/404 Unsplash photo URLs..."
gh issue create --title 'Dead/404 Unsplash photo URLs' --body 'several seeded products pointed to Unsplash photo IDs that no longer resolve (Jordan 4 Retro Thunder, Vans Old Skool Pro); replaced with working photo URLs via direct DB update

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[63/142] Creating: React Home page crash: featured.map is not a function..."
gh issue create --title 'React Home page crash: featured.map is not a function' --body 'frontend assumed `getFeatured()` etc. returned a plain array, but DRF pagination wraps results in `{ count, next, previous, results }`; fixed by reading `res.data.results || res.data`

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[64/142] Creating: Tabler Icons CDN 404 — all navbar icons invisible..."
gh issue create --title 'Tabler Icons CDN 404 — all navbar icons invisible' --body 'the originally-used CDN path (`tabler-icons/2.44.0/iconfont/tabler-icons.min.css`) returned 404 with no console error (silent CSS failure); fixed by updating to the current valid version path (`tabler-icons/3.35.0/tabler-icons.min.css`)

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[65/142] Creating: Port 8000 conflict with Docker..."
gh issue create --title 'Port 8000 conflict with Docker' --body 'Docker Desktop was bound to port 8000, silently intercepting all API requests and producing misleading CORS/404 errors that looked like backend bugs; identified via `lsof -i :8000`, resolved by killing the Docker process

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[66/142] Creating: Stripe webhook 500 Internal Server Error on payment_intent.s..."
gh issue create --title 'Stripe webhook 500 Internal Server Error on payment_intent.succeeded' --body '`intent['"'"'metadata'"'"'].get('"'"'order_number'"'"')` failed because Stripe SDK returns `metadata` as a `StripeObject`, not a plain dict, so dict-style `.get()` isn'"'"'t valid; fix in progress using attribute-style access with a `hasattr` fallback

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[67/142] Creating: Orders remain "Pending" after successful payment..."
gh issue create --title 'Orders remain "Pending" after successful payment' --body 'direct symptom of the above webhook bug; orders should auto-transition to "Confirmed" once the webhook fix is verified working

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[68/142] Creating: Filter facet counts initially static..."
gh issue create --title 'Filter facet counts initially static' --body '(didn'"'"'t reflect other active filters) — upgraded from simple total counts to a dedicated `/products/facets/` endpoint that recalculates counts per dimension while respecting all *other* active filters

**Epic:** BUGS (chronological, as encountered)
**Source:** Part 1 backlog' --label "bug"

echo "[69/142] Creating: Account / profile settings page (frontend)..."
gh issue create --title 'Account / profile settings page (frontend)' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[70/142] Creating: Wishlist page (frontend — API already built)..."
gh issue create --title 'Wishlist page (frontend — API already built)' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[71/142] Creating: Admin dashboard in React (currently Django admin only)..."
gh issue create --title 'Admin dashboard in React (currently Django admin only)' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[72/142] Creating: Forgot password flow..."
gh issue create --title 'Forgot password flow' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[73/142] Creating: Move product images from hotlinked Unsplash to Cloudinary..."
gh issue create --title 'Move product images from hotlinked Unsplash to Cloudinary' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[74/142] Creating: Expand seed data from 12 to ~30 products..."
gh issue create --title 'Expand seed data from 12 to ~30 products' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[75/142] Creating: First Git commit (repo has never been committed)..."
gh issue create --title 'First Git commit (repo has never been committed)' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[76/142] Creating: Deployment — backend to Railway/Render, frontend to Vercel/N..."
gh issue create --title 'Deployment — backend to Railway/Render, frontend to Vercel/Netlify, managed PostgreSQL' --body '
**Epic:** NOT YET STARTED (backlog for future sprints)
**Source:** Part 1 backlog' --label "backlog"

echo "[77/142] Creating: Diagnose and fix the payment_intent.succeeded webhook 500 er..."
gh issue create --title 'Diagnose and fix the payment_intent.succeeded webhook 500 error' --body 'root cause was the attempted fallback (`dict(intent.metadata).get(...)`) still failing, since the Stripe SDK'"'"'s `StripeObject.__getitem__` raised `KeyError: 0` when iterated as a dict; resolved by switching to direct attribute access (`intent.metadata['"'"'order_number'"'"']`)

**Epic:** EPIC 8: Stripe Webhook Stabilization
**Source:** Part 2 backlog' --label "backend" --label "payments" --label "bug"

echo "[78/142] Creating: Verify fix via Stripe CLI event resend..."
gh issue create --title 'Verify fix via Stripe CLI event resend' --body 'confirmed `[200]` response and order status transition from Pending → Confirmed

**Epic:** EPIC 8: Stripe Webhook Stabilization
**Source:** Part 2 backlog' --label "backend" --label "payments" --label "bug"

echo "[79/142] Creating: Restart full local dev environment..."
gh issue create --title 'Restart full local dev environment' --body '(Django, Vite, Stripe CLI) after webhook secret/listener was accidentally quit mid-session

**Epic:** EPIC 8: Stripe Webhook Stabilization
**Source:** Part 2 backlog' --label "backend" --label "payments" --label "bug"

echo "[80/142] Creating: Initialize Git repository and make first commit..."
gh issue create --title 'Initialize Git repository and make first commit' --body 'repo had never been committed; `.gitignore` was already in place from Part 1

**Epic:** EPIC 9: Version Control
**Source:** Part 2 backlog' --label "devops" --label "setup"

echo "[81/142] Creating: Create GitHub repository and push initial codebase..."
gh issue create --title 'Create GitHub repository and push initial codebase' --body '(`github.com/DK-Manish/kicksy`)

**Epic:** EPIC 9: Version Control
**Source:** Part 2 backlog' --label "devops" --label "setup"

echo "[82/142] Creating: Verify .env is excluded from version control..."
gh issue create --title 'Verify .env is excluded from version control' --body 'confirmed via `git ls-files | grep .env` returning nothing, protecting Stripe secret keys

**Epic:** EPIC 9: Version Control
**Source:** Part 2 backlog' --label "devops" --label "setup"

echo "[83/142] Creating: As a user, I can view and edit my profile..."
gh issue create --title 'As a user, I can view and edit my profile' --body '(first name, last name, phone) from a dedicated Account page

**Epic:** EPIC 10: Account & Profile Management (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "account"

echo "[84/142] Creating: As a user, I can change my password..."
gh issue create --title 'As a user, I can change my password' --body 'from the Account page, with current-password verification

**Epic:** EPIC 10: Account & Profile Management (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "account"

echo "[85/142] Creating: As a user, I can view, add, set-default, and remove my saved..."
gh issue create --title 'As a user, I can view, add, set-default, and remove my saved addresses' --body 'from the Account page

**Epic:** EPIC 10: Account & Profile Management (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "account"

echo "[86/142] Creating: Build tabbed Account page UI..."
gh issue create --title 'Build tabbed Account page UI' --body 'Profile / Password / Addresses sections with shared layout

**Epic:** EPIC 10: Account & Profile Management (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "account"

echo "[87/142] Creating: Wire Account page into Navbar dropdown..."
gh issue create --title 'Wire Account page into Navbar dropdown' --body '("My account" link)

**Epic:** EPIC 10: Account & Profile Management (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "account"

echo "[88/142] Creating: As a user, I can view all products I've added to my wishlist..."
gh issue create --title 'As a user, I can view all products I'"'"'ve added to my wishlist' --body 'on a dedicated Wishlist page

**Epic:** EPIC 11: Wishlist (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "wishlist"

echo "[89/142] Creating: As a user, I can remove an item from my wishlist directly fr..."
gh issue create --title 'As a user, I can remove an item from my wishlist directly from the Wishlist page' --body ', with the card disappearing immediately (no page reload required)

**Epic:** EPIC 11: Wishlist (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "wishlist"

echo "[90/142] Creating: As a user, I see consistent wishlist heart state (filled/red..."
gh issue create --title 'As a user, I see consistent wishlist heart state (filled/red) across Home, Product Listing, and Wishlist pages' --body 'without needing to refresh

**Epic:** EPIC 11: Wishlist (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "wishlist"

echo "[91/142] Creating: Expose is_wishlisted per-product flag on product list/detail..."
gh issue create --title 'Expose is_wishlisted per-product flag on product list/detail API responses' --body ', scoped to the authenticated user

**Epic:** EPIC 11: Wishlist (Frontend)
**Source:** Part 2 backlog' --label "frontend" --label "wishlist"

echo "[92/142] Creating: As an admin, I can access a dedicated /admin dashboard..."
gh issue create --title 'As an admin, I can access a dedicated /admin dashboard' --body 'route, gated by `user.role === '"'"'admin'"'"'`

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Access Control
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[93/142] Creating: Build AdminRoute guard component..."
gh issue create --title 'Build AdminRoute guard component' --body 'redirecting non-admins to home

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Access Control
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[94/142] Creating: Build AdminLayout..."
gh issue create --title 'Build AdminLayout' --body 'with sidebar navigation (Orders / Products)

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Access Control
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[95/142] Creating: As an admin, I can view all orders..."
gh issue create --title 'As an admin, I can view all orders' --body 'across all customers, with status badges and pricing

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Orders Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[96/142] Creating: As an admin, I can filter orders by status..."
gh issue create --title 'As an admin, I can filter orders by status' --body '
**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Orders Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[97/142] Creating: As an admin, I can update an order's status..."
gh issue create --title 'As an admin, I can update an order'"'"'s status' --body 'directly from a dropdown, with immediate UI reflection

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Orders Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[98/142] Creating: As an admin, I can view a list of all products..."
gh issue create --title 'As an admin, I can view a list of all products' --body '(active and inactive) with thumbnails

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[99/142] Creating: As an admin, I can create a new product..."
gh issue create --title 'As an admin, I can create a new product' --body 'core fields, multiple images (by URL), and per-size stock/SKU

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[100/142] Creating: As an admin, I can edit an existing product..."
gh issue create --title 'As an admin, I can edit an existing product' --body ', including replacing its images and updating size/stock

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[101/142] Creating: As an admin, I can delete a product..."
gh issue create --title 'As an admin, I can delete a product' --body '
**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[102/142] Creating: Build writable nested serializer (ProductAdminWriteSerialize..."
gh issue create --title 'Build writable nested serializer (ProductAdminWriteSerializer)' --body 'supporting create/update of `images` and `variants` as part of a single product payload

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[103/142] Creating: Build admin-only product endpoints..."
gh issue create --title 'Build admin-only product endpoints' --body '(`/products/admin/`, `/products/admin/<slug>/`) separate from public read-only endpoints

**Epic:** EPIC 12: Admin Dashboard (Frontend)
**Section:** Products Management
**Source:** Part 2 backlog' --label "frontend" --label "backend" --label "admin"

echo "[104/142] Creating: Audit existing Postman collection against actual backend rou..."
gh issue create --title 'Audit existing Postman collection against actual backend routes' --body 'cross-checked every `urls.py` against existing requests

**Epic:** EPIC 13: API Testing Infrastructure
**Source:** Part 2 backlog' --label "tooling" --label "testing"

echo "[105/142] Creating: Add missing Postman requests..."
gh issue create --title 'Add missing Postman requests' --body 'Update Profile, Update/Delete Address, Get Facets, full Admin Products CRUD, Token Refresh, Update Own Review

**Epic:** EPIC 13: API Testing Infrastructure
**Source:** Part 2 backlog' --label "tooling" --label "testing"

echo "[106/142] Creating: Fix broken Postman requests..."
gh issue create --title 'Fix broken Postman requests' --body '"Admin — update status" was `GET` with no body (corrected to `PATCH` + status/note body); "Delete review" was `GET` (corrected to `DELETE`)

**Epic:** EPIC 13: API Testing Infrastructure
**Source:** Part 2 backlog' --label "tooling" --label "testing"

echo "[107/142] Creating: Add auto-capture test scripts..."
gh issue create --title 'Add auto-capture test scripts' --body 'Login → `access_token`/`refresh_token`; Create order → `order_number`; Get Address → `address_id`; Create review → `review_id`; Admin create product → `admin_product_slug`

**Epic:** EPIC 13: API Testing Infrastructure
**Source:** Part 2 backlog' --label "tooling" --label "testing"

echo "[108/142] Creating: Export consolidated Postman collection + environment files..."
gh issue create --title 'Export consolidated Postman collection + environment files' --body 'for re-import

**Epic:** EPIC 13: API Testing Infrastructure
**Source:** Part 2 backlog' --label "tooling" --label "testing"

echo "[109/142] Creating: As a user, I can request a password reset link..."
gh issue create --title 'As a user, I can request a password reset link' --body 'by submitting my email

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[110/142] Creating: As a user, I receive a secure, time-limited reset token..."
gh issue create --title 'As a user, I receive a secure, time-limited reset token' --body '(Django `PasswordResetTokenGenerator`, no email service — link surfaced directly in API response/UI for this dev/portfolio context)

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[111/142] Creating: As a user, I can set a new password..."
gh issue create --title 'As a user, I can set a new password' --body 'by visiting the reset link and submitting a new password (with confirmation match + minimum length validation)

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[112/142] Creating: As a user, an invalid or expired reset link is rejected with..."
gh issue create --title 'As a user, an invalid or expired reset link is rejected with a clear error' --body '
**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[113/142] Creating: Build ForgotPasswordView and ResetPasswordView..."
gh issue create --title 'Build ForgotPasswordView and ResetPasswordView' --body 'backend endpoints

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[114/142] Creating: Build Forgot Password page..."
gh issue create --title 'Build Forgot Password page' --body 'email entry, displays generated reset link

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[115/142] Creating: Build Reset Password page..."
gh issue create --title 'Build Reset Password page' --body '(`/reset-password/:uid/:token`) — new password form, success state, auto-redirect to login

**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[116/142] Creating: Add "Forgot password?" link to Login page..."
gh issue create --title 'Add "Forgot password?" link to Login page' --body '
**Epic:** EPIC 14: Forgot Password Flow
**Source:** Part 2 backlog' --label "backend" --label "frontend" --label "auth"

echo "[117/142] Creating: Set up GitHub Projects board ("Kicksy Roadmap")..."
gh issue create --title 'Set up GitHub Projects board ("Kicksy Roadmap")' --body 'as a lightweight Azure-Boards-style tracker

**Epic:** EPIC 15: Project Tracking Setup
**Source:** Part 2 backlog' --label "tooling" --label "devops"

echo "[118/142] Creating: Add custom Type field..."
gh issue create --title 'Add custom Type field' --body '(single select: Bug / Feature / Task / Chore)

**Epic:** EPIC 15: Project Tracking Setup
**Source:** Part 2 backlog' --label "tooling" --label "devops"

echo "[119/142] Creating: Add custom Area field..."
gh issue create --title 'Add custom Area field' --body '(single select: Backend / Frontend / DevOps)

**Epic:** EPIC 15: Project Tracking Setup
**Source:** Part 2 backlog' --label "tooling" --label "devops"

echo "[120/142] Creating: Backfill board with full project history..."
gh issue create --title 'Backfill board with full project history' --body 'from both backlog documents

**Epic:** EPIC 15: Project Tracking Setup
**Source:** Part 2 backlog' --label "tooling" --label "devops"

echo "[121/142] Creating: Stripe webhook 500 persisted after first attempted fix..."
gh issue create --title 'Stripe webhook 500 persisted after first attempted fix' --body 'the `dict(intent.metadata).get(...)` fallback itself raised `KeyError: 0` because Stripe'"'"'s `StripeObject.__getitem__` doesn'"'"'t support dict-style conversion the way assumed; resolved by removing the fallback entirely and using direct attribute access (`intent.metadata['"'"'order_number'"'"']`)

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[122/142] Creating: Account page blank/crashed: 'AuthContext' export not found..."
gh issue create --title 'Account page blank/crashed: '"'"'AuthContext'"'"' export not found' --body 'page imported `AuthContext` directly and used `useContext`, inconsistent with the rest of the app'"'"'s `useAuth()` hook pattern; fixed by switching to `useAuth()`

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[123/142] Creating: Account page crashed: addresses.map is not a function..."
gh issue create --title 'Account page crashed: addresses.map is not a function' --body '`getAddresses()` API response wraps results in DRF pagination (`{ results: [...] }`), but the page assumed a plain array; fixed by reading `res.data.results || res.data`

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[124/142] Creating: Account page used non-existent authApi.createAddress..."
gh issue create --title 'Account page used non-existent authApi.createAddress' --body 'actual exported function in `api/auth.js` is `addAddress`; corrected the call site to match

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[125/142] Creating: Navbar account dropdown menu closed before menu items could ..."
gh issue create --title 'Navbar account dropdown menu closed before menu items could be clicked' --body 'CSS hover gap between trigger button and dropdown (`mt-2` created a non-hoverable gap) caused the menu to disappear on mouse transit; fixed by changing to `top-full` so the dropdown sits flush against the trigger

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[126/142] Creating: Change Password always returned "Old password is incorrect" ..."
gh issue create --title 'Change Password always returned "Old password is incorrect" even with a correct password' --body 'actual cause was a missing required field; backend'"'"'s `ChangePasswordSerializer` requires `new_password2` (confirmation field) which the frontend wasn'"'"'t sending, surfacing as a generic/misleading error; fixed by including `new_password2` in the request payload

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[127/142] Creating: Product Admin update endpoint returned 500: SKU UniqueValida..."
gh issue create --title 'Product Admin update endpoint returned 500: SKU UniqueValidator rejected an unchanged SKU on edit' --body 'DRF auto-generates a uniqueness validator on `sku` because of the model'"'"'s `unique=True` constraint, which fires during validation (before the delete-then-recreate update logic ever runs), incorrectly flagging a variant'"'"'s own pre-existing SKU as a duplicate; fixed by overriding the field with `serializers.CharField(validators=[])` on `ProductVariantWriteSerializer`

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[128/142] Creating: Admin Products list showed broken/empty thumbnails..."
gh issue create --title 'Admin Products list showed broken/empty thumbnails' --body '`ProductDetailSerializer` (used for the admin list) doesn'"'"'t expose a flat `primary_image` field like `ProductListSerializer` does, only a nested `images` array; fixed by reading `product.images?.[0]?.image` instead

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[129/142] Creating: Wishlist heart icon didn't reflect saved state on page load..."
gh issue create --title 'Wishlist heart icon didn'"'"'t reflect saved state on page load' --body '(Home, Product Listing) — `ProductCard` always initialized `wishlisted` state to `false` regardless of actual status; fixed by adding an `is_wishlisted` field to `ProductListSerializer` (scoped to the authenticated user) and passing it through as `initialWishlisted` on every `ProductCard` usage across Home and Product Listing

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[130/142] Creating: Removing an item from the Wishlist page required a manual re..."
gh issue create --title 'Removing an item from the Wishlist page required a manual refresh to disappear' --body 'no callback existed to update local list state on unwishlist; fixed by adding an `onWishlistChange` callback prop to `ProductCard` that filters the item out of the Wishlist page'"'"'s local state immediately

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[131/142] Creating: Login error message flashed for a fraction of a second then ..."
gh issue create --title 'Login error message flashed for a fraction of a second then disappeared, on every failed login attempt, across all browsers (Chrome and Safari)' --body 'extensive debugging ruled out browser password-manager autofill resubmission (reproduced with entirely unsaved/unknown credentials); true root cause found via Network tab showing a `Type: document` full-page navigation to `/login` immediately after the failed request — traced to a global Axios response interceptor that treated **any** `401` response as "session expired" and force-navigated to `/login` via `window.location.href`, including the `401` from the login endpoint itself failing on wrong credentials (which wiped all React state, including the just-set error message, via a hard page reload); fixed by excluding `/auth/login/` and `/auth/register/` from the interceptor'"'"'s 401-redirect logic

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[132/142] Creating: (Investigated, not a bug) Native <form> submission suspected..."
gh issue create --title '(Investigated, not a bug) Native <form> submission suspected as reload trigger' --body 'initial hypothesis was that the native `<form>` element combined with browser password-manager save prompts was causing a secondary native form submission; form was converted to a plain `<div>` with a button-click handler as a mitigation attempt, which did not resolve the issue on its own (the actual cause was the Axios interceptor above) — kept as the final implementation since it'"'"'s a reasonable defensive pattern regardless

**Epic:** BUGS (chronological, as encountered this sprint)
**Source:** Part 2 backlog' --label "bug"

echo "[133/142] Creating: Expand seed data from 13 to ~30 products (content pass)..."
gh issue create --title 'Expand seed data from 13 to ~30 products (content pass)' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[134/142] Creating: Move product images from hotlinked Unsplash to Cloudinary..."
gh issue create --title 'Move product images from hotlinked Unsplash to Cloudinary' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[135/142] Creating: Deploy backend to Railway..."
gh issue create --title 'Deploy backend to Railway' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[136/142] Creating: Deploy frontend to Vercel..."
gh issue create --title 'Deploy frontend to Vercel' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[137/142] Creating: Set up production Stripe webhook endpoint (replace local str..."
gh issue create --title 'Set up production Stripe webhook endpoint (replace local stripe listen forwarding)' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[138/142] Creating: Update CORS settings for deployed frontend domain..."
gh issue create --title 'Update CORS settings for deployed frontend domain' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[139/142] Creating: Update STRIPE_WEBHOOK_SECRET / env vars for production envir..."
gh issue create --title 'Update STRIPE_WEBHOOK_SECRET / env vars for production environment' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[140/142] Creating: *(Optional/unscoped)* Email delivery for password reset link..."
gh issue create --title '*(Optional/unscoped)* Email delivery for password reset links (currently surfaced directly in API response/UI rather than sent via email service)' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[141/142] Creating: *(Optional/unscoped)* Order confirmation emails..."
gh issue create --title '*(Optional/unscoped)* Order confirmation emails' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"

echo "[142/142] Creating: *(Optional/unscoped)* Recently viewed products..."
gh issue create --title '*(Optional/unscoped)* Recently viewed products' --body '
**Epic:** NOT YET STARTED (carried forward + new)
**Source:** Part 2 backlog' --label "backlog"
