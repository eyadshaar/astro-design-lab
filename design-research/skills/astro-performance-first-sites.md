# Astro Performance-First Website Design

## Purpose
Build Astro websites that are fast, maintainable, secure, and deployable to Cloudflare Pages — without sacrificing design quality.

---

## Why Astro for Marketing Sites

- **Static-first output:** HTML/CSS/JS, no framework runtime overhead
- **Minimal JS by default:** Only islands load JavaScript
- **Fast page loads:** Less than 1s time-to-interactive on static content
- **Lower maintenance:** No plugin ecosystem to manage (unlike WordPress)
- **Better security:** No database, no login, minimal attack surface
- **Clean deployment:** Static files deploy to CDN edge, anywhere
- **Component flexibility:** Use React/Vue/Svelte only where needed (islands)

---

## Recommended Stack

```
Astro 4.x
TypeScript
Tailwind CSS (optional — or scoped CSS)
Cloudflare Pages (deployment target)
```

### Optional
- React/Vue/Svelte (for interactive islands only)
- MDX (for content-heavy pages)
- Astro Content Collections (for structured content)

### Avoid
- Heavy animation libraries (GSAP, Framer Motion) unless necessary
- Large icon libraries (use SVG inline or icons from CDN)
- Image libraries that add significant JS weight

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Blocking Time (TBT) | < 200ms |
| Page weight (HTML+CSS+JS) | < 500KB |
| Time to Interactive | < 3s on 3G |

---

## Performance Techniques

### Images
```astro
---
// Use Astro's <Image> component
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---
<Image
  src={heroImg}
  alt="Descriptive alt text"
  width={1200}
  height={600}
  format="webp"
  loading="eager" /* for hero */
  loading="lazy" /* for below fold */
  class="hero-image"
/>
```

### Fonts
```html
<!-- Preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" as="style" href="font-stylesheet">
<!-- Display swap for performance -->
<link rel="stylesheet" href="font-stylesheet" media="print" onload="this.media='all'">
```

### Critical CSS
Inline critical CSS for above-the-fold content. Let Tailwind or CSS purge the rest.

### Lazy Loading
```astro
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="...">

<!-- Astro <Image> with lazy -->
<Image src={img} loading="lazy" ... />
```

### Script Loading
```astro
<!-- External scripts: defer -->
<script src="/script.js" defer></script>

<!-- Inline minimal scripts -->
<script>
  // Minimal vanilla JS only
</script>
```

---

## File Structure

```
src/
  components/
    layout/
      BaseLayout.astro
      MarketingLayout.astro
    navigation/
      NavbarMinimal.astro
      NavbarSaaS.astro
      MobileNavDrawer.astro
    sections/
      HeroEditorial.astro
      FeatureGrid.astro
      ...
    ui/
      Button.astro
      Container.astro
      Card.astro
      Badge.astro
  pages/
    index.astro
    about.astro
    contact.astro
  styles/
    global.css
    tokens.css
  assets/
    images/
    fonts/
```

---

## Cloudflare Pages Deployment

### Build Settings
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** 18.x or 20.x

### Environment Variables
Set in Cloudflare Pages dashboard:
- `PUBLIC_SITE_URL`
- `PUBLIC_ANALYTICS_ID` (if using analytics)

### Deploy Command
```bash
# Using Wrangler
wrangler pages deploy dist --project-name=my-site

# Or GitHub integration (recommended)
# Connect repo in Cloudflare Pages dashboard
# Set build command and output directory
# Deploys on every push to main
```

### Custom Domain
- Add domain in Cloudflare Pages → Custom domains
- DNS automatically managed if using Cloudflare DNS
- SSL/TLS automatic (flexible or full)

---

## Security Considerations

- No server-side processing (static = no SQL injection, no XSS via backend)
- CSP headers set in `_headers` file
- External resource integrity hashes where possible
- No inline scripts where possible (use `src` or content hashes)
- Forms: use third-party service (Formspree, Basin, Web3Forms) — no backend email

---

## Accessibility

- Semantic HTML (nav, main, section, article, footer)
- ARIA labels on interactive elements
- Focus states visible and styled
- Color contrast 4.5:1 minimum
- Alt text on all images
- Keyboard navigable (Tab, Enter, Space, Esc)
- Skip to main content link
- `prefers-reduced-motion` respected in all animations

---

## SEO

- `<title>` and `<meta name="description">` on every page
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) for business/local business
- Sitemap.xml (generate with @astrojs/sitemap)
- Robots.txt

---

## Build Commands

```bash
# Install
npm create astro@latest -- --template minimal
cd project
npm install

# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy (wrangler)
wrangler pages deploy dist
```

---

## Astro Component Patterns

### Server vs Client Components
```astro
<!-- Static: runs at build time, zero JS -->
<HeroSection />

<!-- Hydrated: runs in browser (island) -->
<InteractiveCalendar client:visible />
<ThemeToggle client:load />
```

### Component Props
```astro
---
interface Props {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
}
const { headline, subheadline, ctaLabel, ctaHref } = Astro.props;
---
```

### Scoped Styles
```astro
<style>
  .section {
    padding: var(--space-8) 0;
  }
  .headline {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 4rem);
  }
</style>
```
