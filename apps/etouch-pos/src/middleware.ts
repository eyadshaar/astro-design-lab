import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
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
