# Testing Patterns

**Analysis Date:** 2026-03-22

## Test Framework

**Status:** No testing framework configured

This is a static website with no test dependencies in `package.json`. No Jest, Vitest, Playwright, or other test runners are present.

**Development Dependencies:**
- No testing libraries (@testing-library/react, jest, vitest, etc.)
- ESLint configured for code quality checks only
- TypeScript for compile-time type safety

**Run Commands:**
```bash
npm run lint              # Run ESLint with --max-warnings 0 (zero warnings allowed)
npm run dev              # Start development server
npm run build            # Build static export
npm start                # Start production server
```

## Test Coverage

**Requirements:** Not enforced

Coverage is managed through:
1. **TypeScript strict mode** (`strict: true` in `tsconfig.json`)
2. **ESLint with Next.js rules** (via `eslint-config-next`)
3. **Static analysis only** — no runtime tests

## Code Quality Approach

Instead of unit/integration tests, quality assurance relies on:

**Compile-time safety:**
- TypeScript with strict mode enabled
- Exhaustive type checking for all functions and components
- Type guards like `isLocale()` function for runtime validation

**Static analysis:**
- ESLint configured with `"next/core-web-vitals"` rules
- Zero warnings policy (`--max-warnings 0` in lint script)
- Enforces Next.js best practices and accessibility standards

**Type-driven development:**
- All functions have explicit return types
- Props interfaces define component contracts
- Type aliases ensure consistency (e.g., `Locale`, `Messages`)

Example type safety from `src/i18n/messages.ts`:
```typescript
export type Messages = typeof en;

export function getMessages(locale: Locale): Messages {
  return MESSAGES_BY_LOCALE[locale];
}
```

## Test Types Not Implemented

**Unit Tests:** Not present
- Small utility functions like `parseSpeed()`, `localeRoot()` are tested implicitly through TypeScript
- No .test.ts or .spec.ts files in `src/`

**Integration Tests:** Not present
- Next.js page routes and metadata generation rely on Next.js build/runtime validation

**E2E Tests:** Not present
- No Playwright, Cypress, or other E2E framework configured
- Manual testing or CI-based validation only

**Visual Regression Tests:** Not present
- ASCII panel animations and styling verified through development/preview

## Static Site Validation

Since this is a static website generated with `output: 'export'` in `next.config.ts`, testing is minimal:

**What is validated:**
1. Build succeeds without errors
2. TypeScript compilation passes strict mode
3. ESLint reports zero warnings
4. Metadata generation correct (Next.js validates at build time)
5. Routes and path parameters valid

**What is NOT tested:**
- Runtime behavior (animations, state management)
- Component rendering output
- User interactions
- Browser compatibility
- Accessibility compliance (beyond ESLint checks)

## Type Safety as Testing

The codebase replaces runtime tests with compile-time type checking:

**Example: Locale validation**

File: `src/i18n/locales.ts`
```typescript
export const defaultLocale = 'en' as const;
export const locales = ['en', 'ja', 'zh-hans', 'zh-hant'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
```

Usage in `src/app/[locale]/page.tsx`:
```typescript
const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
```

This ensures:
- Only valid locale strings can be used as `Locale` type
- Invalid locales fall back to `defaultLocale`
- TypeScript enforces the type at compile time
- No runtime test needed — type system validates

**Example: Component Props**

File: `src/components/TextButton.tsx`
```typescript
type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  target?: '_blank' | '_self';
  rel?: string;
};

export function TextButton({
  href,
  children,
  variant = 'primary',
  target,
  rel,
}: Props) {
  // implementation
}
```

All callers must provide correct prop types — verified at compile time in every consuming component.

## Linting and Formatting

**ESLint Configuration:**
- Config: `.eslintrc.json`
- Base: `extends: ["next/core-web-vitals"]`
- Command: `npm run lint`
- Zero-tolerance policy: `--max-warnings 0`

**What ESLint checks:**
- Next.js best practices (Image component, Script handling, dynamic imports)
- Core Web Vitals compliance
- React best practices
- No imports in Next.js config files
- Accessibility issues

**Prettier:**
- Not explicitly configured
- ESLint may format through its rules
- Code follows standard 2-space indentation

## Build-Time Validation

The Next.js build process (`npm run build`) with `output: 'export'` validates:

1. **Route generation**: All `[locale]` parameters resolved
2. **Static generation**: All pages generate without errors
3. **Metadata**: Next.js validates metadata objects at build time
4. **Images**: Unoptimized images allowed (`images: { unoptimized: true }`)
5. **TypeScript**: Full type checking during build

## Development Practices

**During development:**
```bash
npm run dev              # Start Next.js dev server with HMR
npm run lint            # Check code quality
```

**No automated test runs** — quality relies on:
- Developer type checking via IDE (TypeScript integration)
- ESLint warnings during development
- Build validation before deployment

**Testing strategy:**
- Manual testing in browser during development
- Preview deployments for visual/functional verification
- Metadata and SEO validation through build output

## Future Testing Considerations

If testing becomes necessary:

**Unit tests:**
- Could add Jest or Vitest
- Focus on i18n functions (`getMessages()`, locale guards)
- Test URL builders (`localePath()`, `absoluteUrl()`)
- Test data transformations (`parseSpeed()`, schema builders)

**Component tests:**
- Would test interactive features (locale switcher in `TextTabsNav`)
- Would verify ASCII panel state management
- Would validate animation timing

**E2E tests:**
- Could use Playwright for production validation
- Verify all locales render correctly
- Test locale switching navigation
- Validate metadata in rendered HTML

---

*Testing analysis: 2026-03-22*
