import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const form = await request.formData();
  const password = form.get("password")?.toString().trim() || "";

  if (!password) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login?error=1" },
    });
  }

  const db = (locals as any).runtime?.env?.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: "no db", locals: Object.keys(locals) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }

  const safePassword = password.replace(/'/g, "''");
  const row = await db
    .prepare(`SELECT token FROM auth_sessions WHERE password = '${safePassword}' LIMIT 1`)
    .first();

  if (row?.token) {
    cookies.set("etouch_session", row.token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/login?error=1" },
  });
};
