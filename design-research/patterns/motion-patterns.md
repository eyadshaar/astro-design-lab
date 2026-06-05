# Motion Pattern Library
## 10 Animation Patterns with Accessibility-First Fallbacks

Every animation in this library is designed to enhance meaning, not decorate. All include `prefers-reduced-motion` fallbacks.

---

## 1. Scroll Reveal

**Purpose:** Content appears as user scrolls — creates a sense of discovery.

**How it works:** Elements start invisible (opacity: 0) and off-position (translateY: 20-40px). When scrolled into viewport, CSS class adds opacity: 1 and translateY: 0. Transition: 400-600ms ease-out.

**Implementation:**
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

**Astro component:** `<Reveal>` — wraps children, uses Intersection Observer.

**Best for:** Body text, card grids, images, feature descriptions.

**Avoid:** Overusing — every element animating on every scroll creates chaos.

---

## 2. Sticky Panels

**Purpose:** Keep contextual information visible while user scrolls through related content.

**How it works:** CSS `position: sticky` or scroll-linked transforms. Panel locks to viewport while related content scrolls past. Used for: table of contents, key figure alongside long article, product detail alongside specs.

**Implementation:**
```css
.sticky-panel {
  position: sticky;
  top: 2rem;
  align-self: flex-start;
}
```
Or scroll-linked via JS: panel moves at different rate than surrounding content creating parallax-lite effect.

**Best for:** Long-form content pages, documentation, comparison tables, article sidebars.

**Avoid:** Multiple sticky elements competing for the same viewport space.

---

## 3. Text Mask Reveal

**Purpose:** Dramatic reveal of headlines — text clips from a visual mask (image, gradient, or color).

**How it works:** Text is clipped using `background-clip: text`. Background image or gradient shifts on scroll or hover, revealing the text. Or: text is inside a mask element that translates to reveal it.

**Implementation:**
```css
.headline-masked {
  background: linear-gradient(90deg, #fff 0%, #000 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  transition: background-position 0.6s ease;
}
.headline-masked:hover {
  background-position: 100% 0;
}
```

**Astro component:** `<TextMaskReveal>` — accepts text, mask image, and scroll-linked animation.

**Best for:** Hero headlines, section titles, dramatic moments.

**Avoid:** Body text (too slow). Overuse — once per page maximum.

---

## 4. Parallax Image Stack

**Purpose:** Depth effect — background and foreground images move at different rates on scroll.

**How it works:** CSS `background-attachment: fixed` for simple parallax. Or JS: background element translates at 0.3x scroll rate while foreground moves at 1x.

**Implementation:**
```css
.parallax-bg {
  background-image: url(...);
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
@media (prefers-reduced-motion: reduce) {
  .parallax-bg { background-attachment: scroll; }
}
```

**Astro component:** `<ParallaxStack>` — accepts array of layers with depth values.

**Best for:** Hero sections, transition zones between page sections.

**Avoid:** Mobile (background-attachment: fixed is buggy). Performance-heavy on low-end devices.

---

## 5. Cursor-Follow Preview

**Purpose:** Micro-interaction that rewards exploration — element follows cursor with slight lag.

**How it works:** Element positioned at cursor coordinates via JS mousemove event. Slight easing (lerp) creates trailing lag.

**Implementation:**
```js
const cursorEl = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, elX = 0, elY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animate() {
  elX += (mouseX - elX) * 0.15;
  elY += (mouseY - elY) * 0.15;
  cursorEl.style.transform = `translate(${elX}px, ${elY}px)`;
  requestAnimationFrame(animate);
}
animate();
```

**Astro component:** `<CursorFollower>` — wraps a target element.

**Best for:** Product card hover previews, interactive showcases.

**Avoid:** Mobile (no cursor). Accessibility contexts where motion is distracting.

---

## 6. Hover Expansion

**Purpose:** Interactive exploration — element grows, reveals info, or transforms on hover.

**How it works:** CSS `transform: scale()` on hover. Additional info revealed via opacity/clip-path change. Smooth transition: 250ms ease.

**Implementation:**
```css
.card {
  transform: scale(1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
@media (prefers-reduced-motion: reduce) {
  .card:hover { transform: none; }
}
```

**Astro component:** `<HoverCard>` — accepts image, title, description, link.

