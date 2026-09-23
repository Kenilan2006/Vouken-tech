# Visual audit — what changes and why

## Guiding principle
The "technology navigator" story stays available as a quiet thread inside the brand,
but it should no longer dominate the visual identity. The dominant signals should now
read as digital systems, AI, automation, creative technology, engineering, and digital
experience — sophisticated, not generic.

## What stays
- Charcoal canvas, off-white type, restrained lime accent.
- Hairlines, reveal motion, scroll-based entrances, reveal lines.
- Editorial type scale, balanced headings, deliberate pacing.
- Route/map concept where it genuinely supports a story (for example future-looking
  or innovation pages), but quieter and less literal.

## What gets reduced
- Compass as the primary brand mark. Replace with a calmer system mark.
- Literal navigation icons inside brand/UI chrome where they shout "map".
- Oversized index numbers and mono eyebrows used as the default texture.
- Repeated 3-column card grids that feel like a conventional agency template.
- Rounded-full "corporate card" buttons and badges used everywhere as the default shape.
- Excessive green used as a border/structure color instead of an accent.
- "Route/beacon/target/topography" metaphors used as the loud hero energy on every
  page that can carry a calmer, more systems-forward atmosphere.

## How the route/map concept survives
- It remains in the design system as texture and occasional editorial illustration.
- It is allowed to show up more strongly where the page is actually about direction,
  future technology, or research signals — but even there, less literal target/reticle
  language, more "system field" language.

## Components targeted
- Logo.tsx — brand mark.
- RouteArtwork.tsx — hero/section artwork.
- SectionHeading.tsx — index number + mono eyebrow density.
- ServiceRow.tsx — index number + contour + "Details" mono label.
- Marquee.tsx — mono ticker density.
- Footer.tsx / Header.tsx — navigation chrome and mono-label density.
- main.css — route/beacon/target CSS still kept as a quieter option, not removed globally.
- Select page sections — to reduce conventional 3-column repetition and green-card defaults
  without rewriting the entire site.

## Pages targeted for the first pass
- HomePage.tsx — biggest blast radius, most repeated patterns.
- AboutPage.tsx
- ServicesPage.tsx
- ProjectsPage.tsx
- ContactPage.tsx
- InsightsPage.tsx
- CareersPage.tsx

## Pages left for later / out of this pass
- SolutionsPage.tsx
- InnovationPage.tsx
- FuturePage.tsx
- ServiceDetailPage.tsx
- ProjectDetailPage.tsx
- NotFoundPage.tsx
- AdminPage.tsx
- LoginPage.tsx

These are either more specialized or more admin-oriented, and changing them is a second pass.
