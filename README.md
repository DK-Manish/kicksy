# Kicksy 👟

A full-stack sneaker e-commerce store built as a portfolio and learning project. Kicksy demonstrates a production-grade web application with a Django REST Framework backend, React/Vite frontend, PostgreSQL database, Stripe test-mode payments, and Cloudinary image hosting all deployed and live.

**[kicksy-seven.vercel.app](https://kicksy-seven.vercel.app)**

---

## Tech Stack

**Backend**
- Django 6 + Django REST Framework
- PostgreSQL (hosted on Railway)
- SimpleJWT — access/refresh token auth
- Stripe Python SDK — payment processing
- Cloudinary — product image hosting
- Gunicorn — production WSGI server

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Axios (JWT interceptors + guest ID header injection)
- Stripe Elements (`@stripe/react-stripe-js`)
- React Router v6

**Infrastructure**
- Railway — backend hosting + managed PostgreSQL
- Vercel — frontend hosting
- Cloudinary — image CDN
- Stripe (test mode) — payments
- GitHub — version control + project board

---

## Features

### Authentication
- Register, login, logout with JWT (access + refresh tokens)
- Auto token refresh via Axios interceptor
- Forgot password flow (token-based)
- Role-based access: customer vs admin

### Product Catalogue
- Category, brand, gender, price, size, and sale filtering
- Dynamic facet counts that update as filters change
- Search, sorting, and pagination
- Featured, new arrivals, and limited drops sections on the homepage
- Related products on the product detail page

### Cart
- Add, update, remove, and clear cart items
- Stock validation - cannot exceed available stock
- Live cart count and subtotal in the navbar
- Free shipping over £60
- Guest cart support via `X-Guest-Id` UUID header

### Checkout & Orders
- Two-step checkout: shipping address → Stripe payment
- Stripe Elements (PaymentElement) supporting card, Klarna, Revolut Pay, and more
- Stripe webhook handler — order status flips Pending → Confirmed on `payment_intent.succeeded`
- Order history and order detail pages
- Order cancellation for pending and confirmed orders
- Full guest checkout — complete flow without an account

### Reviews & Wishlist
- Leave a review (rating, title, body) on any product
- Verified purchase badge auto-detected from order history
- Wishlist toggle from product cards and product detail page
- Dedicated wishlist page with instant removal

### Account Management
- Tabbed account page: Profile / Password / Addresses
- View, add, set default, and remove saved addresses
- Change password with current-password verification

### Admin Dashboard (React)
- Route-guarded to admin role only
- View all orders, filter by status, update order status inline
- Full product CRUD with images and size/stock variants

---

## Guest Checkout Architecture

One of the more significant features: a full browse → cart → checkout → payment flow requiring no account.

**Backend**
- `Cart.user` made nullable; `guest_id` (UUID) field added with a `CheckConstraint` ensuring exactly one of `user`/`guest_id` is always set
- Shared `get_or_create_cart()` helper branches on authenticated vs guest via `X-Guest-Id` request header
- `CORS_ALLOW_HEADERS` explicitly includes `x-guest-id` in both dev and prod settings

**Frontend**
- `utils/guestId.js` generates and persists a UUID in `localStorage`
- Axios interceptor automatically attaches `X-Guest-Id` when no auth token is present
- `CartContext` no longer blocks cart fetching for unauthenticated users

---

## Local Development

**Prerequisites:** Python 3.12, Node.js + npm, PostgreSQL, pipenv

### Backend

```bash
cd backend
pipenv install
pipenv shell
```

Create `backend/.env`:

```
SECRET_KEY=<your-django-secret-key>
DEBUG=True
DB_NAME=kicksy_db
DB_USER=<your-postgres-user>
DB_PASSWORD=<your-postgres-password>
DB_HOST=localhost
DB_PORT=5432
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
STRIPE_SECRET_KEY=<your-stripe-test-secret-key>
STRIPE_WEBHOOK_SECRET=<your-local-stripe-webhook-secret>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
FRONTEND_URL=http://localhost:5173
```

```bash
python manage.py migrate
python manage.py seed_products
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` — backend at `http://localhost:8000`.

### Stripe Webhook Forwarding (for local payment testing)

```bash
stripe listen --forward-to localhost:8000/api/payments/webhook/
```

Copy the signing secret printed in the terminal and set it as `STRIPE_WEBHOOK_SECRET` in `backend/.env`, then restart Django.

---

## Deployment

Both Railway and Vercel are connected to this repo and auto-deploy on every push to `main`.

**Backend (Railway)**
- Root directory: `/backend`
- Start command: `gunicorn config.wsgi --bind 0.0.0.0:$PORT`
- `DJANGO_SETTINGS_MODULE` must be explicitly set to `config.settings.prod` as a Railway env var

**Frontend (Vercel)**
- Root directory: `/frontend`
- `VITE_API_URL` must be set to `https://kicksy-production.up.railway.app/api`
- Vite bakes env vars at build time — always trigger a fresh redeploy after changing them

---

## Test Card

Stripe is in test mode — no real payments are processed.

```
Card number:  4242 4242 4242 4242
Expiry:       Any future date (e.g. 12/28)
CVC:          Any 3 digits (e.g. 123)
```

---

## Key File Locations

| Area | Path |
|---|---|
| Backend settings | `backend/config/settings/base.py`, `dev.py`, `prod.py` |
| Cart model & views | `backend/apps/cart/models.py`, `views.py` |
| Orders views | `backend/apps/orders/views.py` |
| Payments views | `backend/apps/payments/views.py` |
| Product serializers | `backend/apps/products/serializers.py` |
| Guest ID utility | `frontend/src/utils/guestId.js` |
| Axios config | `frontend/src/api/axios.js` |
| Cart context | `frontend/src/context/CartContext.jsx` |
| Admin pages | `frontend/src/pages/admin/` |

---

## Notable Bugs Fixed

- **Login redirect loop** — global 401 interceptor was force-redirecting on wrong-password attempts at `/auth/login/`; fixed by excluding auth endpoints from redirect logic
- **Stripe webhook 500** — `intent['metadata'].get('order_number')` failed because the Stripe SDK returns a `StripeObject`, not a dict; fixed with attribute-style access
- **Navbar dropdown closing early** — CSS `mt-2` gap between trigger and menu caused hover to break; fixed by switching to `top-full`
- **SKU uniqueness on edit** — DRF auto-generated uniqueness validators fired before delete-then-recreate logic on variant update; fixed by setting `validators=[]` on `ProductVariantWriteSerializer`
- **Image URLs truncated** — `ProductImage.image` had `max_length=100`; Cloudinary URLs exceed that; widened to `max_length=500`
- **Django 6 `CheckConstraint`** — the `check` parameter was renamed to `condition` in Django 6
- **CORS blocking `X-Guest-Id`** — custom headers not in the corsheaders default whitelist; required explicit `CORS_ALLOW_HEADERS` in settings

---

> Kicksy is a portfolio/learning project. Stripe is in test mode — no real payments are ever processed.