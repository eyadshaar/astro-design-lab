# Quality Review Rubric

Every demo site must pass this review before entering the portfolio.

## Scoring Scale

| Score | Meaning |
|-------|---------|
| 1 | Missing, broken, or fundamentally wrong |
| 2 | Major gaps — would need significant rework |
| 3 | Functional but generic — needs improvement |
| 4 | Solid — meets most standards, small refinements possible |
| 5 | Excellent — exceeds standard, a genuine portfolio piece |

**Minimum passing scores:** 4 in every category. A site is not portfolio-ready if it scores below 4 in any single category.

---

## Originality (weight: 1.5x)

### What to check
- Does it look meaningfully different from generic AI sites?
- Does it have a distinct visual identity?
- Does the layout feel intentional, not random?
- Is there a central motif or visual theme that unifies the page?
- Are there unexpected section combinations or layouts?
- Does the hero break the "centered headline + gradient blob" pattern?

### Red flags
- Gradient blob hero
- Centered text on gradient background
- Three identical cards in a row
- Generic stock photography
- "Supercharge your workflow" copy
- No central motif

### Good signals
- Asymmetric layouts
- Editorial pacing
- Specific photography direction
- Unique section combinations
- One memorable visual device

---

## Conversion (weight: 1.5x)

### What to check
- Is the primary CTA clear and specific?
- Does the page build trust before asking for action?
- Does the copy address real user intent and questions?
- Is there proof (metrics, testimonials, logos, case studies)?
- Is there a logical conversion funnel (understand → believe → act)?
- Does the CTA copy name the user's desired outcome?

### Red flags
- CTA says only "Get Started" or "Contact Us"
- No proof anywhere on the page
- Asking for commitment before building trust
- Generic "our platform is best" copy
- No consideration of user objections

### Good signals
- Specific metrics with context ("respond in 4 minutes, not 4 hours")
- Named client types, not generic "enterprise"
- Multiple proof points distributed through the page
- CTA copy that names the outcome

---

## Design (weight: 1.0x)

### What to check
- Is typography intentional? (distinct fonts for display vs body)
- Is spacing consistent within and across sections?
- Does the page have visual rhythm (varied density, not uniform)?
- Are sections visually distinct but cohesive?
- Is color used purposefully (not just decoration)?
- Does the mobile experience exist as its own designed experience?
- Are there any accessibility issues (color contrast, focus states)?

### Red flags
- One font used for everything
- Uniform padding on every section
- Sections all look the same density
- Mobile is just desktop stacked vertically
- Low contrast text
- No focus indicators

### Good signals
- Display serif + body sans pairing
- Generous whitespace in some sections, dense in others
- Color as a structural signal (this is a warning, this is an action)
- Mobile-first layouts that are designed, not responsive afterthoughts

---

## Technical (weight: 1.0x)

### What to check
- Does `npm run build` succeed with no errors?
- Is JavaScript minimal? (target: < 10KB JS per page)
- Is performance strong? (page weight < 500KB total)
- Are images optimized? (WebP or proper sizing)
- Is SEO metadata present? (title, description, OG tags)
- Is the HTML semantic? (header, main, section, footer, nav)
- Are forms accessible? (labels, ARIA where needed)
- Does `prefers-reduced-motion` work?

### Red flags
- Build errors
- > 100KB JS on a static marketing page
- No meta description
- `<div>` for everything
- No alt text on images
- No reduced motion support

### Good signals
- Build succeeds clean
- Vanilla JS only (no React/Vue overhead)
- CSS custom properties for design tokens
- Semantic HTML throughout
- Reduced motion respected

---

## Maintainability (weight: 1.0x)

### What to check
- Can a developer modify content without fighting the code?
- Are components reusable and composable?
- Is the design token system centralized (CSS custom properties)?
- Is there a clear file structure?
- Is there a README with build instructions?
- Can a non-technical person understand the structure?

### Red flags
- Inline styles everywhere
- Hardcoded content scattered across components
- No design token system
- No README
- Confusing file naming

### Good signals
- CSS custom properties for all colors, fonts, spacing
- Components accept props for content
- Clear `components/`, `layouts/`, `styles/` separation
- README with build and deploy instructions

---

## Deployment (weight: 1.0x)

### What to check
- Does `npm run build` produce a `dist/` directory?
- Is `astro.config.mjs` configured for static output?
- Is there a `public/` directory for static assets?
- Are there working links in the final HTML?
- Does the site render correctly from the `dist/` directory?
- Is it Cloudflare Pages ready (static output, proper base path)?

### Red flags
- `output: 'server'` or `output: 'hybrid'` without justification
- Absolute URLs that break on deploy
- Missing favicon
- No `site` URL in astro config

### Good signals
- `output: 'static'` in astro config
- Relative asset paths
- Working favicon
- `site` URL set

---

## Review Process

1. Open the site locally: `npm run preview` in the app directory
2. Score each category using the rubric above
3. If any score < 4, open issues in the repo
4. If all scores ≥ 4, mark the issue as `qa-passed`
5. Move the GitHub Project card to "Portfolio Ready"

---

## Review Checklist

Before calling QA complete, verify:

- [ ] Hero is NOT a centered gradient blob
- [ ] No generic "Get Started" CTA button
- [ ] Typography uses at least 2 distinct typefaces
- [ ] Sections have varied visual rhythm (not uniform density)
- [ ] Mobile layout is designed, not just stacked desktop
- [ ] `npm run build` succeeds
- [ ] `dist/` contains index.html and assets
- [ ] SEO meta tags present
- [ ] `prefers-reduced-motion` works
- [ ] No > 50KB of JavaScript
- [ ] README exists with build instructions
- [ ] CSS custom properties used for all design tokens
- [ ] Tel: links work for phone numbers
- [ ] At least one specific metric or proof point exists
