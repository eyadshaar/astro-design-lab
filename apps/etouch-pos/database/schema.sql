-- ============================================================
-- etouch-pos: D1 SQLite schema
-- ============================================================

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL UNIQUE,
  created_at  INTEGER DEFAULT (unixepoch())
);

-- Products / Inventory items
CREATE TABLE IF NOT EXISTS products (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  sku            TEXT UNIQUE,
  name           TEXT NOT NULL,
  description    TEXT DEFAULT '',
  category_id    INTEGER REFERENCES categories(id),
  cost_price     REAL NOT NULL DEFAULT 0,
  sell_price     REAL NOT NULL DEFAULT 0,
  stock_qty      INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  created_at     INTEGER DEFAULT (unixepoch()),
  updated_at     INTEGER DEFAULT (unixepoch())
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  phone      TEXT DEFAULT '',
  email      TEXT DEFAULT '',
  address    TEXT DEFAULT '',
  created_at INTEGER DEFAULT (unixepoch())
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_no  TEXT UNIQUE NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  status      TEXT DEFAULT 'draft' CHECK(status IN ('draft','sent','paid','cancelled')),
  subtotal    REAL NOT NULL DEFAULT 0,
  tax_rate    REAL DEFAULT 0,
  tax_amount  REAL DEFAULT 0,
  total       REAL NOT NULL DEFAULT 0,
  notes       TEXT DEFAULT '',
  created_at  INTEGER DEFAULT (unixepoch()),
  due_date    INTEGER
);

-- Invoice line items
CREATE TABLE IF NOT EXISTS invoice_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id  INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
  product_id  INTEGER REFERENCES products(id),
  description TEXT NOT NULL,
  qty         INTEGER NOT NULL DEFAULT 1,
  unit_price  REAL NOT NULL,
  total       REAL NOT NULL
);

-- Stock adjustment log
CREATE TABLE IF NOT EXISTS stock_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id  INTEGER REFERENCES products(id),
  delta       INTEGER NOT NULL,
  reason      TEXT DEFAULT '',
  created_at  INTEGER DEFAULT (unixepoch())
);

-- Settings (key-value store)
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);


-- Auth sessions (simple password-based login)
CREATE TABLE IF NOT EXISTS auth_sessions (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  password  TEXT NOT NULL,
  token     TEXT NOT NULL UNIQUE,
  label     TEXT DEFAULT 'Default',
  created_at INTEGER DEFAULT (unixepoch())
);

-- Default password: etouch2024  —  CHANGE THIS after first login!
INSERT OR IGNORE INTO auth_sessions (password, token, label) VALUES
  ('etouch2024', 'etouch-session-2024', 'Default');
-- Seed default categories
INSERT OR IGNORE INTO categories (name) VALUES
  ('GPUs'), ('CPUs'), ('RAM'), ('Storage'), ('Motherboards'),
  ('Power Supplies'), ('Peripherals'), ('Cables'), ('Networking'),
  ('Cases'), ('Cooling'), ('Monitors'), ('Accessories'), ('Other');

-- Seed default settings
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('shop_name', 'eTouch Computers'),
  ('shop_address', '123 Main St, City, State 12345'),
  ('shop_phone', '(555) 123-4567'),
  ('shop_email', 'info@etouchcomputers.com'),
  ('tax_rate', '6.25'),
  ('invoice_prefix', 'INV-'),
  ('next_invoice_no', '1001');
