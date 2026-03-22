<!-- GSD:project-start source:PROJECT.md -->
## Project

Project not yet initialized. Run /gsd:new-project to set up.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.7.3 - All source code in `src/`
- JavaScript - Build configuration and scripts
- JSON - Internationalization messages and configuration
- CSS - Styling via Tailwind (processed through PostCSS)
## Runtime
- Node.js 25 (required for CI, see `.github/workflows/ci.yml`)
- npm (with lockfile `package-lock.json`)
- Lockfile: Present
## Frameworks
- Next.js 15.1.0 - Full-stack React framework for SSR/static generation
- React 19.0.0 - UI component library
- React DOM 19.0.0 - DOM rendering
- Tailwind CSS 3.4.0 - Utility-first CSS framework
- PostCSS 8.4.0 - CSS transformations
- Autoprefixer 10.4.0 - Vendor prefix automation
- TypeScript 5.7.3 - Language compilation
- ESLint 8.57.0 with next/core-web-vitals - Code linting
- ESLint Config Next 15.1.0 - Next.js specific linting rules
## Key Dependencies
- next (15.1.0) - Framework providing server rendering, static generation, and API routes
- react (19.0.0) - Component library and state management
- react-dom (19.0.0) - Renders React components to DOM
- autoprefixer (10.4.0) - Auto-adds vendor prefixes to CSS
- postcss (8.4.0) - CSS processing pipeline
- tailwindcss (3.4.0) - CSS utility generation from config
- @types/node (22.10.0) - Node.js type definitions
- @types/react (19.0.0) - React component type definitions
- @types/react-dom (19.0.0) - React DOM type definitions
- typescript (5.7.3) - TypeScript compiler
## Configuration
- `NEXT_ALLOWED_DEV_ORIGINS` (optional) - Comma-separated list of allowed origins for development
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler settings
- `tailwind.config.ts` - Tailwind CSS configuration
- `.eslintrc.json` - ESLint configuration
- `postcss.config.js` - PostCSS pipeline
## Platform Requirements
- Node.js 25 (see `.github/workflows/ci.yml`)
- npm with lockfile caching support
- TypeScript compiler
- Cloudflare Pages (deployment target based on recent commit history)
- Static file hosting (output is `out/` directory)
- No server-side runtime required (static export)
## Build Output
- Static export to `out/` directory
- No API runtime required
- Suitable for static hosting (Cloudflare Pages, GitHub Pages)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Components: PascalCase (e.g., `BitRemoteWordmark.tsx`, `TextButton.tsx`)
- Utilities/Helpers: camelCase (e.g., `messages.ts`, `locales.ts`, `urls.ts`)
- Pages: Match Next.js conventions with brackets for dynamic routes (e.g., `[locale]`, `page.tsx`)
- Features organized in directories: lowercase with hyphens for multi-word (e.g., `ascii-panel`, `downloader-landings`)
- React components: PascalCase (e.g., `TextFrame`, `AsciiPanel`, `FaqAccordion`)
- Utility functions: camelCase (e.g., `parseSpeed`, `buildMetadataForCurrentLocalePage`, `localeRoot`)
- Internal helper functions: camelCase (e.g., `clientSkeletonName`, `digitText`, `numericDirection`)
- Boolean/type guard functions use `is` prefix (e.g., `isLocale`)
- Regular variables: camelCase (e.g., `activePage`, `isLocaleMenuOpen`, `localePrefix`)
- Constants: UPPER_SNAKE_CASE (e.g., `FRAME_INTERVAL_MS`, `LINKS`)
- Type/interface instances: PascalCase when they represent a type definition, camelCase when assigned
- Enums: PascalCase members (e.g., `Downloader.aria2`, `Downloader.qBittorrent`)
- Interface/Type definitions: PascalCase (e.g., `Props`, `Messages`, `FrameSheetState`, `ClientSpeed`)
- Generic type parameters: Single uppercase letter or descriptive PascalCase (e.g., `T`, `Locale`)
- Type aliases: PascalCase (e.g., `FramePageId`, `FramePresentation`)
## Code Style
- No explicit prettier config in project — uses ESLint's defaults
- Line length: No strict limit observed but code typically under 120 chars per line
- Indentation: 2 spaces (standard Next.js)
- Trailing commas: Used in objects and arrays
- ESLint configuration: `extends: ["next/core-web-vitals"]`
- Config file: `.eslintrc.json`
- Lint command: `npm run lint` runs ESLint with `--max-warnings 0` (zero warnings allowed)
- Enforced rules include Next.js best practices and core web vitals compliance
- All imports sorted: React types first, then third-party, then local imports
- Type imports use explicit `type` keyword (e.g., `import type { Metadata } from 'next'`)
- Multi-line imports: Values before types when from same module
## Import Organization
- `@/*` maps to `src/*` (defined in `tsconfig.json`)
- Always use `@/` for imports from `src/` directory
- Examples: `@/components`, `@/i18n`, `@/domain`, `@/seo`, `@/ascii-panel`
- `src/ascii-panel/index.tsx` exports `AsciiPanel` component as barrel export
- Most other modules export directly without barrel files
## Error Handling
- Explicit type guards for validation (e.g., `isLocale()` function in `src/i18n/locales.ts`)
- Fallback to defaults on invalid input (e.g., if locale is invalid, use `defaultLocale`)
- No try-catch blocks observed — static/compile-time approach preferred
- Optional chaining used extensively (e.g., `prevFrame[index]?.client`)
- Null coalescing with `??` operator (e.g., `clientsDataset[state.index] ?? clientsDataset[0]`)
## Logging
- No logging observed in production code
- No debug output in normal operation
- SVG filters and animations used for visual feedback instead
## Comments
- Minimal commenting — code is self-explanatory through naming
- Section dividers used in data-heavy files (e.g., `/* ------------------------------------------------------------------ */`)
- JSDoc-style comments on complex functions
- Not consistently used across the codebase
- Example from `src/i18n/locales.ts`:
- Rare inline comments explaining design decisions (e.g., `src/components/TextTabsNav.tsx`:
## Function Design
- Small utility functions: 5–10 lines
- React components: 20–50 lines
- Complex interactive components: 50–135+ lines
- Destructured from `Props` type or inline destructuring
- Always use explicit type annotations
- Example from `src/components/TextButton.tsx`:
- React components return JSX directly
- Utility functions return typed values
- Optional returns use `null` or `undefined` explicitly
- No implicit `undefined` returns
## Module Design
- Named exports used exclusively (no default exports observed except Next.js page/layout files)
- Each module exports only what's necessary
- Example from `src/i18n/messages.ts`:
- `src/ascii-panel/index.tsx` exports the main `AsciiPanel` component
- Other feature directories don't use barrel files, direct imports preferred
- Types defined at file level, before implementation
- Component `Props` type defined before component function
- Example pattern:
## Special Patterns
- Used for type-safe object/enum mappings
- Example from `src/ascii-panel/pages/HomePage.tsx`:
- `as const` used on objects/arrays that should be treated as literal types
- Enables type safety for mapped/readonly data
- `'use client'` directive used in interactive components (`src/ascii-panel/index.tsx`, `src/components/TextTabsNav.tsx`)
- Server components by default (no directive needed)
- Server functions with `async` keywords used in page components
- Used for immutable data structures (e.g., `readonly ClientSpeedFrame[]`)
- Combined with `const` for extra type safety
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Next.js 15 with `output: export` configuration for static HTML generation
- App Router with dynamic parameters disabled (`dynamicParams = false`) for type-safe static routes
- Internationalization (i18n) as a core architectural concern handled via URL segments
- Component-driven UI with Tailwind CSS styling
- Server-side metadata generation for SEO with JSON-LD structured data
## Layers
- Purpose: Handle URL structure and page generation for multi-locale support
- Location: `src/app/` (Next.js App Router structure)
- Contains: Page components, layout components, API routes, metadata generation
- Depends on: i18n locales, domain models, component library
- Used by: Browser client, search engines
- Purpose: Encapsulate product-specific data and rules (downloaders, landing pages)
- Location: `src/domain/`
- Contains: `downloaders.ts` (Downloader enum, supported clients), `downloader-landings.ts` (content dictionaries, slug mapping)
- Depends on: i18n locales for content templates
- Used by: Page components, SEO/metadata generation
- Purpose: Centralize locale configuration, URL generation, and message management
- Location: `src/i18n/`
- Contains:
- Depends on: Message JSON files
- Used by: All page components, layouts, metadata builders
- Purpose: Generate Open Graph, Twitter Card, JSON-LD structured data, and canonical links
- Location: `src/seo/`
- Contains:
- Depends on: i18n messages, domain models
- Used by: Page components for metadata generation
- Purpose: Reusable UI components using Tailwind CSS
- Location: `src/components/`
- Contains: Buttons, frames, text components, separators, accordions, word mark
- Depends on: Tailwind configuration, CSS variables
- Used by: Page components, ASCII panel, layouts
- Purpose: Client-side interactive UI (uses `'use client'`)
- Location: `src/ascii-panel/`
- Contains: Frame-based terminal-style UI with state management
- Depends on: React hooks for state/effects
- Used by: Home page layout
## Data Flow
- Local component state via `useState` for:
- Animation triggered by `useEffect` on sheet phase change
- Respects `prefers-reduced-motion` media query
## Key Abstractions
- Purpose: Type-safe locale handling throughout the codebase
- Examples: `src/i18n/locales.ts` (Locale union type, isLocale guard)
- Pattern: Branded type with validation function to prevent string locale bugs
- Purpose: Centralized, type-safe multilingual content
- Examples: `src/messages/en.json`, `src/messages/ja.json`, etc.
- Pattern: JSON files imported as typed objects; `getMessages(locale)` returns fully typed Messages object
- Purpose: Generate localized content for product landing pages with locale-specific templates
- Examples: `downloaderLandingDictionary` in `src/domain/downloader-landings.ts`
- Pattern: Factory functions per downloader; templates per locale; `buildContent()` combines both to generate final page data
- Purpose: Encapsulate locale-aware URL generation with consistent formatting
- Examples: `localePath()`, `localeRoot()`, `absoluteUrl()` in `src/i18n/urls.ts`
- Pattern: Single responsibility functions that handle trailing slashes and locale prefixes
- Purpose: Generate structured data (JSON-LD) for rich snippets
- Examples: `buildSoftwareApplicationSchema()`, `buildFaqPageSchema()` in `src/seo/schema.ts`
- Pattern: Pure functions that combine messages + locale + links into schema objects
## Entry Points
- Location: `src/app/layout.tsx`
- Triggers: Every page request
- Responsibilities: Global metadata, favicon/manifest, HTML structure, global styles import
- Location: `src/app/[locale]/layout.tsx`
- Triggers: Every locale-specific route request
- Responsibilities: Static param generation, message loading, locale validation, navigation UI (TextTabsNav), footer layout
- Location: `src/app/[locale]/page.tsx`
- Triggers: `/{locale}/` requests
- Responsibilities: Hero section rendering, features grid, FAQ, schema.org markup, downloader links with landing pages
- Location: `src/app/[locale]/downloaders/[slug]/page.tsx`
- Triggers: `/{locale}/downloaders/{slug}/` requests
- Responsibilities: Render downloader-specific content, build breadcrumb schema, generate downloader metadata
- Location: `src/app/page.tsx`
- Triggers: `/` root request
- Responsibilities: Language selector, link to App Store
- Location: `src/app/sitemap.ts`
- Triggers: Build time (static generation)
- Responsibilities: List all localized routes and downloader pages with language alternates
## Error Handling
- Locale validation via `isLocale()` guard; falls back to `defaultLocale` if invalid
- Message loading fails hard (import-time, caught during build) rather than runtime
- Factory pattern for downloader content with `undefined` check for missing content
- `dynamicParams = false` in layout prevents unexpected 404s for ungenerated locales
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

## Design Decision Authority

For design-related decisions (typography, color, layout, spacing, tokens, visual effects, component styling), Claude should consult available design skills and the Impeccable skill set rather than asking the user. Use project research docs (`.planning/research/`) and PROJECT.md as context. Present decisions made, not questions. Still ask the user about non-design decisions (product scope, content strategy, business logic).

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
