import { defineMiddleware } from "astro:middleware";

// Cloudflare injects bindings into globalThis.runtime.env
// This is set by the Cloudflare server entrypoint before rendering
function getCloudflareEnv(): Record<string, any> {
  const cfRuntime = (globalThis as any).runtime;
  if (cfRuntime?.env) {
    return cfRuntime.env;
  }
  // Fallback: check if Cloudflare bindings are directly on globalThis
  // (some Cloudflare environments expose them this way)
  return (globalThis as any);
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Inject Cloudflare env with D1 bindings into context.locals
  // This makes env.DB available to API routes via ctx.locals.runtime.env.DB
  if (!(context.locals as any).runtime) {
    (context.locals as any).runtime = {};
  }
  const existingEnv = (context.locals as any).runtime.env;
  if (!existingEnv || Object.keys(existingEnv).length === 0) {
    (context.locals as any).runtime.env = getCloudflareEnv();
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

  const session = context.cookies.get("pos_auth")?.value;
  if (!session) {
    return context.redirect("/login");
  }

  if (!session || session !== "1") {
    context.cookies.delete("pos_auth", { path: "/" });
    return context.redirect("/login");
  }

  return next();
});
