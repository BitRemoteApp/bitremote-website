# Codebase Concerns

**Analysis Date:** 2026-03-22

## Monolithic Data File

**Large Hardcoded Dictionary:**
- Issue: `src/domain/downloader-landings.ts` is 557 lines—a massive hardcoded data file containing all downloader landing page content across 4 locales (en, zh-hans, zh-hant, ja) and 5 downloader types.
- Files: `src/domain/downloader-landings.ts`
- Impact:
  - Difficult to maintain and update content without risk of syntax errors
  - No separation between business logic and content data
  - Scaling to additional downloaders or locales requires editing 557-line file
  - Hard to implement content localization workflow (e.g., external translation management)
  - Single point of failure for all downloader landing pages
- Fix approach: Externalize to JSON/YAML content files, migrate to CMS or structured data approach, implement schema validation for content

## Missing Test Coverage

**No Automated Tests:**
- Issue: No test files exist in the codebase (0 .test.* or .spec.* files)
- Files: All source files in `src/`
- Impact:
  - No regression detection for locale fallback logic (critical in `src/i18n/locales.ts` and `src/i18n/messages.ts`)
  - No validation that all downloader+locale combinations have content
  - Component rendering changes undetected
  - Dynamic route generation (`generateStaticParams()`) untested
  - Type safety insufficient without runtime tests
- Risk: High—localization bugs, missing content, broken downloads could ship unnoticed
- Priority: High

## Unhandled Missing Content Edge Cases

**Silent Failures in Data Access:**
- Issue: When `getDownloaderLandingContent()` returns `undefined`, code gracefully degrades but may render incomplete UI
- Files:
  - `src/app/[locale]/page.tsx` (lines 100-108): Fallback renders just the downloader name without link if content missing
  - `src/app/llms-full.txt/route.ts` (lines 71-72): Silently skips downloader if content undefined
- Impact:
  - Users may see broken/incomplete landing pages without error visibility
  - No monitoring or alerts for missing localization data
  - Difficult to discover which locale+downloader pairs are missing
- Fix approach: Add explicit content validation at build time, log warnings, consider throwing errors in development

## Unsafe Serialization of JSON-LD

**XSS-like Pattern in Schema Injection:**
- Issue: Uses `dangerouslySetInnerHTML` to inject JSON-LD schemas—while escaping `<` characters, this pattern is fragile
- Files:
  - `src/seo/schema.ts` (line 13): `replace(/</g, '\\u003c')` in `serializeJsonLd()`
  - Used in: `src/app/[locale]/page.tsx`, `src/app/[locale]/downloaders/[slug]/page.tsx`, etc.
- Impact:
  - If schema builder receives untrusted input (e.g., from external data), could be exploited
  - Single character escape only—not comprehensive
  - Couples presentation logic to security decisions
- Current mitigation: Schema sources are hardcoded and type-safe
- Recommendations:
  - Use `<script type="application/ld+json">` with React's `Script` component (Next.js best practice)
  - Validate all schema builders accept only typed objects
  - Consider server-only schema rendering

## Locale Type Coercion Without Validation

**Unsafe Cast of Route Parameters:**
- Issue: Route parameters cast to `Locale` type without proper validation in some paths
- Files:
  - `src/app/[locale]/downloaders/[slug]/page.tsx` (lines 56-58): Casts to `DownloaderLandingSlug | undefined` using `as` operator
  - `src/app/[locale]/page.tsx` (line 31): Uses `isLocale()` check but then defaults to `defaultLocale`
- Impact:
  - Type casts with `as` bypass TypeScript safety
  - Inconsistent validation: some paths use `isLocale()` guard, others use implicit coercion
  - Could render with wrong locale silently
- Fix approach: Standardize validation, replace `as` casts with type guards and explicit fallback logic

## Environment Configuration Not Validated

**Missing Env Var Validation:**
- Issue: `next.config.ts` reads `NEXT_ALLOWED_DEV_ORIGINS` but doesn't validate format or presence
- Files: `next.config.ts` (lines 3-5)
- Impact:
  - Malformed env var silently ignored
  - No clear error if env vars missing in production
  - `allowedDevOrigins` could be `undefined` if env var not set
