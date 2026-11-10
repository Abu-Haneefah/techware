# Techware: Database Design Agent Prompt

Copy everything below this line into your coding agent.

---

## ROLE

You are a senior database engineer specializing in **Supabase (PostgreSQL)**. Design and implement the complete database for **Techware**, a Nigerian multi-vendor e-commerce marketplace for laptops and tech accessories. The backend is **NestJS**, the frontend is **Next.js**, and auth is **Supabase Auth with Google OAuth**. Work in the steps below and stop for my approval after each step.

## 1. BUSINESS CONTEXT

- Techware sells laptops (Dell, Lenovo, HP and others) and accessories (keyboards, mice, chargers, phone cases, earbuds and more). All prices are in **Nigerian naira (NGN)**.
- It is a **marketplace**: Techware can sell its own products and approved **vendors** can sell too.
- Three roles: **customer**, **vendor**, **super_admin**.
- Customers sign in with Google, browse products, use a **wishlist**, a **cart** and **buy later (saved for later)**, check out, and can request returns.
- Vendors go through a **multi-step registration** (personal details, company details, CAC registration and licenses). A super admin must **approve the vendor**. Approved vendors upload products with price, description, specifications, images and an optional 3D model. **Every product must be approved by a super admin before it appears on the marketplace.**
- The super admin needs full statistics: total customers, customer details, total vendors, **products sold per vendor, returned products per vendor, and product quality per vendor**.
- Every product can have a 3D model (GLB file).

## 2. TECHNICAL REQUIREMENTS

- Deliver everything as **ordered SQL migrations** in `supabase/migrations/` that run cleanly on a fresh Supabase project, plus `supabase/seed.sql`.
- Use **UUID primary keys** (`gen_random_uuid()`), `timestamptz` timestamps, `created_at` and `updated_at` on all tables (with an `updated_at` trigger).
- Use **Postgres enums** (or check constraints) for statuses.
- Store money as **integer kobo** (1 naira = 100 kobo) or `numeric(12,2)`; choose one, document it and use it everywhere.
- Add proper **foreign keys, unique constraints, check constraints, and indexes** (including full-text search on products).
- Enable **Row Level Security (RLS) on every table** with explicit policies. No table may be left open.
- Use `security definer` functions carefully, with a fixed `search_path`.
- Never expose sensitive vendor documents or personal data publicly.

## 3. TABLES TO DESIGN

Design columns, types, constraints and indexes for at least:

**Identity and roles**
- `profiles` (id = `auth.users.id`, full_name, email, avatar_url, phone, role, is_active, created_at)
- `addresses` (user_id, label, recipient, phone, street, city, state, country, is_default)

**Vendors**
- `vendors` (profile_id, status: draft/pending/approved/rejected/suspended, rejection_reason, reviewed_by, reviewed_at)
- `vendor_personal_details` (full name, phone, email, address, identification type and number)
- `vendor_companies` (company name, address, city, state, phone, email, business type, description, website, social links, CAC number)
- `vendor_documents` (vendor_id, type: cac_certificate/license/id/other, storage_path, status, uploaded_at)
- Registration **step progress** so a vendor can save and continue later.

**Catalog**
- `categories` (hierarchical), `brands`
- `products` (vendor_id nullable for Techware-owned items, category, brand, title, slug unique, description, specifications as `jsonb`, price, compare_at_price, stock_quantity, condition: new/open_box/refurbished, warranty_info, status: draft/pending/approved/rejected/archived, rejection_reason, model_3d_path, search vector, approved_by, approved_at)
- `product_images`, `product_variants` (optional: color, storage, RAM), `product_status_history`

**Shopping**
- `wishlist_items`, `cart_items`, `saved_for_later_items` (unique per user and product; quantity checks)

**Orders**
- `orders` (user_id, status, subtotal, delivery_fee, discount, total, payment_status, payment_provider, payment_reference unique, delivery_address snapshot, timestamps)
- `order_items` (order_id, product_id, vendor_id, title snapshot, unit_price snapshot, quantity, status)
- `payments` (order_id, provider, reference, amount, status, raw webhook payload, verified_at)
- `delivery_zones` (state/city, fee, estimated days)
- `returns` (order_item_id, user_id, reason, status: requested/approved/rejected/received/refunded, resolution notes)

**Quality and operations**
- `reviews` (product_id, user_id, order_item_id, rating 1 to 5, comment; one review per purchase)
- `vendor_commissions` (platform commission settings, per vendor or global)
- `notifications`, `audit_logs` (actor, action, entity, entity_id, metadata, ip)
- `platform_settings`

