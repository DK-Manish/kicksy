#!/bin/bash
set -e

echo "[1/11] Creating epic placeholder issue..."
gh issue create --title "EPIC 16: Guest Checkout" --body "Allow customers to browse, add to cart, and complete checkout without creating an account. Currently the cart and order creation endpoints require authentication (IsAuthenticated), which forces account creation before purchase — a common source of cart abandonment in real e-commerce.

This epic tracks the full scope: backend model changes (nullable user on Cart/Order), session-based guest cart tracking, permission changes on checkout endpoints, and frontend updates to skip the login requirement." --label "epic" --label "backend" --label "frontend" --label "cart" --label "orders"

echo "[2/11] Creating story 1..."
gh issue create --title "As a guest, I can browse products and view product details without logging in" --body "This already works today — product list, detail, search, and filter endpoints use AllowAny permissions. No changes needed; tracked here for epic completeness." --label "frontend" --label "products"

echo "[3/11] Creating story 2..."
gh issue create --title "As a guest, I can add items to a cart without an account" --body "Cart currently requires an authenticated user (Cart.objects.get(user=request.user)). Needs a session-based or anonymous identifier (e.g. a guest_id stored in a cookie or localStorage) so a cart can exist and persist without a logged-in user." --label "backend" --label "cart"

echo "[4/11] Creating story 3..."
gh issue create --title "As a guest, I can view and modify my guest cart" --body "Update quantity, remove items, clear cart — all existing cart endpoints need to support the guest_id-based lookup path alongside the existing user-based path." --label "backend" --label "cart"

echo "[5/11] Creating story 4..."
gh issue create --title "As a guest, I can complete checkout without creating an account" --body "Enter shipping address, pay via Stripe, and receive a confirmed order — without ever logging in or registering." --label "backend" --label "frontend" --label "orders" --label "payments"

echo "[6/11] Creating story 5..."
gh issue create --title "As a guest, I receive an order confirmation even without an account" --body "Order model already captures email, full_name, and shipping address directly on the Order at checkout time, which helps here — a guest should be able to see their order confirmation page immediately after payment, identified by order_number rather than requiring login to view /orders." --label "backend" --label "frontend" --label "orders"

echo "[7/11] Creating story 6..."
gh issue create --title "As a guest, I am offered the option to create an account after checkout" --body "Optional but common e-commerce pattern: post-purchase prompt to register using the email/details already captured, so the guest can save their order history going forward. Should not be required." --label "frontend" --label "auth"

echo "[8/11] Creating backend task 1..."
gh issue create --title "Extend Cart model to support nullable user + session-based guest_id" --body "Add a guest_id field (or similar) to the Cart model, make user nullable, and update cart lookup logic across all cart views to branch on whether the request is authenticated or guest." --label "backend" --label "cart"

echo "[9/11] Creating backend task 2..."
gh issue create --title "Extend Order model to support nullable user for guest orders" --body "Order already stores full_name, email, phone, and address directly (snapshotted at checkout), which reduces the blast radius of this change. Mainly need user to become nullable and order lookup/display logic to handle a null user case correctly (e.g. in Django admin, and the order detail view)." --label "backend" --label "orders"

echo "[10/11] Creating backend task 3..."
gh issue create --title "Update CreateOrderView and CreatePaymentIntentView permissions from IsAuthenticated to AllowAny" --body "Requires careful handling: these views currently assume request.user exists. Needs conditional logic to branch between authenticated and guest flows, including correctly associating orders with guest_id where relevant." --label "backend" --label "orders" --label "payments"

echo "[11/11] Creating frontend task..."
gh issue create --title "Update CartContext and Checkout page to support guest flow" --body "CartContext currently refetches on auth change and likely assumes a logged-in user for cart persistence. Checkout page needs to stop redirecting unauthenticated users to /login. Need a guest_id generated and persisted (e.g. localStorage) on first cart interaction." --label "frontend" --label "cart" --label "orders"

echo ""
echo "Done. Created 11 issues for Guest Checkout epic."
