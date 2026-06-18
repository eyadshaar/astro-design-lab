import type { APIRoute } from "astro";

// Use the CF D1 REST API directly via fetch — bypasses env binding issues
// Account ID and D1 DB ID are hardcoded here (available in Cloudflare dashboard)
const CF_ACCOUNT_ID = "a3cedad2b8fe568c065ae8ed558b965e";
const D1_DB_ID = "c81d52f7-c2ac-4dd6-9b3e-308c8ad5f36a";

async function getD1Client() {
  const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  return {
    async exec(sql: string, params?: unknown[]) {
      const body: any = { sql };
      if (params?.length) body.params = params;
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${D1_DB_ID}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(JSON.stringify(data.errors));
      return data.result;
    }
  };
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();
  const password = form.get("password")?.toString().trim();

  if (!password) {
    return new Response(JSON.stringify({ error: "Password required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = await getD1Client();
    const result = await db.exec(
      "SELECT value FROM settings WHERE key = 'password' LIMIT 1"
    );

    const storedHash = result[0]?.results?.[0]?.value;

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
