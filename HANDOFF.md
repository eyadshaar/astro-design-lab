# HANDOFF — Astro Design Lab Portfolio System

This document is a **complete handoff package**. Read it end-to-end, then execute
the numbered steps in order. Everything you need (skill bundle, references, the
repo itself) ships in the same root folder as this file.

```
astro-design-lab/
├── HANDOFF.md                         ← you are here
├── README.md                          ← original project README (reference)
├── handoff/                           ← bundled skill delivery
│   └── skills/devops/cloudflare-api/  ← drop into ~/.hermes/skills/devops/
│       ├── SKILL.md                   ← Cloudflare API reference (v4)
│       └── references/
│           ├── cloudflare-pages-deploy-workaround.md
│           └── astro-multi-site-qa.md
├── apps/                              ← 6 Astro demo sites
│   ├── portfolio/                     ← The showcase site
│   ├── boutique-hotel/                ← Demo 1: The Canopy House
│   ├── ai-automation-agency/         ← Demo 2: Meridian Security
│   ├── local-it-cybersecurity/        ← Demo 3: Fieldstone IT
│   ├── food-truck-platform/           ← Demo 4: Copper Kitchen
│   └── wellness-brand/                ← Demo 5: Solace Wellness
├── design-research/                   ← Pattern library + design skills + prompts
│   ├── catalog/                       ← Extracted resource catalog
│   ├── patterns/                      ← hero / navbar / cta / section / motion / visual-identity
│   ├── principles/                    ← Anti-boilerplate design principles
│   ├── skills/                        ← Reusable design skill docs
│   ├── prompts/                       ← Prompt library for builds + reviews
│   └── website-concepts/              ← 12 original website concept briefs
├── .github/
│   ├── workflows/
│   │   ├── cf-pages-deploy.yml        ← Cloudflare Pages deployment
│   │   └── ci.yml                     ← CI build matrix (all 6 sites)
│   └── ISSUE_TEMPLATE/                ← Research / Build / QA templates
├── docs/                              ← Deliverables manifest + quality review
├── package.json                       ← Workspace root
└── apps/<site>/package.json           ← Per-site Astro config
```

---

## Part 0 — What This Is

**The problem this solves:** AI-generated websites all look the same — centered
hero, gradient blob, three feature cards, generic SaaS copy. This system studies
real design references, extracts reusable principles, and applies them through
custom Astro builds that feel intentional and brand-specific.

**What you receive:**

- 6 fully built Astro 4 static sites, each with a distinct brand identity
- A research library of 30+ anti-boilerplate principles, 6 pattern libraries,
  10 design skill documents, 7 reusable prompts
- A working Cloudflare Pages deployment for all 6 sites
- A GitHub Actions CI/CD pipeline that builds + deploys on push to `main`
- A bundled Cloudflare API skill (so the receiving agent can manage DNS,
  Pages, Workers, and SSL itself going forward)

**Live sites (already deployed at the time of handoff):**

| Site | URL | Brand |
|------|-----|-------|
| Portfolio | `https://astro-design-lab-portfolio.pages.dev` | Anti-boilerplate showcase |
| The Canopy House | `https://canopy-house.pages.dev` | Pacific Northwest boutique hotel |
| Meridian Security | `https://meridian-security.pages.dev` | AI automation agency |
| Fieldstone IT | `https://fieldstone-it.pages.dev` | Local managed IT / cybersecurity |
| Copper Kitchen | `https://copper-kitchen.pages.dev` | Food truck ordering + POS |
| Solace Wellness | `https://solace-wellness.pages.dev` | Premium wellness brand |

---

## Part 1 — Install the Cloudflare Skill

The receiving agent needs the Cloudflare API skill installed **before** doing
anything else. The bundled skill is at:

```
handoff/skills/devops/cloudflare-api/
```

**Install steps:**

