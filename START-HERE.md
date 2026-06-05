# START HERE — Your First Website, Step by Step

> **You just bought a domain. You want a real website on it. This guide walks you through it, one click at a time, with Hermes (your AI assistant) doing the heavy lifting.**

This repo is a **complete website starter kit**. It contains 6 fully built websites (boutique hotel, restaurant, IT company, wellness brand, etc.) that you can customize, deploy to the internet, and attach to the domain you just bought.

**You don't need to know how to code.** Hermes will read this guide, ask you a few questions, and handle the rest.

---

## What's In This Repo

```
astro-design-lab/
├── START-HERE.md            ← you are here — the guide your AI is reading
├── HANDOFF.md               ← technical reference (for the AI)
├── README.md                ← overview of the system
├── apps/                    ← 6 complete websites ready to deploy
│   ├── portfolio/           ←   a portfolio site
│   ├── boutique-hotel/      ←   a hotel website
│   ├── ai-automation-agency/ ←  a tech agency
│   ├── local-it-cybersecurity/ ←  an IT company
│   ├── food-truck-platform/ ←   a restaurant / food truck
│   └── wellness-brand/      ←   a wellness brand
├── design-research/         ← the design system that makes these look professional
├── .github/workflows/       ← automation: push code → live website
└── handoff/                 ← AI skills that handle Cloudflare + DNS for you
```

**The 6 websites are already live** as demos at:
- `https://canopy-house.pages.dev` (boutique hotel example)
- `https://fieldstone-it.pages.dev` (IT company example)
- `https://copper-kitchen.pages.dev` (restaurant example)
- `https://meridian-security.pages.dev`, `https://solace-wellness.pages.dev`, `https://astro-design-lab-portfolio.pages.dev`

Pick the one closest to your business — you'll customize it.

---

## What You Need Before Starting

You should already have these. If not, ask your AI to help you set them up.

1. **A domain you bought** (e.g., `yourbusiness.com`) from any registrar
   — Namecheap, GoDaddy, Cloudflare Registrar, Google Domains, etc.
2. **A Cloudflare account** — free tier is fine. Sign up at https://dash.cloudflare.com/sign-up
3. **A GitHub account** — free. Sign up at https://github.com/signup
4. **The API keys already in your environment:**
   - `GITHUB_ODNT_TOKEN` (or `GITHUB_TOKEN`) — lets your AI push code to GitHub
   - `CLOUDFLARE_API_KEY` (or `CLOUDFLARE_API_TOKEN`) — lets your AI manage Cloudflare
   - `CLOUDFLARE_EMAIL` — the email on your Cloudflare account
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

   If any of these are missing, **stop and ask your AI to help you create them** before continuing. They're free and take about 5 minutes to set up.

---

## The Plan (5 Steps)

```
1. Pick a website template       ← 2 minutes
2. Customize it for your business ← 30-60 minutes (with AI help)
3. Push to GitHub                  ← 1 minute (AI does this)
4. Deploy to Cloudflare Pages      ← 2 minutes (AI does this)
5. Connect your domain             ← 5-15 minutes (mostly waiting for DNS)
```

**Total time: about 1-2 hours of your attention, the rest is automated.**

---

## Step 1 — Pick a Website Template

Open the 6 live demos in your browser and look at them. Pick the one closest to your business.

| # | Live Demo | Best For |
|---|-----------|----------|
| 1 | https://canopy-house.pages.dev | Hotels, B&Bs, vacation rentals, hospitality |
| 2 | https://fieldstone-it.pages.dev | IT support, computer repair, B2B services, local services with phone calls |
| 3 | https://copper-kitchen.pages.dev | Restaurants, food trucks, cafés, food businesses |
| 4 | https://meridian-security.pages.dev | Tech companies, security firms, agencies, B2B software |
| 5 | https://solace-wellness.pages.dev | Wellness brands, therapists, coaches, beauty/spa |
| 6 | https://astro-design-lab-portfolio.pages.dev | Personal portfolio, freelance designer, creative work |

