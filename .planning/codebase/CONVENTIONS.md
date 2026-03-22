# Coding Conventions

**Analysis Date:** 2026-03-22

## Naming Patterns

**Files:**
- Components: PascalCase with `.tsx` extension (e.g., `BitRemoteWordmark.tsx`, `TextButton.tsx`, `FaqAccordion.tsx`)
- Utility/service files: camelCase with `.ts` extension (e.g., `downloaders.ts`, `messages.ts`, `locales.ts`)
- Server route handlers: `route.ts` (e.g., `src/app/llms-full.txt/route.ts`)
- Page components: `page.tsx` (Next.js convention)
- Layout wrappers: `layout.tsx` (Next.js convention)
- Error pages: specific names like `not-found.tsx`

**Functions:**
- React components: PascalCase (e.g., `BitRemoteWordmark()`, `TextButton()`, `LocaleHomePage()`)
- Utility functions: camelCase (e.g., `getMessages()`, `buildMetadataForCurrentLocalePage()`, `buildSoftwareApplicationSchema()`)
- Type guards: camelCase with `is` prefix (e.g., `isLocale()`)
- Predicate/factory functions: camelCase starting with verb (e.g., `buildMetadataForCurrentLocalePage()`, `buildSoftwareApplicationSchema()`)

**Variables:**
- Local state and props: camelCase (e.g., `locale`, `messages`, `content`, `isLocaleMenuOpen`)
- Constants: camelCase or UPPER_CASE depending on scope
  - Module-level exports: UPPER_CASE for configuration (e.g., `LINKS`, `MESSAGES_BY_LOCALE`)
  - Local constants: camelCase (e.g., `tabLinkClassName`)
  - Type definitions as constants: camelCase with semantic name (e.g., `supportedDownloaders`)

**Types:**
- Type definitions: PascalCase (e.g., `Locale`, `Messages`, `DownloaderLandingContent`)
- Generic type aliases: PascalCase (e.g., `Props`, `Item`)
- Enum members: match their runtime values (e.g., `Downloader.aria2`, `Downloader.qBittorrent`)
- Union types: PascalCase (e.g., `FramePageId = 'home' | 'settings' | 'new-client'`)

## Code Style

**Formatting:**
- No explicit prettier config found; uses Next.js defaults
- File paths and imports use Unix-style separators (`/`)
- Trailing semicolons present throughout codebase
- 2-space indentation (implied by Next.js standard)

**Linting:**
- ESLint with `eslint-config-next` (extends `next/core-web-vitals`)
- Config: `.eslintrc.json`
- Lint command: `npm run lint` with max-warnings set to 0 (strict mode)
- Covers `.js`, `.jsx`, `.ts`, `.tsx` files

## Import Organization

**Order:**
1. Built-in modules (e.g., `'next'`, `'react'`)
2. Type imports from external packages (e.g., `import type { Metadata } from 'next'`)
3. Third-party dependencies
4. Path-aliased imports from `@/*` (relative to `src/`)
5. Internal type imports (e.g., `import type { Locale } from '@/i18n/locales'`)
6. Internal value imports

**Path Aliases:**
- `@/*` resolves to `src/*` (configured in `tsconfig.json`)
- Examples:
  - `@/components/TextButton`
  - `@/i18n/locales`
  - `@/domain/downloaders`
  - `@/seo/metadata`

**Pattern:**
Imports are organized with `type` keyword separating type-only imports:
```typescript
import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import type { Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
```

## Error Handling

**Patterns:**
- No explicit try-catch patterns found in codebase; validation preferred
- Type guards used for runtime validation (e.g., `isLocale()` to validate string as `Locale` type)
- Fallback to defaults on invalid input:
  - `const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;`
  - Invalid downloader slugs handled with conditional rendering
- No logging of errors detected (no `console.error` calls found)
- Static site generation prevents runtime errors in most cases

