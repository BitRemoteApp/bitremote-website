# Testing Patterns

**Analysis Date:** 2026-03-22

## Test Framework

**Status:** Not detected

**Summary:** The codebase does not use a test framework. No test configuration files found (no `jest.config.*`, `vitest.config.*`, or test scripts in `package.json`). No `.test.*` or `.spec.*` files exist in the codebase.

**Package.json Scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx --max-warnings 0"
}
```

**Implications:**
- Code quality relies entirely on TypeScript type checking and ESLint linting
- No unit tests, integration tests, or end-to-end tests
- Manual testing or staging deployment required for validation
- Type safety is the primary mechanism for catching errors

## Code Quality Mechanisms (Current)

**TypeScript:**
- Version: ^5.7.3
- Strict mode enabled: `"strict": true` in `tsconfig.json`
- Provides compile-time type checking across all `.ts` and `.tsx` files

**ESLint:**
- Configuration: `extends: ["next/core-web-vitals"]`
- Max warnings: 0 (strict enforcement)
- Covers JavaScript, TypeScript, JSX, and TSX

**Build-Time Validation:**
- Next.js App Router enforces segment structure (dynamic routes)
- Static generation via `generateStaticParams()` validates all parameterized routes
- Type-safe metadata generation through Next.js `Metadata` type

## Testing Recommendations for Future Implementation

**If tests are added, follow these patterns:**

### File Organization

**Location:** Co-locate tests with source files
- Test files should use `.test.ts` or `.test.tsx` extension
- Place alongside source files, not in separate directory
- Example: `src/components/TextButton.tsx` → `src/components/TextButton.test.tsx`

**Suggested Framework:** Vitest (recommended for Next.js + TypeScript)
- Fast, TypeScript-native
- Familiar syntax (similar to Jest)
- Better ESM support than Jest
- Config location: `vitest.config.ts` at project root

### Component Testing Pattern

**For React components** (pattern to follow if tests are added):

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextButton } from './TextButton';

describe('TextButton', () => {
  it('renders with correct href', () => {
    render(<TextButton href="/test">Click me</TextButton>);
    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies primary variant by default', () => {
    render(<TextButton href="/test">Click me</TextButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-blue-strong');
  });

  it('applies secondary variant when specified', () => {
    render(<TextButton href="/test" variant="secondary">Click me</TextButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-fg');
  });

  it('handles target and rel attributes', () => {
    render(
      <TextButton href="https://external.com" target="_blank" rel="noreferrer">
        External Link
      </TextButton>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
```

### Utility Function Testing Pattern

**For pure utility functions** (pattern to follow if tests are added):

```typescript
import { describe, it, expect } from 'vitest';
import { localePath, absoluteUrl } from './urls';

describe('URL utilities', () => {
  describe('localePath', () => {
    it('appends locale prefix and trailing slash', () => {
      expect(localePath('en', '/about')).toBe('/en/about/');
    });

    it('handles root path', () => {
      expect(localePath('en', '/')).toBe('/en/');
    });

    it('strips multiple slashes', () => {
      expect(localePath('en', '///about///')).toBe('/en/about/');
    });
  });

  describe('absoluteUrl', () => {
    it('builds full HTTPS URL', () => {
      expect(absoluteUrl('/about')).toBe('https://bitremote.app/about');
    });

    it('handles paths without leading slash', () => {
      expect(absoluteUrl('about')).toBe('https://bitremote.app/about');
    });
  });
});
```

### Type Guard Testing Pattern

**For type guard functions** (pattern to follow if tests are added):

```typescript
import { describe, it, expect } from 'vitest';
import { isLocale } from './locales';

describe('isLocale', () => {
  it('returns true for valid locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ja')).toBe(true);
    expect(isLocale('zh-hans')).toBe(true);
    expect(isLocale('zh-hant')).toBe(true);
  });

  it('returns false for invalid locales', () => {
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('invalid')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale('EN')).toBe(false); // Case-sensitive
  });
});
```

### Page Component Testing Pattern

**For Next.js page components** (pattern to follow if tests are added):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { LocaleLayout } from './layout';

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
  usePathname: () => '/en/',
}));

describe('LocaleLayout', () => {
  it('renders with correct lang attribute', async () => {
    const Component = await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'en' }),
    });

    expect(Component.props['lang']).toBe('en');
  });

  it('falls back to default locale for invalid input', async () => {
    const Component = await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'invalid' }),
    });

    expect(Component.props['data-locale']).toBe('en');
  });
});
```

## What to Test (Priority Order)

**High Priority:**
1. **Type guards** (`isLocale()`) - Critical for runtime safety
2. **URL utilities** (`localePath()`, `absoluteUrl()`) - Used throughout app, easy to break
3. **Data transformations** (mapping locales, building schemas) - Complex logic that could fail silently
4. **Component rendering** (TextButton, TextFrame, etc.) - User-facing, visual regressions possible

**Medium Priority:**
5. **i18n message loading** (`getMessages()`) - Ensure all locales load correctly
6. **Downloader slug mapping** - Data integrity between display names and URLs
7. **Page metadata generation** - SEO impact of errors

**Low Priority:**
8. **SVG rendering** (BitRemoteWordmark) - Visual component, harder to test
9. **Static page content** - HTML structure unlikely to change

## What NOT to Test

- **Pure markup components** with no logic (TextSeparator, etc.)
- **Next.js framework code** (App Router, metadata generation framework itself)
- **CSS/styling** (Tailwind classes)
- **Visual animations** (unless using visual regression tools)

## Test Coverage Goals (If Added)

**Recommended minimums:**
- Utility functions: 100% coverage (small, deterministic)
- Type guards: 100% coverage (critical for safety)
- Components: 80%+ coverage (focus on logic, not markup)
- Overall: 70%+ coverage minimum

**Commands to add to package.json:**
```json
{
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage"
}
```

## Mocking Strategy (If Tests Are Added)

**What to mock:**
- Next.js hooks: `usePathname()`, `useRouter()` (when present)
- Environment variables
- Imported JSON files for message testing

**What NOT to mock:**
- Pure utility functions (test them directly)
- Type guards (test them directly)
- Component props and children

**Mock location:** Create `__mocks__` directories adjacent to source files or use `vi.mock()` inline

## Current Testing Reality

**Static Site Generation** (`output: 'export'` in `next.config.ts`) provides safety:
- All dynamic routes must have `generateStaticParams()` defined
- Missing routes cause build failure, not runtime 404
- Type safety prevents invalid locale values at compile time

**Manual testing checklist** (until automated tests are added):
- [ ] All locale variants render without errors
- [ ] All downloader landing pages build successfully
- [ ] Links resolve to correct localized paths
- [ ] Metadata is generated correctly for each page
- [ ] Static export build completes without warnings

---

*Testing analysis: 2026-03-22*