**Don't see a perfect match?** Pick the one that's *closest* — you'll customize it heavily. Or, tell your AI "I run a [your business type], pick the closest starting point and adapt it."

**What to tell your AI:**

> "I'm starting with the [template name] template. My business is [describe your business in 1-2 sentences]. Let's customize it."

---

## Step 2 — Customize It For Your Business

**This is where Hermes earns its keep.** Tell it what you want and it'll make the changes.

### Things to customize (in rough priority order):

1. **Your business name** — appears in the header, footer, page title
2. **Your tagline / hero text** — the first thing visitors see
3. **Your contact info** — phone number, email, physical address
4. **Your services or products** — what you actually offer
5. **Your about story** — why you do what you do
6. **Your colors and fonts** — match your brand (the templates have good defaults, but you can change them)
7. **Your photos** — replace the demo images with your own (real photos, not stock)
8. **Your social links** — Instagram, Facebook, LinkedIn, etc.

### How to ask your AI to make changes:

Just describe what you want in plain English. Examples:

> "Change the business name on the homepage to 'Joe's Plumbing' and update the phone number to 555-0123."

> "Replace the hero image with this one I uploaded [attach photo]."

> "Add a new service called 'Emergency Repairs' that costs $99 and is available 24/7."

> "Change the primary color to match my logo: a deep forest green like #1a4d2e."

The AI will edit the files and show you the changes.

### Best practices (read these — they save you time later):

1. **Use real photos, not stock.** Take 5-10 photos of your business with your phone. They will look 10x better than any stock photo and Google will rank you higher in local search.

2. **Write your own copy.** AI can help you draft it, but the best websites sound like *you*. Use words your customers actually use.

3. **Be specific.** Instead of "We do computer repair," write "We fix broken laptop screens in Houston, usually same-day, starting at $89."

4. **One clear call-to-action per page.** Tell visitors exactly what to do — call, book, order, sign up. Don't make them guess.

5. **Mobile-first.** Most of your visitors will be on phones. Open your site on your phone after every change and check it.

6. **Don't over-design.** These templates are deliberately clean. Resist the urge to add 50 things. A simple site that loads fast converts better than a fancy site that confuses people.

7. **Add a real phone number.** If you have a business phone number, make it BIG and clickable (tap-to-call on mobile). Local businesses especially need this.

8. **Test before deploying.** After every batch of changes, ask the AI to run `npm run build` to make sure nothing is broken.

9. **Don't worry about perfection.** Get a basic version live first. You can always update it. A live imperfect site beats a perfect one stuck on your hard drive.

10. **Save your work.** Every time you finish a batch of changes, ask the AI to commit and push them to GitHub. That way nothing is lost.

---

## Step 3 — Push to GitHub

Once you're happy with the changes (or even if you're not — you can always update later), tell your AI:

> "Push these changes to GitHub. Create a new repo called [your-business-name] under [your GitHub username]."

The AI will:
1. Create a new public (or private) repo on your GitHub account
2. Push all the code
3. Give you a URL like `https://github.com/yourname/your-business`

**Why GitHub?** It's where your website code lives. Every time you update, you push a new version. Cloudflare watches GitHub and auto-deploys new versions to the live site.

---

## Step 4 — Deploy to Cloudflare Pages

Tell your AI:

> "Deploy this to Cloudflare Pages. Create a Pages project called [your-business-name] and give me the live URL."

The AI will:
1. Use the Cloudflare API to create a new Pages project
2. Connect it to your GitHub repo
3. Trigger the first deploy
4. Give you a URL like `https://your-business.pages.dev`

**Verify it works:** Open the URL in your browser. You should see your customized site.

**If images are broken:** This is the #1 issue. Tell the AI "The images are broken on the deployed site" — it has a checklist to fix this.

---

## Step 5 — Connect Your Domain

This is the part where your domain (`yourbusiness.com`) starts pointing at your new website.

### Tell your AI:

> "My domain is [yourdomain.com]. Connect it to my Cloudflare Pages site at [your-business].pages.dev."

The AI will handle most of it. Here's what happens behind the scenes:

### 5.1 — Move your domain to Cloudflare (if it's not already there)

Cloudflare needs to be your DNS provider so it can route traffic to your Pages site. If you bought your domain from Namecheap, GoDaddy, etc., you have two options:

**Option A — Full move (recommended):** Tell your AI "Move my domain to Cloudflare Registrar." It's free and keeps everything in one place. The AI will walk you through unlocking the domain at your registrar and pointing the nameservers to Cloudflare.

**Option B — Keep your registrar, just use Cloudflare for DNS:** Tell your AI "Add my domain to Cloudflare as an external zone." You'll need to point your domain's nameservers to Cloudflare's two nameservers (the AI will give you these). Your registrar stays the same.

**Either way, DNS changes take 5 minutes to 48 hours to propagate.** Usually it's fast (under an hour) but be patient.

### 5.2 — Add the domain to your Pages project

Once Cloudflare is managing your DNS, the AI will:

1. Create a CNAME record: `www.yourdomain.com` → `your-business.pages.dev`
2. Add `www.yourdomain.com` as a custom domain on your Pages project
3. Cloudflare automatically provisions a free SSL certificate (the padlock in the browser)
4. Optionally redirect the bare domain (`yourdomain.com`) to `www.yourdomain.com`

### 5.3 — Verify it's working

After 5-30 minutes, open `https://www.yourdomain.com` in your browser. You should see your new website, with a padlock (secure HTTPS).

**If it doesn't work:**

- Wait longer (DNS can take up to 48 hours, rare but possible)
- Ask your AI to check: "Is my domain pointing to the Pages site correctly? Run the DNS check and tell me what you find."
- Common issues: nameservers not changed yet, CNAME record typo, SSL still provisioning

### 5.4 — Set up email (optional but recommended)

Once your domain is on Cloudflare, you can set up free email forwarding. Example: `info@yourdomain.com` forwards to your personal Gmail.

Tell your AI: "Set up email forwarding for info@yourdomain.com to [your-email]@gmail.com."

The AI will use the Cloudflare Email Routing API to do this. You'll get a verification email to your Gmail — click the link, and you're done.

---

## What To Do After You're Live

Congratulations! Your site is live. Now:

1. **Tell people.** Share the URL on your social media, business cards, email signature.

2. **Submit to Google.** Go to https://search.google.com/search-console and add your domain. This gets you on Google search faster.

3. **Add Google Analytics (optional).** Tells you how many people visit. The AI can add this for you.

4. **Keep updating.** Add new photos, post about new services, update hours. The AI can do all of this.

5. **Backups.** Your code is on GitHub — that's your backup. If anything breaks, you can always re-deploy.

6. **Don't touch what works.** If your site is live and customers are finding you, don't redesign it every week. Make small improvements over time.

---

## Quick Reference: Talking to Your AI

Here's a cheat sheet of things you can ask your AI to do. Just copy-paste and fill in the blanks.

### To customize your site:

- "Change [thing] to [new value]."
- "Add a new section for [topic]."
- "Make the [section] more [adjective]."
- "Replace the image in [location] with [description of new image]."

### To deploy and update:

- "Build the site. Does it work?"
- "Push my changes to GitHub."
- "Deploy to Cloudflare Pages."
- "Trigger a new deploy for [project name]."

### To manage your domain and DNS:

- "What DNS records exist for [domain]?"
- "Add a CNAME for [subdomain] pointing to [destination]."
- "Move my domain to Cloudflare."
- "Set up email forwarding for [address]@yourdomain.com to [destination]."

### To troubleshoot:

- "The site is showing a blank page. What's wrong?"
- "Images aren't loading. Check the image paths."
- "My domain isn't resolving. Check the nameservers and DNS records."
- "The build is failing. Show me the error."

### To learn (when you have time):

- "Explain what just happened in plain English."
- "What does this file do?"
- "What would happen if I changed [X]?"
- "Show me the difference between [A] and [B]."

---

## A Note on Best Practices

These are the things that separate a "looks like a template" site from a "looks like a real business" site:

