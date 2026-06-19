import type { APIRoute } from "astro";
import type { D1Database } from "@cloudflare/workers-types";

export const GET: APIRoute = async ({ request, locals }) => {
  const db = (locals as any).runtime?.env?.DB as D1Database;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const search = url.searchParams.get("search") || "";

  if (id) {
    const row = await db.prepare("SELECT * FROM vendors WHERE id=?").bind(parseInt(id)).first();
    return new Response(JSON.stringify(row), { headers: { "Content-Type": "application/json" } });
  }

  let query = "SELECT * FROM vendors";
  const params: any[] = [];
  if (search) {
    query += " WHERE name LIKE ? OR contact_person LIKE ? OR phone LIKE ? OR email LIKE ?";
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  query += " ORDER BY name";

  const result = await db.prepare(query).bind(...params).all();
  return new Response(JSON.stringify(result.results || []), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const db = (locals as any).runtime?.env?.DB as D1Database;
  const form = await request.formData();
  const action = String(form.get("action") || "");
  const id = new URL(request.url).searchParams.get("id");
  const now = Math.floor(Date.now() / 1000);

  if (action === "create") {
    const name = String(form.get("name") || "").trim();
    const contact_person = String(form.get("contact_person") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    if (!name) return redirect("/vendors/new?error=Name+required");
    const result = await db.prepare(
      "INSERT INTO vendors (name, contact_person, phone, email, address, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(name, contact_person || null, phone || null, email || null, address || null, notes || null, now).run();
    return redirect("/vendors/" + result.meta?.last_row_id + "?created=1");
  }

  if (action === "update" && id) {
    const name = String(form.get("name") || "").trim();
    const contact_person = String(form.get("contact_person") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    const notes = String(form.get("notes") || "").trim();
    if (!name) return redirect("/vendors/" + id + "?error=Name+required");
    await db.prepare(
      "UPDATE vendors SET name=?, contact_person=?, phone=?, email=?, address=?, notes=? WHERE id=?"
    ).bind(name, contact_person || null, phone || null, email || null, address || null, notes || null, parseInt(id)).run();
    return redirect("/vendors/" + id + "?updated=1");
  }

  if (action === "delete" && id) {
    await db.prepare("DELETE FROM vendors WHERE id=?").bind(parseInt(id)).run();
    return redirect("/vendors?deleted=1");
  }

  return redirect("/vendors");
};
