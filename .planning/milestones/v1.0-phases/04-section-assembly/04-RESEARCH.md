# Phase 4: Section Assembly - Research

**Researched:** 2026-03-24
**Domain:** Next.js 15 / React 19 component authoring with Tailwind CSS 3, using existing Motion + Lenis animation infrastructure
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Hero section: headline, subheadline, App Store CTA button | `page.tsx` already has the data — HeroSection component extracts and elevates it |
| HERO-02 | Ambient glow effect on hero | UI-SPEC defers this to Phase 5 — Phase 4 builds hero structure only |
| HERO-03 | Platform badge strip (iOS, iPadOS, macOS) | PlatformBadgeStrip component using text labels + `border-border rounded-sm` styling |
| FEAT-01 | Bento grid layout with varied card sizes | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` + col-span variants |
| FEAT-02 | Glassmorphism card styling | `--bg-panel-88` + `backdrop-blur-md` + `border-border` + `shadow-card` — tokens exist |
| FEAT-03 | Feature content wires existing `messages.sections.benefits.items` | 6 items already in all 4 locale JSON files |
| NAV-01 | Sticky nav bar with section anchor links | `TextTabsNav` already exists and is sticky; anchor links already present |
| NAV-02 | App Store CTA in nav + mid-page CTA | Add `TextButton` primary to nav right section; add CTA inside `#plus` section |
| NAV-03 | Nav collapses to mobile layout | `TextTabsNav` already has horizontal-scroll tabs on mobile; App Store CTA hidden < 480px |
| CONT-01 | All locales carry over | All content sourced from `getMessages(locale)` — structure is unchanged |
| CONT-02 | FAQ restyled to match design system | `FaqAccordion` receives `bg-surface rounded-md` + `open:bg-surface-alt` class changes |
| CONT-03 | Legal pages restyled | Legal pages use same `main` container pattern — minimal changes needed |
| CONT-04 | Social links remain accessible | Social links in support page; footer links unchanged |
| CONT-05 | SEO metadata, JSON-LD, sitemap, robots.txt continue working | No schema changes; `generateStaticParams` already covers all locales |
| TECH-05 | Build produces correct output for all locale paths | `generateStaticParams` in `[locale]/layout.tsx` covers `en`, `ja`, `zh-hans`, `zh-hant` |
</phase_requirements>

---

## Summary

Phase 4 is a **component authoring and page assembly phase**, not a library research phase. All necessary infrastructure from Phases 1–3 is already in place: design tokens (globals.css), animation primitives (FadeInSection, staggerContainerVariants, staggerItemVariants), motion wiring (MotionProvider, LenisProvider), and screenshot components (AppShowcaseClient). The current `page.tsx` already contains all the right content in the right order — it just lacks styled components around that content.

The work divides into three tracks: (1) create new section components (`HeroSection`, `PlatformBadgeStrip`, `BentoGrid`, `BentoCard`, `BentoGridClient`, `SectionLabel`), (2) restyle existing components (`FaqAccordion`, `TextTabsNav`), and (3) rewire `page.tsx` to use the new components with proper animation wrapping. Legal pages (`privacy`, `terms`, `support`) need only minor cosmetic alignment with the design system.

The most important planning constraint is that the UI-SPEC is the source of truth for every visual and structural decision in this phase. It was already approved. The planner must not re-derive design decisions; it must implement the spec exactly.

**Primary recommendation:** Implement the UI-SPEC as written. No new packages, no design decisions, no structural changes beyond what the spec prescribes.

---

## Standard Stack

### Core (all already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^15.1.0 | Static export, App Router, locale routing | Project standard |
| react | ^19.0.0 | Component model | Project standard |
| tailwindcss | ^3.4.0 | Utility CSS | Project standard |
| motion | ^12.38.0 | `motion.div`, `useReducedMotion`, `whileInView` | Phase 2 decision |
| lenis | ^1.3.19 | Smooth scroll | Phase 2 decision |

**No new installations required.** All packages for Phase 4 work are already in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure

No new directories are needed. All new files go into existing locations:

