# Astro Design Lab — Anti-Boilerplate Website Portfolio

A research-driven system for building distinctive, non-generic websites using Astro.

**The problem this solves:** AI-generated websites all look the same — centered hero, gradient blob, three feature cards, generic copy. This system studies real design references, extracts reusable principles, and applies them through custom Astro builds that feel intentional and brand-specific.

---

## What This Is

```
astro-design-lab/
├── apps/
│   ├── portfolio/              ← The showcase site (this repo's landing page)
│   ├── boutique-hotel/         ← Demo 1: The Canopy House
│   ├── ai-automation-agency/  ← Demo 2: Meridian Security
│   ├── local-it-cybersecurity/ ← Demo 3: Fieldstone IT
│   ├── food-truck-platform/    ← Demo 4: Copper Kitchen
│   └── wellness-brand/        ← Demo 5: Solace Wellness
├── packages/
│   └── components/            ← Shared Astro components (planned)
├── design-research/
│   ├── catalog/               ← Extracted resource catalog
│   ├── patterns/              ← Hero, navbar, CTA, section, motion, visual identity
│   ├── principles/            ← Anti-boilerplate design principles
│   ├── skills/               ← Reusable design skill documents
│   ├── prompts/              ← Prompt library for future builds
│   └── website-concepts/     ← 12 website concept briefs
└── docs/
```

---

## The 5 Demo Sites

Each demo is a complete, deployable Astro 4 static site.

| Demo | Brand | Aesthetic | Stack |
|------|-------|-----------|-------|
| **The Canopy House** | Boutique hotel, Pacific Northwest | Forest Journal — editorial magazine, Cormorant Garamond serif | Astro + CSS |
| **Meridian Security** | AI automation agency | Operations Center — dashboard UI, Space Grotesk + IBM Plex | Astro + CSS |
| **Fieldstone IT** | Local managed IT / cybersecurity | Control Room — trust-first, Barlow + Source Sans, navy/orange | Astro + CSS |
| **Copper Kitchen** | Food truck ordering + POS platform | Ticket Rail — receipt motifs, Archivo Black + DM Sans, burnt orange | Astro + CSS |
| **Solace Wellness** | Premium wellness brand | Morning Practice — calm sage/blush, DM Serif Display + Nunito | Astro + CSS |

---

## Design Research

Located in `design-research/`:

- **catalog/resource-catalog.json** — Categorized links from design inspiration sites
- **patterns/** — Hero patterns, navbar patterns, CTA patterns, section patterns, motion patterns, visual identity patterns
- **principles/anti-boilerplate-principles.md** — 30+ principles for avoiding generic AI output
- **skills/** — 10 design skill documents covering hospitality, SaaS, local business, animation, brand identity, copy, Astro performance
- **prompts/** — 7 reusable prompts for website generation, review, and briefing

---

## Build Commands

Each app is independently runnable:

```bash
# Install dependencies
cd apps/[site-name]
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Live Deployments

All 6 sites are deployed and live:

| Site | URL | Brand |
|------|-----|-------|
| **Portfolio** | https://astro-design-lab-portfolio.pages.dev | Anti-boilerplate showcase |
| **The Canopy House** | https://canopy-house.pages.dev | Pacific Northwest boutique hotel |
| **Meridian Security** | https://meridian-security.pages.dev | AI automation agency |
| **Fieldstone IT** | https://fieldstone-it.pages.dev | Local managed IT / cybersecurity |
| **Copper Kitchen** | https://copper-kitchen.pages.dev | Food truck ordering + POS |
| **Solace Wellness** | https://solace-wellness.pages.dev | Premium wellness brand |

---

## Deploy to Cloudflare Pages

Each site is pre-configured for Cloudflare Pages deployment.

### Option A: GitHub Actions (recommended)

1. Fork or copy this repo to GitHub
2. Add GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages edit permission
   - `CLOUDFLARE_ACCOUNT_ID` — Found in Cloudflare dashboard
3. Add a GitHub Variable:
   - `SITE_URL` — Your deployed domain (e.g., `https://boutique-hotel.pages.dev`)
4. Push to main or manually trigger the `cf-pages-deploy` workflow

### Option B: Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy apps/boutique-hotel/dist --project-name=boutique-hotel
```

### Option C: Cloudflare Dashboard

1. Go to cloudflare.com/pages
2. Create a project
3. Connect your GitHub repo
4. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Deploy

---

## Architecture Decisions

### Why Astro?

- Static-first output — clean HTML/CSS/JS, no plugin runtime
- Fast page loads — content-focused sites load in < 1s
- Lower maintenance — no plugin dependencies, no CMS overhead
- Better security — minimal attack surface for brochure/marketing sites
- Easy Cloudflare Pages — direct static deploy
- Component flexibility — Astro components for structure, vanilla JS for interactions

### Why not Tailwind?

Plain CSS with custom properties is:
- Easier for clients to read and modify
- More maintainable long-term (no class name churn)
- Sufficient for design systems using custom properties
- No build step complexity

### Anti-Boilerplate System

Every site in this repo follows the same anti-boilerplate rules:

**Never use:**
- Generic gradient blob hero
- Centered headline with three cards (unless strongly justified)
- Overused SaaS phrases ("supercharge your workflow")
- Empty AI buzzwords
- Fake metrics with no context
- Generic stock photo grid
- Unclear audience

**Always include:**
- Specific audience and business model
- Distinct visual identity and central motif
- Deliberate section rhythm and pacing
- Unique hero structure
- Strong mobile behavior
- Conversion-aware CTAs with specific copy
- Clear maintainability notes

---

## Quality Gates

All demos are checked against:

| Category | Minimum Score |
|----------|--------------|
| Originality | 4/5 |
| Conversion | 4/5 |
| Design | 4/5 |
| Technical | 4/5 |
| Maintainability | 4/5 |
| Deployment | 5/5 |

See `docs/quality-review.md` for the full rubric.

---

## Cloudflare Pages Deployment Variables

For each site, set these in the Cloudflare Pages dashboard or GitHub Variables:

| Variable | Value |
|----------|-------|
| `SITE_URL` | Full deployed URL (include trailing slash) |

---

## GitHub Project Board

This repo uses GitHub Project v2 for tracking. The board has these columns:

1. Backlog
2. Researching
3. Cataloging
4. Pattern Extraction
5. Skill Writing
6. Building
7. QA
8. Ready to Deploy
9. Deployed
10. Portfolio Ready

See `.github/ISSUE_TEMPLATE/` for issue templates (research, website build, QA review).

---

## Adding a New Demo Site

1. Create issue from `02-website-build.yml` template
2. Fill in brand direction, required sections, anti-pattern checklist
3. Run `mkdir -p apps/[site-name]/src/{components,layouts,pages,styles}`
4. Copy `package.json` and `astro.config.mjs` from an existing demo
5. Run the anti-boilerplate reviewer prompt (`prompts/anti-boilerplate-reviewer.md`)
6. Build the site
7. Fill in `03-qa-review.yml` issue
8. Deploy via workflow or Wrangler
9. Add link to `apps/portfolio/src/pages/index.astro` demos grid
10. Close issue, move to Portfolio Ready

---

## References That Influenced This System

The research is based on studying these categories of resources:

- Web design inspiration (curated.design, awwwards, siteinspire)
- Landing page patterns (landing.love, saaspo.com, onepagelove)
- Navbar patterns (navbar.gallery, rebrand.gallery)
- CTA patterns (cta.gallery)
- Icon libraries (hugeicons.com)
- Design inspiration (mobbin.com for mobile patterns)
- Component inspiration (component.gallery)
- Animation inspiration (ui-animations, etc.)

All inspiration is used for pattern extraction only — no copying of layouts, assets, or copy.

---

## License

MIT — use freely for client work, education, or your own projects.

If you build something with this system, I'd love to see it.