## 4. LOGIC TO IMPLEMENT IN THE DATABASE

1. **New user trigger:** when a user signs in with Google for the first time, create a `profiles` row with role `customer`.
2. **Role protection:** a user must never be able to change their own role. Only a super admin can.
3. **Product approval flow:** vendor creates or edits a product, status becomes `pending`. Only a super admin can set `approved` or `rejected`. Log every change in `product_status_history`. If a vendor edits an approved product's key fields (price, title, description, specs), it returns to `pending` (document the rule).
4. **Vendor approval flow:** only approved vendors can create products. Suspending a vendor hides all their products from the marketplace.
5. **Stock handling:** a function that safely reduces stock when an order is paid (prevents overselling, handles concurrent orders with row locks) and restores it on cancel or approved return.
6. **Checkout function:** create an order from the cart in one transaction, snapshotting prices and addresses.
7. **Rating aggregates:** keep average rating and review count per product (and per vendor) up to date via trigger or materialized view.
8. **Search:** full-text search on product title, description and brand, plus filter indexes (category, brand, price, condition, status).

## 5. ROW LEVEL SECURITY (RLS) MODEL

Write policies and tests for:

| Data | Public | Customer | Vendor | Super admin |
|---|---|---|---|---|
| Approved products from approved vendors | read | read | read | all |
| Own wishlist, cart, saved-for-later, addresses | none | full on own rows | own rows | read |
| Own orders and returns | none | read own, create via function | read order items for own products | all |
| Vendor profile, company details and documents | none | none | read and edit own (documents private) | all |
| Own products (any status) | none | none | create, edit, read own | all |
| Approving products and vendors | none | none | none | yes |
| Reviews | read | create for purchased items | read | all |
| Audit logs, platform settings | none | none | none | read/write |

Create helper functions such as `is_super_admin()`, `is_vendor()`, `current_vendor_id()` for use in policies.

## 6. STORAGE BUCKETS AND POLICIES

- `product-images` (public read, vendor write only to own folder)
- `product-models` (public read for approved products, vendor write to own folder, **GLB only, size limit 10 MB**)
- `vendor-documents` (**private**: only the owning vendor and super admin can read)
- `avatars` (public read, owner write)
Define folder conventions such as `{vendor_id}/{product_id}/...` and write the storage policies in SQL.

## 7. ADMIN STATISTICS (views or functions, accessible only to super admin)

Provide views or RPC functions for:
- Total customers, total vendors (by status), total products (by status), total orders, revenue, by date range.
- **Customer list** with full details, order count and total spent.
- **Per vendor:** products listed, products sold (units and revenue), orders, returned items and **return rate**, average rating, review count, **approval and rejection rate of their products**, and a simple **quality score** (document the formula).
- Top-selling products, low-stock products, pending approvals count.
- Daily and monthly sales series for charts.

## 8. DELIVERABLES

1. SQL migrations (ordered and well-commented), seed data and a `reset` script.
2. An **entity relationship diagram** in Mermaid (`docs/erd.md`).
3. `docs/database.md` explaining tables, enums, money convention, status flows and RLS rules.
4. **RLS tests** (pgTAP or SQL scripts) proving: a customer cannot read another customer's cart or orders; a vendor cannot see another vendor's data; a vendor cannot approve their own product or change their role; unapproved products are not publicly visible; only the super admin can read vendor documents and admin statistics.
5. Generated **TypeScript types** (`supabase gen types`) into `packages/shared`.
6. **Seed data:** one super admin (via a documented secure script), sample vendors (approved, pending, rejected), brands (Dell, Lenovo, HP, plus accessory brands), categories, 30+ realistic products in naira with specifications, sample orders, returns and reviews so the dashboards have data.

## 9. WORKING STEPS

1. **Step 1:** present the full schema plan (tables, enums, relationships, money convention, status flows) and the RLS plan. Wait for approval.
2. **Step 2:** write migrations for identity, vendors, catalog and storage, with RLS and tests.
3. **Step 3:** write shopping, orders, payments, returns and reviews, with functions and RLS tests.
4. **Step 4:** write admin statistics views, indexes and performance checks.
5. **Step 5:** seed data, ERD, documentation and generated types, then a final report.

At each step, show what was created, how to run it, test results, and known gaps.

## 10. START NOW

Begin with **Step 1**.
