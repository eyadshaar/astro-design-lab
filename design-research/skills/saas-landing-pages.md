# SaaS Landing Page Design System

## Purpose
Build SaaS landing pages that communicate value, build trust, and convert — without falling into generic AI output patterns (gradient blob, three-card grid, vague copy).

---

## Brand Identity First

Before designing, define:

1. **Who is this for specifically?** (Not "teams" — "engineering teams shipping multiple times per day who are drowning in status Slack")
2. **What is the one outcome?** (Not "improve productivity" — "incident response drops from 4 hours to 45 minutes")
3. **What is the visual metaphor?** (Not "clean modern SaaS" — "command console," "workflow engine," "intelligence dashboard")
4. **What color territory is unexpected?** (Purple-blue gradients are the AI default — find your own)

---

## Layout Sequence

### Proven Conversion Structure

```
1. Hero (above fold — 5 seconds to communicate value)
2. Social proof strip (logo cloud — immediate credibility)
3. Problem framing (why this exists)
4. Product demo (show, not just tell)
5. Feature deep dive (how it works)
6. Proof (metrics, testimonials, case studies)
7. Comparison/pricing (options clarity)
8. FAQ (objection handling)
9. Final CTA (final conviction)
```

### Alternate: Editorial Sequence

```
1. Founder story/opening hook
2. Problem → Solution narrative
3. Product reveal
4. How it works
5. Social proof
6. CTA
```
Use when founder story IS the differentiator.

---

## Hero Patterns (Pick One)

### 1. Dashboard Proof Hero
Product UI as hero visual. Outcome metrics overlaid. Headline states the result.

### 2. Cinematic Product Hero
Full-bleed product shot (real UI, not mockup). Dark background. Minimal text.

### 3. Split Editorial Hero
Asymmetric two-column. Large headline left, product visual right. More editorial feel.

### 4. Command Console Hero
Terminal/code aesthetic. Monospace headline. Animated code flow. For dev tools.

---

## Social Proof Strip

- 4-6 recognizable company logos (real logos, not text)
- "Trusted by [X] teams at [Y] companies"
- Light gray background to separate from hero
- Horizontal layout, centered

---

## Proof Elements

### Metrics
- Large numbers with context ("2.4M deployments/year" not "2.4M")
- Count-up animation on scroll
- 3-5 metrics max

### Testimonials
- Full attribution (name, role, company, photo)
- Specific outcomes described in user's words
- Real quotes, not "amazing product!" platitudes
- 3-5 testimonials, grid or horizontal scroll

### Case Studies
- Company name + key outcome
- Brief problem statement
- "Read full case study" link
- 2-4 case studies

---

## Pricing Section

- 3 tiers max (Starter, Growth, Scale — not Basic, Pro, Enterprise)
- Recommended tier visually elevated (larger, badge, glow)
- Price + billing period clear
- Key features per tier (not exhaustive lists)
- CTA per tier matching the tier value
- Monthly/annual toggle with savings shown

---

## FAQ Section

- User's actual questions in their words
- Honest answers (including "it depends" answers)
- Accordion format, 6-10 questions
- Covers objections, pricing details, integration questions

---

## CTA Copy

| Instead of | Write |
|------------|-------|
| "Get Started" | "Start your free trial" |
| "Contact Us" | "Talk to our team" |
| "Learn More" | "See how it works" |
| "Submit" | "Send project brief" |
| "Sign Up" | "Create free account" |

---

## Design Anti-Patterns

- [ ] NO purple-to-blue gradient hero
- [ ] NO centered headline + three-card feature layout
- [ ] NO "supercharge your workflow" copy
- [ ] NO stock photos of laptops, devices, or team meetings
- [ ] NO "world-class features" feature lists
- [ ] NO fake testimonial names or photos
- [ ] NO more than 3 pricing tiers
- [ ] NO autoplay video with sound
- [ ] NO hamburger menu hiding the primary CTA

---

## Responsive Strategy

- Desktop: full layouts, horizontal galleries, multi-column grids
- Tablet: reduce columns, maintain horizontal for logos and testimonials
- Mobile: single column, full-width CTAs, sticky CTA bar at bottom, hamburger nav acceptable here

---

## Astro Implementation

- Use `<video>` for demo reels (muted, no autoplay on mobile)
- CSS Grid for dashboard/console layouts
- Intersection Observer for scroll-triggered reveals
- `prefers-reduced-motion` for all animations
- `loading="lazy"` on all images below fold
- Semantic HTML throughout (nav, main, section, article)
- Open Graph and Twitter Card meta tags
