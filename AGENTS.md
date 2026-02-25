# BitRemote Website (Marketing) — Agent Notes

## Project Structure

- `src/app/` — Next.js App Router pages/layouts
  - `src/app/layout.tsx` — global layout + site-wide metadata base
  - `src/app/page.tsx` — root language chooser (`/`)
  - `src/app/not-found.tsx` — default 404 page
  - `src/app/[locale]/layout.tsx` — per-locale layout (nav + footer) and `generateStaticParams()`
  - `src/app/[locale]/page.tsx` — localized homepage (`/{locale}/`)
  - `src/app/[locale]/privacy/page.tsx` — localized privacy route
  - `src/app/[locale]/terms/page.tsx` — localized terms route
  - `src/app/[locale]/support/page.tsx` — localized support route
- `src/components/` — reusable “Text UI”/ASCII-first components
  - `TextFrame`, `TextButton`, `TextTabsNav`, `TextSeparator`, `FaqAccordion`
  - `BitRemoteWordmark` — SVG wordmark with subtle pixel/filter animation
  - `AsciiSplitPanel` — the hero “byte skeleton” panel
- `src/i18n/`
  - `locales.ts` — locale list + type + labels
  - `messages.ts` — loads `src/messages/*.json`
  - `urls.ts` — `localePath()` helpers and `absoluteUrl()` (used for canonical URLs)
- `src/messages/*.json` — localized copy (EN/JA/ZH-Hans/ZH-Hant); keep keys aligned across locales
- `public/` — static assets and static-site plumbing
  - `public/CNAME` — GitHub Pages custom domain (currently `bitremote.app`)
  - `public/robots.txt`, `public/sitemap.xml`, `public/.nojekyll`
  - `public/textures/*` — “text-like” SVG glyph textures used as subtle backgrounds
  - `public/assets/*` — screenshots and other marketing assets

## Design Concept (ASCII-First “Text UI”)

The site’s visual language is “ASCII-first” (inspired by text UI / wireframes), but implemented with real HTML/CSS:

- **No space-padding for layout.** Use actual CSS layout (flex/grid/margins) for spacing and alignment.
- **UI chrome is texty.** Mono labels, bracket motifs (`[ ... ]`), uppercase tracking, and simple dividers.
- **Frames are CSS borders.** Use borders/shadows for the main structure; textures are accents, not structure.
- **Text-like texture accents.** Prefer small SVG patterns (e.g. the textures in `public/textures/`) or `TextSeparator`’s glyph pattern instead of typing huge repeated characters.
- **Palette constraint.** Black/white/blue only (opacity variants allowed); styling is centralized via CSS variables in `src/app/globals.css` and Tailwind theme tokens.
- **Semantics first.** Underneath the “text UI” look, keep semantic HTML and accessible interactions.
- **Accessibility + no-JS fallback.** Always consider accessibility, and ensure core content/navigation works with JavaScript disabled.

### Skeleton

In this repo, **“skeleton”** does **not** mean a loading placeholder. It means a **decorative, ASCII-like UI panel** that hints at BitRemote’s app experience without being a functional UI.

Implementation definition: **CSS layout + mono labels + border/wireframe + subtle glyph textures** — and explicitly **NOT** space-padded giant ASCII blocks.

Current implementation: `src/components/AsciiSplitPanel.tsx` (decorative content is `aria-hidden`; hidden on small screens via responsive classes).
