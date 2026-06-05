# Animation & Motion Design System

## Purpose
Implement motion that clarifies hierarchy and guides attention — not decorative animation that creates noise.

---

## Core Principle
Every animation must answer: "What does this motion tell the user?" If the answer is "nothing," remove it.

---

## The Three Animation Types

### 1. Reveal Animations
**Purpose:** Content appears as user scrolls — guides the reading order.

Types:
- Fade up (opacity + translateY)
- Fade in (opacity only)
- Slide in from direction
- Scale up from center

Implementation:
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
}
```

### 2. Interaction Animations
**Purpose:** Confirm user actions and provide feedback.

Types:
- Hover states (button scale, card lift)
- Focus states (outline, glow)
- Loading states (spinner, progress bar, skeleton)
- Success/error states (check, shake, color change)
- Toggle states (switch, checkbox)

### 3. Ambient Animations
**Purpose:** Create atmosphere and brand personality.

Types:
- Slow background gradient shifts
- Floating elements
- Pulsing indicators
- Ken Burns on photography

---

## Signature Motion Rule
**One motion per site.** Pick one technique and use it consistently:
- Staggered reveal on scroll (most versatile)
- Horizontal scroll gallery (creative portfolios)
- Parallax depth layers (cinematic)
- Count-up metrics (proof-heavy)

Multiple competing animations = visual chaos.

---

## Scroll-Triggered Reveals

### Intersection Observer Pattern
```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

### Staggered Reveal
```js
// Add delay to each child
document.querySelectorAll('.stagger-children > *').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
```

---

## Count-Up Metrics

```js
function animateCount(el, target, duration = 2000) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = eased * target;
    el.textContent = isFloat ? value.toFixed(2) : Math.round(value);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

---

## Hover States

### Card Lift
```css
.card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}
@media (prefers-reduced-motion: reduce) {
  .card:hover { transform: none; }
}
```

### Button Press
```css
.btn:active {
  transform: scale(0.97);
  transition-duration: 0.1s;
}
```

---

## Loading States

### Skeleton Screen
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Horizontal Scroll Gallery

```css
.gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1.5rem;
  padding-bottom: 1rem;
  scrollbar-width: none; /* Firefox */
}
.gallery::-webkit-scrollbar { display: none; } /* Chrome */
.gallery > * {
  scroll-snap-align: start;
  flex: 0 0 min(300px, 80vw);
}
```

---

## Prefers Reduced Motion

**Always implement fallbacks.** Never assume animation is desired.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In JS:
```js
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

---

## Performance Rules

1. **Use CSS transforms, not layout properties.** Animate `transform` and `opacity` only — they don't trigger layout recalculation.

2. **Avoid animating `width`, `height`, `top`, `left`** — these trigger layout and are expensive.

3. **`will-change` sparingly** — only on elements actively animating, removed after:
```css
.animating { will-change: transform; }
/* After animation ends: */
.animating { will-change: auto; }
```

4. **Lazy load animations** — use Intersection Observer so off-screen elements don't animate until visible.

5. **Test on low-end devices** — animation that runs at 60fps on a MacBook Pro might be 15fps on a budget Android phone.

---

## Common Mistakes

- Animation on every element (noise)
- Animation that blocks content (frustration)
- No reduced-motion fallback (accessibility violation)
- Animation duration too long (> 600ms for micro-interactions)
- Autoplay video with sound (user autonomy violation)
- Animation without purpose (decoration)
- Using JS for CSS-solvable animations (performance cost)
