# Enerzix — Premium Canadian Spring Water

A minimal, performance-focused marketing site for Enerzix, built with Next.js 14 (App
Router), React 18, TypeScript, and Tailwind CSS.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom design tokens for the Enerzix brand
- **Framer Motion** — text reveals, viewport-triggered animations, FAQ accordion, mobile menu
- **GSAP** — the animated liquid surface inside the hero bottle illustration
- **Raw WebGL** (no extra dependency) — the animated caustics/light-through-water shader
  in the hero background
- Hand-drawn **custom SVG icon set** (`components/icons`) — no icon library
- Next.js **Metadata API** for SEO, `app/sitemap.ts` + `app/robots.ts` for sitemap/robots,
  and JSON-LD structured data (Organization, Product, FAQPage)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. This is the first build, so double check everything renders
as expected before deploying — in particular the WebGL shader background needs a device
with WebGL support (it degrades gracefully to a static gradient look if the context fails
to initialize, but there's no polyfill for browsers with WebGL disabled entirely).

```bash
npm run build
npm run start
```

## Design system

| Token | Value | Use |
|---|---|---|
| `brand` | `#005FFF` | Primary brand blue |
| `brand-dark` | `#0047C2` | Hover/pressed states |
| `ink` | `#05070D` | Primary text, dark surfaces |
| `paper` | `#FBFCFE` | Base background |
| `mist` | `#EEF2F8` | Section background (alternating rhythm) |
| `slate` | `#5B6472` | Secondary text |
| `foam` | `#D8E8FF` | Light accent fills, icon chips |
| `depth` | `#001433` | Deep navy sections (footer, dark CTAs) |

Type: **Fraunces** (display, used sparingly and often italic) + **Manrope** (body/UI) +
**IBM Plex Mono** (stats, batch codes, data — reinforces the "independently tested"
positioning).

Signature element: the hero's animated glass bottle, whose liquid surface is driven by
GSAP, sitting in front of a real WebGL fragment-shader caustics field — "water you can
feel move," not a static product photo.

## Structure

```
app/
  layout.tsx        Root layout, fonts, global metadata, Organization JSON-LD
  page.tsx           Home page (assembles all sections)
  products/page.tsx  Full water lineup + Product JSON-LD
  faq/page.tsx       FAQ page + FAQPage JSON-LD
  contact/page.tsx   Contact page
  sitemap.ts         Dynamic sitemap.xml
  robots.ts          robots.txt
components/
  layout/            Navbar, Footer
  ui/                 Button (water ripple), Container, Reveal (Framer Motion helpers)
  icons/              Hand-built SVG icon set
  sections/           Hero, WaterLineup, Origins, WhyEnerzix, LeadGenForm,
                       FAQSection, ContactSection, CTABand, WaterShaderCanvas,
                       LiquidBottle
data/
  products.ts, faqs.ts
lib/
  seo.ts             JSON-LD builders
  gsap.ts            GSAP registration helper
```

## Before going live

1. Swap placeholder copy (address, email, exact pricing, lab numbers) for real figures.
2. Wire `LeadGenForm` and `ContactSection` submit handlers to a real endpoint
   (e.g. a Route Handler in `app/api/`, or an ESP like Resend/Postmark).
3. Add a real Open Graph image at `public/og-image.png` (1200×630).
4. Update `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` if the
   final domain differs from `enerzix.ca`.
5. Run a Lighthouse pass after deploying — the WebGL canvas and GSAP/Framer bundles are
   already code-split per route, but re-check on real hosting.
