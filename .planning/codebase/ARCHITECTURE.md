# Architecture

**Analysis Date:** 2026-03-22

## Pattern Overview

**Overall:** Static site generation with Next.js App Router using an island architecture pattern. The application renders a marketing website with multi-locale support and a client-side ASCII panel UI component for interactive demonstration.

**Key Characteristics:**
- Server-side rendering with static pre-generation (`output: 'export'`)
- Multi-locale content with runtime locale detection
- Component-driven UI with separated page and component layers
- Domain-driven organization for business logic (downloaders, content)
- SEO-optimized with JSON-LD schema generation
- Client-side interactive components isolated to specific pages

## Layers

**App Router Layer (Pages & Layouts):**
- Purpose: Define page structure and routing using Next.js App Router conventions
- Location: `src/app/` and `src/app/[locale]/`
- Contains: Page components (`page.tsx`), layout wrappers (`layout.tsx`), metadata generation, static parameter generation
- Depends on: Components, i18n, domain, SEO utilities
- Used by: Next.js build system for route generation

**Component Layer:**
- Purpose: Reusable UI components focused on rendering and basic interactivity
- Location: `src/components/`
- Contains: Button components (`TextButton.tsx`), frames (`TextFrame.tsx`), navigation (`TextTabsNav.tsx`), specialized components (`BitRemoteWordmark.tsx`, `FaqAccordion.tsx`)
- Depends on: i18n for messaging, Tailwind CSS for styling
- Used by: Page components and the ASCII panel module

**ASCII Panel Module:**
- Purpose: Interactive client-side component demonstrating BitRemote UI in ASCII art style
- Location: `src/ascii-panel/`
- Contains: Main panel coordinator (`index.tsx`), UI components (`components/`), page views (`pages/`), frame management and state handling
- Depends on: React hooks for state management (useEffect, useState), component library patterns
- Used by: Home page (`src/app/[locale]/page.tsx`)

**Domain Layer:**
- Purpose: Core business logic and data models for downloaders and landing content
- Location: `src/domain/`
- Contains: Downloader enum and list (`downloaders.ts`), downloader landing page content mappings (`downloader-landings.ts`)
- Depends on: i18n for localization
- Used by: Pages, components, and SEO layer

**Internationalization (i18n) Layer:**
- Purpose: Manage multi-locale content, routing, and language configuration
- Location: `src/i18n/`
- Contains: Locale definitions (`locales.ts`), message loader (`messages.ts`), URL builders (`urls.ts`), external links (`links.ts`)
- Depends on: Message JSON files in `src/messages/`
- Used by: All pages and components requiring locale context

**SEO Layer:**
- Purpose: Generate structured data (JSON-LD) and metadata for search engines
- Location: `src/seo/`
- Contains: Schema builders (`schema.ts`), metadata generators (`metadata.ts`), downloader-specific metadata (`downloader-metadata.ts`), route configuration (`routes.ts`)
- Depends on: Domain models, i18n, messages
- Used by: Page components during metadata generation and rendering

**Content Layer (Messages):**
- Purpose: Store translatable content strings and structured content
- Location: `src/messages/`
- Contains: JSON files for each locale (`en.json`, `ja.json`, `zh-hans.json`, `zh-hant.json`) containing all UI text, section content, and metadata

## Data Flow

**Static Page Generation (Build Time):**

1. Next.js calls `generateStaticParams()` in layout files to discover all locale variants and dynamic routes
2. For each locale and route, the page component is rendered
3. `generateMetadata()` is called to build title, description, and schema tags
4. Messages are loaded from `src/messages/` for the current locale
5. Schema objects are built (SoftwareApplication, FAQ, Breadcrumb)
6. Page renders with localized messages and embedded schema in `<script type="application/ld+json">`
7. CSS is processed through PostCSS and Tailwind
8. Static HTML files are exported to the build output

**Client-Side Navigation (Runtime):**

1. User loads HTML page from static file
2. For the home page, React hydrates the ASCII Panel interactive component
3. User clicks buttons within ASCII Panel to navigate between sheets (modal overlays)
4. Component state updates (navigate action, sheet opening/closing)
5. CSS animations trigger based on `prefers-reduced-motion` query
6. All interactions remain within the client (no server calls)

**Locale Resolution (Runtime):**

