# Vouken Technology Launch

A premium, responsive dark-tech website positioning Vouken Technology as a future-focused digital navigation and engineering partner in Nagercoil.

## Generated with GenMB

This project was generated using [GenMB](https://genmb.com) - AI-powered application builder.

### Original Prompt

> Build a **premium, modern, responsive, production-ready website** for **Vouken Technology**, a technology company based in Nagercoil, Tamil Nadu, India, planned to launch in October 2026.

### Brand

**Vouken Technology**
**Motto:** "Navigating your digital frontier"

Vouken represents **Adventure, Navigation, Engineering, Exploration, Innovation, and Future Technology**.

The website should position Vouken as a **technology navigator and engineering partner**, not as a generic IT outsourcing company.

### Design

Create a visually impressive and premium website with:

* Modern cinematic design
* Strong typography
* Clean layouts
* Dark professional technology aesthetic
* Subtle navigation/map/grid elements
* Digital route lines and technical visuals
* Elegant micro-interactions
* Smooth but lightweight animations
* Excellent spacing and visual hierarchy
* Fully responsive mobile/tablet/desktop design
* Accessible and fast UI

Avoid excessive:

* Gradients
* Neon effects
* Glassmorphism
* 3D effects
* Particles
* Animations
* Generic startup templates
* Stock-photo-heavy sections

The final website should feel like:

**Engineering Company + Digital Studio + Technology Laboratory**

### Homepage

Create an engaging homepage with this flow:

1. Hero
2. Who is Vouken?
3. What We Build
4. Services
5. Technology
6. Featured Projects
7. Products / Solutions
8. Innovation & R&D
9. Future Technology
10. Why Partner With Vouken
11. Vision
12. Contact CTA

Hero headline:

**"Navigate Your Digital Frontier."**

Supporting message should explain that Vouken helps businesses architect, engineer, and build digital systems for their next stage.

Use CTAs:

**Explore Our Work**

**Start a Conversation**

### Pages

Create:

* Home
* About
* Services
* Service Details
* Projects
* Project Details
* Products / Solutions
* Innovation / R&D
* Future Technology
* Insights / Articles
* Careers
* Contact

### Admin

Create a secure admin dashboard for managing:

* Services
* Projects
* Products
* Innovation/R&D
* Articles
* Team
* Enquiries
* Media
* Website Settings
* Administrators

Use real CRUD functionality with authentication and authorization.

### Technology

Choose the best modern stack based on the environment.

Prefer:

* Next.js / React
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma or Drizzle
* Secure authentication
* REST/API or equivalent backend
* Motion/Framer Motion for animations when useful

Do not install unnecessary dependencies.

### Important

Do not invent:

* Clients
* Projects
* Products
* Awards
* Statistics
* Testimonials
* Partnerships
* Patents
* Employees
* Achievements

If information is unavailable, use professional placeholders or "Coming Soon".

### Quality

The website must be:

**Beautiful + Professional + Fast + Secure + Responsive + Accessible + SEO-friendly + Scalable**

Use reusable components and clean architecture.

Run linting, type checks, tests, and production build checks.

Fix errors instead of ignoring them.

### Development

Build the project in stages:

**Architecture → Design System → Frontend → Backend → Database → Admin → Public Pages → API Integration → Animations → Security → SEO/Performance → Testing → Production**

Do not skip important architecture or security work.

At the end of each stage, briefly report what was completed and continue to the next stage.

**Start by inspecting the existing project and then build the Vouken Technology website.**


## Design System

The marketing site is built on a small set of shared primitives in `src/styles/main.css` and `src/components/`, so every page reads as one studio rather than a set of templates.

### Canvas and colour

| Token | Value | Use |
|---|---|---|
| `background` | `#0a0c0b` | Page canvas (near-black charcoal, never pure black) |
| `surface` | `#0e1211` | Raised section tone |
| `surface-raised` | `#121615` | Editorial panels |
| `hairline` / `border` | `#1d2321` | Thin dividers and panel borders |
| `border-strong` | `#2c3432` | Interactive edges, outlined numerals |
| `ink` / `foreground` | `#f2f5f1` | Display and body type |
| `muted-foreground` | `#a4ada6` | Support copy |
| `subtle-foreground` | `#7f887f` | Technical metadata |
| `primary` | `#b8e06d` | Lime accent — highlights, labels, active states, CTA emphasis |

Sections alternate between the canvas and `tone-raised`, separated by 1px hairlines.

### Typography

- `display-xl` — hero headlines
- `display-lg` — section headlines
- `display-md` — sub-section and panel headlines
- `display-sm` — card and list titles
- `lede` — intro paragraphs
- `label-mono` / `label-mono-tight` — uppercase DM Mono metadata
- `index-number` / `index-number-sm` — oversized outlined editorial numerals

### Layout and surfaces

- `Section` owns tone, hairline dividers, vertical rhythm (`section-y`) and the optional index/label rail.
- `panel` + `panel-hover` + `edge-sweep` + `reveal-detail` build the bordered editorial blocks and their hover/focus behaviour.
- `rail` / `rail-node` render the process storyline; `link-underline` and `arrow-shift` handle link and CTA feedback.

### Motion

- `Reveal` animates sections into view with IntersectionObserver; `ScrollProgress` draws the hairline rail at the top of the viewport; `Marquee` is the ticker band.
- All motion collapses under `prefers-reduced-motion: reduce`, which resolves reveals and hover states instantly and stops the ticker and route-line loops.

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requirement; the Pages workflow uses Node 22)