```bash
# 1. Create the destination
mkdir -p ~/.hermes/skills/devops

# 2. Copy the entire skill directory (preserve references/)
cp -r handoff/skills/devops/cloudflare-api ~/.hermes/skills/devops/

# 3. Verify the install
ls ~/.hermes/skills/devops/cloudflare-api/
# Expected: SKILL.md  references/

ls ~/.hermes/skills/devops/cloudflare-api/references/
# Expected: astro-multi-site-qa.md  cloudflare-pages-deploy-workaround.md

# 4. Smoke test — load the skill
# In any agent session, run: skill_view(name="cloudflare-api")
```

**What the skill covers:**

- REST API v4 for DNS, Zones, Pages, Workers, SSL/TLS, Email Routing
- Two auth methods: global API key (`cfk_...`, X-Auth-Key + X-Auth-Email) and
  scoped API tokens (Bearer)
- The exact `wrangler pages deploy` env-dict pattern that bypasses the
  GitHub-integration outage (`references/cloudflare-pages-deploy-workaround.md`)
- The image-path QA checklist for multi-site Astro builds
  (`references/astro-multi-site-qa.md`)

Read `SKILL.md` end-to-end before attempting any Cloudflare operations. Pay
particular attention to the **Key Pitfalls** section near the bottom of that
file — pitfalls 2 (wrangler env dict), 3 (Astro image paths), 7 (CNAME at zone
root), and 8 (SSL via Dashboard only) will save you hours.

---

## Part 2 — Cloudflare Account Setup

You need **three values** before you can deploy anything:

### 2.1 — Account ID

Found in the Cloudflare Dashboard URL bar:

```
https://dash.cloudflare.com/<ACCOUNT_ID>/...
```

Or fetch via API:

```bash
curl -s -H "X-Auth-Key: $CF_API_KEY" \
     -H "X-Auth-Email: $CF_EMAIL" \
     "https://api.cloudflare.com/client/v4/accounts" | jq '.result[0].id'
```

### 2.2 — Global API Key OR a Scoped API Token

**Option A — Global API Key (simplest, what the original setup uses):**

1. Cloudflare Dashboard → click your profile (top right) → **My Profile**
2. Scroll to **API Keys** → **Global API Key** → View
3. Confirm with your Cloudflare password
4. Copy the `cfk_...` value

This key has **full account access**. Use it for local scripts; for GitHub
Actions, prefer a scoped token (Option B).

**Option B — Scoped API Token (required for GitHub Actions):**

1. Cloudflare Dashboard → Profile → **API Tokens** → **Create Token**
2. Use the **Edit Cloudflare Pages** template (covers deploys)
3. Or the **Edit zone DNS** template if you only need DNS
4. Add **Account → Cloudflare Pages: Edit** permission
5. Set TTL (90 days is common, or "No expiration" for long-lived deploys)
6. Save and copy the token value

### 2.3 — Account Email

The email address of the Cloudflare account (used as `X-Auth-Email`).

```bash
# Local environment — put these in ~/.bashrc, ~/.zshrc, or a .env file
export CLOUDFLARE_API_KEY="cfk_..."          # or CLOUDFLARE_API_TOKEN for scoped
export CLOUDFLARE_EMAIL="you@example.com"
export CLOUDFLARE_ACCOUNT_ID="..."
```

### 2.4 — Quick Sanity Test

```bash
# Should return a list of zones (success: true)
curl -s "https://api.cloudflare.com/client/v4/zones" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "Content-Type: application/json" | jq '.success, (.result | length)'
```

If `false`, the email doesn't match the account that owns the key. Re-check
`CLOUDFLARE_EMAIL`.

---

## Part 3 — GitHub Setup

You need a GitHub org (or user account) that will own the repos.

### 3.1 — Create the Six Repos

The handoff assumes a monorepo at the receiving end. If you'd rather split into
one repo per site, see `README.md` Option B in the project root.

**Recommended — one monorepo:**

```bash
# Pick a GitHub owner (user or org)
export GH_OWNER="your-org-or-username"

# Create the monorepo
gh repo create "$GH_OWNER/astro-design-lab" --private --description "Astro Design Lab — anti-boilerplate portfolio"

# Push the code
cd /path/to/this/folder
git init
git add -A
git commit -m "Initial handoff: 6 Astro demo sites + research library + Cloudflare skill bundle"
git branch -M main
git remote add origin "https://github.com/$GH_OWNER/astro-design-lab.git"
git push -u origin main
```

