# skodr — Spark Coders website

One-page company site in Arabic (RTL, default) and English (LTR), dark theme, built with
Next.js 16 (App Router, React Server Components), TypeScript (strict), Tailwind CSS v4 and next-intl 4.

Every script, font, style and image is served from the site's own origin. A Content-Security-Policy
header (`next.config.ts`) enforces it, so no third-party CDN can load code into the page.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /ar
npm run build && npm start
npm run lint && npm run typecheck && npm run format:check
```

Copy `.env.example` to `.env.local`:

| Variable               | Purpose                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and hreflang (default `https://skodr.com`).            |
| `CONTACT_WEBHOOK_URL`  | HTTPS endpoint that receives contact/guide submissions as JSON. Unset → forms show the email. |

## Architecture

```
src/
├── app/
│   ├── [locale]/              # ar | en, both statically prerendered
│   │   ├── layout.tsx         # <html lang/dir>, fonts, metadata, JSON-LD, header/footer, cursor, intro loader
│   │   ├── page.tsx           # composes the home sections
│   │   ├── error.tsx · loading.tsx · not-found.tsx · [...rest]/page.tsx
│   │   └── opengraph-image.tsx
│   ├── icon.svg · manifest.ts · robots.ts · sitemap.ts
├── assets/fonts/              # Alexandria + IBM Plex Sans Arabic (SIL OFL), loaded with next/font/local
├── components/
│   ├── ui/                    # button (cva), pill, field, link-arrow, icons, reveal
│   ├── common/                # header, menu, footer, brand logo, custom cursor, page loader
│   ├── feedback/              # error boundary, canvas skeleton
│   └── seo/                   # JSON-LD script
├── features/
│   ├── home/
│   │   ├── components/        # hero, 3D scrub intro, work list, leads physics, confetti, edit, team, sectors, testimonials, blog
│   │   ├── data/content.ts    # ordered keys, images, links (copy lives in messages)
│   │   ├── lib/               # 3D geometry of the logo mark, accent gradients
│   │   └── types/             # keys derived from the message dictionaries
│   └── contact/
│       ├── components/        # contact form, guide form, contact section
│       ├── schemas/           # Zod validation
│       ├── services/actions.ts# server actions
│       └── types/
├── hooks/                     # media query, reduced motion, fine pointer, in-view, scroll progress
├── lib/                       # env (Zod), fonts, i18n (routing/navigation/request), seo, site config
├── messages/{ar,en}/          # common · navigation · metadata · home · contact (ar is the source type)
├── services/                  # webhook delivery (server-only)
├── styles/globals.css         # Tailwind v4 @theme tokens, base, shared motion primitives
├── types/                     # next-intl AppConfig, CSS custom properties, SEO, matter-js typings
├── utils/                     # cn(), math helpers
└── proxy.ts                   # next-intl locale routing
```

### Interactive sections

| Section         | Library             | Notes                                                                                       |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| 3D logo intro   | three (bundled)     | Loaded with `next/dynamic` + skeleton; pauses off-screen; WebGL errors fall back to a glow. |
| Leads physics   | matter-js (bundled) | Imported on mount; tap to add pills; mouse users can drag them.                             |
| Confetti        | none (canvas 2D)    | Bursts on click and once on first view.                                                     |
| Cursor & loader | none                | Mouse devices only; the intro plays once per session.                                       |

All motion respects `prefers-reduced-motion`.

## Brand tokens (`src/styles/globals.css`)

| Token                      | Value                             |
| -------------------------- | --------------------------------- |
| `violet` / `plum`          | `#B26CFF` / `#6E29AC`             |
| `ocean` / `aqua` / `lilac` | `#0C8EC7` / `#7FEEFA` / `#A497FA` |
| `ink` / `ink-2` / `ink-3`  | `#07051A` / `#0E0A26` / `#17123A` |

## Content to replace before launch

- Project, blog and team photos: put files in `public/images/…` and set `image` in
  `src/features/home/data/content.ts` (until then each card shows its brand-gradient artwork).
- Team names, testimonial authors, social links and phone number (`src/messages/*`, `src/lib/config/site.ts`).
- Logo assets live in `public/brand/` (mark, 512 px icon, 3D texture) and `src/app/icon.png`;
  the lettering is vector in `src/components/common/skodr-wordmark.tsx` and the 3D outline in
  `src/features/home/lib/skodr-outline.ts` (both traced from the brand SVG).
