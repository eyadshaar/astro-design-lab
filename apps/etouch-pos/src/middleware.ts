import { defineMiddleware } from "astro:middleware";

// In Cloudflare Pages, D1/KV bindings are available on globalThis
// We must inject them into runtime.env BEFORE the auth check runs
function getD1Env(): Record<string, any> {
  // Cloudflare Pages binds D1/KV/etc on globalThis as named properties
  const env: Record<string, any> = {};
  // DB is the D1 binding name from wrangler.toml
  if (typeof (globalThis as any).DB !== 'undefined') {
    env.DB = (globalThis as any).DB;
  }
  return env;
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Inject actual Cloudflare bindings into runtime.env
  // This runs BEFORE the auth middleware and fixes the process.env=[] issue
  if (!(context.locals as any).runtime) {
    (context.locals as any).runtime = {};
  }
  if (!(context.locals as any).runtime.env || Object.keys((context.locals as any).runtime.env).length === 0) {
    (context.locals as any).runtime.env = getD1Env();
  }

  const { pathname } = context.url;

  if (
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_astro") ||
    pathname.startsWith("/favicon")
  ) {
    return next();
  }

  const session = context.cookies.get("etouch_session")?.value;
  if (!session) {
    return context.redirect("/login");
  }

  try {
    const db = (context.locals as any).runtime?.env?.DB;
    if (db) {
      const row = await db
        .prepare("SELECT 1 FROM auth_sessions WHERE token = ?")
        .bind(session)
        .first();
      if (!row) {
        context.cookies.delete("etouch_session", { path: "/" });
        return context.redirect("/login");
      }
    }
  } catch(e) {}

  return next();
});
