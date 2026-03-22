# Coding Conventions

**Analysis Date:** 2026-03-22

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `BitRemoteWordmark.tsx`, `TextButton.tsx`)
- Utilities/Helpers: camelCase (e.g., `messages.ts`, `locales.ts`, `urls.ts`)
- Pages: Match Next.js conventions with brackets for dynamic routes (e.g., `[locale]`, `page.tsx`)
- Features organized in directories: lowercase with hyphens for multi-word (e.g., `ascii-panel`, `downloader-landings`)

**Functions:**
- React components: PascalCase (e.g., `TextFrame`, `AsciiPanel`, `FaqAccordion`)
- Utility functions: camelCase (e.g., `parseSpeed`, `buildMetadataForCurrentLocalePage`, `localeRoot`)
- Internal helper functions: camelCase (e.g., `clientSkeletonName`, `digitText`, `numericDirection`)
- Boolean/type guard functions use `is` prefix (e.g., `isLocale`)

**Variables:**
- Regular variables: camelCase (e.g., `activePage`, `isLocaleMenuOpen`, `localePrefix`)
- Constants: UPPER_SNAKE_CASE (e.g., `FRAME_INTERVAL_MS`, `LINKS`)
- Type/interface instances: PascalCase when they represent a type definition, camelCase when assigned
- Enums: PascalCase members (e.g., `Downloader.aria2`, `Downloader.qBittorrent`)

**Types:**
- Interface/Type definitions: PascalCase (e.g., `Props`, `Messages`, `FrameSheetState`, `ClientSpeed`)
- Generic type parameters: Single uppercase letter or descriptive PascalCase (e.g., `T`, `Locale`)
- Type aliases: PascalCase (e.g., `FramePageId`, `FramePresentation`)

## Code Style

**Formatting:**
- No explicit prettier config in project — uses ESLint's defaults
- Line length: No strict limit observed but code typically under 120 chars per line
- Indentation: 2 spaces (standard Next.js)
- Trailing commas: Used in objects and arrays

**Linting:**
- ESLint configuration: `extends: ["next/core-web-vitals"]`
- Config file: `.eslintrc.json`
- Lint command: `npm run lint` runs ESLint with `--max-warnings 0` (zero warnings allowed)
- Enforced rules include Next.js best practices and core web vitals compliance

**Import statements:**
- All imports sorted: React types first, then third-party, then local imports
- Type imports use explicit `type` keyword (e.g., `import type { Metadata } from 'next'`)
- Multi-line imports: Values before types when from same module

Example pattern from `src/app/[locale]/page.tsx`:
```typescript
import type { Metadata } from 'next';

import { AsciiPanel } from '@/ascii-panel';
import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { FaqAccordion } from '@/components/FaqAccordion';
import { supportedDownloaders } from '@/domain/downloaders';
import { LINKS } from '@/i18n/links';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
```

## Import Organization

**Order:**
1. Built-in Node/Next.js imports with `type` keyword (e.g., `import type { Metadata }`)
2. React and React-related imports
3. Third-party library imports
4. Local imports using `@/` path alias
5. Local type imports at the end of local imports section

**Path Aliases:**
- `@/*` maps to `src/*` (defined in `tsconfig.json`)
- Always use `@/` for imports from `src/` directory
- Examples: `@/components`, `@/i18n`, `@/domain`, `@/seo`, `@/ascii-panel`

**Barrel exports:**
- `src/ascii-panel/index.tsx` exports `AsciiPanel` component as barrel export
- Most other modules export directly without barrel files

## Error Handling

**Patterns:**
- Explicit type guards for validation (e.g., `isLocale()` function in `src/i18n/locales.ts`)
- Fallback to defaults on invalid input (e.g., if locale is invalid, use `defaultLocale`)
- No try-catch blocks observed — static/compile-time approach preferred
- Optional chaining used extensively (e.g., `prevFrame[index]?.client`)
- Null coalescing with `??` operator (e.g., `clientsDataset[state.index] ?? clientsDataset[0]`)

Example from `src/i18n/locales.ts`:
```typescript
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
```

Usage pattern in `src/app/[locale]/page.tsx`:
```typescript
const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
```

## Logging

**Framework:** `console` only — no logging library in dependencies

**Patterns:**
- No logging observed in production code
- No debug output in normal operation
- SVG filters and animations used for visual feedback instead

## Comments

**When to Comment:**
- Minimal commenting — code is self-explanatory through naming
- Section dividers used in data-heavy files (e.g., `/* ------------------------------------------------------------------ */`)
- JSDoc-style comments on complex functions

**JSDoc/TSDoc:**
- Not consistently used across the codebase
- Example from `src/i18n/locales.ts`:
```typescript
/** BCP 47 language tags for use in HTML `lang` attributes. */
export const localeLang: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
};
```

- Rare inline comments explaining design decisions (e.g., `src/components/TextTabsNav.tsx`:
```typescript
// data-[active=true]:* classes are intentionally never applied.
// Tab items respond to hover only — there is no persistent "current page" highlight by design.
```

## Function Design

**Size:** Functions are typically 10–30 lines, with some reaching 70+ lines for complex components
- Small utility functions: 5–10 lines
- React components: 20–50 lines
- Complex interactive components: 50–135+ lines

**Parameters:**
- Destructured from `Props` type or inline destructuring
- Always use explicit type annotations
- Example from `src/components/TextButton.tsx`:
```typescript
export function TextButton({
  href,
  children,
  variant = 'primary',
  target,
  rel,
}: Props) {
```

**Return Values:**
- React components return JSX directly
- Utility functions return typed values
- Optional returns use `null` or `undefined` explicitly
- No implicit `undefined` returns

Example from `src/seo/schema.ts`:
```typescript
export function serializeJsonLd(schema: object): { __html: string } {
  return {
    __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
  };
}
```

## Module Design

**Exports:**
- Named exports used exclusively (no default exports observed except Next.js page/layout files)
- Each module exports only what's necessary
- Example from `src/i18n/messages.ts`:
```typescript
export type Messages = typeof en;
export function getMessages(locale: Locale): Messages {
  return MESSAGES_BY_LOCALE[locale];
}
```

**Barrel Files:**
- `src/ascii-panel/index.tsx` exports the main `AsciiPanel` component
- Other feature directories don't use barrel files, direct imports preferred

**Type Organization:**
- Types defined at file level, before implementation
- Component `Props` type defined before component function
- Example pattern:
```typescript
type Props = {
  title: string;
  label?: string;
  children: ReactNode;
};

export function TextFrame({ title, label, children }: Props) {
  // implementation
}
```

## Special Patterns

**Satisfies operator:**
- Used for type-safe object/enum mappings
- Example from `src/ascii-panel/pages/HomePage.tsx`:
```typescript
const clientBadges = {
  [Downloader.aria2]: 'A',
  [Downloader.qBittorrent]: 'Q',
  // ...
} as const satisfies Record<Downloader, string>;
```

**Const assertions:**
- `as const` used on objects/arrays that should be treated as literal types
- Enables type safety for mapped/readonly data

**Next.js Server/Client boundaries:**
- `'use client'` directive used in interactive components (`src/ascii-panel/index.tsx`, `src/components/TextTabsNav.tsx`)
- Server components by default (no directive needed)
- Server functions with `async` keywords used in page components

**Readonly types:**
- Used for immutable data structures (e.g., `readonly ClientSpeedFrame[]`)
- Combined with `const` for extra type safety

---

*Convention analysis: 2026-03-22*