```
src/
├── components/
│   ├── HeroSection.tsx           # NEW — server component
│   ├── PlatformBadgeStrip.tsx    # NEW — server component
│   ├── BentoGrid.tsx             # NEW — server component
│   ├── BentoCard.tsx             # NEW — server component
│   ├── SectionLabel.tsx          # NEW — server component (extracts repeated h2 pattern)
│   ├── BentoGridClient.tsx       # NEW — 'use client' wrapper for stagger animation
│   ├── FaqAccordion.tsx          # EXISTING — restyle only
│   └── TextTabsNav.tsx           # EXISTING — add App Store CTA to right section
└── app/[locale]/
    └── page.tsx                  # EXISTING — rewire to use new section components
```

### Pattern 1: Server Component with Animation Wrapper

The split between server components and client animation wrappers is the established project pattern (see AppShowcase / AppShowcaseClient from Phase 3). Apply the same pattern to features section:

```typescript
// BentoGrid.tsx — server component, pure HTML/Tailwind
export function BentoGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
      {items.map((item) => (
        <BentoCard key={item.id} title={item.title} body={item.subtitle} />
      ))}
    </div>
  );
}

// BentoGridClient.tsx — 'use client', wraps BentoGrid in stagger motion
'use client';
import { motion, useReducedMotion } from 'motion/react';
import { staggerContainerVariants, staggerItemVariants } from '@/components/ui/FadeInSection';

export function BentoGridClient({ items }: Props) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg"
      variants={staggerContainerVariants}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItemVariants}>
          <BentoCard title={item.title} body={item.subtitle} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Pattern 2: SectionLabel (Extracted Repeated Pattern)

The `h2` pattern (`text-base uppercase tracking-wide text-accent`) is repeated 5 times in `page.tsx`. Extract it:

```typescript
// SectionLabel.tsx
type Props = { children: ReactNode; id?: string };

export function SectionLabel({ children, id }: Props) {
  return (
    <h2 id={id} className="m-0 font-sans text-base uppercase tracking-wide text-accent">
      {children}
    </h2>
  );
}
```

### Pattern 3: FaqAccordion Restyling

Change the `<details>` className from:
```
border border-border bg-transparent px-4 py-3
```
to:
```
border border-border bg-surface rounded-md px-lg py-md open:bg-surface-alt transition-colors duration-150
```

Note: `open:` variant requires Tailwind to know `details[open]` selector. Tailwind's `open:` modifier supports this natively for `<details>` elements. This is HIGH confidence — Tailwind's `open:` modifier targets the native HTML `open` attribute that `<details>` uses.

### Pattern 4: TextTabsNav App Store CTA Addition

Add a `TextButton` primary variant inside the nav's right section. The spec requires it be hidden on mobile screens under 480px (`hidden min-[480px]:inline-flex`) to prevent nav overflow:

```tsx
// Inside the flex row, before the locale picker div:
<TextButton
  href={LINKS.appStore}
  target="_blank"
  rel="noreferrer"
  className="hidden min-[480px]:inline-flex flex-shrink-0"
>
  {messages.cta.appStore}
</TextButton>
```

Note: `TextButton` currently does not accept a `className` prop. The planner must decide whether to add `className` prop to TextButton or use a wrapper `<span className="hidden min-[480px]:block">`. Using a wrapper `<div>` is safer and avoids touching TextButton's prop interface.

### Pattern 5: Page Assembly Order

The `page.tsx` section order defined in the UI-SPEC:

```
TextTabsNav (in layout.tsx — existing)
<main>
  HeroSection id="top"
  <hr />
  AppShowcaseClient (existing)
  <hr />
  FadeInSection id="features"
    SectionLabel + BentoGridClient
  <hr />
  FadeInSection id="how-it-works"
    SectionLabel + quickstart steps
  <hr />
  FadeInSection id="plus"
    SectionLabel + pricing content + mid-page TextButton CTA
  <hr />
  FadeInSection id="faq"
    SectionLabel + FaqAccordion