### 3.2 — Add GitHub Secrets

The deployment workflow (`.github/workflows/cf-pages-deploy.yml`) reads two
secrets. Go to:

```
https://github.com/<GH_OWNER>/astro-design-lab/settings/secrets/actions
```

Add **Repository secrets** (not environment secrets):

| Name | Value | Notes |
|------|-------|-------|
| `CLOUDFLARE_API_TOKEN` | `your-scoped-token` | **Must be a scoped token**, not the global `cfk_` key. See Part 2.2 Option B. Needs `Account → Cloudflare Pages: Edit`. |
| `CLOUDFLARE_ACCOUNT_ID` | `your-account-id` | The Account ID from Part 2.1. |

### 3.3 — Add the SITE_URL Variable (Optional)

The workflow uses a `SITE_URL` variable to pass the canonical site URL to the
build. Default: not set (the build still works without it).

If you want a custom domain, set this in
`Settings → Secrets and variables → Actions → Variables`:

| Name | Value |
|------|-------|
| `SITE_URL` | `https://yourdomain.com` (or `https://canopy-house.pages.dev`) |

### 3.4 — Verify the Workflow File

The shipped workflow is at `.github/workflows/cf-pages-deploy.yml`. It uses
`cloudflare/pages-action@v1` and triggers on push to `main` (or via
`workflow_dispatch`).

The shipped CI matrix is at `.github/workflows/ci.yml` — it builds all 6 sites
on every push and PR but does **not** deploy.

**You should not need to edit either file** unless you rename repos or move
directories.

---

## Part 4 — Cloudflare Pages Project Setup

The Cloudflare Pages GitHub integration can fail with cryptic internal errors
("There is an internal issue with your Cloudflare Pages Git installation").
The shipped workflow does **not** rely on that integration — it deploys via
the `cloudflare/pages-action@v1` action, which uses the API token directly.

You still need **6 Pages projects** to exist on the Cloudflare side, one per
demo site. Create them via the Dashboard (fastest) or via the REST API
(reproducible). The shipped CI does not create them — you do that once.

### 4.1 — Create Projects via REST (Recommended)

This script creates all 6 Pages projects. **Omit the `source` field** — this
is the workaround for the GitHub-integration outage documented in
`handoff/skills/devops/cloudflare-api/references/cloudflare-pages-deploy-workaround.md`.

```python
import os, requests

CF_KEY = os.environ["CLOUDFLARE_API_KEY"]    # global cfk_... OR a token
CF_EMAIL = os.environ["CLOUDFLARE_EMAIL"]
ACCOUNT_ID = os.environ["CLOUDFLARE_ACCOUNT_ID"]
HEADERS = {
    "X-Auth-Key": CF_KEY,
    "X-Auth-Email": CF_EMAIL,
    "Content-Type": "application/json",
}

SITES = [
    "astro-design-lab-portfolio",
    "canopy-house",
    "meridian-security",
    "fieldstone-it",
    "copper-kitchen",
    "solace-wellness",
]

for name in SITES:
    payload = {
        "name": name,
        "build_config": {
            "build_command": "npm run build",
            "destination_dir": "dist",
        },
        "deployment_configs": {
            "preview":     {"compatibility_date": "2024-01-01"},
            "production":  {"compatibility_date": "2024-01-01"},
        },
        "production_branch": "main",
        # NOTE: no "source" field — direct upload only, no GitHub integration
    }
    r = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects",
        headers=HEADERS, json=payload, timeout=30,
    )
    data = r.json()
    if data["success"]:
        print(f"✓ Created {name} → {name}.pages.dev")
    elif data.get("errors", [{}])[0].get("code") == 10000:  # already exists
        print(f"= {name} already exists, skipping")
    else:
        print(f"✗ {name}: {data['errors']}")
```

**Expected output:**

