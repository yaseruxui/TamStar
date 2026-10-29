# TAMSTAR — نجم تام · Web platform (Phase 1)

Bilingual (Arabic RTL / English LTR) B2B storefront for **Tamstar Trading Est.**, Dammam — built with
Next.js 16 (App Router, RSC), TypeScript (strict), Tailwind CSS v4 and next-intl 4.

Storefront layout follows Gulf B2B commerce conventions (header search, category bar, image product cards,
cart drawer); company content is taken only from <https://tamstar.com.sa>; scope follows `TAMSTAR_MVP.md` (Phase 1).

## Commands

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /ar
npm run build && npm start
npm run lint && npm run typecheck && npm run format:check
```

Copy `.env.example` to `.env.local`:

| Variable               | Purpose                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, hreflang (default `https://tamstar.com.sa`).                                                                                                         |
| `INQUIRY_WEBHOOK_URL`  | HTTPS endpoint that receives RFQ / contact / career submissions as `multipart/form-data` (`envelope` JSON + `attachments` files). Unset → forms ask visitors to email `info@tamstar.com.sa`. |

## Architecture

```
src/
├── app/
│   ├── [locale]/                 # ar | en — every page statically generated (SSG)
│   │   ├── layout.tsx            # <html lang dir>, fonts, header/footer, Organization JSON-LD
│   │   ├── page.tsx              # Home (Figma "store" frame)
│   │   ├── catalog/[category]/[item]/
│   │   ├── search/               # dynamic, noindex; GET form → works without JS
│   │   ├── rfq/ about/ services/ projects/ careers/ contact/
│   │   ├── error.tsx not-found.tsx [...rest]/ opengraph-image.tsx
│   ├── sitemap.ts robots.ts manifest.ts icon.png apple-icon.png
├── components/
│   ├── ui/                       # Button (cva), Badge, Field/Input/Select/Textarea, FileInput, Card…
│   ├── common/                   # TopBar, SiteHeader, MainNav, MobileMenu, SiteFooter, PageHeader…
│   ├── feedback/                 # Skeletons, EmptyState, FormStatus, FormAlerts
│   └── seo/                      # JsonLdScript
├── features/
│   ├── catalog/                  # data/, services/catalog.ts (read model), components/, types.ts
│   ├── rfq/                      # store/ (localStorage RFQ list), hooks/, schemas/ (Zod), actions/ (server), components/
│   ├── contact/  careers/        # schemas/, actions/, components/
│   ├── company/                  # data/ (projects, services, values — from tamstar.com.sa), components/
│   └── home/                     # home page sections
├── lib/                          # env (Zod), fonts, i18n (routing, navigation, request), seo, config, validation
├── services/inquiry-delivery.ts  # webhook delivery for all forms
├── hooks/  utils/  types/        # useFormAction, useExternalStore · cn(), search normalisation · domain/forms/next-intl types
├── messages/{ar,en}/*.json       # namespaced dictionaries, key-checked at compile time (types/next-intl.d.ts)
├── styles/globals.css            # Tailwind v4 @theme tokens (from Figma)
└── proxy.ts                      # next-intl locale routing
```

Key decisions

- **Server-first.** Only interactive leaves are client components (mobile menu, locale switcher, RFQ list
  buttons, quick-search tabs, forms). Translation namespaces are shipped to the client per page
  (`ClientMessages`).
- **No fabricated data.** Product families carry standards and spec ranges only — no SKUs, prices or stock;
  cards show "contract price — sign in" and real prices come from Odoo per company contract (MVP §2).
- **Product images** in `public/products` are studio renders made in Blender for this project (no stock or
  AI-generated imagery). Replace any file with a real product photo of the same name (1000×1000, square) and
  nothing else changes.
- **Cart** (`features/cart`) is a client store persisted in localStorage: add with quantity, drawer, cart page,
  checkout gate (company account required) and one-click conversion of the cart into an RFQ. The catalog read model (`features/catalog/services`)
  is the single seam to swap for the Odoo sync.
- **RFQ = MVP §3 fields**: per-line product, specs/usage, quantity + UoM, preferred brand; delivery location
  and date, notes, attachments (5 × 8 MB, 20 MB total), contact details. Status model
  `submitted → underReview → sourcing → quotationPrepared → sentToCustomer → accepted | rejected`
  lives in `types/domain.ts`.
- **Validation** is Zod on the server (authoritative) with the same attachment rules on the client;
  error messages are translation keys. A honeypot field silently drops bot submissions.

Measured locally (Lighthouse 12, mobile throttling): Performance 90–92, Accessibility 100,
Best Practices 100, CLS 0, TBT ≈ 40 ms. SEO flags only the canonical while served from localhost.

## Content sources & what was rejected

Used (tamstar.com.sa): about, mission/vision, process, core values, services & capabilities, projects
(Ma'aden, Petro Rabigh, ACWA Power, Veolia, IMI, NEOM, JASARA, KAEC, Jabal Omar — _in negotiation_),
stats (6 years, 30+ projects, 19K+ materials, 27 countries), address, phones, email, office hours,
careers copy and form fields. Arabic copy is a translation of the English site — **needs review by the
TAMSTAR team.** Arabic brand name «نجم تام» is taken from the official logo.

Not used — template leftovers on the live site (blog lorem ipsum, "Structure Design, France" portfolio
tags, XStore testimonial) and unverified claims in the Figma / previous prototype:

- Aramco vendor no. 10064219, SABIC vendor code V88102, "Vision 2030 local content **certified**",
  IKTVA 72–78 %, ISO 9001:2015, API Spec Q1
- Al-Khobar branch, "2nd Industrial City, Street 64" hub, 12,500 m² warehouse, Jubail stock
- CR 2050049210 / 2050123456, VAT 310987654300003, phone +966 13 899 0000, rfq@tamstar.com.sa
- Testimonials and named employees (AI-generated photos), SKU prices, stock counts, "99.8 %", "< 4 hours"
- 30 / 60 / 90-day credit terms

Any of these can be added once TAMSTAR provides the supporting document.

## Phase 1b — needs decisions (MVP §5)

Company accounts & invitations, team roles and purchase limits, contract pricing rules, cart & checkout,
payment gateway, Odoo 18 Community sync (products, prices, stock, sales orders), order tracking, RFQ
status tracking and the admin panel depend on: database & auth choice, Odoo API access/credentials,
pricing-rule priority, credit vs. prepaid orders, and the first payment gateway.
