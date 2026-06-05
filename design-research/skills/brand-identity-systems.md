# Brand Identity Systems

## Purpose
Build visual identities that are distinctive, cohesive, and implementable — not just mood boards.

---

## Brand Identity Components

1. **Logo** — Mark, wordmark, or combination
2. **Color Palette** — Primary, secondary, accent, neutral, semantic
3. **Typography** — Display, body, mono
4. **Spatial System** — Grid, spacing scale, alignment rules
5. **Motion Temperament** — Animation style, timing, easing
6. **Visual Assets** — Icons, illustrations, photography style
7. **Voice & Tone** — How the brand speaks

---

## Color Palette Creation

### Step 1: Find Your Territory
What color territory is unclaimed in your industry?
- If everyone is blue, consider: warm amber, forest green, burgundy, or slate
- If everyone is dark, consider: warm cream background, soft white

### Step 2: Define Roles
- **Primary:** One color that IS the brand (use 40%+ of the time)
- **Secondary:** Supporting colors (15-30%)
- **Accent:** Used sparingly for CTAs and highlights (5-10%)
- **Neutral:** Backgrounds, text (40-60%)
- **Semantic:** Success green, warning amber, error red (reserved, not decorative)

### Step 3: Create Dark Mode (if applicable)
Dark mode is a different experience, not just inverted:
- Backgrounds: not pure black — use #0D0D0F or #0F1117
- Surfaces: subtle elevation with slightly lighter values
- Text: off-white, not pure white (#E8E8E8 not #FFFFFF)
- Accent colors may shift in dark mode

---

## Typography System

### Typeface Selection
- **Display:** Used for headlines, 24px+. Needs visual impact. Can be expressive.
- **Body:** Used for paragraphs, 16-18px. Needs high readability. Neutral personality.
- **Mono:** For code, data, technical values. Use consistently.

### Pairing Formula
- One display font (serif OR sans — not both in display)
- One body font (contrast with display — if display is serif, body is sans)
- One mono font (for technical contexts)

### Scale (Perfect Fourth — 1.333 ratio)
```
xs:  12px
sm:  14px
base: 16px
lg:  18px
xl:  21px (approx)
2xl: 24px
3xl: 32px
4xl: 42px
5xl: 56px
6xl: 75px
7xl: 100px
```

### Line Height
- Display: 1.0-1.1 (tight for large type)
- Body: 1.5-1.6 (generous for readability)
- Code: 1.4-1.5

---

## Logo Usage

### Formats
- **SVG:** Preferred for web — scalable, animatable
- **PNG:** Fallback for contexts where SVG fails
- **Favicon:** 32x32 PNG or SVG

### Clear Space
Define minimum padding around logo (typically 1/4 of logo height).

### Color Variations
- Full color (on neutral backgrounds)
- White/reversed (on dark backgrounds)
- Single color (for restricted contexts)

---

## Spatial System

### Spacing Scale (8px base)
```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   24px
6:   32px
7:   48px
8:   64px
9:   96px
10:  128px
```

### Grid
- **4-column grid:** Mobile
- **8-column grid:** Tablet
- **12-column grid:** Desktop
- Column gap: 24px
- Container max-width: 1280px
- Container padding: 24px (mobile) / 48px (desktop)

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #1A1A2E;
  --color-secondary: #16213E;
  --color-accent: #E94560;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
  
  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

---

## Photography Style Guide

Define explicitly:
- **Subject matter:** Real people in real environments? Products in use? Abstract?
- **Treatment:** High contrast? Soft and muted? Dark and moody? Bright and airy?
- **Sources:** Original photography? Stock — if so, which library and style? Custom illustration?
- **What to avoid:** Stock clichés (team high-fiving, laptops with code, handshakes)

---

## Motion Temperament

Define per brand:
- **Speed:** Fast (150-200ms) or slow (400-600ms)?
- **Easing:** Linear (mechanical), ease-out (friendly), ease-in-out (smooth)?
- **Entrance:** Fade, slide, scale?
- **Exit:** Fade, slide, scale?
- **Signature animation:** One recurring technique

---

## Accessibility

- Color contrast: 4.5:1 minimum for body text, 3:1 for large text
- Don't convey meaning through color alone
- Typography: minimum 16px for body text
- Interactive elements: 44px minimum touch target
- Focus states: visible and styled