```
✓ Created astro-design-lab-portfolio → astro-design-lab-portfolio.pages.dev
✓ Created canopy-house → canopy-house.pages.dev
✓ Created meridian-security → meridian-security.pages.dev
✓ Created fieldstone-it → fieldstone-it.pages.dev
✓ Created copper-kitchen → copper-kitchen.pages.dev
✓ Created solace-wellness → solace-wellness.pages.dev
```

**If creation fails with a GitHub-related error**, you're including the
`source` field. Remove it. The projects will use direct API deploys only,
which is exactly what the GitHub Action does.

### 4.2 — Or Create via Dashboard

If you prefer the UI:

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Direct Upload**
2. Project name: `canopy-house` (no dashes at the start/end, lowercase)
3. **Skip** the GitHub connection step
4. Click **Create**
5. Repeat for all 6 sites

Direct-upload projects CAN still be deployed by the GitHub Action — the
action just calls the API directly with the bundled token, so the dashboard
GitHub integration is irrelevant.

---

## Part 5 — First Deploy

### 5.1 — Trigger the Workflow

The cleanest first deploy: push to `main` and watch the workflow run.

```bash
# In the repo
git commit --allow-empty -m "Trigger first deploy"
git push origin main
```

Then go to:

```
https://github.com/<GH_OWNER>/astro-design-lab/actions
```

You should see `cf-pages-deploy.yml` running. It will deploy the **portfolio**
site by default (see the `inputs.site` default in the workflow).

To deploy a specific site via the UI, use **Run workflow** → pick a site from
the dropdown:

- `portfolio`
- `boutique-hotel`
- `ai-automation-agency`
- `local-it-cybersecurity`
- `food-truck-platform`
- `wellness-brand`

### 5.2 — Verify Each Site is Live

```bash
for url in \
  "https://astro-design-lab-portfolio.pages.dev" \
  "https://canopy-house.pages.dev" \
  "https://meridian-security.pages.dev" \
  "https://fieldstone-it.pages.dev" \
  "https://copper-kitchen.pages.dev" \
  "https://solace-wellness.pages.dev"; do
  status=$(curl -sI --connect-timeout 5 "$url" | head -1)
  echo "$url → $status"
done
```

All should return `HTTP/2 200`.

### 5.3 — Verify Images Load

Critical — the most common deploy-time failure is broken images (Astro `public/`
path mismatch). Quick smoke test:

```bash
# Replace with a real image from one of the sites
curl -sI "https://canopy-house.pages.dev/images/hero.jpg" | head -1
# Expect: HTTP/2 200
```

If 404, see `handoff/skills/devops/cloudflare-api/references/astro-multi-site-qa.md`
for the diagnosis and fix patterns. This was the #1 issue in the original
6-site QA pass.

---

## Part 6 — Local Development

Each site is independently runnable.

```bash
# Pick a site
cd apps/boutique-hotel

# Install
npm install

# Dev server (defaults to http://localhost:4321)
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview
```

**Stack across all sites:**

- Astro 4.x, TypeScript
- Static output (`output: 'static'` in `astro.config.mjs`)
- Plain CSS with custom properties (no Tailwind, no CSS framework)
- Vanilla JS for mobile-nav toggle / tab switching only
- `prefers-reduced-motion` respected on every animation
- All sites have semantic HTML, mobile-first responsive layouts

**Run all 6 sites simultaneously for visual comparison:**

```bash
# From the repo root
(cd apps/portfolio                    && npm run dev -- --port 4321) &
(cd apps/boutique-hotel              && npm run dev -- --port 4322) &
(cd apps/ai-automation-agency       && npm run dev -- --port 4323) &
(cd apps/local-it-cybersecurity      && npm run dev -- --port 4324) &
(cd apps/food-truck-platform         && npm run dev -- --port 4325) &
(cd apps/wellness-brand              && npm run dev -- --port 4326) &
wait
```

---

## Part 7 — Adding a New Demo Site

The system is designed to extend. To add a 7th demo:

1. **Create an issue** from `.github/ISSUE_TEMPLATE/02-website-build.yml` —
   fill in brand direction, required sections, anti-pattern checklist.
