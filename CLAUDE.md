# Vouken Technology Launch
A premium dark-tech marketing site and authenticated content console for Vouken Technology, a future-focused digital engineering partner in Nagercoil, launching October 2026.

## Masterplan
- Position Vouken as a technology navigator and engineering partner for ambitious digital systems—not a generic IT outsourcing company.
- Help prospective clients understand Vouken’s services, solutions, innovation direction, future-technology perspective, and launch-stage availability.
- Keep all public claims credible: do not invent clients, awards, project outcomes, team scale, testimonials, products, or metrics. Use curated editorial placeholders and “Coming Soon” where needed.
- Provide authorized internal users with a lightweight admin console for managing public collections, enquiries, media references, settings, and administrator access.
- Maintain a restrained engineering-laboratory visual language using route maps, topology lines, grids, concise copy, and subtle motion.

## Tech Stack & Architecture
- **Frontend:** React 19-style TypeScript application built with Vite.
  - Entry point: `src/main.tsx`
  - Vite configuration: `vite.config.ts`
  - Route table: `src/App.tsx`
- **Routing:** `react-router-dom`. The site is a client-rendered SPA with public, detail, login, admin, and catch-all routes.
- **Styling:** Tailwind CSS via `@tailwindcss/vite`, with brand tokens and bespoke technical artwork/animation rules in `src/styles/main.css`.
  - Use `cn()` from `src/lib/utils.ts` for conditional Tailwind class composition.
  - Do not introduce a second styling system or component library.
- **Icons:** `lucide-react`.
- **Fonts:** Manrope for UI/display copy and DM Mono for technical labels, loaded in `index.html` from Google Fonts.
- **Auth:** Injected GenMB auth SDK, declared in `src/types/genmb.d.ts`.
  - Supports Google sign-in and magic-link workflows through the runtime `window.genmb` API.
  - Authentication is required for `/admin`; authorization is resolved server-side.
- **Backend:** Platform server functions under `functions/`, called from the browser through `window.genmb.fn.invoke(...)`.
- **Storage:** Platform KV store; there is no PostgreSQL, Prisma, Drizzle, ORM, or external CMS.
  - Primary storage key: `vouken-admin-content-v2`
  - Legacy read fallback: `vouken-admin-content-v1`
- **State management:** Local React hooks/state only. No Redux, Zustand, React Query, or equivalent.
  - `src/hooks/usePublicContent.ts` loads public content, tracks loading/error state, and preserves static fallback content.
  - `src/components/ToastProvider.tsx` handles user-facing transient feedback.
  - `src/components/AppErrorBoundary.tsx` prevents a render crash from blanking the app.

### Scripts
- `npm run dev` — Vite dev server.
- `npm run typecheck` — strict TypeScript check (`tsc --noEmit`) across `src/`, `functions/`, and the Vite config. Keep it at zero errors.
- `npm run build` — production build to `dist/`; Vite emits the hashed CSS/JS bundle, links the stylesheet in `dist/index.html`, and copies `public/` to the dist root.

### Content rendering pattern
1. Editorial fallback content and collection definitions live in `src/data/content.ts`.
2. Public pages load a relevant public collection with `usePublicContent`.
3. Remote KV-backed data replaces fallback content **only when the returned collection contains items**.
4. An empty remote collection does **not** clear static launch content; this is intentional.
5. Admin mutations write the shared KV content store through `functions/adminContent.ts`.
6. The contact form writes an `Enquiries` item through `functions/enquiryIntake.ts`.

### Backend API surface
All functions receive JSON in `req.body` and return JSON.

| Function | Access | Purpose |
|---|---|---|
| `functions/publicContent.ts` | Public | Reads allowlisted public collections: `Services`, `Projects`, `Products`, `Innovation & R&D`, `Articles`, `Team`, `Media`. |
| `functions/enquiryIntake.ts` | Public | Validates and stores contact form enquiries in `Enquiries`; retains the newest 250 records. |
| `functions/resolveRole.ts` | Auth-aware | Returns `owner`, `admin`, or `denied` for the authenticated user. |
| `functions/adminContent.ts` | Authenticated + authorized | Lists, creates, updates, and deletes collection entries. Only the owner can manage `Administrators`. |