**Null Safety:**
- Optional chaining used for property access (`obj?.property`)
- Conditional rendering with explicit checks (`if (!landingContent || !slug) { return (...) }`)

## Logging

**Framework:** Not used - no logging infrastructure detected

**Pattern:** No logging present in codebase. Static site generation and server-side rendering handle most concerns.

## Comments

**When to Comment:**
- Comments are minimal throughout codebase
- Comments used for section markers in longer files (e.g., `/* ---- Type definitions ---- */`)
- Inline comments sparse; code is self-documenting through clear naming

**JSDoc/TSDoc:**
- Not used systematically
- No JSDoc comments on functions or types
- Codebase relies on TypeScript type annotations for documentation

## Function Design

**Size:** Functions are generally compact, ranging from 5-50 lines
- Example: `BitRemoteWordmark()` is 73 lines (mostly SVG markup)
- Example: `TextButton()` is 47 lines including destructuring
- Longer functions break logic into helper functions or components

**Parameters:**
- Props pattern uses single object parameter for React components:
  ```typescript
  export function TextButton({
    href,
    children,
    variant = 'primary',
    target,
    rel,
  }: Props)
  ```
- Type declarations for parameters use inline object types or separate `type Props`
- Named parameters preferred over positional

**Return Values:**
- React components return JSX.Element implicitly
- Utility functions return their expected types explicitly
- Nullable returns handled through type signatures (e.g., `Messages | undefined` would be explicit)
- Factories return complete objects with all required fields

## Module Design

**Exports:**
- Named exports preferred (e.g., `export function BitRemoteWordmark()`)
- Single default exports for page components (Next.js requirement)
- Type exports separated: `export type Locale = ...`
- Constants exported as named exports: `export const LINKS = {...}`

**Barrel Files:**
- Used in feature directories:
  - `src/ascii-panel/index.tsx` exports the main `AsciiPanel` component
  - No `index.ts` re-exports for utility modules (each file exports its own)

**Module Organization:**
- Clear separation by domain:
  - `src/app/` - Next.js App Router pages and layouts
  - `src/components/` - Shared React components
  - `src/domain/` - Business logic and data models
  - `src/i18n/` - Internationalization helpers
  - `src/seo/` - SEO metadata and schema generation
  - `src/ascii-panel/` - Interactive ASCII panel feature with sub-pages
  - `src/messages/` - Message JSON files per locale

**Type Exports:**
- Utility types exported from their modules (e.g., `export type Locale = ...`)
- Message types derived from JSON structure: `export type Messages = typeof en;`
- Domain types live in domain modules (e.g., `DownloaderLandingContent` in `downloader-landings.ts`)

## Const/Enum Patterns

**Enums:**
- Used for fixed sets of string values: `enum Downloader { aria2 = 'aria2', ... }`
- Members are string enums matching their display names
- Exported alongside supporting maps (e.g., `downloaderSlugByDownloader`)

**Const Assertions:**
- Used with mapped objects: `as const satisfies Record<Downloader, string>`
- Enables type-safe lookups while maintaining immutability

**Readonly Arrays:**
- Exported as `readonly` to prevent accidental mutations:
  ```typescript
  export const supportedDownloaders: readonly Downloader[] = [...]
  ```

## Next.js Patterns

**Server Components:**
- Pages and layouts use `async function` (server components by default)
- Parameter destructuring for dynamic segments: `params: Promise<{ locale: string }>`
- Async metadata generation: `export async function generateMetadata(...)`

**Client Components:**
- Marked with `'use client'` directive (e.g., `TextTabsNav.tsx`)
- Event handlers and state management wrapped in client components
- Server component tree can include client components

**Dynamic Routes:**
- Dynamic segments: `[locale]`, `[slug]`
- `generateStaticParams()` used for static generation of parameterized pages
- `dynamicParams = false` prevents runtime generation of unlisted params

---

*Convention analysis: 2026-03-22*