1. User accesses a URL with locale segment (e.g., `/ja/`)
2. Layout component receives `params` with locale string
3. `isLocale()` validates the locale; falls back to `defaultLocale` if invalid
4. `getMessages(locale)` retrieves the JSON message object
5. All components use the locale context for routing and message rendering

## Key Abstractions

**Locale-Aware URL Builder:**
- Purpose: Generate correct locale-prefixed URLs throughout the app
- Examples: `src/i18n/urls.ts` provides `localeRoot()`, `localePath()`, `absoluteUrl()`
- Pattern: Pure functions that accept locale and path, return normalized URLs with proper leading/trailing slashes

**Message Provider Pattern:**
- Purpose: Load and distribute locale-specific strings and content
- Examples: `getMessages()` in `src/i18n/messages.ts`
- Pattern: Centralized message dictionary per locale, typed as `Messages` type

**Schema Builder Pattern:**
- Purpose: Construct JSON-LD schema objects for SEO
- Examples: `buildSoftwareApplicationSchema()`, `buildFaqPageSchema()`, `buildBreadcrumbSchema()` in `src/seo/schema.ts`
- Pattern: Factory functions that accept locale, messages, and domain data, return structured schema objects

**Component Composition:**
- Purpose: Build complex UI from simple, reusable pieces
- Examples: `TextFrame`, `TextButton`, `AsciiPanel` combine to form page layouts
- Pattern: Props-based configuration, aria labels for accessibility, Tailwind CSS for styling

**Static Parameter Generation:**
- Purpose: Enable static pre-rendering of dynamic routes
- Examples: `generateStaticParams()` in `src/app/[locale]/layout.tsx` and downloader page
- Pattern: Functions that return array of param objects matching URL segment shape

## Entry Points

**Root Page:**
- Location: `src/app/page.tsx`
- Triggers: Direct access to `/`
- Responsibilities: Language selection gateway, metadata setup, displays locale buttons for user to select language

**Locale Home Page:**
- Location: `src/app/[locale]/page.tsx`
- Triggers: Access to `/{locale}/` (e.g., `/en/`, `/ja/`)
- Responsibilities: Render main marketing page with hero, features, FAQ, interactive ASCII panel, embed software app schema and FAQ schema

**Downloader Landing Page:**
- Location: `src/app/[locale]/downloaders/[slug]/page.tsx`
- Triggers: Access to `/{locale}/downloaders/{slug}/` (e.g., `/en/downloaders/qbittorrent/`)
- Responsibilities: Render downloader-specific landing page with overview, capabilities, use cases, breadcrumb schema

**Legal Pages:**
- Location: `src/app/[locale]/privacy/page.tsx`, `src/app/[locale]/terms/page.tsx`, `src/app/[locale]/support/page.tsx`
- Triggers: Access to respective routes
- Responsibilities: Static legal/support content pages

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Wraps all pages
- Responsibilities: Global metadata (favicon, manifest), base HTML structure, global CSS import

**Locale Layout:**
- Location: `src/app/[locale]/layout.tsx`
- Triggers: Wraps all locale-prefixed pages
- Responsibilities: Locale parameter extraction and validation, message loading, static param generation, navigation bar, footer rendering

**Special Routes:**
- `src/app/robots.ts`: Generate robots.txt
- `src/app/sitemap.ts`: Generate sitemap.xml
- `src/app/llms-full.txt/route.ts`: API route for LLM model context
- `src/app/not-found.tsx`: Fallback for invalid routes

## Error Handling

**Strategy:** Graceful degradation with fallback to default locale and 404 pages

**Patterns:**
- Locale validation uses `isLocale()` type guard; invalid locales fall back to `defaultLocale`
- Dynamic routes use `notFound()` to trigger 404 page when slug doesn't match available downloader slugs
- Message loading returns `undefined` if locale not in dictionary; component handles gracefully or uses default
- Schema generation silently omits missing data rather than throwing errors

## Cross-Cutting Concerns

**Logging:** No logging framework detected; build/runtime diagnostics rely on Next.js and browser console

**Validation:** Locale validation through type guards (`isLocale()`) and slug matching against known lists (`downloaderLandingSlugs`)

**Authentication:** Not applicable; public marketing website with no user authentication

**Accessibility:** Semantic HTML with `aria-label` and `aria-labelledby` attributes, `sr-only` class for screen reader text, proper heading hierarchy, keyboard navigation support in components

---

*Architecture analysis: 2026-03-22*