**Best for:** Resource cards, portfolio pieces, pricing tiers, team member spotlights.

**Avoid:** Small targets (scales can feel like moving goalposts). Interactive elements that need precise click targets.

---

## 7. Horizontal Scroll Gallery

**Purpose:** Surprise and pacing — horizontal movement within vertical page scroll.

**How it works:** Container with `overflow-x: auto` or scroll-snap. Or: vertical scroll is converted to horizontal via JS `scrollLeft` mapping.

**Implementation (CSS-only):**
```css
.gallery-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1.5rem;
  padding-bottom: 1rem;
}
.gallery-scroll > * {
  scroll-snap-align: start;
  flex: 0 0 300px;
}
```
Hide scrollbar but keep functionality.

**Astro component:** `<HorizontalGallery>` — accepts items array, renders scrollable row.

**Best for:** Portfolio items, case study thumbnails, product feature showcases.

**Avoid:** Long gallery lists (users get lost). Forcing horizontal scroll on mobile (native swipe is fine but trackpad scroll direction is confusing).

---

## 8. Timeline Progression

**Purpose:** Show sequential process — line draws as user scrolls.

**How it works:** SVG line with `stroke-dashoffset` animated by scroll position. As user scrolls, dash offset decreases, drawing the line.

**Implementation:**
```js
const line = document.querySelector('.timeline-line');
const totalLength = line.getTotalLength();
line.style.strokeDasharray = totalLength;
line.style.strokeDashoffset = totalLength;
window.addEventListener('scroll', () => {
  const rect = line.getBoundingClientRect();
  const scrolled = Math.max(0, -rect.top);
  const progress = Math.min(1, scrolled / rect.height);
  line.style.strokeDashoffset = totalLength * (1 - progress);
});
@media (prefers-reduced-motion: reduce) {
  line.style.strokeDashoffset = 0;
}
```

**Astro component:** `<TimelineProgress>` — accepts steps array, renders SVG timeline.

**Best for:** Process sections, history timelines, roadmap views.

**Avoid:** Too many timeline nodes (confusing). Complex branching timelines.

---

## 9. Count-Up Proof Metrics

**Purpose:** Animated number counters — draw attention to key statistics.

**How it works:** Number starts at 0. On scroll into view, increments over 1-2 seconds with easing. Uses `requestAnimationFrame` for smooth animation.

**Implementation:**
```js
function countUp(el, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
// Trigger via Intersection Observer
```

**Astro component:** `<MetricCounter>` — accepts value, unit, label.

**Best for:** Proof metric bands, outcome sections, social proof numbers.

**Avoid:** Very large numbers (animation takes too long). Animating currency values (decimal issues).

---

## 10. Soft Page Transitions

**Purpose:** Smooth navigation between pages — not a full SPA, but a pleasant fade/slide.

**How it works:** On link click, current page fades out (opacity: 0, 200ms). New page fades in (opacity: 1, 200ms, 100ms delay). Implemented via View Transitions API or JS.

**Implementation (View Transitions API):**
```js
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link || link.target === '_blank') return;
  if (link.href === location.href) return;
  e.preventDefault();
  document.startViewTransition(() => {
    location.href = link.href;
  });
});
```
CSS:
```css
::view-transition-old(root) {
  animation: fade-out 0.2s ease-out;
}
::view-transition-new(root) {
  animation: fade-in 0.2s ease-in 0.1s;
}
@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }
```

**Astro component:** `<PageTransition>` — wraps layout with transition logic.

**Best for:** Portfolio sites, editorial content, any multi-page site where polish matters.

**Avoid:** High-performance-critical pages (adds JS overhead). Pages with forms (transition mid-form is jarring).

---

## Motion Principles

1. **Motion clarifies, never decorates.** If animation does not help hierarchy or understanding, remove it.
2. **Always provide `prefers-reduced-motion` fallbacks.** Do not assume all users want animation.
3. **One signature motion per site.** A recurring motif creates coherence. Multiple competing animations create noise.
4. **Test on mobile.** Many scroll animations are hostile on mobile touch interfaces.
5. **Respect `prefers-reduced-motion`: remove animation entirely, not just slow it.**
6. **Avoid autoplay video with sound.** Users control their audio environment.
7. **Loading states should show progress, not just spinners.** Use skeleton screens or progress bars.
