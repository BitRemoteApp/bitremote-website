# Architecture

**Analysis Date:** 2026-03-22

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Multi-Language Support

**Key Characteristics:**
- Next.js 15 with `output: export` configuration for static HTML generation
- App Router with dynamic parameters disabled (`dynamicParams = false`) for type-safe static routes
- Internationalization (i18n) as a core architectural concern handled via URL segments
- Component-driven UI with Tailwind CSS styling
- Server-side metadata generation for SEO with JSON-LD structured data

## Layers

**Routing Layer:**
- Purpose: Handle URL structure and page generation for multi-locale support
- Location: `src/app/` (Next.js App Router structure)
- Contains: Page components, layout components, API routes, metadata generation
- Depends on: i18n locales, domain models, component library
- Used by: Browser client, search engines

**Domain/Business Logic Layer:**
- Purpose: Encapsulate product-specific data and rules (downloaders, landing pages)
- Location: `src/domain/`
- Contains: `downloaders.ts` (Downloader enum, supported clients), `downloader-landings.ts` (content dictionaries, slug mapping)
- Depends on: i18n locales for content templates
- Used by: Page components, SEO/metadata generation

**Internationalization (i18n) Layer:**
- Purpose: Centralize locale configuration, URL generation, and message management
- Location: `src/i18n/`
- Contains:
  - `locales.ts` - locale constants, validation, BCP 47 language tags
  - `messages.ts` - message loading (imports JSON files from `src/messages/`)
  - `urls.ts` - locale-aware URL generation functions
  - `links.ts` - external links configuration
- Depends on: Message JSON files
- Used by: All page components, layouts, metadata builders

**SEO & Metadata Layer:**
- Purpose: Generate Open Graph, Twitter Card, JSON-LD structured data, and canonical links
- Location: `src/seo/`
- Contains:
  - `metadata.ts` - builds metadata for localized pages
  - `schema.ts` - JSON-LD builders (SoftwareApplication, FAQPage, BreadcrumbList)
  - `routes.ts` - localized route entries for sitemap
- Depends on: i18n messages, domain models
- Used by: Page components for metadata generation

**Presentation Layer:**
- Purpose: Reusable UI components using Tailwind CSS
- Location: `src/components/`
- Contains: Buttons, frames, text components, separators, accordions, word mark
- Depends on: Tailwind configuration, CSS variables
- Used by: Page components, ASCII panel, layouts

**Interactive Component Layer:**
- Purpose: Client-side interactive UI (uses `'use client'`)
- Location: `src/ascii-panel/`
- Contains: Frame-based terminal-style UI with state management
  - `index.tsx` - main component with local state (page navigation, modal sheets)
  - `components/` - AsciiPanelFrame, AsciiPanelSheet
  - `pages/` - HomePage, SettingsPage, NewClientPage
- Depends on: React hooks for state/effects
- Used by: Home page layout

## Data Flow

**Static Page Generation:**

1. Build time: Next.js processes all `[locale]` dynamic routes
2. `generateStaticParams()` in layout defines all locale variants (en, ja, zh-hans, zh-hant)
3. For each locale route, page component:
   - Validates locale using `isLocale()` from `src/i18n/locales.ts`
   - Fetches messages via `getMessages(locale)` from `src/i18n/messages.ts`
   - Generates metadata using `buildMetadataForCurrentLocalePage()` from `src/seo/metadata.ts`
   - Renders with locale-specific content and links

**Downloader Landing Pages:**

1. Routes: `src/app/[locale]/downloaders/[slug]/page.tsx`
2. Slugs are statically enumerated from `downloaderLandingSlugs` in `src/domain/downloader-landings.ts`
3. For each slug, retrieve content via `getDownloaderLandingContent(locale, slug)`
4. Content factory pattern: locale + downloader enum → localized content
5. Metadata built with downloader-specific SEO data

**Sitemap Generation:**