</main>
```

The current `page.tsx` already has this structure conceptually. The rewire primarily replaces inline JSX with the new named components and wraps sections in `FadeInSection`.

### Anti-Patterns to Avoid

- **Adding `'use client'` to HeroSection, BentoCard, or SectionLabel**: These are server components. Only the stagger wrapper (`BentoGridClient`) needs `'use client'`. Mixing breaks server rendering benefits.
- **Using `motion.div` directly in server components**: Import from `'motion/react'` only in `'use client'` components. Server components cannot use hooks.
- **Hardcoding content instead of sourcing from `getMessages(locale)`**: Would break CONT-01 / TECH-05. All content must come from `messages` passed from the server page.
- **Using Tailwind `dark:` prefix**: The project uses `@media (prefers-color-scheme: dark)` CSS — not Tailwind's `darkMode: 'class'`. Tailwind `darkMode: 'media'` is set. `dark:` utilities ARE safe here because `darkMode: 'media'` is in tailwind.config.ts. However, since CSS variables already handle theme-switching, there is no need to reach for `dark:` — use CSS variable tokens instead.
- **Skipping `FadeInSection` for scroll sections**: All sections except the hero must be wrapped in `FadeInSection` per the animation contract.
- **Changing `scroll-padding-top`**: Set to 5.25rem in globals.css. Do not change — sticky nav height depends on it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animation variants | Custom keyframe logic | `sectionVariants`, `staggerContainerVariants`, `staggerItemVariants` from `FadeInSection.tsx` | Already defined, tested, and reduced-motion safe |
| Reduced motion detection | `window.matchMedia` check | `useReducedMotion()` from `motion/react` | SSR-safe, consistent with Phase 2 pattern |
| Glassmorphism | `rgba()` + custom `filter: blur()` | `--bg-panel-88` token + `backdrop-blur-md` Tailwind class | Token already defined in globals.css with correct dark/light values |
| Locale URL building | String concatenation | `localePath(locale, path)` from `@/i18n/urls` | Handles trailing slashes, locale prefixes correctly |
| Message lookup | Object drill-down | `getMessages(locale)` from `@/i18n/messages` | Returns fully typed `Messages` object |

**Key insight:** Phase 4 has almost no greenfield work. The infrastructure exists; the task is wiring existing pieces into structured components.

---

## Common Pitfalls

### Pitfall 1: `open:` Tailwind Modifier on `<details>`

**What goes wrong:** Developer assumes `open:bg-surface-alt` won't work and adds a JavaScript toggle instead.
**Why it happens:** The `open:` modifier is less commonly known than hover/focus.
**How to avoid:** Use it directly. Tailwind's `open:` modifier targets elements with the `open` HTML attribute, which `<details>` sets natively when expanded. No JavaScript needed.
**Warning signs:** Adding `useState` or `onClick` to `FaqAccordion` for the open/close state.

### Pitfall 2: `TextButton` className Prop Gap

**What goes wrong:** Planner adds `className="hidden min-[480px]:inline-flex"` to `TextButton` but the component doesn't accept a `className` prop — TypeScript error at build time.
**Why it happens:** `TextButton`'s Props type has no `className` field.
**How to avoid:** Wrap the `TextButton` in a `<div className="hidden min-[480px]:block">` container inside `TextTabsNav`. Do NOT add className to TextButton unless intentional — it would change the component's contract for all call sites.
**Warning signs:** TypeScript complaining `Property 'className' does not exist on type 'Props'`.

### Pitfall 3: BentoCard `backdrop-blur` Requires a Transparent Background

**What goes wrong:** `backdrop-blur-md` has no visible effect because the parent or the card itself has a fully opaque background.
**Why it happens:** CSS `backdrop-filter` only shows through elements with less than 100% opacity backgrounds.
**How to avoid:** Use `--bg-panel-88` (88% opacity via `color-mix`) as the card background. The `var(--bg-panel-88)` token already uses `color-mix(in srgb, var(--color-bg) 88%, transparent)`, which is semi-transparent.
**Warning signs:** Glassmorphism looks identical to a solid-background card in dark theme.

### Pitfall 4: `FadeInSection` on Hero Flashes On Load

**What goes wrong:** The hero section briefly shows as invisible (opacity: 0) before the mount animation fires.
**Why it happens:** `whileInView` starts hidden. The hero is always in the viewport on load.
**How to avoid:** Per the animation contract, hero uses `FadeInSection` with `delay: 0`. Since `whileInView` with `viewport={{ once: true, amount: 0.08 }}` will fire immediately on mount when the section is already in view, this is not a problem in practice. However, to be safe the hero can use `initial="visible"` or simply not use `FadeInSection` — the UI-SPEC says hero fades in on page load (immediate), which `FadeInSection` handles correctly for elements that are in-viewport at mount.
**Warning signs:** Hero visually pops in with a delay after the page is already interactive.

### Pitfall 5: Static Export Build Verification is Manual

**What goes wrong:** Developer assumes `npm run lint` (which passes) means the build works. The static export (`next build`) may fail for a locale route that wasn't tested.
**Why it happens:** TypeScript and ESLint don't catch runtime route generation failures.
**How to avoid:** Run `npm run build` as the final verification gate and confirm `out/ja/`, `out/zh-hans/`, `out/zh-hant/` directories are present in the build output (TECH-05).
**Warning signs:** `out/` directory exists but only contains `en/` routes.

### Pitfall 6: Quickstart Steps Use Array Index as Key

**What goes wrong:** Current `page.tsx` uses `key={step.title}` for quickstart steps. This works only if titles are unique across locales. In Japanese or Chinese, two steps might have identical translated titles.
**Why it happens:** Message items in `quickstart.steps` have no `id` field (unlike `benefits.items`).
**How to avoid:** Use `key={index}` for quickstart steps since the array is static and never reordered.
**Warning signs:** React key warning in development console for non-unique keys.

---

## Code Examples

### Glassmorphism BentoCard

```tsx
// Source: UI-SPEC glassmorphism contract + globals.css --bg-panel-88 token
export function BentoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative bg-[var(--bg-panel-88)] backdrop-blur-md border border-border rounded-lg p-6 shadow-card">
      <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
        {title}
      </h3>
      <p className="m-0 text-text-secondary">{body}</p>
    </div>
  );
}
```

### PlatformBadgeStrip (text-only labels, no SVG icons)

```tsx
// Source: UI-SPEC PlatformBadgeStrip contract
const PLATFORMS = ['iPhone & iPad', 'Mac'] as const;

