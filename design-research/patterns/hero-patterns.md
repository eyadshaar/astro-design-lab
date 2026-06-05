# Hero Pattern Library
## 10 Hero Patterns That Break the Generic Centered Hero

Each pattern below is a distinct visual structure with specific use cases, copy approaches, and Astro component ideas.

---

## 1. Editorial Split Hero

**Best use case:** Content-heavy sites, agencies, editorial brands, publishers.

**Visual structure:** Two-column asymmetric split. Left: large typographic headline (60% width), subhead, CTA. Right: dominant editorial photograph or illustration. Text left-aligned. High contrast in typography scale.

**Copy structure:**
- Headline: punchy, editorial, 8-15 words max
- Subhead: one sentence explaining the value proposition
- CTA: single primary button

**CTA structure:** One prominent button + optional secondary text link.

**Motion idea:** Headline fades up on load. Image slides in from right after 200ms delay. Parallax on scroll.

**Astro component idea:**
```
<HeroEditorial>
  <slot name="headline" />
  <slot name="subhead" />
  <slot name="cta" />
  <slot name="image" />
</HeroEditorial>
```
CSS: CSS Grid two-column, image with subtle scale on hover.

**When not to use:** Mobile-constrained layouts (prefer stacked), or when the product is so novel it needs explanation before visuals.

---

## 2. Product Console Hero

**Best use case:** Developer tools, SaaS platforms, CLI tools, dashboards.

**Visual structure:** Full-width dark terminal/dashboard aesthetic. Large monospace headline. Animated code snippet or dashboard preview. Subtle grid background. Terminal-style cursor or blinking indicator.

**Copy structure:**
- Headline: command or outcome phrase, monospace or condensed sans-serif
- Subhead: 1-2 lines explaining the value in developer terms
- CTA: code snippet style or sharp bordered button

**CTA structure:** Terminal-style button (e.g., `npm install @tool`) or sharp bordered button with high contrast.

**Motion idea:** Typewriter effect on headline. Code lines appear sequentially. Dashboard UI fades in with staggered element reveal.

**Astro component idea:**
`<HeroConsole>` with dark background, monospace font, animated cursor, code-block styling.

**When not to use:** Non-technical audiences, consumer products, anything where developer aesthetics feel exclusionary.

---

## 3. Map-Based Hero

**Best use case:** Local businesses, multi-location services, logistics, real estate, hospitality with physical presence.

**Visual structure:** Full-bleed map as background or large map panel. Text overlaid with frosted glass or solid contrast panel. Location markers styled to match brand. Contact info integrated.

**Copy structure:**
- Headline: location + service framing
- Subhead: what the location enables
- CTA: directions, booking, or contact

**CTA structure:** Primary CTA with icon (map pin, phone, calendar). Secondary: address/contact details.

**Motion idea:** Map markers pulse in sequentially. Smooth zoom to region on load. Location panel slides in.

**Astro component idea:**
`<HeroMapLocal>` with Mapbox GL JS or static map image fallback, custom marker overlay, frosted glass text panel.

**When not to use:** Remote-only businesses, purely digital products, B2B SaaS without physical presence.

---

## 4. Cinematic Hospitality Hero

**Best use case:** Hotels, restaurants, high-end hospitality, travel, experience brands.

**Visual structure:** Full-viewport video or full-bleed photography. Minimal text overlay, bottom or center weighted. Dark vignette on edges. Logo top-left. Navigation transparent over image.

**Copy structure:**
- Headline: evocative, sensory, 3-6 words
- Subhead: optional one-liner in smaller type
- CTA: subtle, ghost-button style

**CTA structure:** Ghost button (outline only) with "Book Now" or "Explore." Low visual weight — the image does the selling.

**Motion idea:** Slow Ken Burns effect on image. Subtle parallax on scroll. Text fades on scroll to reveal more image.

**Astro component idea:**
`<HeroCinematic>` with `<video>` element (poster fallback), transparent navbar, gradient vignette overlay.

**When not to use:** When the product needs explanation before emotion, or for B2B contexts where emotion is less relevant than function.

---

## 5. Dashboard Proof Hero

**Best use case:** Analytics tools, project management, productivity SaaS, any tool with visible output.

**Visual structure:** Slightly narrower container. Large dashboard UI mockup as hero visual. Headline above the mockup. Key metrics highlighted on the dashboard with colored accents.

**Copy structure:**
- Headline: outcome statement framed as result
- Subhead: tool category + differentiator
- Proof: small "trusted by X companies" strip below

**CTA structure:** Primary CTA above dashboard. Secondary: "Watch demo" with play icon.

**Motion idea:** Dashboard elements appear with staggered fade-in. Metric numbers count up. Subtle hover states on interactive elements.