2. **Scaffold the Astro app:**
   ```bash
   mkdir -p apps/<new-site>/src/{components,layouts,pages,styles}
   cp apps/boutique-hotel/package.json     apps/<new-site>/
   cp apps/boutique-hotel/astro.config.mjs apps/<new-site>/
   cd apps/<new-site> && npm install
   ```
3. **Apply brand direction** — write `src/styles/global.css` with the new
   palette + typography tokens. Use the existing demos as a reference for
   the component shape, NOT for the visual identity.
4. **Run the anti-boilerplate review** — copy
   `design-research/prompts/anti-boilerplate-reviewer.md` into your build
   agent's context. Score yourself ≥ 4/5 on Originality, Conversion,
   Design, Technical, Maintainability.
5. **Build the site** — `npm run build` must succeed.
6. **Create the Pages project** — re-run the script from Part 4.1 with
   the new name added to `SITES`.
7. **Trigger the workflow** — Run workflow → pick the new site from
   the dropdown (after adding it to the `options` list in
   `.github/workflows/cf-pages-deploy.yml`).
8. **Add to the portfolio** — update `apps/portfolio/src/pages/index.astro`
   demo grid with the new URL.
9. **QA** — file from `.github/ISSUE_TEMPLATE/03-qa-review.yml`.

---

## Part 8 — Custom Domains

To attach `www.yourdomain.com` to `canopy-house.pages.dev`:

### 8.1 — DNS Records (via API)

```bash
ZONE_ID="..."  # from Part 2.1 lookup
TOKEN="..."    # scoped DNS token, needs Zone:DNS:Edit

# CNAME for www → Pages
curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"CNAME","name":"www","content":"canopy-house.pages.dev","proxied":true}' \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records"
```

For zone-root (`yourdomain.com`), you must use `proxied: false` on the free
tier (CNAME at root is not allowed proxied). Pages will handle the redirect
to `www` automatically.

### 8.2 — Add Custom Domain in Dashboard

**You cannot do this via API** (Cloudflare limitation — see Pitfall 8 in the
cloudflare-api skill).

1. Cloudflare Dashboard → **Workers & Pages** → `canopy-house` → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `www.yourdomain.com` (or `yourdomain.com`)
4. Cloudflare will auto-provision the SSL certificate (takes 1-2 minutes)

---

## Part 9 — Research System Reference

The `design-research/` directory contains the intelligence layer that makes
this system distinctive. It's the answer to "why don't these look like generic
AI sites?"

| Subdirectory | Contents | Use it for |
|--------------|----------|-----------|
| `catalog/` | Resource catalog from the design-inspiration research (JSON) | Inspiration lookup |
| `patterns/hero-patterns.md` | 10 hero patterns with structure, copy, motion notes | Picking a hero layout |
| `patterns/navbar-patterns.md` | Navbar patterns incl. mega menu, command palette | Designing navigation |
| `patterns/cta-patterns.md` | CTA patterns incl. conviction, calculator, audit | Writing CTA copy |
| `patterns/section-patterns.md` | 20 section patterns with editorial pacing | Sequencing sections |
| `patterns/motion-patterns.md` | Animation patterns with reduced-motion fallbacks | Adding motion |
| `patterns/visual-identity-patterns.md` | 12 brand visual identities | Picking a brand direction |
| `principles/anti-boilerplate-principles.md` | 30+ principles for avoiding AI genericness | Reviewing builds |
| `skills/*.md` | 10 design skill docs (hospitality, SaaS, local biz, etc.) | Domain-specific guidance |
| `prompts/*.md` | 7 reusable prompts for build, review, briefing | Driving subagents |
| `website-concepts/12-website-concepts.md` | 12 original concept briefs | Inspiration for new demos |

**The anti-boilerplate review is the single most important prompt.** Before
declaring any new site "done", run it:

```bash
# In a subagent context
cat design-research/prompts/anti-boilerplate-reviewer.md
# Then point it at the new site and ask for a score.
```

Minimum scores to ship: Originality 4, Conversion 4, Design 4, Technical 4,
Maintainability 4, Deployment 5.

---

## Part 10 — When Things Break

