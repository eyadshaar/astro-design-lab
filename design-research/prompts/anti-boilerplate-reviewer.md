# Anti-Boilerplate Website Reviewer
## Quality Rubric for Generated Websites

Use this to score every generated website. A site must score 4+ on every category to be portfolio-ready.

---

## Review Categories & Scoring

### 1. Originality (1-5)
**Does it look meaningfully different from generic AI sites?**

| Score | Description |
|-------|-------------|
| 1 | Identical to generic AI output — centered hero, gradient blob, three cards |
| 2 | Slightly different but still obviously template-derived |
| 3 | Some original choices, but recognizable patterns remain |
| 4 | Distinct visual identity. Would not guess "AI generated" |
| 5 | Highly distinctive. Could be from a design studio. |

**Checklist:**
- [ ] Is there a dominant visual metaphor named in the spec?
- [ ] Is the hero NOT a centered layout with gradient blob?
- [ ] Are cards/grid sections varied across the page?
- [ ] Is the color territory unexpected for this industry?
- [ ] Is there one memorable visual element or motif?
- [ ] Does the site have a distinct personality vs generic?

---

### 2. Conversion (1-5)
**Does the page build toward action effectively?**

| Score | Description |
|-------|-------------|
| 1 | No clear CTA. No proof. Asking for action before establishing trust |
| 2 | One CTA exists but proof is thin or absent |
| 3 | Basic proof sequence, CTA present, copy could be stronger |
| 4 | Clear proof sequence. Specific CTA copy. Trust signals present |
| 5 | Masterful conversion architecture. Every element earns the next click |

**Checklist:**
- [ ] Is CTA copy specific ("Book audit" not "Get Started")?
- [ ] Is proof presented BEFORE the CTA?
- [ ] Are testimonials attributed with name, role, and specificity?
- [ ] Are metrics specific with context, not vague percentages?
- [ ] Is there exactly one primary CTA per section?
- [ ] Are form fields minimum viable?

---

### 3. Design (1-5)
**Is the design intentional, coherent, and well-executed?**

| Score | Description |
|-------|-------------|
| 1 | Inconsistent spacing, arbitrary typography, visual chaos |
| 2 | Some intentional choices but obvious gaps |
| 3 | Cohesive palette and typography, but section rhythm is uniform |
| 4 | Typography is intentional. Spacing is consistent. Sections have varied rhythm |
| 5 | Every element is deliberate. Typography sings. Visual rhythm is sophisticated |

**Checklist:**
- [ ] Is typography distinctive (not Inter/Roboto/Poppins defaults)?
- [ ] Is the typographic scale meaningful (not just 16px vs 18px)?
- [ ] Is section density varied (not uniform vertical rhythm)?
- [ ] Is the grid used intentionally?
- [ ] Is the color palette cohesive and unexpected?
- [ ] Is CTA button color distinct from the palette?
- [ ] Is there visual breathing room (whitespace)?

---

### 4. Technical (1-5)
**Is the Astro implementation clean, performant, and accessible?**

| Score | Description |
|-------|-------------|
| 1 | Broken HTML, no semantic markup, heavy JS |
| 2 | Functional but messy code, some accessibility gaps |
| 3 | Clean code with minor issues, basic accessibility |
| 4 | Well-structured components, accessible, minimal JS |
| 5 | Production-quality code. Excellent performance. Fully accessible |

**Checklist:**
- [ ] Semantic HTML throughout (nav, main, section, article)?
- [ ] All images have descriptive alt text?
- [ ] All interactive elements keyboard accessible?
- [ ] Focus states visible and styled?
- [ ] `prefers-reduced-motion` respected in all animations?
- [ ] JS minimized (CSS for non-interactive animations)?
- [ ] `loading="lazy"` on below-fold images?
- [ ] Page weight < 500KB?
- [ ] No console errors?

---

### 5. Maintainability (1-5)
**Can a developer or client maintain this without fighting the code?**

| Score | Description |
|-------|-------------|
| 1 | Spaghetti code, hardcoded values everywhere, no structure |
| 2 | Basic organization but hard to modify |
| 3 | Components exist but not fully reusable |
| 4 | Clean component architecture, CSS custom properties used |
| 5 | Excellent separation of concerns. Content and design tokens separated |

**Checklist:**
- [ ] CSS custom properties for all design tokens?
- [ ] Components small and composable?
- [ ] Layout separate from content?
- [ ] No magic numbers (all spacing via tokens)?
- [ ] Comments explaining non-obvious decisions?
- [ ] README explains how to update content?

---

### 6. Deployment (1-5)
**Can this deploy to Cloudflare Pages without issues?**

| Score | Description |
|-------|-------------|
| 1 | Build fails, or missing files, or broken links |
| 2 | Builds but with warnings, some broken assets |
| 3 | Builds cleanly, basic deployment working |
| 4 | Deploys to Cloudflare Pages, all links work, SEO metadata present |
| 5 | Flawless deployment with performance optimization, sitemap, structured data |

**Checklist:**
- [ ] `npm run build` succeeds?
- [ ] Output directory `dist/` contains all needed files?
- [ ] All internal links work?
- [ ] External resources (fonts, scripts) load correctly?
- [ ] Open Graph and Twitter Card meta tags present?
- [ ] `robots.txt` present?
- [ ] Sitemap present (or noted as future addition)?
- [ ] Cloudflare Pages build settings documented?

---

## Score Summary

| Category | Score (1-5) | Pass/Fail |
|----------|-------------|-----------|
| Originality | | Must be 4+ |
| Conversion | | Must be 4+ |
| Design | | Must be 4+ |
| Technical | | Must be 4+ |
| Maintainability | | Must be 4+ |
| Deployment | | Must be 5 |

**A site is PORTFOLIO-READY only if all six categories pass.**

---

## Review Report Template

```markdown
## Website Review: [Site Name]

**Reviewer:** [Name]
**Date:** [Date]
**Astro Project Path:** [Path]

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Originality | /5 | [Comments] |
| Conversion | /5 | [Comments] |
| Design | /5 | [Comments] |
| Technical | /5 | [Comments] |
| Maintainability | /5 | [Comments] |
| Deployment | /5 | [Comments] |

### Overall: PASS / FAIL
[If FAIL: list specific issues to fix]

### What Works Well
[List specific strengths]

### Specific Issues to Fix
[List actionable fixes]

### Iteration Needed
Yes / No
[If yes: describe what needs to change before next review]
```
