import type { APIRoute } from 'astro';
import type { D1Database } from '@cloudflare/workers-types';

export const POST: APIRoute = async ({ request, env, redirect }) => {
  const DB: D1Database = env.DB;
  const form = await request.formData();
  const action = String(form.get('action') || '');

  if (action === 'create') {
    const invoice_no  = String(form.get('invoice_no') || '');
    const customer_id = form.get('customer_id') ? parseInt(String(form.get('customer_id'))) : null;
    const status      = String(form.get('status') || 'draft');
    const tax_rate    = parseFloat(String(form.get('tax_rate') || '0')) || 0;
    const notes       = String(form.get('notes') || '');
    const due_date    = form.get('due_date')
                          ? Math.floor(new Date(String(form.get('due_date'))).getTime() / 1000)
                          : null;
    const descs: string[] = form.getAll('item_desc[]').map(String);
    const qtys: number[]   = form.getAll('item_qty[]').map(v => parseFloat(String(v)) || 0);
    const prices: number[] = form.getAll('item_price[]').map(v => parseFloat(String(v)) || 0);
    const product_ids: (string)[] = form.getAll('item_product_id[]').map(String);

    let subtotal = 0;
    for (let i = 0; i < descs.length; i++) {
      subtotal += (qtys[i] || 0) * (prices[i] || 0);
    }
    const tax_amount = subtotal * (tax_rate / 100);
    const total      = subtotal + tax_amount;

    const prefixRow = await DB.prepare("SELECT value FROM settings WHERE key='invoice_prefix'").first<{value:string}>();
    const nextRow    = await DB.prepare("SELECT value FROM settings WHERE key='next_invoice_no'").first<{value:string}>();
    const prefix = prefixRow?.value || 'INV-';
    let nextNo   = parseInt(nextRow?.value || '1000');
    const usedNo = invoice_no || (prefix + nextNo);

    const result = await DB.prepare(`
      INSERT INTO invoices (invoice_no, customer_id, status, subtotal, tax_rate, tax_amount, total, notes, due_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(usedNo, customer_id || null, status, subtotal, tax_rate, tax_amount, total, notes, due_date || null, Math.floor(Date.now() / 1000)).run();

    const invoice_id = result.meta?.last_row_id;

    for (let i = 0; i < descs.length; i++) {
      if (!descs[i]?.trim()) continue;
      const rowTotal = (qtys[i] || 0) * (prices[i] || 0);
      const prodId = product_ids[i] && product_ids[i] !== '' ? parseInt(product_ids[i]) : null;
      await DB.prepare(`
        INSERT INTO invoice_items (invoice_id, product_id, description, qty, unit_price, total)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(invoice_id, prodId, descs[i], qtys[i] || 1, prices[i] || 0, rowTotal).run();
      if (prodId) {
        await DB.prepare('UPDATE products SET stock_qty = stock_qty - ? WHERE id = ?').bind(qtys[i] || 1, prodId).run();
        await DB.prepare('INSERT INTO stock_log (product_id, delta, reason) VALUES (?, ?, ?)').bind(prodId, -(qtys[i] || 1), `Invoice ${usedNo}`).run();
      }
    }
    if (!invoice_no) {
      await DB.prepare("UPDATE settings SET value=? WHERE key='next_invoice_no'").bind(String(nextNo + 1)).run();
    }
    return redirect(`/invoices/${invoice_id}?created=1`);
  }

  return new Response('Not found', { status: 404 });
};

export const GET: APIRoute = async ({ request, env }) => {
  const url  = new URL(request.url);
  const id   = url.searchParams.get('id');
  const action = url.searchParams.get('action');

  if (action === 'update_status' && id) {
    const form   = await request.formData();
    const status = String(form.get('status') || '');
    await env.DB.prepare('UPDATE invoices SET status=? WHERE id=?').bind(status, parseInt(id)).run();
    return redirect(`/invoices/${id}`);
  }
  return redirect('/invoices');
};
