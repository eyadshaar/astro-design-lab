# CTA (Call-to-Action) Design System

## Purpose
Design CTAs that convert — where the button is the climax of a proof sequence, not the opening act.

---

## Core Principle
A CTA without proof is asking too early. The button is the reward for reading, not the invitation to begin.

---

## CTA Anatomy

### Elements
1. **Surrounding context** (proof, value statement, social evidence)
2. **Headline or transition** (reframe the outcome)
3. **Primary button** (specific action + outcome)
4. **Optional secondary action** (lower commitment)

### Button Anatomy
- Label: outcome-focused ("Book my audit") not action-focused ("Submit")
- Size: minimum 44px height (touch target)
- Color: contrast with surrounding palette
- Border-radius: 6-12px (not too rounded, not sharp)
- Padding: 12px 24px minimum

---

## CTA Copy Patterns

| Context | Weak CTA | Strong CTA |
|---------|---------|-----------|
| SaaS trial | "Get Started" | "Start your free 14-day trial" |
| Consultation | "Contact Us" | "Book a 30-minute strategy call" |
| Audit | "Submit" | "Get my free security audit" |
| Demo | "Learn More" | "Watch the 2-minute demo" |
| Pricing | "Buy Now" | "See who's on our Growth plan" |
| Download | "Download" | "Download the 2024 State of DevOps report" |
| Waitlist | "Join" | "Join 2,400 others on the waitlist" |
| Booking | "Book Now" | "Reserve your table for Friday" |
| Local service | "Contact" | "Call (503) 555-0142" |

---

## CTA Placement

### Primary Placement
- **Above fold (hero):** Only if product is simple and low-commitment
- **After proof sequence:** Hero → Proof → CTA (preferred for most SaaS)
- **Final section:** After all proof, testimonials, pricing — final conviction CTA
- **Navbar:** Always visible for high-intent pages (demo pages, pricing pages)

### Density Rule
- One primary CTA per section
- Two CTAs max per page (primary + secondary)
- More than two CTAs = attention division

---

## Form CTAs

### Minimize Fields
Every additional field drops conversion. Ask only:
- Email (for content download, waitlist)
- Email + Name (for newsletter)
- Name + Email + Company (for consultation)
- Never: phone + company + role + budget + timeline + message

### Inline Validation
- Validate on blur, not on submit
- Show green checkmark on valid
- Error message on invalid (not "invalid input")

### Button States
- Default: brand color
- Hover: slightly darker or scale 1.02
- Active/Pressed: darker still, scale 0.98
- Loading: spinner or "Sending..." text, disable button
- Disabled: reduced opacity, no pointer

---

## CTA Sections

### Final Conviction CTA
- Full-width, distinct background
- Reframe the outcome one last time
- One button, one action
- Optional: brief urgency or social proof reminder
- NO form fields here

### Calculator CTA
- Input fields for key variables
- Output: calculated result (e.g., time saved, money saved)
- Button to unlock full version
- Works for: ROI tools, time trackers, pricing estimators

### Book a Consultation CTA
- Split: value proposition left, calendar widget right
- Brief description of what happens on the call
- Calendar embed or "Book time" link

### Claim Local Offer CTA
- Flyer-style card
- Offer with clear terms (expiry, service area)
- Print/clip coupon interaction
- Works for: restaurants, local services, promotions

---

## Button Color Guidance

- Primary CTA must contrast with background — if everything is blue, CTA must NOT be blue
- Green for "positive" actions (start trial, download, subscribe)
- Orange for "cautionary/engagement" (book call, get demo)
- Dark/navy for "serious" actions (apply, buy, enterprise)

---

## Motion

- Hover: subtle scale (1.02) or color shift, 150ms
- Click: press effect (scale 0.98), 100ms
- Loading: spinner replaces text, button disabled
- Success: checkmark + "Done!" text, color shift to green

---

## Accessibility

- `<button>` element, not `<a>` styled as button
- `aria-label` for icon-only buttons
- Focus state visible and styled
- Minimum 44px touch target
- Color not the only indicator of state (icon + text + color)
- Loading state announced with `aria-live`

---

## Astro Implementation

```astro
<!-- Button.astro -->
<button
  class:list={["btn", `btn-${variant}`, { "btn-loading": loading }]}
  disabled={loading}
  aria-busy={loading}
>
  {loading ? <Spinner /> : label}
</button>

<style>
  .btn {
    padding: 12px 24px;
    min-height: 44px;
    border-radius: 8px;
    font-weight: 600;
    transition: transform 0.15s ease, background 0.15s ease;
  }
  .btn:hover { transform: scale(1.02); }
  .btn:active { transform: scale(0.98); }
  @media (prefers-reduced-motion: reduce) {
    .btn { transition: none; }
  }
</style>
```

---

## Common Mistakes

- "Get Started" without specifying the next step
- CTA before proof is established
- Multiple CTAs in one section
- CTA color blending into background
- Form with too many fields
- "Submit" as button label
- No hover state on button
- Button smaller than 44px touch target