### Data model
KV collections contain lightweight records:

```ts
type Item = {
  id: string
  slug: string
  title: string
  summary?: string
  updatedAt: string
}
```

Current managed collections are:

`Services`, `Projects`, `Products`, `Innovation & R&D`, `Articles`, `Team`, `Enquiries`, `Media`, `Website Settings`, and `Administrators`.

**Important limitation:** this CMS stores only `title`, `summary`, generated `slug`, and timestamps. Do not build UI that expects rich project fields, image uploads, custom metadata, publishing states, or nested blocks without extending both the server model and the admin UI.

## File Structure
```text
.github/
└── workflows/
    └── deploy.yml            # Builds dist/ and publishes it to GitHub Pages on push to main.

functions/
├── adminContent.ts           # Secure CRUD, collection allowlist, slug generation, owner/admin authorization.
├── enquiryIntake.ts          # Public contact validation and Enquiries persistence.
├── publicContent.ts          # Public read endpoint with strict collection allowlist.
└── resolveRole.ts            # Server-side owner/admin/denied role resolution.

src/
├── App.tsx                   # Complete SPA route table.
├── main.tsx                  # React bootstrap, HashRouter, toast/error providers, global CSS import, production service-worker registration.
├── data/content.ts           # Static launch content, navigation items, collection types and fallback records.
├── hooks/
│   └── usePublicContent.ts   # Public KV fetch hook; retains fallback data for empty/failed responses.
├── lib/
│   └── utils.ts              # cn() Tailwind merger and safe getErrorMessage() helper.
├── styles/
│   └── main.css              # Dark theme tokens, global styles, route-grid artwork, reveal/motion effects.
├── types/
│   ├── genmb.d.ts            # Type declarations for injected auth/function platform APIs.
│   └── vite-env.d.ts         # Vite client types (import.meta.env) for the app bundle.
├── components/
│   ├── AppErrorBoundary.tsx  # Render-failure containment and reload affordance.
│   ├── AuthGate.tsx          # Unauthorized admin-state prompt linking to login.
│   ├── Button.tsx            # Reusable accessible pill button with variants/loading state.
│   ├── Dialog.tsx            # Accessible modal with focus containment and Escape/backdrop close.
│   ├── Footer.tsx            # Footer CTA, directory, oversized wordmark, team login link.
│   ├── Header.tsx            # Sticky agency navbar: transparent then solid on scroll, four primary links, "Let's Talk" CTA, full-screen mobile menu.
│   ├── Layout.tsx            # Shared page shell: progress rail → skip link → Header → main → Footer.
│   ├── Logo.tsx              # Compass-based Vouken wordmark/home link.
│   ├── Marquee.tsx           # Ticker band used as a section transition.
│   ├── PageMeta.tsx          # Client-side document title and description updates.
│   ├── Reveal.tsx            # IntersectionObserver scroll entrance wrapper.
│   ├── RouteArtwork.tsx      # Reusable SVG topography/route artwork and glow/grain field.
│   ├── ScrollProgress.tsx    # Hairline reading-progress rail pinned to the viewport top.
│   ├── Section.tsx           # Section shell: tone, hairline dividers, rhythm, index/label rail.
│   ├── SectionHeading.tsx    # Eyebrow/index + display heading + supporting copy.
│   ├── SocialLinks.tsx       # Official channel links (Instagram) driven by `socialLinks` in src/data/content.ts.
│   └── ToastProvider.tsx     # Global toast state and notifications.
└── pages/
    ├── HomePage.tsx          # Homepage journey and launch positioning.
    ├── AboutPage.tsx         # Brand, approach, and company identity.
    ├── ServicesPage.tsx      # Services listing; public-content aware.
    ├── ServiceDetailPage.tsx # Service detail resolved by :slug.
    ├── ProjectsPage.tsx      # Projects/selected-work listing; launch-safe content.
    ├── ProjectDetailPage.tsx # Project detail resolved by :slug.
    ├── SolutionsPage.tsx     # Products and solutions positioning.
    ├── InnovationPage.tsx    # Innovation and R&D content.
    ├── FuturePage.tsx        # Future technology editorial page.
    ├── InsightsPage.tsx      # Articles/insights listing.
    ├── CareersPage.tsx       # Careers and future opportunities.
    ├── ContactPage.tsx       # Public enquiry form using enquiryIntake.
    ├── LoginPage.tsx         # GenMB sign-in entry point.
    ├── AdminPage.tsx         # Authenticated CRUD console for all collections.
    └── NotFoundPage.tsx      # Branded 404 route.
public/                       # Static root files: served at "/" in development, copied to dist/ on build.
├── favicon.svg               # Browser tab icon: the brand mark, same artwork as src/components/Logo.tsx.
├── install-prompt.js         # "Add to Home Screen" banner, styled by .pwa-prompt* rules in src/styles/main.css.
├── manifest.json             # Web app manifest (brand colours, standalone display, inline SVG icons).
├── offline.html              # Offline fallback for failed navigations.
└── service-worker.js         # Offline shell caching; shell URLs resolve relative to the worker location, /api/* always bypasses the cache.
index.html                    # HTML metadata, favicon and manifest links, Google font loading, Organization JSON-LD (sameAs social profiles), injected GenMB auth SDK.
vite.config.ts                # React and Tailwind Vite plugins.
package.json                  # Build, type-check, development dependencies and scripts.
```

