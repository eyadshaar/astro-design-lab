# Section Pattern Generator
## For generating specific sections with full design rationale

---

## Prompt

Generate a [SECTION TYPE] section for a [WEBSITE TYPE] website.

**Context:**
- Website: [Name/Description]
- Industry: [Industry]
- Target audience: [Who visits this site]
- Primary goal: [What the site needs to accomplish]
- Visual metaphor: [The dominant visual concept]

**Design reference resources:**
- Pattern library: `/design-research/patterns/section-patterns.md`
- Anti-boilerplate principles: `/design-research/principles/anti-boilerplate-principles.md`
- Visual identity patterns: `/design-research/patterns/visual-identity-patterns.md`

---

## Section Types Available

Choose from these and customize:

1. **Problem Framing Section** — Establish shared reality before presenting solution
2. **Transformation Section** — Before/after state visualization
3. **Feature Deep Dive** — Single feature in full context
4. **Comparison Table** — Honest comparison against alternatives
5. **Outcome Cards** — Metrics with context (not generic feature cards)
6. **Process Timeline** — How the product or service works
7. **Case Study Strip** — Compressed proof with link to full case study
8. **Testimonial Wall** — Multiple voices, specific outcomes
9. **Proof Metrics Band** — Quick-look credibility numbers
10. **Visual Gallery** — Immersive visual presentation
11. **FAQ Section** — Objection handling in user's words
12. **Pricing Section** — 3-tier clear presentation
13. **Local Trust Section** — Community credibility
14. **Integration Ecosystem** — Connectivity proof
15. **Founder Note** — Human voice and credibility
16. **Roadmap** — Product direction transparency
17. **Demo Preview** — Show the product in action
18. **Interactive Product Tour** — Self-guided exploration
19. **Final CTA Section** — Final conviction after all proof

---

## Output Requirements

For each section, provide:

### 1. Design Decision Rationale
- Which pattern was chosen and why
- How it avoids the generic AI version of this section
- How it connects to the visual metaphor

### 2. Content Strategy
- What copy goes in each element
- What proof is included (realistic example data)
- How the section flows into the next section

### 3. Astro Component Structure
```astro
<!-- SectionName.astro -->
---
interface Props {
  // Component props
}
---
<section class="section-[name]">
  <!-- Structure -->
</section>

<style>
  /* Design tokens from palette */
  /* Responsive behavior */
  /* Animation (with prefers-reduced-motion fallback) */
</style>
```

### 4. Responsive Behavior
- Desktop layout
- Tablet layout
- Mobile layout

### 5. Accessibility Notes
- Semantic HTML structure
- ARIA labels if needed
- Focus management for interactive sections

### 6. Animation (if applicable)
- Entrance animation
- Interaction animation
- `prefers-reduced-motion` fallback