**Astro component idea:**
`<HeroProofDriven>` with dashboard screenshot in `<figure>`, annotated hotspot overlays, CSS-animated counters.

**When not to use:** When the tool has no visual interface worth showing (CLI-only, API-only).

---

## 6. Timeline Hero

**Best use case:** History-rich organizations, companies with strong origin stories, event promotion, political campaigns.

**Visual structure:** Horizontal or vertical timeline as the structural backbone. Year markers as navigation anchors. Content flows along the timeline. Full-width with internal scroll for timeline.

**Copy structure:**
- Headline: founding year + one-line origin statement
- Timeline items: year + milestone + short description
- CTA: "Join us at this point in the story"

**CTA structure:** Contextual CTA at current point on timeline.

**Motion idea:** Timeline draws itself on load (SVG stroke animation). Scroll-linked progression along the timeline. Active milestone highlights on scroll.

**Astro component idea:**
`<HeroTimeline>` with horizontal scroll container, SVG connecting line with dash-offset animation, milestone cards.

**When not to use:** Products with no meaningful history to show, early-stage startups.

---

## 7. Letter-from-Founder Hero

**Best use case:** Early-stage startups, personal brands, bootstrapped businesses, products with strong founder story.

**Visual structure:** Personal letter format. Handwritten or calligraphic font for salutation. Formal letter structure: greeting → story → offer → signature. Founder photo as circular stamp or signature.

**Copy structure:**
- Headline: personal greeting ("I built this because...")
- Body: first-person founder story, 2-4 sentences
- Signature: founder name + role
- CTA: personal invitation to try

**CTA structure:** Warm-toned button framed as personal invitation, not corporate demand.

**Motion idea:** Letter paper slides up from below with subtle rotation. Ink-trail animation on signature. Subtle paper texture overlay.

**Astro component idea:**
`<HeroFounder>` with paper card styling, serif body text, circular photo badge, "stamped" visual element.

**When not to use:** Enterprise products, team products without a dominant founder figure, products where personal voice would feel awkward.

---

## 8. Before/After Transformation Hero

**Best use case:** Productivity tools, optimization products, education, fitness/wellness, any "result" product.

**Visual structure:** Split screen or slider. "Before" state on left (muted, constrained). "After" state on right (vibrant, resolved). Arrow or transformation indicator between. Clear visual hierarchy.

**Copy structure:**
- Headline: transformation statement
- Subhead: brief context on what changed
- CTA: "Start your transformation"

**CTA structure:** Single CTA centered below the transformation visual.

**Motion idea:** Before/After slider the user can drag. On load, reveal animates from center outward. Metric counters animate to show improvement.

**Astro component idea:**
`<HeroTransformation>` with CSS clip-path reveal, drag handle for interactive comparison, animated counter badges.

**When not to use:** When there's no clear "before" state to show, or when the transformation is too abstract to visualize.

---

## 9. Immersive Scroll Hero

**Best use case:** Creative agencies, game studios, immersive technology, architecture, high-budget production brands.

**Visual structure:** Full-viewport opening that scrolls into a second section. The scroll itself IS the navigation. Single-page experience. No traditional section dividers — continuous flow.

**Copy structure:**
- Headline: unfolds across the scroll journey
- Copy distributed across scroll positions
- Final position: CTA appears

**CTA structure:** Appears at end of scroll journey, full-screen moment.

**Motion idea:** Scroll-linked transform (translate, scale, opacity) applied to all elements. Background transforms with scroll position. Text masks reveal on scroll.

**Astro component idea:**
`<HeroImmersive>` with Intersection Observer for scroll tracking, CSS custom properties for scroll-linked values, full-page sections.

**When not to use:** Content-heavy sites needing scannability, mobile (scroll hijacking is hostile on mobile), accessibility-sensitive contexts.

---

## 10. Quiet Luxury Hero

**Best use case:** High-end fashion, jewelry, private banking, luxury services, architecture firms.

**Visual structure:** Generous whitespace. Single product or editorial image, not filling the frame — floating in space. Serif typography, extreme scale contrast between headline and body. Off-center composition. Palette: near-white, charcoal, single accent.

**Copy structure:**
- Headline: single word or short phrase, large and refined
- Subhead: one line, smaller, light weight
- CTA: understated, uppercase tracking, ghost button or text link

**CTA structure:** Ghost button with wide letter-spacing. High-end aesthetic.

**Motion idea:** Minimal — fade in on load with subtle upward drift. Slow image reveal. No bounce, no pop, no scale.

**Astro component idea:**
`<HeroLuxury>` with large serif typography, CSS Grid asymmetric layout, subtle fade-in keyframes, minimal color palette.

**When not to use:** Mass-market products, high-volume e-commerce, anything requiring broad appeal signals.
