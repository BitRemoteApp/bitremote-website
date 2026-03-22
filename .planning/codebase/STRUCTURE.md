# Codebase Structure

**Analysis Date:** 2026-03-22

## Directory Layout

```
bitremote-website/
├── src/                         # Source code
│   ├── app/                     # Next.js App Router routes
│   │   ├── [locale]/            # Locale dynamic segment
│   │   │   ├── downloaders/     # Downloader landing pages
│   │   │   │   └── [slug]/      # Individual downloader slugs
│   │   │   ├── privacy/         # Privacy policy page
│   │   │   ├── support/         # Support page
│   │   │   ├── terms/           # Terms of service page
│   │   │   ├── layout.tsx       # Locale-aware wrapper layout
│   │   │   └── page.tsx         # Home page (/)
│   │   ├── llms-full.txt/       # API route for LLM context
│   │   ├── layout.tsx           # Root layout (globals.css)
│   │   ├── page.tsx             # Language selector page
│   │   ├── robots.ts            # robots.txt generation
│   │   ├── sitemap.ts           # Sitemap generation
│   │   └── not-found.tsx        # 404 fallback
│   ├── ascii-panel/             # Interactive terminal-style component
│   │   ├── components/          # Frame/sheet sub-components
│   │   ├── pages/               # Panel pages (Home, Settings, NewClient)
│   │   └── index.tsx            # Main ASCII panel export
│   ├── components/              # Reusable presentation components
│   │   ├── BitRemoteWordmark.tsx
│   │   ├── TextButton.tsx
│   │   ├── TextFrame.tsx
│   │   ├── TextSeparator.tsx
│   │   ├── TextTabsNav.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── DownloaderLandingPage.tsx
│   ├── domain/                  # Domain models and business logic
│   │   ├── downloaders.ts       # Downloader enum, supported list
│   │   └── downloader-landings.ts # Landing page content dictionary
│   ├── i18n/                    # Internationalization
│   │   ├── locales.ts           # Locale constants, validation
│   │   ├── messages.ts          # Message loader function
│   │   ├── urls.ts              # Locale-aware URL builders
│   │   └── links.ts             # External links constants
│   ├── messages/                # Message JSON files (imported by i18n/messages.ts)
│   │   ├── en.json
│   │   ├── ja.json
│   │   ├── zh-hans.json
│   │   └── zh-hant.json
│   ├── seo/                     # SEO and metadata generation
│   │   ├── metadata.ts          # buildMetadataForCurrentLocalePage()
│   │   ├── schema.ts            # JSON-LD builders
│   │   └── routes.ts            # Localized route entries
│   └── globals.css              # Tailwind + CSS variables
├── public/                      # Static assets
│   ├── favicon.svg, favicon-16x16.png, favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── opengraph.jpg            # Social media preview
│   └── [other assets]
├── .vscode/                     # IDE settings
├── .github/                     # GitHub workflows and config
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── .eslintrc.json               # ESLint configuration
├── package.json                 # Dependencies and scripts
└── next-env.d.ts                # Next.js type definitions
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router structure with page components
- Contains: Route handlers, page components, layouts, metadata generation
- Key files: `[locale]/layout.tsx` (static param generation), `[locale]/page.tsx` (home page), `sitemap.ts`, `robots.ts`

**`src/app/[locale]/`:**
- Purpose: Locale-aware route segment; all content lives under this segment
- Contains: Layout wrapper, home page, child routes (downloaders, privacy, support, terms)
- Pattern: Dynamic segment with `dynamicParams = false` ensures all locales are pre-generated at build time

**`src/app/[locale]/downloaders/[slug]/`:**
- Purpose: Downloader-specific landing pages
- Contains: Page component that loads content from domain layer
- Pattern: Slug routes enumerated from `downloaderLandingSlugs` constant; one route per downloader

**`src/ascii-panel/`:**
- Purpose: Self-contained interactive component with internal state management
- Contains: Main component, sub-components (Frame, Sheet), page variants (Home, Settings, NewClient)
- Pattern: Marked with `'use client'`; encapsulates React hooks and event handlers
- Used by: `src/app/[locale]/page.tsx` as visual component

**`src/components/`:**
- Purpose: Reusable, presentational UI building blocks
- Contains: Buttons, frames, separators, navigation, accordion, wordmark
- Pattern: Stateless functional components; accept props for styling/content; no `'use client'` required (but can be used in client components)

**`src/domain/`:**
- Purpose: Product-specific data models and business logic
- Contains:
  - `downloaders.ts`: Enum of supported downloaders + readonly list
  - `downloader-landings.ts`: Content factory pattern with locale-specific templates
- Pattern: Pure data structures and factory functions; imports from i18n/locales for type safety

**`src/i18n/`:**
- Purpose: Centralize all internationalization concerns
- Contains:
  - `locales.ts`: Locale constants, type guard, BCP 47 language tags
  - `messages.ts`: Imports JSON files and exports typed getMessages() function
  - `urls.ts`: Locale-aware URL builders (localePath, localeRoot, absoluteUrl)
  - `links.ts`: External links (App Store, GitHub, etc.)
- Pattern: All locale handling flows through these modules; type-safe via branded types and guards

**`src/messages/`:**
- Purpose: Store translated content as importable JSON files
- Contains: One JSON file per language (en.json, ja.json, zh-hans.json, zh-hant.json)
- Pattern: Files are imported in `src/i18n/messages.ts`; never referenced directly elsewhere

**`src/seo/`:**
- Purpose: SEO, metadata, and structured data generation
- Contains:
  - `metadata.ts`: Builds Next.js Metadata objects with Open Graph, Twitter, canonical links, hreflang
  - `schema.ts`: JSON-LD builder functions (SoftwareApplication, FAQPage, BreadcrumbList)
  - `routes.ts`: Exports localized route entries for use in sitemap
- Pattern: Pure functions that combine locale + messages + domain data into metadata/schema objects

**`public/`:**
- Purpose: Static assets served directly
- Contains: Favicon variants, webmanifest, social media preview image
- Pattern: Files are referenced by path in layout/metadata (e.g., `/favicon.svg`)

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Global layout (metadata, globals.css, favicon config)
- `src/app/page.tsx`: Root language selector (`/`)
- `src/app/[locale]/layout.tsx`: Locale layout (navigation, footer, static param generation)
- `src/app/[locale]/page.tsx`: Locale home page (`/{locale}/`)
- `src/app/[locale]/downloaders/[slug]/page.tsx`: Downloader landing pages

**Configuration:**
- `next.config.ts`: Enables `output: export` (SSG), `trailingSlash: true`, disables image optimization
- `tsconfig.json`: Target ES2022, path alias `@/*` → `src/*`
- `tailwind.config.ts`: Tailwind configuration (theme colors, fonts)
- `.eslintrc.json`: ESLint with Next.js config

**Core Logic:**
- `src/domain/downloaders.ts`: Downloader enum and supported list
- `src/domain/downloader-landings.ts`: Landing page content dictionaries (huge file, 550+ lines)
- `src/i18n/locales.ts`: Locale type definitions and validation
- `src/i18n/messages.ts`: Message loading function
- `src/seo/metadata.ts`: Metadata builder for current page locale
- `src/seo/schema.ts`: JSON-LD schema builders

**Styling:**
- `src/globals.css`: Global Tailwind directives, CSS variables (--blue, --bg, --ink-soft, etc.)
- `tailwind.config.ts`: Theme configuration, font imports

**Testing:**
- Not present. No test files exist in the codebase.

## Naming Conventions

**Files:**
- Page/component files: PascalCase (e.g., `BitRemoteWordmark.tsx`, `TextButton.tsx`)
- Utility/logic files: camelCase (e.g., `locales.ts`, `urls.ts`, `metadata.ts`)
- Configuration files: lowercase or specific format (e.g., `next.config.ts`, `.eslintrc.json`)

**Directories:**
- Route segments: kebab-case for multi-word segments (e.g., `[locale]`, `llms-full.txt`, `ascii-panel`)
- Feature directories: kebab-case (e.g., `ascii-panel`, `downloader-landings`)
- Standard Next.js directories: lowercase (e.g., `app`, `public`, `components`, `i18n`, `domain`)

**TypeScript/Variables:**
- Enums: PascalCase (e.g., `Downloader`)
- Types: PascalCase (e.g., `Locale`, `Messages`, `DownloaderLandingContent`)
- Functions: camelCase (e.g., `getMessages()`, `buildContent()`, `localePath()`)
- Constants: camelCase or UPPER_CASE for config (e.g., `defaultLocale`, `supportedDownloaders`, `LINKS`)

## Where to Add New Code

**New Localized Page:**
1. Create directory: `src/app/[locale]/[new-route]/`
2. Add page file: `src/app/[locale]/[new-route]/page.tsx`
3. Import and call `generateStaticParams()` if route has dynamic segments
4. Load messages via `getMessages(locale)` from `src/i18n/messages.ts`
5. Add metadata generation via `buildMetadataForCurrentLocalePage()` from `src/seo/metadata.ts`
6. Add route entry to `src/seo/routes.ts` if needed for sitemap

**New Component:**
- If reusable across pages: `src/components/[ComponentName].tsx`
- If specific to ASCII panel: `src/ascii-panel/components/[ComponentName].tsx` or `src/ascii-panel/pages/[PageName].tsx`
- Import from `@/components/` using path alias

**New Domain Model:**
- Add to `src/domain/`: Keep enum/types in separate files (one concern per file)
- Example: `src/domain/new-entity.ts` with enum, types, factory functions
- Export public getters; keep factories internal

**New i18n Module:**
- Add to `src/i18n/`: Keep each concern separate
- Example: if adding date/number formatting, create `src/i18n/formatters.ts`
- Use existing pattern: accept `locale` parameter, return typed result

**New Utility Function:**
- Shared across multiple modules: `src/utils/[concern].ts`
- Route-specific: Co-locate in the route directory
- SEO-specific: Add to `src/seo/`

**Updating Messages:**
- Edit JSON files in `src/messages/`
- Update TypeScript inferred type: `src/i18n/messages.ts` imports and exports `Messages` type
- Type-checking ensures all locales have matching structure

## Special Directories

**`src/app/llms-full.txt/`:**
- Purpose: API route that returns full context for LLM systems
- Generated: Yes, at build time
- Committed: Yes (but generated content varies)
- Pattern: Route handler in `route.ts` file

**`src/messages/`:**
- Purpose: Localization files
- Generated: No, hand-edited
- Committed: Yes, all translations committed
- Pattern: Imported as modules in `src/i18n/messages.ts`

**`.next/`:**
- Purpose: Build output directory
- Generated: Yes, by `next build`
- Committed: No (in `.gitignore`)
- Pattern: Contains pre-rendered pages, static assets, build artifacts

**`.planning/codebase/`:**
- Purpose: Documentation generated by GSD codebase mapper
- Generated: Yes, by orchestrator
- Committed: Tracked in git (reference documentation)
- Pattern: Markdown files documenting architecture, structure, conventions, testing patterns, and concerns

---

*Structure analysis: 2026-03-22*