1. Build time: `src/app/sitemap.ts` creates unified sitemap with language alternates
2. Iterates through localized routes and downloader landing entries
3. Each entry includes hreflang links for all available locales

**State Management (ASCII Panel):**

- Local component state via `useState` for:
  - `activePage`: which panel view is shown (home, settings, new-client)
  - `sheet`: modal state including page, presentation mode, phase (open/closing)
- Animation triggered by `useEffect` on sheet phase change
- Respects `prefers-reduced-motion` media query

## Key Abstractions

**Locale Type System:**
- Purpose: Type-safe locale handling throughout the codebase
- Examples: `src/i18n/locales.ts` (Locale union type, isLocale guard)
- Pattern: Branded type with validation function to prevent string locale bugs

**Message Dictionary:**
- Purpose: Centralized, type-safe multilingual content
- Examples: `src/messages/en.json`, `src/messages/ja.json`, etc.
- Pattern: JSON files imported as typed objects; `getMessages(locale)` returns fully typed Messages object

**Downloader Landing Factory:**
- Purpose: Generate localized content for product landing pages with locale-specific templates
- Examples: `downloaderLandingDictionary` in `src/domain/downloader-landings.ts`
- Pattern: Factory functions per downloader; templates per locale; `buildContent()` combines both to generate final page data

**URL Builder Functions:**
- Purpose: Encapsulate locale-aware URL generation with consistent formatting
- Examples: `localePath()`, `localeRoot()`, `absoluteUrl()` in `src/i18n/urls.ts`
- Pattern: Single responsibility functions that handle trailing slashes and locale prefixes

**SEO Schema Builders:**
- Purpose: Generate structured data (JSON-LD) for rich snippets
- Examples: `buildSoftwareApplicationSchema()`, `buildFaqPageSchema()` in `src/seo/schema.ts`
- Pattern: Pure functions that combine messages + locale + links into schema objects

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page request
- Responsibilities: Global metadata, favicon/manifest, HTML structure, global styles import

**Locale Layout:**
- Location: `src/app/[locale]/layout.tsx`
- Triggers: Every locale-specific route request
- Responsibilities: Static param generation, message loading, locale validation, navigation UI (TextTabsNav), footer layout

**Home Page:**
- Location: `src/app/[locale]/page.tsx`
- Triggers: `/{locale}/` requests
- Responsibilities: Hero section rendering, features grid, FAQ, schema.org markup, downloader links with landing pages

**Downloader Landing:**
- Location: `src/app/[locale]/downloaders/[slug]/page.tsx`
- Triggers: `/{locale}/downloaders/{slug}/` requests
- Responsibilities: Render downloader-specific content, build breadcrumb schema, generate downloader metadata

**Root Index:**
- Location: `src/app/page.tsx`
- Triggers: `/` root request
- Responsibilities: Language selector, link to App Store

**Sitemap:**
- Location: `src/app/sitemap.ts`
- Triggers: Build time (static generation)
- Responsibilities: List all localized routes and downloader pages with language alternates

## Error Handling

**Strategy:** Type-safety-first approach to prevent errors at runtime

**Patterns:**
- Locale validation via `isLocale()` guard; falls back to `defaultLocale` if invalid
- Message loading fails hard (import-time, caught during build) rather than runtime
- Factory pattern for downloader content with `undefined` check for missing content
- `dynamicParams = false` in layout prevents unexpected 404s for ungenerated locales

## Cross-Cutting Concerns

**Logging:** Not implemented - static site with no server-side logging. Client-side errors are not tracked.

**Validation:** Strict TypeScript with `noEmit: true`. Locale validation via `isLocale()` guard function. No runtime schema validation.

**Authentication:** Not applicable - public marketing website, no authentication.

**Internationalization:** URL-based (locale in first segment). Content loaded at render time via `getMessages()`. Link generation via `localePath()` ensures consistent locale in URLs.

---

*Architecture analysis: 2026-03-22*