### Running Locally

```bash
npm install
npm run dev
```

### Checks

```bash
npm run typecheck   # strict TypeScript check (tsc --noEmit)
npm run build       # production build to dist/
```

## Framework

This project uses **React-Ts**.

## Progressive Web App (PWA)

The site ships a web app manifest, an offline shell, and an "Add to Home Screen" prompt.

### PWA Files

PWA assets live in `public/` so Vite serves them at the site root in development and copies them into `dist/` on build:

- `public/favicon.svg` — browser tab icon, linked from `index.html`; the manifest icons reuse the same brand mark
- `public/manifest.json` — app manifest, linked from `index.html`
- `public/service-worker.js` — offline shell caching; `/api/*` requests always go to the network
- `public/offline.html` — fallback shown when a navigation fails while offline
- `public/install-prompt.js` — "Add to Home Screen" banner, styled by the `.pwa-prompt*` rules in `src/styles/main.css`

`src/main.tsx` registers the service worker **only in production builds**, so the dev server and hot-module reloading are never served from a cache.

### Installing on Mobile

1. Open the deployed app in your mobile browser
2. On Chromium browsers the banner appears after 2 seconds once the browser reports the app as installable; tap "Install"
3. On iOS Safari the banner explains the route instead: tap Share, then "Add to Home Screen"
4. The prompt is not shown again after it is dismissed, and never appears while the app already runs standalone

### Testing PWA Locally

Service workers and installability require a secure context. For local testing:

```bash
# Production build + static preview (served from http://localhost:4173/Vouken-tech/)
npm run build
npx vite preview

# Or serve the dev server over HTTPS
npx local-web-server --https
```

In Chrome DevTools > Application > Service Workers, check "Bypass for network" to exercise the offline fallback page.

## Deploying to GitHub Pages

The live site is **https://kenilan2006.github.io/Vouken-tech/**, published by `.github/workflows/deploy.yml`. The workflow runs on every push to `main` (and can be started manually from the Actions tab); it installs dependencies, type-checks, builds `dist/`, and deploys that folder to GitHub Pages.

### One-time repository setting (required)

Open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. While the legacy "Deploy from a branch" source is selected, GitHub serves the repository source instead of the built site (the raw `index.html` fails to run because `/src/main.tsx` is unbundled) and the workflow's deploy step reports that Pages is not configured for Actions.

### How the build targets the subpath

A project site is served from `/<repository>/`, so `vite.config.ts` sets `PRODUCTION_BASE = '/Vouken-tech/'` for production builds only:

- `npm run dev` keeps serving from `http://localhost:5173/`
- `npm run build` writes `/Vouken-tech/...` URLs into `dist/` (asset bundles, `favicon.svg`, `manifest.json`, `install-prompt.js`)
- `npx vite preview` serves the built site from `http://localhost:4173/Vouken-tech/`
- the service worker resolves its shell URLs relative to its own location, so it needs no change

Change `PRODUCTION_BASE` to `'/'` if the site moves to a custom domain or a `<user>.github.io` repository, and to the new folder name if the repository is renamed.

### Backend-dependent features

GitHub Pages serves static files only. Public pages render from the bundled fallback content in `src/data/content.ts`, but features that call the GenMB backend on the same origin — sign-in (`/api/auth/*`), the admin console (`/api/admin-table`, `/api/kv`) and enquiry submission (`/api/contact/submit`) — need that backend hosted separately if they are to work on the deployed URL.

## License

MIT
