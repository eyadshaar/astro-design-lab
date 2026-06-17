# etouchPOS — Invoicing & Inventory for Etouch Computers

A full-stack web app for managing invoices and inventory, built with Astro + Cloudflare D1 (SQLite).

**Live:** https://etouch-pos.etouchcomputers.workers.dev/

## Stack
- **Astro** (SSR mode) + **Cloudflare Workers**
- **Cloudflare D1** (SQLite database)
- **Wrangler** for deployment

---

## Setup (first time only)

```bash
# 1. Go to the app
cd apps/etouch-pos

# 2. Install dependencies
npm install

# 3. Create D1 database in the cloud
npx wrangler d1 create etouch-pos-db
# -> copy the database_id into wrangler.toml (replace ETOUCH_POS_DB_ID_PLACEHOLDER)

# 4. Push the schema (creates tables + seed data)
npx wrangler d1 execute etouch-pos-db --remote --file=database/schema.sql

# 5. Build & deploy as a Cloudflare Worker
npm run build && npx wrangler deploy
```

After step 3, edit `wrangler.toml` and replace `ETOUCH_POS_DB_ID_PLACEHOLDER` with the actual database ID shown.

---

## Deploy after changes

```bash
cd apps/etouch-pos
npm run build && npx wrangler deploy
```

---

## Features

### Invoices
- Create invoices with line items, auto-calculate tax and totals
- Status workflow: Draft → Sent → Paid (or Cancelled)
- Printable invoice view
- Customer selection

### Inventory
- Add products with SKU, cost price, sell price, stock qty, category
- Low-stock alerts when qty falls below threshold
- Stock adjustment history with reason tracking
- Filter by category, stock level, or search term
- Margin indicator per product

### Settings (in D1 database)
- Shop name, address, phone, email
- Tax rate (default 6.25%)
- Invoice prefix and next invoice number
- Categories (seeded with 14 common PC hardware categories)

---

## Database Schema

Tables: `categories`, `products`, `customers`, `invoices`, `invoice_items`, `stock_log`, `settings`

Schema file: `database/schema.sql`

---

## Customizing Settings

Access your D1 database via:
```bash
npx wrangler d1 execute etouch-pos-db --remote --command "SELECT * FROM settings"
```

Update settings with:
```bash
npx wrangler d1 execute etouch-pos-db --remote --command "UPDATE settings SET value='Your Shop Name' WHERE key='shop_name'"
```
