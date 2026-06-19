import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  const db = (locals as any).runtime?.env?.DB;
  if (!db) return new Response(JSON.stringify({ error: "DB not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const search = url.searchParams.get("search") || "";

  if (id) {
    const row = await db.prepare("SELECT * FROM customers WHERE id=?").bind(parseInt(id)).first();
    return new Response(JSON.stringify(row), { headers: { "Content-Type": "application/json" } });
  }

  let query = "SELECT * FROM customers";
  const params: any[] = [];
  if (search) {
    query += " WHERE name LIKE ? OR phone LIKE ? OR email LIKE ?";
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  query += " ORDER BY name";

  const result = await db.prepare(query).bind(...params).all();
  return new Response(JSON.stringify(result.results || []), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const db = (locals as any).runtime?.env?.DB;
  if (!db) return new Response(JSON.stringify({ error: "DB not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  const form = await request.formData();
  const action = String(form.get("action") || "");
  const id = new URL(request.url).searchParams.get("id");
  const now = Math.floor(Date.now() / 1000);

  if (action === "create") {
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    if (!name) return redirect("/customers/new?error=Name+required");
    const result = await db.prepare(
      "INSERT INTO customers (name, phone, email, address, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, phone || null, email || null, address || null, now).run();
    return redirect("/customers/" + result.meta?.last_row_id + "?created=1");
  }

  if (action === "update" && id) {
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    if (!name) return redirect("/customers/" + id + "?error=Name+required");
    await db.prepare(
      "UPDATE customers SET name=?, phone=?, email=?, address=? WHERE id=?"
    ).bind(name, phone || null, email || null, address || null, parseInt(id)).run();
    return redirect("/customers/" + id + "?updated=1");
  }

  if (action === "delete" && id) {
    await db.prepare("DELETE FROM customers WHERE id=?").bind(parseInt(id)).run();
    return redirect("/customers?deleted=1");
  }

  return redirect("/customers");
};
