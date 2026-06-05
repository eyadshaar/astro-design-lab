# Anti-Boilerplate Website Generator
## The Master Prompt — Use This for Every Website Generation Task

---

## BEFORE WRITING ANY CODE

You must answer these 10 questions in writing. No code until these are answered:

### 1. What is the dominant visual metaphor?
Not "clean modern SaaS." Name it: "command console hero," "editorial magazine spread," "field journal," "kitchen counter," etc.

### 2. What should this website FEEL like when someone lands on it?
Describe the emotional impression in 3-5 words. "Like walking into a well-organized workshop." "Like reading a beautifully set magazine." "Like sitting at a command station."

### 3. What does the user need to BELIEVE before converting?
Trust claims? Outcome claims? Social proof requirements? The CTA is the climax of a proof sequence. What comes before it?

### 4. What proof is needed?
Metrics? Testimonials? Case studies? Logo cloud? What's the minimum proof to make the CTA credible?

### 5. What layout pattern would be UNEXPECTED but appropriate?
What would a generic AI site use here? Centered hero? Three cards? Now: what is a better alternative?

### 6. What would a GENERIC AI website do here, and how do we AVOID that?
For each section, explicitly state: "The AI default would be [X]. Our approach is [Y]."

### 7. What sections can be COMBINED, SPLIT, or REFRAMED?
Can we merge hero + social proof? Split testimonials into two sections? Reframe pricing as a comparison? Look for structural improvements.

### 8. What is the MOBILE-SPECIFIC experience?
Design mobile first for local businesses and content sites. What changes in the mobile layout? What gets priority?

### 9. What is the ONE MEMORABLE interaction or motif?
One thing a visitor should remember 30 seconds after leaving. A specific animation, an unexpected section, a visual device.

### 10. What should this site DELIBERATELY NOT INCLUDE?
List the specific elements, patterns, or copy that are off-limits.

---

## THEN: Apply the Anti-Boilerplate Design Principles

Work through the 50 principles in `anti-boilerplate-principles.md` before writing code.

Mark each decision:
- [ ] Hero: [chosen pattern + why not others]
- [ ] Navbar: [chosen pattern + why]
- [ ] Color: [chosen direction + why not generic purple-blue gradient]
- [ ] Typography: [chosen fonts + why not defaults]
- [ ] Motion: [chosen technique + signature motif]
- [ ] CTA: [specific copy + placement]
- [ ] Mobile: [specific mobile decisions]

---

## THEN: Choose from the Pattern Libraries

- Hero patterns: `hero-patterns.md`
- Navbar patterns: `navbar-patterns.md`
- CTA patterns: `cta-patterns.md`
- Section patterns: `section-patterns.md`
- Motion patterns: `motion-patterns.md`
- Visual identity patterns: `visual-identity-patterns.md`

Select specific patterns. Name them. Explain why each is right for this project.

---

## THEN: Apply the Appropriate Design Skill

- Luxury hospitality: `skills/luxury-hospitality-design.md`
- SaaS landing pages: `skills/saas-landing-pages.md`
- Local business: `skills/local-business-websites.md`
- Navbar systems: `skills/navbar-systems.md`
- CTA systems: `skills/cta-systems.md`
- Animation systems: `skills/animation-systems.md`
- Brand identity: `skills/brand-identity-systems.md`
- Conversion copywriting: `skills/conversion-copywriting.md`
- Astro performance: `skills/astro-performance-first-sites.md`

Apply each relevant skill. Mark which principles from each skill are used.

---

## THEN: Write the SPEC

Create a SPEC.md before writing any code. Include:

1. Business information (from brief)
2. Design decisions (from the 10 questions above)
3. Visual identity (colors, fonts, spacing tokens)
4. Component inventory (what components will be built)
5. Page structure (which sections on which pages)
6. Motion decisions (which animations, which fallbacks)
7. Copy voice (tone, vocabulary, example copy)
8. Quality checklist (how we'll know it's not generic)

---

## THEN: Build the Astro Site

Using the skills and patterns above, build the Astro site with:
- Component-driven architecture
- CSS custom properties for design tokens
- Semantic HTML throughout
- `prefers-reduced-motion` fallbacks
- Mobile-first responsive design
- Open Graph and meta tags
- Performance budget: <500KB page weight, LCP <2.5s

---

## Quality Gate

Before calling any website "done," run it through the anti-boilerplate reviewer:

```
prompts/anti-boilerplate-reviewer.md
```

A site is not portfolio-ready unless it scores 4+ on all six categories:
1. Originality: Does it look meaningfully different from generic AI sites?
2. Conversion: Is the CTA clear and surrounded by proof?
3. Design: Is typography intentional? Spacing consistent? Rhythm present?
4. Technical: Is Astro clean? JS minimized? Performance strong?
5. Maintainability: Are components reusable? Structure clear?
6. Deployment: Can it deploy to Cloudflare Pages? Links working?
