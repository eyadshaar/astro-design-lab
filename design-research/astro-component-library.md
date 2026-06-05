# Astro Component Library Plan
## Design System for Anti-Boilerplate Website Portfolio

---

## Architecture

```
src/
  components/
    layout/
      BaseLayout.astro        # HTML shell, fonts, meta
      MarketingLayout.astro   # Marketing page wrapper
    navigation/
      NavbarMinimal.astro    # Transparent, minimal
      NavbarSaaS.astro       # Conversion-first, sticky
      NavbarLocal.astro      # Phone prominent, local business
      MobileNavDrawer.astro  # Hamburger drawer for mobile
    hero/
      HeroCinematic.astro   # Full-viewport image/video
      HeroEditorial.astro    # Asymmetric split
      HeroConsole.astro      # Terminal/dashboard aesthetic
      HeroProofDriven.astro  # Dashboard screenshot hero
      HeroMapLocal.astro     # Map-based local business hero
    sections/
      SectionContainer.astro # Reusable section wrapper
      LogoCloud.astro        # Integration/trust logos
      MetricsBand.astro      # Count-up proof metrics
      TestimonialGrid.astro  # Testimonial cards
      TestimonialWall.astro  # Masonry testimonial layout
      FeatureGrid.astro      # Feature cards
      FeatureNarrative.astro # Feature with screenshot
      ProcessTimeline.astro  # Timeline process section
      PricingSection.astro   # 3-tier pricing
      FAQSection.astro       # Accordion FAQ
      FinalCTA.astro         # Final conviction CTA
      CaseStudyStrip.astro   # Case study preview
      ComparisonTable.astro   # Feature comparison
      GalleryGrid.astro      # Masonry gallery
      LocalTrust.astro       # Local reviews, map
      BeforeAfter.astro      # Transformation visual
      IntegrationCloud.astro # Integration logos
      ProblemSection.astro   # Problem framing
      TransformationSection.astro # Before/after
    motion/
      Reveal.astro          # Scroll reveal wrapper
      ParallaxImage.astro    # Parallax image
      HorizontalScroll.astro # Horizontal scroll gallery
      CountUp.astro          # Animated counter
    ui/
      Button.astro           # Primary CTA button
      ButtonGhost.astro      # Ghost/secondary button
      Container.astro        # Max-width container
      Badge.astro            # Small label/tag
      Card.astro             # Base card
      CardFeature.astro      # Feature card variant
      CardPricing.astro      # Pricing tier card
      CardTestimonial.astro  # Testimonial card
      Input.astro            # Form input
      FormField.astro        # Label + input wrapper
    brand/
      LogoCloud.astro        # Partner/client logos
      ColorSwatch.astro      # Design token preview
      IconSet.astro          # Icon grid
  pages/
    index.astro
    demos/
      boutique-hotel.astro
      ai-automation-agency.astro
      local-it-cybersecurity.astro
      food-truck-platform.astro
      wellness-brand.astro
  styles/
    global.css              # Base styles, CSS variables
    tokens.css             # Design tokens (colors, spacing, typography)
  content/
    (using Astro content collections for case studies)
```

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors — Boutique Hotel (Forest Journal) */
  --color-background: #F8F5F0;
  --color-surface: #FFFFFF;
  --color-text: #2D2A26;
  --color-text-muted: #6B6B63;
  --color-primary: #4A5D4A;
  --color-accent: #C8A97E;
  --color-dark: #1C1C1A;
  --color-border: #E5E0D8;
  
  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing Scale */
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
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

---

## Component API Standards

### Button.astro

```astro
---
interface Props {
  label: string;
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}
const { label, href, variant = 'primary', size = 'md', loading = false } = Astro.props;
---

<button
  class:list={['btn', `btn-${variant}`, `btn-${size}`, { 'btn-loading': loading }]}
  disabled={loading || undefined}
>
  {loading ? <span class="btn-spinner" /> : label}
</button>
```

### Container.astro

```astro
---
interface Props {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}
const { maxWidth = 'lg', padding = true } = Astro.props;
---

<div class:list={['container', `container-${maxWidth}`, { 'container-padded': padding }]}>
  <slot />
</div>
```

### SectionContainer.astro

```astro
---
interface Props {
  id?: string;
  theme?: 'light' | 'dark' | 'surface';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
const { id, theme = 'light', padding = 'lg' } = Astro.props;
---

<section id={id} class:list={['section', `section-${theme}`, `section-padding-${padding}`]}>
  <slot />
</section>
```

### Reveal.astro (Scroll Animation Wrapper)

```astro
---
// Uses Intersection Observer to add .visible class on scroll
// CSS handles the actual animation
---

<div class="reveal" data-reveal>
  <slot />
</div>

<style>
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
  }
</style>

<script>
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

---

## SEO Component (SEO.astro)

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}
---

<!-- Primary Meta -->
<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
{image && <meta property="og:image" content={image} />}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}

<!-- Canonical -->
<link rel="canonical" href={Astro.url.href} />
```

---

## Layout: BaseLayout.astro

```astro
---
import SEO from '../components/ui/SEO.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <SEO title={title} description={description} image={image} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <slot />
</body>
</html>
```

---

## Performance Requirements

- Zero JS for layout/navigation components
- JS only for: Reveal animation, CountUp, MobileNavDrawer toggle
- All images: `loading="lazy"` except hero (`loading="eager"`)
- Font display: swap
- Critical CSS: inlined in `<head>`
- No unused CSS (Tailwind purge or manual scoping)

---

## Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm: tablet */ }
@media (min-width: 768px) { /* md: tablet landscape */ }
@media (min-width: 1024px) { /* lg: desktop */ }
@media (min-width: 1280px) { /* xl: large desktop */ }
```

Mobile design priority: 390px (iPhone 14 Pro)
Desktop reference: 1440px