## Key Features
- **Marketing site:** Public routes cover Home, About, Services, Service Details, Projects, Project Details, Solutions, Innovation, Future Technology, Insights, Careers, and Contact.
- **Homepage sequence:** `src/pages/HomePage.tsx` follows the required narrative: hero, Vouken identity, build capabilities, services, technology, projects, solutions, R&D, future technology, partnership value, vision, and contact CTA.
- **Launch-safe content:** Static content in `src/data/content.ts` is intentionally editorial and avoids fabricated business claims.
- **Dynamic public content:** Services, projects, products, innovation items, articles, team entries, and media may be read from KV through `publicContent.ts`.
- **Detail routing:** Service and project pages use slug parameters (`/services/:slug`, `/projects/:slug`). Preserve unique slug behavior when adding or editing records.
- **Contact enquiries:** `ContactPage.tsx` submits name, email, subject, and message to `enquiryIntake.ts`.
  - Name: 1–200 characters
  - Valid email required
  - Subject: max 500 characters
  - Message: 1–5000 characters
- **Admin console:** `AdminPage.tsx` supports list/create/update/delete operations for all configured collections.
  - An app owner (`ctx.user.isOwner`) has full access.
  - Admin users are authorized by a matching email stored as an `Administrators` record title.
  - Only owners can create, edit, or delete administrators.
- **Accessibility:** Keyboard-visible focus states, semantic navigation, responsive menu controls, dialog focus trap, Escape modal close, and `aria-busy` button loading states are implemented.
- **SEO baseline:** `PageMeta.tsx` updates per-page title and meta description; `index.html` contains the default launch description.
- **PWA:** `index.html` links `public/manifest.json`; `src/main.tsx` registers `public/service-worker.js` in production builds only, so dev/HMR responses are never cached. The "Add to Home Screen" banner comes from `public/install-prompt.js` and is styled by the `.pwa-prompt*` rules in `src/styles/main.css`.
  - `public/favicon.svg` is the browser tab icon and mirrors the same brand mark as `src/components/Logo.tsx`; the manifest reuses that artwork as inline SVG data-URI icons. Do not add fabricated raster icons, `.ico` files, or install screenshots.

## Design Guidelines
- **Visual identity:** A premium modern technology studio — dark, editorial, and confident. Charcoal canvas, oversized display type, generous whitespace, thin hairlines, restrained shadows, and light motion. It must read as AI + digital products + automation + brand + engineering, never as a generic software template, a cyberpunk/gaming site, or an "AI gimmick" page.
- **Core motifs:** Route maps, technical grid lines, contour/topography paths, compass/navigation symbolism, and understated beacon points.
  - Use `RouteArtwork.tsx` (`.glow-field`, `.grid-veil`, `.grain`, `.topography-lines`, `.route-line*`) rather than stock imagery or particle systems.
