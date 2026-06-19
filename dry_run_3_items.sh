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

