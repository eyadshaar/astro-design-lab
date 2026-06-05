# Astro Multi-Site: Image Path QA Patterns

## The Core Problem: `public/` vs `/images/` Path Mismatch

Astro copies files from `public/` into `dist/` at build time. But the path in your `<img>` tag determines where Astro looks.

**Rule:** If your img src is `/images/foo.jpg`, Astro copies it from `public/images/foo.jpg`.  
**Rule:** If your img src is `/foo.jpg`, Astro copies it from `public/foo.jpg`.

If the src says `/images/` but the file lives at `public/hero.jpg` — Astro copies nothing, the `<img>` tag stays in HTML, the browser gets a 404.

## Real-world failure pattern (June 2026)

Six Astro demo sites, all built and deployed to Cloudflare Pages. Broken images on first review:

| Site | Problem |
|------|---------|
| The Canopy House | 17 `<img src="/images/...">` but files in `public/hero.jpg`, `public/gallery/*.jpg` (root-level, no `/images/` subdir) |
| Solace Wellness | 9 Unsplash URLs in JS frontmatter variables (`image: 'https://...'`), not `<img>` tags |

### Fix for public-root images → `public/images/` migration

```python
import os

site = "/home/chronos/astro-design-lab/apps/canopy-house"

# Step 1: Figure out what the component actually references
src_dir = os.path.join(site, "src")
import subprocess
result = subprocess.run(
    ["grep", "-roh", 'src="/images/[^"]*"', src_dir],
    capture_output=True, text=True
)
refs = set(result.stdout.strip().split("\n"))
print("Image refs in source:", refs)

# Step 2: Move files to match
public = os.path.join(site, "public")
if not os.path.exists(os.path.join(public, "images")):
    os.makedirs(os.path.join(public, "images"))

for f in os.listdir(public):
    if f.endswith((".jpg", ".png", ".webp")):
        os.rename(os.path.join(public, f), os.path.join(public, "images", f))
```

### Fix for Unsplash URLs in Astro frontmatter JS variables

```python
# Unsplash URL embedded in frontmatter image variable
# Before: image: 'https://images.unsplash.com/photo-XXXX?w=600&q=80...'
# After:  image: '/images/team-priya.jpg?w=600&q=80...'

# 1. Download the image first
import urllib.request
url = "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=600&q=80&auto=format&fit=crop&facepad=3&faces=1"
local_path = "/path/to/site/public/images/team-priya.jpg"
urllib.request.urlretrieve(url, local_path)

# 2. Replace URL in source
for ext in [".astro"]:
    for fp in glob.glob(f"/path/to/site/src/**/*.{ext}", recursive=True):
        with open(fp) as fh:
            content = fh.read()
        content = content.replace(
            "https://images.unsplash.com/photo-1494790108755-2616b612b977",
            "/images/team-priya.jpg"
        )
        with open(fp, 'w') as fh:
            fh.write(content)
```

## QA Checklist: Pre-deploy image verification

For any Astro site being deployed to Cloudflare Pages (or any static host):

- [ ] Run `grep -roh 'src="/images/[^"]*"' src/` → get all image references
- [ ] `find public/images -type f` → confirm files exist at those paths
- [ ] Any `src="/images/..."` with no corresponding file in `public/images/` = broken image
- [ ] Any `https://images.unsplash.com/...` URL in source (`.astro` frontmatter or template) = broken on deployed site if the hotlink is blocked or the specific photo is removed
- [ ] After `npm run build`: `find dist -name "*.jpg" -o -name "*.png" | wc -l` should match or exceed your `<img>` tag count
- [ ] Deploy and do a visual spot-check: hero image, at least one content image, one thumbnail

## Astro Build vs. Reference Path Map

```
Component src: <img src="/images/hero.jpg">
                  ↓
Astro looks in: public/images/hero.jpg
                  ↓ (copied to dist at build)
Output in dist:  _astro/images/hero.jpg  (or just /images/hero.jpg depending on config)

Component src: <img src="/hero.jpg">
                  ↓
Astro looks in: public/hero.jpg
                  ↓
Output in dist:  _astro/hero.jpg  (or /hero.jpg)
```

The key insight: `public/` is the root of the served static assets. A file at `public/images/foo.jpg` ends up at `/images/foo.jpg` in the deployed output. A file at `public/foo.jpg` ends up at `/foo.jpg`.

## Cloudflare Pages: Verify Deployment

After deploying, verify images load:
```python
import urllib.request

# Quick smoke test — try to load a known image
url = "https://canopy-house.pages.dev/images/hero-forest-dawn.jpg"
try:
    resp = urllib.request.urlopen(url, timeout=5)
    assert resp.status == 200, f"Got {resp.status}"
    print(f"✅ {url} — {resp.headers.get('Content-Length', '?')} bytes")
except Exception as e:
    print(f"❌ {url} — {e}")
```