- **Colour system:** Semantic tokens in `src/styles/main.css`.
  - Tonal steps: `background` (#0a0c0b) → `surface` → `surface-raised` → `card`/`popover`. Never a flat pure black.
  - Structure: `hairline`/`border` for thin dividers, `border-strong` for interactive edges. Keep borders at 1px.
  - Type: `ink`/`foreground` off-white, `muted-foreground` for support copy, `subtle-foreground` for technical metadata.
  - Accent: `primary` lime is reserved for highlights, active states, hairlines, small labels, and CTA emphasis. Do not turn every element green.
- **Typography:** Manrope for display/content copy, DM Mono for uppercase technical labels.
  - Use the scale classes instead of one-off sizes: `display-xl`, `display-lg`, `display-md`, `display-sm`, `lede`, `label-mono`, `label-mono-tight`, `index-number` (+ `index-number-sm`).
  - Display headings keep compact negative tracking at 700–800 weight so they contrast with light-weight support copy.
- **Layout:** Asymmetric editorial composition — `lg:grid-cols-[.85fr_1.15fr]` splits, `lg:grid-cols-12` span mixes, generous `section-y` rhythm, and full-bleed bands as section transitions.
  - Wrap every section in `Section` so tone, hairline dividers, spacing, and the optional `index`/`label` metadata rail stay consistent.
- **Surfaces:** Use `panel` for bordered editorial blocks and `panel-hover` for interactive ones, with `edge-sweep` for the hover hairline and `reveal-detail` for details held back until hover/focus. Do not build standard SaaS cards with heavy shadows.
- **Motion:** `Reveal` drives scroll entrances, `ScrollProgress` renders the top rail, and `Marquee` is the ticker band used between major sections. Keep durations in the 300–800ms range with `cubic-bezier(.2,.8,.2,1)` and always respect the `prefers-reduced-motion` block in `src/styles/main.css`.
- **Accessibility:** Keep body copy at ≥4.5:1 contrast, preserve `focus-visible` rings on every interactive element, keep hit targets ≥44px, and never expose information through hover alone — `.reveal-detail` content stays in the accessibility tree and is also shown on `:focus-within`.

## App Flow
1. **Visitor exploration**
   - Land on `/`, understand Vouken’s positioning and October 2026 launch context.
   - Navigate via `Header.tsx` (Services, Work, About, Insights) or the footer directory for Solutions, Innovation, Future Technology, Insights and Careers.
   - Open a service/project detail page through slug-based links.
   - Use “Start a conversation” to reach `/contact`.

2. **Contact submission**
   - Visitor completes the form on `/contact`.
   - Client submits to `enquiryIntake`.
   - Valid submissions are persisted as `Enquiries`; errors should be surfaced through existing toast/error UI.
   - There is no email delivery integration currently—do not claim that enquiries send email notifications.

3. **Admin access**
   - Team member enters through `/login` or the footer’s “Team access” link.
   - GenMB auth establishes a session.
   - `/admin` checks the resolved role.
   - Unauthorized users see `AuthGate`; authenticated but unauthorized users must not receive collection data.
   - Owner/admin manages content; only owners manage administrator emails.

4. **Fallback edge cases**
   - If a public function is unavailable, fails, or returns no records, public pages preserve static fallback data.
   - A missing slug should render the relevant not-found/empty state rather than assuming a record exists.
   - Platform APIs may be absent during isolated local UI work; avoid removing fallback behavior to “fix” that condition.

## Conventions
- Use TypeScript for all new files and keep types close to their data boundaries.
- Use PascalCase for React components and page files; camelCase for hooks, utilities, variables, and functions.
- Keep routes centralized in `src/App.tsx`; add navigation entries in `src/data/content.ts` only when the page should appear in primary navigation.
- Prefer reusable primitives in `src/components/` over duplicating button, modal, heading, logo, or route-artwork markup.
- Use Tailwind utilities first. Add global CSS only for design tokens, reusable animation behavior, or complex artwork not expressible cleanly in utility classes.
- Use `cn()` from `src/lib/utils.ts` for conditional class names; do not manually concatenate class strings.
- Use `getErrorMessage()` for unknown caught errors in client UI.
- Use `PageMeta` on every new public page with a specific, truthful description.
- Preserve content honesty: do not add fabricated logos, client names, statistics, testimonials, case-study outcomes, or “trusted by” sections.
- For a new managed collection:
  1. Add its type/fallback content and any display mapping in `src/data/content.ts`.
  2. Add it to the relevant server allowlists in `functions/adminContent.ts` and, if public, `functions/publicContent.ts`.
  3. Extend `AdminPage.tsx` collection controls.
  4. Add a public page/component using `usePublicContent`.
  5. Maintain authorization and validation server-side; never rely on hidden client controls alone.
- For richer content fields, update all layers together: KV normalization in server functions, admin create/edit form, public type definitions, public rendering, and legacy-data handling.

## Deployment
- **Host:** GitHub Pages project site at `https://kenilan2006.github.io/Vouken-tech/`, published by `.github/workflows/deploy.yml` on every push to `main` (also startable manually from the Actions tab).
  - Set the repository's Pages source to **GitHub Actions** (Settings → Pages → Build and deployment). While the legacy "Deploy from a branch" source is active, GitHub additionally publishes the unbundled repository root — a blank page, because `/src/main.tsx` cannot execute — and its dynamic `pages build and deployment` build finishes seconds later than this workflow. The "Wait for the legacy branch Pages builder" step (`actions: read`) therefore holds this job until that build for the same commit completes, so the built site is always the newest deployment. The step exits immediately once the source is GitHub Actions.
  - The workflow runs `npm ci`, `npm run typecheck` and `npm run build`, then uploads `dist/`. Keep `package-lock.json` committed or `npm ci` will fail.
- **Subpath base:** `vite.config.ts` sets `PRODUCTION_BASE = '/Vouken-tech/'` for production builds only, so `dist/` references `/Vouken-tech/...` while `npm run dev` stays on `http://localhost:5173/`. Update that constant if the site moves to a custom domain (`'/'`) or the repository is renamed.
  - `src/main.tsx` registers the service worker with `import.meta.env.BASE_URL` and `public/service-worker.js` resolves its shell URLs from its own location, so both follow that base without further edits.
  - `public/manifest.json` uses `"start_url": "./"` so an installed app opens the site under its own scope.
- **Static hosting caveat:** Pages cannot run the `functions/` backend. Public pages render from the bundled fallback content in `src/data/content.ts`, but sign-in, the admin console, KV-backed content and enquiry submission need that backend hosted separately.

## Platform (GenMB)

This app is built and hosted on GenMB.

**Runtime:** Browser sandbox (iframe) or Cloud Run. No Node.js server — all code runs client-side unless `backend/` exists.

**Dependencies:** CDN-only (esm.sh, cdn.tailwindcss.com, unpkg). Use ES module imports with full CDN URLs. No `npm install` at runtime.

**Entry point:** `index.html` must include all CDN script tags. Tailwind via CDN with inline config.

**Built-in services (relative API paths only, never hardcode domains):**
- `/api/ai/completion` — AI proxy | `/api/data/{appId}/*` — PostgreSQL (DataConnect SDK)
- `/api/storage/{appId}/*` — File uploads (GCS) | `/api/auth/google/*` — Google OAuth
- `/api/contact/submit` — Contact form | SDKs: `window.genmb.db`, `.storage`, `.auth`

**File structure:** `index.html` (entry), `src/` (source), `styles/` (CSS), `backend/` (optional FastAPI), `CLAUDE.md` (this file).

**Cannot:** Install npm packages at runtime, access filesystem, make direct server-side calls from frontend, modify infra.