1. **Real information.** Your real address, real phone, real hours, real services. None of this "Lorem ipsum" or "555-0100."

2. **Real photos.** Your storefront, your team, your work. Phone cameras are good enough. Stock photos are obvious.

3. **Clear pricing (if applicable).** "Starting at $X" or "From $X to $Y" beats "Contact us for pricing" for most service businesses. People hate calling to ask.

4. **Trust signals.** Years in business, number of customers served, certifications, reviews. If you have Google reviews, link them.

5. **Fast load time.** These templates load in under 1 second on any connection. Don't add huge video backgrounds or 50 photos that slow it down.

6. **Working contact form.** Make sure the form actually sends you an email. Test it.

7. **Mobile-friendly.** Test on your phone. If text is too small or buttons are hard to tap, ask the AI to fix it.

8. **Local SEO basics.** Your city name should appear naturally on the homepage ("Serving Houston since 2015"). Your business name, address, and phone should be consistent everywhere online (Google, Yelp, Facebook, your site).

9. **HTTPS.** You get this for free with Cloudflare. Make sure the padlock shows in the browser.

10. **Update it.** A site that says "Last updated 2019" looks abandoned. Even small changes ("New summer hours!") signal that you're active.

---

## When Things Go Wrong

### "My site is blank / has weird errors"

Tell the AI: "Run the build locally and show me the errors." It will run `npm run build` and show you what's broken.

### "Images aren't showing"

Tell the AI: "The images are broken. Check the image paths in the public folder vs. the references in the code." This is the most common deploy issue — the AI has a checklist for it.

### "My domain isn't working"

Tell the AI: "Run a DNS check on [yourdomain.com] and tell me if the nameservers are pointing to Cloudflare." The AI will diagnose and tell you what to fix.

### "I want to change something but I'm scared I'll break it"

Before any big change, ask the AI: "Make a backup branch first, then try the change. If it breaks, we can roll back." GitHub branches are free and easy.

### "I don't understand what the AI is doing"

Ask: "Explain what you just did in plain English." Or: "What files did you change and why?" Hermes is good at explaining its work.

---

## Glossary (For Non-Technical Users)

- **Domain:** Your address on the internet. `yourbusiness.com`. You bought it from a registrar.
- **DNS:** The internet's phone book. Tells browsers where to find your website.
- **Hosting:** Where your website's files live. In this case, Cloudflare Pages.
- **Deploy:** Uploading your website files to the hosting service so people can see it.
- **GitHub:** Where your website's code is stored. Like Google Docs for code.
- **Cloudflare:** The service that hosts your site and protects it from attacks. Free tier is great.
- **SSL / HTTPS:** The padlock in the browser. Means the connection is secure. Free with Cloudflare.
- **Astro:** The tool that builds your website from simple files into fast, clean HTML. You don't need to know how it works.
- **Build:** The process of turning your code files into a finished website. The AI runs `npm run build` for you.
- **Custom domain:** Your own `yourdomain.com` instead of `your-business.pages.dev`. This is what you're connecting in Step 5.

---

## What To Do Right Now

1. **Open the live demos** in your browser. Pick the closest one to your business.
2. **Tell your AI:** "I'm using the [template name] as my starting point. My business is [describe it]. Help me customize it for [your city/region] and [your specialty]."
3. **Make it yours.** Change the name, contact info, photos, and copy. Don't try to do everything at once.
4. **Push, deploy, connect domain.** Tell the AI to handle these steps. It knows what to do.
5. **Test on your phone.** Open the live URL. If it looks good, share it.

That's it. Welcome to the internet.

---

## Still Stuck?

If your AI is helping you, just ask it:

> "I need to deploy my website. Read the START-HERE.md file in the astro-design-lab repo at https://github.com/AdamGeorgesForges/astro-design-lab and walk me through it step by step."

Your AI will read this file, the HANDOFF.md, and the bundled skills, then guide you through the whole process.

**You don't need to understand everything.** You just need to answer questions and approve changes. The AI handles the technical parts.