### Symptoms & Fixes

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| 401 from Cloudflare API | Bad key or wrong email | Re-check `CLOUDFLARE_API_KEY` and `CLOUDFLARE_EMAIL` |
| `1009: Wrong API token type` | Scoped token lacks permission | Regenerate token with correct template (Part 2.2) |
| `Not logged in` from wrangler | Env dict not passed to subprocess | See Pitfall 2 in cloudflare-api skill |
| Broken images on deployed site | Astro `public/` path mismatch | See `references/astro-multi-site-qa.md` |
| `9103 Unknown X-Auth-Key or X-Auth-Email` | Email doesn't match the key's account | Use the email of the account that owns the `cfk_` key |
| GitHub Action fails with auth error | `CLOUDFLARE_API_TOKEN` is the global `cfk_` key | Generate a scoped token (Part 2.2 Option B) |
| `pages-action` can't find project | Pages project doesn't exist yet | Run Part 4.1 to create it |
| Build succeeds locally, fails in CI | Node version mismatch | Workflow uses Node 20 — match locally |
| `dist/` empty or missing files | Build config wrong destination | Should be `dist` not `_site` or `public` |

### Reading the Cloudflare Skill for Deeper Issues

The bundled `cloudflare-api` skill (installed in Part 1) is the canonical
reference for any Cloudflare-side problem. Key sections:

- **Key Pitfalls** (bottom of `SKILL.md`) — 12 documented traps, all real
- **Common Workflows** — Full DNS setup, CNAME updates, token rotation
- **Error Handling** — Every error code you might hit
- **References** — Two purpose-written troubleshooting docs (Pages deploy
  workaround, Astro multi-site QA)

### QA Pass Workflow

If a deployed site is showing issues:

```bash
# From the site directory
cd apps/<site-name>

# 1. Build locally and inspect output
npm run build
ls -la dist/
find dist -name "*.jpg" -o -name "*.png" | wc -l
# Compare to <img> tag count in src/

# 2. Smoke test all images
for img in $(grep -roh 'src="/[^"]*"' src/ | sort -u); do
  path=$(echo "$img" | sed 's/src="//;s/"$//')
  if [ -f "public$path" ]; then
    echo "✓ $path"
  else
    echo "✗ $path MISSING"
  fi
done

# 3. Run a HEAD check on the deployed site
curl -sI "https://<site>.pages.dev/" | head -1
```

---

## Part 11 — One-Page Recap for the Receiving Agent

If you only read one section, read this:

1. **Install the skill bundle** — copy `handoff/skills/devops/cloudflare-api/`
   to `~/.hermes/skills/devops/cloudflare-api/`.
2. **Get your Cloudflare credentials** — Account ID, global key (`cfk_...`),
   email. Test with the curl command in Part 2.4.
3. **Push the repo to GitHub** under your owner (Part 3.1).
4. **Add GitHub secrets** — `CLOUDFLARE_API_TOKEN` (scoped, NOT global) and
   `CLOUDFLARE_ACCOUNT_ID` (Part 3.2).
5. **Create the 6 Pages projects** — run the Python script in Part 4.1.
6. **Trigger the first deploy** — empty commit on `main` (Part 5.1).
7. **Verify** — all 6 URLs return 200, hero images load (Part 5.2-5.3).
8. **Read the cloudflare-api skill's Key Pitfalls section** before
   touching anything custom — saves hours of debugging.

That's it. The receiving agent should be operational end-to-end in under
30 minutes following this sequence.

---

## Part 12 — Contact & Context

This handoff was produced by the original system owner from the
`/home/chronos/astro-design-lab/` working tree. All sites, the Cloudflare
account, and the GitHub org are owned by the receiving party going forward.

The original build produced:

- 6 live Cloudflare Pages deployments
- A 200KB research library (~30 files)
- ~5000 lines of Astro + CSS + JS across the demos
- A working GitHub Actions deploy pipeline
- This handoff document + the bundled cloudflare-api skill

**Anti-boilerplate standard (the core thesis):** "Would a client believe this
came from a thoughtful design studio rather than a generic AI site generator?"
If not, keep iterating.

MIT license. Use freely. The original system owner would love to see what
gets built on top of it.
