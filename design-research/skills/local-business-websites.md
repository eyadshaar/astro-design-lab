# Local Business Website Design

## Purpose
Design local business websites that feel trustworthy, grounded, and conversion-focused — not generic template sites.

---

## Core Principle
Local businesses need trust, not flash. The website should communicate: "We are real, we are local, we can be reached."

---

## Local Business Types & Visual Directions

### Service Trades (Plumber, Electrician, HVAC)
**Direction:** Grounded, reliable, professional. Not flashy.
- Color: Navy, forest green, safety orange accents
- Typography: Clean sans-serif, readable
- Images: Real crew photos, real job photos (before/after)
- CTA: Phone number prominent, clickable

### Restaurant / Cafe
**Direction:** Warm, sensory, appetizing. Food-forward.
- Color: Warm neutrals, terracotta, sage green
- Typography: Serif for headings, clean sans for body
- Images: Real food photography (not stock)
- CTA: "Reserve a table" + phone number

### Professional Services (Law, Accounting, Real Estate)
**Direction:** Trust-first, professional, clear.
- Color: Navy, charcoal, muted gold accent
- Typography: Serif display, professional sans body
- Images: Office, team, credentials/badges
- CTA: Consultation booking, phone number

### Wellness / Health
**Direction:** Calm, trustworthy, human.
- Color: Sage green, warm cream, soft blues
- Typography: Soft serif, rounded sans
- Images: Natural light, real practitioners, real spaces
- CTA: Booking widget, phone

### Retail / Boutique
**Direction:** Curated, distinctive, brand-forward.
- Color: Per brand — can be bold but grounded
- Typography: Editorial or boutique-style
- Images: Product photography, store atmosphere
- CTA: "Shop now" or "Visit us"

---

## Essential Elements

### Header
- Logo + business name (prominent)
- Phone number: clickable `tel:` link, visible without scrolling
- Address (optional, if relevant)
- Navigation: Home, Services, About, Contact (4 items max)
- Mobile: hamburger acceptable, but phone number should be visible

### Hero
- Service category or promise headline
- Brief value statement
- Phone number + CTA
- Trust signal (years in business, license, etc.)
- Background: real photo of service/job OR branded pattern

### Services Section
- List services clearly (not generic icon grid)
- Brief description per service
- "Learn more" links or expand
- No features list — brief benefit language

### Social Proof
- Google review score + number of reviews (with link)
- Testimonials with names and neighborhoods
- Years in business badge
- Certifications, licenses, insurance badges
- Local press mentions (if any)

### About Section
- Brief story: who you are, how long you've been here
- Real team photo (not stock)
- Credentials, licensing
- Service area (list neighborhoods or cities)

### Contact Section
- Phone: large, prominent, clickable
- Email
- Address (with embed map)
- Hours
- Contact form (for non-urgent inquiries)
- Emergency/after-hours info (if applicable)

### Footer
- Phone number
- Address
- Hours
- Quick links
- Social links
- License number / copyright

---

## Local SEO Considerations

- Business name, address, phone (NAP) consistent everywhere
- Schema markup: LocalBusiness, Restaurant, ProfessionalService
- Google Business Profile linked
- Map embed (Google Maps iframe)
- Service area clearly stated
- Opening hours posted
- Photo alt text descriptive

---

## Copy Voice

- First person plural ("We") or named person ("John's Plumbing")
- Specific, not generic ("Serving Portland since 2008" not "Serving the community")
- Action-oriented service descriptions
- Real testimonials from named customers
- Years in business as trust signal
- License and insurance mentioned where relevant

---

## Design Patterns to Avoid

- Dark hacker aesthetics (wrong for local service)
- Generic stock photos
- "Get Started" CTAs — use "Call Now" or "Get a Quote"
- Generic "Contact Us" — use "Request a Quote" or "Schedule Service"
- Hamburger menu hiding the phone number on mobile
- No address or phone number
- "World-class service" — too vague
- Generic service icon grid (wrench + gear = nothing)

---

## CTA Strategy

### Primary CTA: Phone
- Make it clickable (tel: link)
- Show number on every page
- On mobile: sticky tap-to-call button

### Secondary CTA: Quote/Contact Form
- Simple form: Name, Phone, Service needed, Description
- Response commitment: "We'll call within 2 hours"

### Tertiary CTA: Email or Text
- For non-urgent inquiries
- Clearly state response time

---

## Mobile Priorities

1. Phone number visible above fold (no hamburger hide)
2. Tap-to-call on phone number
3. Easy-to-tap CTA buttons
4. Address with tap-to-directions
5. Hours clearly visible
6. Simple navigation (4-5 links max)

---

## Astro Implementation

- Use `<a href="tel:+15035550142">` for phone links
- Use `<a href="https://maps.google.com/?q=...">` for directions
- Embed Google Maps iframe in contact section
- Schema JSON-LD for LocalBusiness
- CSS Grid for services layout
- Mobile-first: phone-first design
- `prefers-reduced-motion` respected
