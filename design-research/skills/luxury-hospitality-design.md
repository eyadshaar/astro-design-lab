# Luxury Hospitality Website Design

## Purpose
Design boutique hotel, fine dining, premium travel, and high-end experience websites that feel cinematic and distinctive — not like generic hospitality templates.

---

## Core Philosophy
Hospitality is sensory. The website should preview the experience, not describe it. Visitors should feel the atmosphere before they arrive.

---

## Visual Identity Direction

### Palette
- **Dark luxury:** Near-black (#0B0B0B), warm white (#F8F5F0), champagne gold (#C8A97E)
- **Light luxury:** Warm cream (#FBF8F3), charcoal (#2D2A26), sage green (#8A9E8B)
- No bright saturated colors. No corporate blues.

### Typography
- **Display:** Cormorant Garamond, Bodoni Moda, or Playfair Display — refined, editorial
- **Body:** Jost, Plus Jakarta Sans, or DM Sans — clean, legible
- **Labels:** Wide letter-spacing, uppercase, small size
- Scale: display at 72-120px, generous leading

### Spatial System
- Full-viewport hero with video or large photography
- Generous negative space — content floats
- Off-center compositions (not centered symmetry)
- Navigation transparent over hero
- Section dividers: subtle, not heavy rules

---

## Layout Patterns

### Hero
- Full-viewport image or video (autoplay muted loop)
- Logo top-left, nav transparent
- Minimal text overlay — one headline + one CTA
- Dark vignette on image edges
- Ghost button CTA (outline, not filled)

### Content Sections
- Editorial pacing: full-width image → narrow text → full-width image
- Alternating photo-text rhythm
- Rooms/experiences: magazine-spread layout, not card grid
- No generic "amenities" icon grid — use photography instead

### Navigation
- Minimal: 3-5 links
- CTA: "Reserve" or "Book" — not "Get Started"
- Social links subtle: Instagram as primary

---

## Section Types

### Rooms/Suites
- Magazine-spread layout (full-bleed image, text overlay)
- Room name large, minimal details
- Link to full room page
- NO card grid of room types

### Dining
- Full-bleed food photography
- Menu philosophy, not menu items
- Chef story
- Reservation CTA prominent

### Local Guide
- Editorial itinerary style
- Map optional
- Recommendations from hotel staff voice

### Gallery
- Masonry or horizontal scroll
- Real property photography only
- No stock images

### Guest Quote
- Large italic serif pull quote
- Attribution: name, location, stay date
- Simple — no star ratings or reviewer platform logos

---

## Motion

- Slow Ken Burns on hero (or CSS subtle zoom)
- Fade-in on scroll (opacity, translateY: 20px)
- No bounce, no pop, no scale animations
- Text: subtle fade only
- Reduced motion: fade only, no transform

---

## Copy Voice

- Sensory language ("sleep on 800-thread-count sheets")
- Second person ("Your morning begins with...")
- Minimal exclamation points
- Not "world-class amenities" — describe what that means
- "We" but not overly formal

---

## Common Mistakes to Avoid

- Generic hotel template card grid for rooms
- Corporate blue or green color scheme
- Stock photography (especially lobby shots, beds from above)
- Amenities icon grid with flat icons
- "Experience luxury like never before" — vague
- Multiple CTAs per section
- Hamburger menu hiding "Book Now"

---

## Accessibility Notes

- Ghost buttons need sufficient contrast against photography backgrounds
- Use overlay gradients to ensure text readability
- Alt text on all photography
- Form fields for reservation clearly labeled
- Contact phone number clickable (tel: link)

---

## Astro Implementation

- Use `<video>` with poster image, autoplay muted loop playsinline
- CSS `object-fit: cover` for hero images
- `backdrop-filter: blur()` for frosted glass overlays
- Design for 1440px primary, 390px mobile
- Lazy load images below fold
- No JS required for core experience
