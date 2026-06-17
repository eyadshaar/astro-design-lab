# etouchPOS — Invoicing & Inventory for Etouch Computers

## Quick Start

```bash
# 1. Navigate to the app
cd apps/etouch-pos

# 2. Install dependencies
npm install

# 3. Create the D1 database locally
npx wrangler d1 create etouch-pos-db
# Copy the database_id into wrangler.toml (replace ETOUCH_POS_DB_ID_PLACEHOLDER)

# 4. Run the schema
npx wrangler d1 execute etouch-pos-db --local --file=database/schema.sql

# 5. Start dev server
npm run dev
# Opens at http://localhost:4321
```

## Deploying to Cloudflare Pages

```bash
# 1. Create the D1 database in the cloud
npx wrangler d1 create etouch-pos-db
# Copy the database_id into wrangler.toml (replace ETOUCH_POS_DB_ID_PLACEHOLDER)

# 2. Run the schema in the cloud
npx wrangler d1 execute etouch-pos-db --remote --file=database/schema.sql

# 3. Build and deploy
npm run build
npx wrangler pages deploy dist/client --project-name=etouch-pos
```

## Features

- **Invoices**: Create, edit, print (Draft / Sent / Paid tracking)
- **Inventory**: Products with cost/sell price, stock qty, low-stock alerts
- **Categories**: Organize inventory by type
- **Settings**: Shop name, tax rate, invoice prefix/number

## Database Schema

Tables: products, invoices, invoice_items, customers, categories, stock_log, settings
