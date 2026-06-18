import type { APIRoute } from "astro";
export const GET: APIRoute = async ({ locals }) => {
  const g = globalThis as any;
  // Get ALL keys including symbols
  const symKeys = Object.getOwnPropertyNames(g).concat(Object.getOwnPropertySymbols(g).map(s => s.toString()));
  const filtered = symKeys.filter(k => !k.startsWith('__') && k !== 'Symbol(TO_STRING_TAG)');
  return new Response(JSON.stringify({
    cloudflare: typeof g.Cloudflare,
    cfKeys: typeof g.Cloudflare === 'object' ? Object.keys(g.Cloudflare) : [],
    hasDB: 'DB' in g,
    allGlobals: filtered.slice(0, 50),
    processEnvKeys: Object.keys(g.process?.env || {}).slice(0, 20),
  }), { headers: { "Content-Type": "application/json" } });
};
