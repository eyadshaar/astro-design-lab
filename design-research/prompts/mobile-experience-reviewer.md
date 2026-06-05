# Mobile Experience Reviewer
## Checklist for Mobile-First Website Quality

---

## Core Mobile Principles

1. **Mobile is not desktop — design for touch and small screens**
2. **Content priority is more critical on mobile — what matters most?**
3. **Thumb zone navigation — most interaction is one-handed**
4. **Performance is critical — mobile users are on variable connections**

---

## Review Checklist

### Navigation
- [ ] Nav collapses to hamburger OR bottom tab bar (NOT hidden hamburger without tap target)
- [ ] Phone number visible and tap-to-call on mobile service businesses
- [ ] Mobile nav has minimum 44px tap targets
- [ ] Hamburger menu has visible close button
- [ ] Nav menu is dismissible (tap outside or Esc key)
- [ ] Logo links to home

### CTAs
- [ ] Primary CTA button minimum 44px height
- [ ] CTA is above fold or immediately visible on scroll
- [ ] Tap-to-call button present for local businesses
- [ ] Form fields are touch-friendly (not too small)
- [ ] Form submit button is prominent and clearly labeled

### Typography
- [ ] Body text minimum 16px (prevents iOS auto-zoom on focus)
- [ ] Headlines scale appropriately (clamp-based fluid sizing)
- [ ] Line height is comfortable (1.4-1.6 for body)
- [ ] Letter spacing is not too tight on small text

### Layout
- [ ] Single column layout (no horizontal scrolling)
- [ ] Full-width sections on mobile
- [ ] Images scale to container width
- [ ] No horizontal scrolling due to fixed-width elements
- [ ] Cards stack vertically, not side-by-side

### Images
- [ ] Images are responsive (srcset or max-width: 100%)
- [ ] Lazy loading on below-fold images
- [ ] No large hero images that block content
- [ ] Alt text on all images

### Performance
- [ ] Page weight < 500KB total
- [ ] Critical fonts preloaded
- [ ] No render-blocking JavaScript
- [ ] LCP < 2.5s on 3G
- [ ] No autoplay video with sound

### Forms
- [ ] Input fields minimum 44px height
- [ ] Labels are visible (not placeholder-only)
- [ ] Error messages are specific and helpful
- [ ] Success state is clear

### Touch Interactions
- [ ] No hover-only interactions (hover must have touch equivalent)
- [ ] Swipe gestures work correctly
- [ ] No small tap targets (minimum 44x44px)
- [ ] Pull-to-refresh works if applicable

### Accessibility
- [ ] Text contrast 4.5:1 minimum on all text
- [ ] Focus states visible for keyboard navigation
- [ ] Screen reader can navigate all content
- [ ] Touch targets spaced to prevent mis-taps

---

## Mobile Anti-Patterns to Reject

- [ ] Hamburger menu hiding phone number
- [ ] Desktop horizontal scroll on mobile
- [ ] 14px body text causing iOS auto-zoom
- [ ] Fixed-width images causing horizontal scroll
- [ ] Hover-only tooltips or menus
- [ ] Autoplay video
- [ ] Large full-bleed images blocking content
- [ ] Form fields too small for touch
- [ ] No tap-to-call on mobile for phone-linked businesses
- [ ] No back button for multi-step forms