export function PlatformBadgeStrip() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PLATFORMS.map((label) => (
        <span
          key={label}
          className="border border-border rounded-sm px-2 py-[0.15rem] font-sans text-sm uppercase tracking-wide text-text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
```

### FadeInSection Wrapping Pattern

```tsx
// Source: Phase 2 FadeInSection.tsx — whileInView + sectionVariants
<FadeInSection as="section" id="features">
  <SectionLabel>{messages.sections.benefits.title}</SectionLabel>
  <div className="mt-4">
    <BentoGridClient items={messages.sections.benefits.items} />
  </div>
</FadeInSection>
```

Note: `FadeInSection` renders a `motion[as]` element. The `id` prop is not in the current `FadeInSection` Props type. Check if `id` needs to be forwarded — if not, wrap in a plain `<section id="features">` and pass children to `FadeInSection` without the `id`.

### TextTabsNav App Store CTA (wrapper pattern)

```tsx
// Source: UI-SPEC NAV-02 — hidden on mobile
<div className="hidden min-[480px]:block flex-shrink-0 pr-1">
  <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
    {messages.cta.appStore}
  </TextButton>
</div>
```

### Build Output Verification Command

```bash
npm run build && ls out/ja/ && ls out/zh-hans/ && ls out/zh-hant/
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no test framework installed |
| Config file | Not present |
| Quick run command | `npm run lint` (ESLint, < 10s) |
| Full suite command | `npm run build` (Next.js static export, ~30–60s) |

No unit test framework (Jest, Vitest, Playwright) is in `package.json`. The project's validation strategy is:
1. TypeScript compilation (enforced by `npm run build`)
2. ESLint with `--max-warnings 0` (enforced by `npm run lint`)
3. Manual visual verification of the deployed static output

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero renders headline, subheadline, CTA | build + manual visual | `npm run build` | N/A |
| HERO-02 | Ambient glow | Deferred to Phase 5 | — | Deferred |
| HERO-03 | Platform badge strip renders | build + manual visual | `npm run build` | N/A |
| FEAT-01 | Bento grid layout | build + manual visual | `npm run build` | N/A |
| FEAT-02 | Glassmorphism styling | manual visual (dark mode) | — | manual-only |
| FEAT-03 | Feature content complete | `npm run build` (TypeScript will catch missing keys) | `npm run build` | N/A |
| NAV-01 | Sticky nav present | build + manual | `npm run build` | N/A |
| NAV-02 | App Store CTA in nav + mid-page | build + manual | `npm run build` | N/A |
| NAV-03 | Mobile nav layout | manual (375px viewport) | — | manual-only |
| CONT-01 | All locale routes produce output | `npm run build && ls out/ja/ out/zh-hans/ out/zh-hant/` | `npm run build` | N/A |
| CONT-02 | FAQ accordion restyled | build + manual | `npm run build` | N/A |
| CONT-03 | Legal pages styled | build + manual | `npm run build` | N/A |
| CONT-04 | Social links accessible | build + manual (support page) | `npm run build` | N/A |
| CONT-05 | SEO metadata intact | build (TypeScript) + manual (head inspection) | `npm run build` | N/A |
| TECH-05 | All locale paths in output | `npm run build && ls out/ja/ out/zh-hans/ out/zh-hant/` | `npm run build` | N/A |

### Sampling Rate

- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run build`
- **Phase gate:** `npm run build` green + manual visual sign-off on dark/light themes at 375px, 768px, 1280px before `/gsd:verify-work`

### Wave 0 Gaps

None — existing infrastructure (ESLint, TypeScript, Next.js build) covers all automated checks for this phase. No test files need creating before implementation begins.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `picture` element for dark/light screenshots | CSS `<picture>` + `prefers-color-scheme` source | Phase 3 | SSR-safe, zero JS |
| ASCII separators | `<hr class="border-t border-border">` | Phase 1 | Clean, semantic |
| Monospace font | `var(--font-sans)` system-ui stack | Phase 1 | Design consistent |
| CSS `scroll-behavior: smooth` | Lenis smooth scroll | Phase 2 | Reduced-motion safe |

**Deprecated/outdated:**
- `TextFrame` component: Removed in Phase 1. Do not reference or recreate.
- `TextSeparator` component: Removed in Phase 1. Use `<hr>` instead.
- ASCII `░` separators: Fully removed. Phase 5 will add SVG dividers.

---

## Open Questions

1. **FadeInSection `id` prop forwarding**
   - What we know: `FadeInSection` Props type is `{ children, className, delay, as }` — no `id` field.
   - What's unclear: The UI-SPEC requires section IDs (e.g., `id="features"`) for anchor nav links. Can `id` be passed via spread props? No — FadeInSection does not use `...rest`.
   - Recommendation: Pass `id` on a wrapping `<section>` element and use `FadeInSection` as a motion wrapper inside it, OR add `id?: string` to FadeInSection's Props type and forward it to the motion element. The latter is cleaner. The planner should make this explicit.

2. **Quickstart steps lack `id` field in messages**
   - What we know: `benefits.items` has `{ id, title, subtitle }` but `quickstart.steps` only has `{ title, body }`.
   - What's unclear: Should quickstart steps use index-based keys, or should the message schema be extended?
   - Recommendation: Use array index as key for quickstart steps. Do not modify the message schema — all 4 locale files would need updating, which is scope creep.

3. **Legal pages (CONT-03) scope**
   - What we know: Privacy, terms, and support pages exist and use the same `main max-w-6xl px-4` container as the home page.
   - What's unclear: Do legal pages need `FadeInSection` wrapping, or just the container styling already present?
   - Recommendation: Add `FadeInSection` wrapping and ensure `bg-surface rounded-md` card styling is consistent. The support page already uses `TextButton` and the design system — minimal work needed.

---

## Sources

### Primary (HIGH confidence)

- Source code: `/Users/tatsuzo/Fork/bitremote-website/src/` — direct inspection of all relevant files
- UI-SPEC: `.planning/phases/04-section-assembly/04-UI-SPEC.md` — approved design contract
- globals.css: `src/app/globals.css` — verified token names and values
- tailwind.config.ts: — verified all custom token mappings and `darkMode: 'media'`
- FadeInSection.tsx: `src/components/ui/FadeInSection.tsx` — verified exported variant names

### Secondary (MEDIUM confidence)

- Tailwind CSS docs on `open:` modifier — standard modifier for `details[open]` attribute, supported since Tailwind v3.

### Tertiary (LOW confidence)

None — all findings are from direct source inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — direct package.json inspection, no new packages
- Architecture: HIGH — UI-SPEC is the authoritative contract, patterns derived from existing Phase 2/3 code
- Pitfalls: HIGH — sourced from direct code inspection of existing components and known Tailwind/CSS behaviors

**Research date:** 2026-03-24
**Valid until:** 2026-04-24 (stable stack, 30-day window)
