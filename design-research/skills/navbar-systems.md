# Navbar Design System

## Purpose
Design navigation systems that match product complexity and conversion goals — not generic top bars.

---

## Core Principle
Navigation complexity must match product complexity. A 5-page site needs simple nav. A complex B2B platform needs mega menus, search, and documentation links.

---

## Navbar Types

### 1. Minimal Editorial
**For:** Portfolios, magazines, creative studios
- Transparent or light background
- Logo left, 3-5 links right
- CTA button (subtle)
- No hamburger on desktop
- Sticky on scroll with background

### 2. Conversion SaaS
**For:** SaaS landing pages, demo-focused products
- Solid background (white or dark)
- Logo left, links center
- Sign in (text) + CTA button (right)
- Sticky with shadow

### 3. Product Mega Menu
**For:** E-commerce, content-heavy B2B, marketplaces
- Hover/click dropdown with 2-5 columns
- Category headers + sub-links
- Featured item in right panel
- Full-width dropdown

### 4. Mobile Bottom Nav
**For:** PWAs, mobile-first apps
- Fixed bottom bar
- 4-5 icon + label items
- Active state highlighted
- No top hamburger

### 5. Command Palette
**For:** Developer tools, productivity apps, complex software
- Search-first (Cmd+K trigger)
- Categorized results
- Keyboard navigable
- Still needs visible nav links as fallback

### 6. Local Service
**For:** Plumbers, HVAC, restaurants, local businesses
- Phone number prominent (clickable)
- "Call Now" or "Book Online" primary CTA
- Service area indicator
- Essential links only: Home, Services, About, Contact

---

## Design Tokens

### Spacing
- Horizontal padding: 1.5rem - 3rem (24-48px)
- Vertical nav height: 4rem - 5rem (64-80px)
- Logo size: 1.25rem - 2rem height

### Typography
- Nav links: 0.875rem - 1rem
- Font weight: 400-500 (not bold)
- Letter spacing: 0.01em (tight)
- Uppercase only for utility labels

### Color
- Background: transparent or solid (white/dark)
- Text: high contrast (90% black or white)
- CTA: brand accent, high contrast
- Hover underline: brand color, 2px, offset

---

## Mobile Nav Patterns

### Hamburger Drawer
- Three-line icon (☰) standard
- Full-screen or side-panel overlay
- Close button (×) top right
- Large tap targets (min 44px)
- Smooth slide-in animation

### Bottom Tab Bar
- 4-5 items
- Icon + label
- Active: filled icon + accent color
- Safe area padding for notched devices

---

## Scroll Behavior

### Transparent-to-Solid
1. Nav starts transparent (over hero image)
2. On scroll past hero threshold, nav gets solid background + shadow
3. Logo and text colors may swap
4. CSS transition: 200-300ms ease

```css
.nav {
  background: transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.nav.scrolled {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

## CTA Placement

- **Primary CTA always visible:** For SaaS landing pages, demo pages, lead gen — "Start Free Trial" or "Book Demo" in nav
- **CTA in final section only:** For editorial sites, portfolios — don't distract from content

---

## Accessibility

- All interactive elements keyboard accessible (Tab, Enter, Space, Esc)
- Focus states visible and styled
- ARIA labels on icon-only buttons
- `nav` element with `aria-label`
- Skip to main content link
- Mobile hamburger: `aria-expanded` on toggle
- Dropdown: `aria-haspopup="true"`, `aria-expanded` on trigger

---

## Astro Component API

```astro
---
// NavbarSaaS.astro
interface Props {
  logo: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  sticky?: boolean;
  transparent?: boolean;
}
---
```

```astro
---
// MobileNavDrawer.astro
interface Props {
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}
---
```

---

## Common Mistakes

- Hamburger menu on desktop (hides content)
- Too many nav items (cognitive overload)
- Nav color doesn't swap on scroll (low contrast over images)
- No mobile CTA (missed conversion)
- Logo too large (consumes space)
- Deep mega menu nesting (confusing)
