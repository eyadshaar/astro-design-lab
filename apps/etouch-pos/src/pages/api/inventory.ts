import type { APIRoute } from "astro";
import type { D1Database } from "@cloudflare/workers-types";

export const POST: APIRoute = async ({ request, env, redirect }) => {
  const DB = env.DB as D1Database;
  const form = await request.formData();
  const action = String(form.get("action") || "");
  const id = new URL(request.url).searchParams.get("id");
  const now = Math.floor(Date.now() / 1000);

  if (action === "create") {
    const name = String(form.get("name") || "");
    const sku = String(form.get("sku") || "");
    const category_id = form.get("category_id") ? parseInt(String(form.get("category_id"))) : null;
    const description = String(form.get("description") || "");
    const cost_price = parseFloat(String(form.get("cost_price") || "0")) || 0;
    const sell_price = parseFloat(String(form.get("sell_price") || "0")) || 0;
    const stock_qty = parseInt(String(form.get("stock_qty") || "0")) || 0;
    const low_stock_threshold = parseInt(String(form.get("low_stock_threshold") || "5")) || 5;
    const result = await DB.prepare(
      "INSERT INTO products (sku,name,description,category_id,cost_price,sell_price,stock_qty,low_stock_threshold,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)"
    ).bind(sku || null, name, description, category_id || null, cost_price, sell_price, stock_qty, low_stock_threshold, now, now).run();
    return redirect("/inventory/" + result.meta?.last_row_id + "?created=1");
  }

  if (action === "update" && id) {
    const name = String(form.get("name") || "");
    const sku = String(form.get("sku") || "");
    const category_id = form.get("category_id") ? parseInt(String(form.get("category_id"))) : null;
    const description = String(form.get("description") || "");
    const cost_price = parseFloat(String(form.get("cost_price") || "0")) || 0;
    const sell_price = parseFloat(String(form.get("sell_price") || "0")) || 0;
    const low_stock_threshold = parseInt(String(form.get("low_stock_threshold") || "5")) || 5;
    await DB.prepare(
      "UPDATE products SET sku=?,name=?,description=?,category_id=?,cost_price=?,sell_price=?,low_stock_threshold=?,updated_at=? WHERE id=?"
    ).bind(sku || null, name, description, category_id || null, cost_price, sell_price, low_stock_threshold, now, parseInt(id)).run();
    return redirect("/inventory/" + id + "?updated=1");
  }

  if (action === "adjust_stock" && id) {
    const delta = parseInt(String(form.get("delta") || "0")) || 0;
    const reason = String(form.get("reason") || "");
    if (delta !== 0) {
      await DB.prepare("UPDATE products SET stock_qty = stock_qty + ?, updated_at=? WHERE id=?").bind(delta, now, parseInt(id)).run();
      await DB.prepare("INSERT INTO stock_log (product_id,delta,reason,created_at) VALUES (?,?,?,?)").bind(parseInt(id), delta, reason, now).run();
    }
    return redirect("/inventory/" + id);
  }

  if (action === "delete" && id) {
    await DB.prepare("DELETE FROM products WHERE id=?").bind(parseInt(id)).run();
    return redirect("/inventory?deleted=1");
  }

  return redirect("/inventory");
};
