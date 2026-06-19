import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const form = await request.formData();
  const password = form.get("password")?.toString().trim();

  if (!password) {
    return new Response(JSON.stringify({ error: "Password required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Try multiple ways to access D1 binding
    // 1. From ctx.locals.runtime.env (set by Cloudflare middleware)
    const runtimeEnv = (locals as any).runtime?.env;
    // 2. Direct env from ctx.locals
    const directEnv = (locals as any).env;
    // 3. From process.env (fallback)
    const processDb = (process.env as any).DB;

    // Pick whichever has the DB
    const db = runtimeEnv?.DB ?? directEnv?.DB ?? processDb;

    if (!db) {
      return new Response(JSON.stringify({
        error: "Database not configured",
        runtimeEnvKeys: runtimeEnv ? Object.keys(runtimeEnv) : [],
        directEnvKeys: directEnv ? Object.keys(directEnv) : [],
        processEnvKeys: Object.keys(process.env).filter((k: string) => k.includes('DB') || k.includes('D1')),
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db
      .prepare("SELECT value FROM settings WHERE key = 'password' LIMIT 1")
      .first();

    const storedHash = result?.value as string | undefined;

    if (!storedHash || password !== storedHash) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    cookies.set("pos_auth", "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