- Fix approach: Add explicit validation using a schema validator (e.g., zod), fail fast at startup

## Hard-coded Array Keys as List Items

**Array Index as React Key Anti-pattern:**
- Issue: Uses string content as React keys instead of unique identifiers
- Files:
  - `src/components/DownloaderLandingPage.tsx` (lines 54, 62): `key={item}` where item is the full string
  - `src/app/[locale]/page.tsx` (line 185): `key={x}` for FAQ items
- Impact:
  - If list order changes or items reorder, React may re-use stale component state
  - Duplicate content strings cause key collisions (multiple items = same key)
  - Animation state, form inputs within items could become misaligned
- Risk: Medium—affects mostly static content, but user interaction state could be lost
- Fix approach: Assign unique stable IDs to content items, use those as keys

## Performance: Stateless Data Recomputation

**Inefficient Data Lookups:**
- Issue: `getDownloaderLandingContent()` (called on every render) linearly searches nested objects
- Files: `src/domain/downloader-landings.ts` (lines 533-541, 543-550)
- Impact:
  - O(n) lookups on small dataset (currently 4 locales × 5 downloaders = 20 entries)
  - Acceptable now but scales poorly if entries grow
  - `getDownloaderLandingEntries()` flattens entire dictionary on every call
- Fix approach: Cache with `useMemo` in components, or pre-build lookup indices at module load

## Missing Responsive Image Optimization

**Unoptimized SVG/ASCII Assets:**
- Issue: ASCII panel component (`src/ascii-panel/index.tsx`) uses CSS strings and inline styling without image optimization
- Files: `src/ascii-panel/index.tsx`, `src/ascii-panel/pages/HomePage.tsx`
- Impact:
  - Static SVG wordmarks and frames loaded without Next.js Image optimization
  - CSS transitions on every frame update could cause layout shifts
  - No lazy loading of interactive panels
- Fix approach: Use Next.js `<Image>` component, implement viewport-based lazy rendering

## Security: Certificate Validation Text

**Misleading Security UI Text:**
- Issue: ASCII panel displays "Disable certificate evaluation" text
- Files: `src/ascii-panel/pages/NewClientPage.tsx` (line ?)
- Impact:
  - May mislead users about security implications
  - No context for when/why this would be needed
- Fix approach: Add documentation or warning label explaining the security trade-off

## No Build-Time Content Validation

**Missing Schema Validation:**
- Issue: Downloader landing content is unvalidated at build time—missing fields only caught at runtime
- Files: `src/domain/downloader-landings.ts` (lines 114-117, 118-507)
- Impact:
  - Typos in content keys cause undefined values in UI
  - Incomplete locale support undetected until user visits page
  - No CI/CD check for content completeness
- Fix approach: Add Zod/TypeScript validation schema, run build-time checks for all locale+downloader combinations

## Large Component: HomePage

**Overly Complex Home Page Component:**
- Issue: `src/ascii-panel/pages/HomePage.tsx` is 266 lines with hardcoded animation data, multiple concerns mixed
- Files: `src/ascii-panel/pages/HomePage.tsx`
- Impact:
  - Difficult to modify animation frames without risk of breaking state
  - `clientsDataset` hardcoded array of 10 frames across 5 clients = 50 data points
  - Complex digit animation logic (`DigitSlot`, `AnimatedNumericText`, `AnimatedSpeed`) interleaved
- Fix approach: Extract animation data to separate file, create custom hook for animation loop, break into smaller sub-components

## Type Safety: Messages Might Not Have All Locales

**Potential Runtime Null References in getMessages:**
- Issue: `getMessages()` could theoretically return wrong type if message file missing
- Files: `src/i18n/messages.ts` (lines 17-19)
- Impact:
  - TypeScript doesn't catch missing locale files at compile time
  - Relies on import paths being correct and files existing
- Fix approach: Add explicit type assertion and build-time check that all locales imported, use Zod to validate message structure

---

*Concerns audit: 2026-03-22*
