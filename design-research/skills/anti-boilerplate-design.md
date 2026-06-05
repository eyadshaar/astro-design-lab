# Anti-Boilerplate Design System

## Purpose
Generate websites that do not look like generic AI output. Apply before writing any code.

## When to Use
- Every website generation task
- Every landing page spec
- Every redesign project
- Any time "it looks like a template" is a risk

---

## Design Principles (Top 10)

1. **Choose one dominant visual metaphor.** Not "clean modern design." A specific device: command console, kitchen, workshop, magazine spread, control room, ledger, field journal.

2. **Name the visual device explicitly.** "Timeline hero" is a visual device. "Nice navbar" is not.

3. **The unexpected visual device appears in at least one section.** A receipt motif for a finance tool. A map for a local service. A command console for a dev tool.

4. **Reject the centered hero + gradient blob + three-card feature layout.** This is the AI default. Choose asymmetric, editorial, or cinematic alternatives.

5. **Reject purple-to-blue gradient hero backgrounds.** Use surprising palettes: warm amber to deep rust, forest green to slate, burgundy to black.

6. **Write copy for a specific person, not everyone.** "For engineering teams drowning in status meetings" beats "The best tool for teams."

7. **Replace "Get Started" with specific outcome CTAs.** "Book my 30-minute audit" beats "Get Started."

8. **Testimonials need attribution + specificity + photo.** "A great tool!" is not a testimonial.

9. **One motion signature per site.** Repetition of one technique creates coherence. Multiple animations create noise.

10. **Before writing any code: ask "What would an AI generate here by default?" Then do the opposite.**

---

## Decision Checklist

### Identity
- [ ] Is there a named visual metaphor?
- [ ] Does the metaphor connect to the business model?
- [ ] Is the visual device expressed consistently across sections?

### Layout
- [ ] Is the hero NOT centered (unless deliberately justified)?
- [ ] Is section density varied (not uniform vertical rhythm)?
- [ ] Are cards different across sections?
- [ ] Is mobile designed, not just stacked?

### Typography
- [ ] Is there a typeface with character (not Inter/Roboto/Poppins defaults)?
- [ ] Is the typographic scale meaningful (not just 16px vs 18px)?
- [ ] Is one section type-forward (typography as visual)?

### Color
- [ ] Is there NO purple-to-blue gradient hero?
- [ ] Is the color territory unexpected for this industry?
- [ ] Is one section a deliberate color break from the palette?
- [ ] Does CTA button color contrast with the palette?

### Navigation
- [ ] Does nav complexity match product complexity?
- [ ] Is there one unexpected nav element?
- [ ] Is the CTA visible without scrolling (if conversion is primary goal)?

### CTA
- [ ] Is CTA copy specific ("Book audit" not "Submit")?
- [ ] Is the CTA at the climax of a proof sequence, not the opening?
- [ ] Is there exactly one primary CTA per section?
- [ ] Are form fields minimum viable?

### Copy
- [ ] Is copy written for a specific person?
- [ ] Are feature bullets replaced with use-case narratives?
- [ ] Are metrics specific with context?
- [ ] Are AI buzzwords removed?

### Images
- [ ] Are there no stock photos of laptops, devices, or team high-fiving?
- [ ] Is the image type intentional per section?

### Motion
- [ ] Is motion for clarity, not decoration?
- [ ] Is reduced-motion handled?
- [ ] Is there one signature motion motif?

---

## Common Mistakes

- Choosing "clean modern" as a design direction — it's not a direction
- Using default Google Fonts — pick something with character
- Generic hero layout — almost always wrong
- Multiple CTAs in one section — divides attention
- Vague copy — "supercharge your workflow" says nothing
- Stock photography — immediate credibility loss
- Uniform section rhythm — creates monotony
- Animation without purpose — noise not signal

---

## Astro Implementation Notes

- Use CSS custom properties for all design tokens (color, spacing, typography)
- Keep components small and composable
- Minimize JS — use CSS for animations where possible
- Build reduced-motion fallbacks into all motion components
- Use `prefers-reduced-motion` media query in base styles
- Test at 320px width minimum
