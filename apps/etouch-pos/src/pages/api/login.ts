import type { APIRoute } from "astro";

const DEFAULT_PASSWORD = "etouch2024";

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
  const form = await request.formData();
  const password = form.get("password")?.toString().trim();

  if (!password) {
    return redirect("/login?error=1");
  }

  let storedPassword = DEFAULT_PASSWORD;
  try {
    const runtimeEnv = (locals as any).runtime?.env;
    const db = runtimeEnv?.DB;
    if (db) {
      const result = await db
        .prepare("SELECT value FROM settings WHERE key = 'password' LIMIT 1")
        .first();
      if (result?.value) storedPassword = result.value as string;
    }
  } catch {
    // D1 not available — use default
  }

  if (password !== storedPassword) {
    return redirect("/login?error=1");
  }

  const headers = new Headers({
    "Set-Cookie": `pos_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
    "Location": "https://etouch-pos.etouchcomputers.workers.dev/",
  });
  return new Response(null, { status: 302, headers });
};
