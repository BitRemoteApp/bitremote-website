# Phase 1: Design Foundation - Research

**Researched:** 2026-03-22
**Domain:** CSS design tokens, Tailwind CSS semantic aliases, typography, dark/light theming
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Typography**
- D-01: Use the system font stack for all text: `system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`. This matches the app's SF Pro usage on Apple devices and loads instantly with zero FOUT.
- D-02: Remove `--font-ui` monospace variable entirely. Replace it with the same sans-serif stack. All `font-mono` Tailwind usage across the codebase must be converted to `font-sans`.
- D-03: Define a type scale in the token system: `text-xs` through `text-4xl` with corresponding `leading-*` and `tracking-*` values tuned for the sans-serif stack. CJK locales (ja, zh-hans, zh-hant) inherit the same scale — system fonts handle CJK natively.

**Color Palette**
- D-04: Monochromatic base (near-black, white, grays) with blue as the sole accent color. No other hues.
- D-05: Light theme: `--color-bg: #ffffff`, `--color-surface: #f8f8f8`, `--color-surface-alt: #f0f0f0`, `--color-border: #e5e5e5`
- D-06: Dark theme: `--color-bg: #0a0a0a` (near-black, not pure `#000`), `--color-surface: #141414`, `--color-surface-alt: #1e1e1e`, `--color-border: #2a2a2a`
- D-07: Text colors — light: primary `#0a0a0a`, secondary `#6b7280`, muted `#9ca3af`; dark: primary `#f5f5f5`, secondary `#a3a3a3`, muted `#6b6b6b`
- D-08: Blue accent — light: `#2563eb` (default), `#1d4ed8` (hover), `#dbeafe` (subtle); dark: `#3b82f6` (default), `#60a5fa` (hover), `#1e3a5f` (subtle).

**Theme Mechanism**
- D-09: Use `@media (prefers-color-scheme: dark)` for theme switching — not `[data-theme]` or JavaScript. This avoids hydration mismatches and FOUC on static export. A manual toggle is deferred to v2 (ADV-03).
- D-10: Tailwind config keeps `darkMode: 'media'` (already set). Token overrides live in a single `@media (prefers-color-scheme: dark)` block in `globals.css`.

**Token System Scope**
- D-11: Full semantic token system covering: surface hierarchy (bg, surface, surface-alt, border), text hierarchy (primary, secondary, muted), accent scale (default, hover, subtle), radius scale (sm/md/lg/xl), shadow scale (card, raise), and layout tokens (max-width, gutter).
- D-12: Border radius scale: `sm: 0.375rem (6px)`, `md: 0.75rem (12px)`, `lg: 1.25rem (20px)`, `xl: 1.75rem (28px)`.
- D-13: Shadow scale: `card` and `raise`. Both adapt between light and dark.
- D-14: Glass tokens for future use: `--bg-glass-92`, `--bg-glass-95`, `--bg-panel-88` using `color-mix()`. Preserve and update with new `--color-bg` values.

**ASCII/Monospace Removal**
- D-15: Delete `src/components/TextSeparator.tsx` — replaced by thin styled `<hr>` or SVG divider in Phase 5.
- D-16: Delete `src/components/TextFrame.tsx` — replaced by `Card` component in Phase 2/4.
- D-17: Update all files that import `TextSeparator` or `TextFrame` to remove those imports. Use a simple `<hr>` placeholder or remove the separator entirely.
- D-18: Replace all `font-mono` usage in layout, footer, nav, and page components with `font-sans`.
- D-19: Remove the entire `src/ascii-panel/` directory. The homepage will temporarily lack this section until Phase 3/4.

**Tailwind Config**
- D-20: Expand `tailwind.config.ts` color map to use the new semantic token names: `bg`, `surface`, `surface-alt`, `border`, `text-primary`, `text-secondary`, `text-muted`, `accent` (with DEFAULT/hover/subtle). Remove old aliases (`blue`, `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`) after migrating all references.

### Claude's Discretion
- Exact spacing values for the type scale (line-height, letter-spacing per size)
- Whether to keep `--max-width` at `72rem` or adjust
- Order of migration across files (as long as all 15 affected files are updated)
- Handling of `BitRemoteWordmark.tsx` — may keep its structure but update font references
- Whether the `no-scrollbar` and `br-num-*` animation utilities in globals.css should be removed now or left for cleanup when their parent components are deleted

### Deferred Ideas (OUT OF SCOPE)
- Manual theme toggle (light/dark switch) — v2 requirement ADV-03
- Web font (Inter, Geist) instead of system font stack — reconsider if system fonts feel too generic after assembly
- Spacing scale tokens — may be needed for Phase 4 section assembly, add then if required
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DSGN-01 | Site uses a CSS variable design token system for colors, spacing, typography, and border radius | Token system pattern verified against Tailwind docs; existing `globals.css` already uses `@layer base` with CSS variables — expand this structure |
| DSGN-02 | Site supports both dark and light themes, switching automatically via `prefers-color-scheme` | `darkMode: 'media'` already set in `tailwind.config.ts`; theme block uses `@media (prefers-color-scheme: dark)` override in `globals.css` — no breaking changes |
| DSGN-03 | Color palette is monochromatic (near-black/white/gray) with blue as the sole accent color | Exact token values specified in D-04 through D-08; old `--blue`, `--blue-strong`, `--blue-line`, `--blue-soft`, `--ink-soft` aliases must be removed after migration |
| DSGN-04 | Dark theme uses near-black backgrounds (not pure `#000`) to avoid halation | `--color-bg: #0a0a0a` specified (D-06); current `globals.css` uses `--bg: #000000` in dark — this is the primary color change for dark mode |
| DSGN-05 | Typography uses a modern sans-serif font throughout, replacing all monospace usage | Code audit found 20+ `font-mono` occurrences across 10+ files; `--font-ui` monospace variable removed; all `font-mono` classes converted to `font-sans` |
| DSGN-06 | All ASCII art separators (░ patterns) and terminal-style UI elements are removed | `TextSeparator.tsx` uses ░ SVG pattern; `TextFrame.tsx` uses terminal-style bordered sections; both deleted; `AsciiPanel` directory removed |
</phase_requirements>

---

## Summary

Phase 1 is a pure design system migration — no new components are built, no pages are restructured, and no routing is touched. The work divides into three tracks that can be sequenced:

**Track A — Token system expansion:** The existing `globals.css` already has the right structure (`@layer base`, CSS variables, `@media (prefers-color-scheme: dark)` override block). The task is to expand this existing structure with the full semantic token set from D-05 through D-14, then update `tailwind.config.ts` to expose the new tokens as Tailwind utility classes. Old aliases (`blue`, `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`) remain until all references are migrated.

**Track B — Font migration:** Twenty-plus `font-mono` occurrences are confirmed across 10 files. The `--font-ui` monospace variable is removed; the `mono` Tailwind font family alias is removed or reassigned. Every `font-mono` class in page and component files is replaced with `font-sans`. The `BitRemoteWordmark.tsx` SVG uses `font-mono` on SVG `<text>` elements — these are replaced with `font-sans` too.

**Track C — ASCII/terminal removal:** Three component files are deleted (`TextSeparator.tsx`, `TextFrame.tsx`, and the entire `src/ascii-panel/` directory). Every import site for these is updated: `TextSeparator` references in `[locale]/page.tsx` and `DownloaderLandingPage.tsx` become bare `<hr>` elements; `TextFrame` references in page components become bare `<section>` or `<div>` wrappers (no styling — Phase 4 replaces them with `Card`); `AsciiPanel` in `[locale]/page.tsx` is removed entirely. `TextButton` and `TextTabsNav` are NOT deleted in this phase (they remain functional as the primary CTA and navigation components until Phase 4 replaces them), but their `font-mono` classes are updated to `font-sans`.

**Primary recommendation:** Implement in order: (1) write new token block in `globals.css`, (2) update `tailwind.config.ts` with new semantic aliases, (3) migrate all `font-mono` to `font-sans`, (4) delete ASCII components and update all import sites. Each step is independently verifiable with `npm run build`.

---

## Standard Stack

### Core (no new packages required for Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 3.4.0 (installed) | Utility classes from CSS variable tokens | Already installed; `darkMode: 'media'` already configured |
| PostCSS | 8.4.0 (installed) | CSS variable processing | Already in pipeline |
| TypeScript | 5.7.3 (installed) | Type-safe Tailwind config | Already used throughout |

Phase 1 requires zero new npm packages. All token system work is in `globals.css` and `tailwind.config.ts`. No animation library, no new dependencies.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS variables + Tailwind aliases | Tailwind v4 CSS-first config | Project uses Tailwind 3.4; v4 migration is explicitly out of scope per REQUIREMENTS.md |
| `@media (prefers-color-scheme: dark)` | `[data-theme="dark"]` data attribute | Data attribute requires JavaScript on load, causing FOUC on static export; media query is flash-free — locked by D-09 |
| System font stack | Inter / Geist web font | Web font adds FOUT risk and ~100KB payload; system fonts load instantly and match the BitRemote app's SF Pro on Apple devices — locked by D-01 |

---

## Architecture Patterns

### Recommended File Structure After Phase 1

```
src/
├── app/
│   ├── globals.css          # MODIFIED: full token system, dark override, clean animation utils
│   ├── [locale]/
│   │   ├── layout.tsx       # MODIFIED: font-mono → font-sans in footer
│   │   ├── page.tsx         # MODIFIED: remove AsciiPanel, TextSeparator, TextFrame; font-mono → font-sans
│   │   ├── privacy/page.tsx # MODIFIED: TextFrame/TextButton kept but font updated
│   │   ├── terms/page.tsx   # MODIFIED: same as privacy
│   │   └── support/page.tsx # MODIFIED: same as privacy
│   ├── page.tsx             # MODIFIED: font-mono → font-sans
│   └── not-found.tsx        # MODIFIED: font-mono → font-sans
├── components/
│   ├── BitRemoteWordmark.tsx # MODIFIED: font-mono → font-sans on SVG text
│   ├── FaqAccordion.tsx      # MODIFIED: font-mono → font-sans
│   ├── TextButton.tsx        # MODIFIED: font-mono → font-sans (kept functional)
│   ├── TextTabsNav.tsx       # MODIFIED: font-mono → font-sans (kept functional)
│   ├── DownloaderLandingPage.tsx # MODIFIED: remove TextSeparator/TextFrame; font-mono → font-sans
│   ├── TextFrame.tsx         # DELETED
│   └── TextSeparator.tsx     # DELETED
├── ascii-panel/              # DELETED (entire directory)
└── tailwind.config.ts        # MODIFIED: new semantic color aliases
```

### Pattern 1: CSS Variable Token Block (globals.css)

**What:** Semantic CSS variables defined in `:root`, overridden in `@media (prefers-color-scheme: dark)`.
**When to use:** Always — this is the single source of truth for all design values.

```css
/* globals.css — full token block replacing existing :root */
@layer base {
  :root {
    /* Surface hierarchy */
    --color-bg:          #ffffff;
    --color-surface:     #f8f8f8;
    --color-surface-alt: #f0f0f0;
    --color-border:      #e5e5e5;

    /* Text */
    --color-text-primary:   #0a0a0a;
    --color-text-secondary: #6b7280;
    --color-text-muted:     #9ca3af;

    /* Accent (blue only) */
    --color-accent:        #2563eb;
    --color-accent-hover:  #1d4ed8;
    --color-accent-subtle: #dbeafe;

    /* Radius */
    --radius-sm:  0.375rem;
    --radius-md:  0.75rem;
    --radius-lg:  1.25rem;
    --radius-xl:  1.75rem;

    /* Shadow */
    --shadow-card:  0 1px 3px rgb(0 0 0 / 0.08), 0 4px 16px rgb(0 0 0 / 0.06);
    --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.12);

    /* Layout */
    --max-width: 72rem;
    --gutter: 1rem;

    /* Font */
    --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

    /* Glass (preserve color-mix pattern) */
    --bg-glass-92: color-mix(in srgb, var(--color-bg) 92%, transparent);
    --bg-glass-95: color-mix(in srgb, var(--color-bg) 95%, transparent);
    --bg-panel-88: color-mix(in srgb, var(--color-bg) 88%, transparent);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg:          #0a0a0a;
      --color-surface:     #141414;
      --color-surface-alt: #1e1e1e;
      --color-border:      #2a2a2a;

      --color-text-primary:   #f5f5f5;
      --color-text-secondary: #a3a3a3;
      --color-text-muted:     #6b6b6b;

      --color-accent:        #3b82f6;
      --color-accent-hover:  #60a5fa;
      --color-accent-subtle: #1e3a5f;

      --shadow-card:  0 1px 3px rgb(0 0 0 / 0.4), 0 4px 16px rgb(0 0 0 / 0.3);
      --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.5);
    }
  }
}
```

**Critical note:** The existing `globals.css` uses old variable names (`--bg`, `--fg`, `--blue`, `--blue-strong`, etc.) that are referenced throughout the codebase. The migration strategy is:
1. Add all new `--color-*` variables
2. Keep the old `--bg` and `--fg` aliases temporarily, pointing to new values
3. Migrate all component references to new token names in the same phase
4. Remove old aliases once no references remain

### Pattern 2: Tailwind Semantic Config

**What:** Map CSS variables to semantic Tailwind utility names.
**When to use:** In `tailwind.config.ts` — this is what enables `bg-surface`, `text-text-primary`, etc.

```typescript
// tailwind.config.ts
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',  // already set — do not change
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        'surface-alt':'var(--color-surface-alt)',
        border:       'var(--color-border)',
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          subtle:  'var(--color-accent-subtle)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        // Remove mono alias entirely — no monospace in this design system
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card:  'var(--shadow-card)',
        raise: 'var(--shadow-raise)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

**Warning:** Removing the `mono` font family alias from Tailwind config will cause build errors if any `font-mono` class remains. Complete the font migration in the same pass as the config update.

### Pattern 3: TextFrame Replacement Placeholder

**What:** When deleting `TextFrame`, its import sites need a minimal replacement that doesn't break the page.
**When to use:** In `[locale]/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`, `support/page.tsx`, and `DownloaderLandingPage.tsx`.

Replace each `<TextFrame title={...} label={...}>...</TextFrame>` with:
```tsx
<section aria-label={title}>
  {children}
</section>
```

This is a neutral, unstyled wrapper that preserves accessibility semantics without the terminal aesthetic. Phase 4 replaces these with the `Card` component.

### Pattern 4: TextSeparator Replacement Placeholder

**What:** When deleting `TextSeparator`, replace each instance with a plain `<hr>`.
**When to use:** In `[locale]/page.tsx` (3 occurrences) and `DownloaderLandingPage.tsx` (2 occurrences).

```tsx
<hr className="border-t border-border my-12" />
```

This uses the new `border` token. Phase 5 replaces these with thin SVG dividers (VFX-03).

### Anti-Patterns to Avoid

- **Keeping old aliases while adding new ones:** Once new `--color-*` variables are defined, all component references must migrate to the new names in the same phase. Leaving mixed token usage creates a confusing state for Phase 2 engineers.
- **Removing `font-mono` from Tailwind config before migrating all usages:** This will cause build failures. Always audit and migrate all occurrences first, then remove the config alias.
- **Using `dark:` Tailwind class prefix instead of CSS variables:** The whole point of the token system is a single override block. `dark:` class prefixes on individual elements are the anti-pattern this phase explicitly replaces.
- **Touching `src/domain/`, `src/i18n/`, `src/seo/`, or `src/app/sitemap.ts`:** These are untouchable per the architecture. Design tokens flow through CSS — they never touch data or routing layers.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark theme CSS variables | A custom CSS-in-JS theme provider | CSS `@media (prefers-color-scheme: dark)` with variable overrides | No JavaScript, no hydration risk, flash-free — exactly what D-09 requires |
| Font loading | A custom font loader | System font stack via CSS variable | Zero FOUT, no external request, no layout shift |
| Color token types | Custom TypeScript types for colors | Tailwind's built-in config type inference | Tailwind already types theme extensions through `satisfies Config` |

---

## Common Pitfalls

### Pitfall 1: FOUC from JavaScript-Driven Theme
**What goes wrong:** Setting `data-theme` attribute via JavaScript in a `<script>` tag or `useEffect` causes the page to flash from light to dark (or vice versa) before the script runs. On Cloudflare Pages, the static HTML always renders without JavaScript first.
**Why it happens:** JavaScript runs after HTML is parsed and painted. Any theme logic in JS executes too late.
**How to avoid:** D-09 mandates `@media (prefers-color-scheme: dark)` in CSS only. No JavaScript theme detection is used in Phase 1. This is the correct approach for a static export.
**Warning signs:** Any code that reads `window.matchMedia('(prefers-color-scheme: dark)')` or sets `document.documentElement.setAttribute('data-theme', ...)` on initial load.

### Pitfall 2: Build Failure from Orphaned `font-mono` Classes
**What goes wrong:** If `fontFamily.mono` is removed from `tailwind.config.ts` before all `font-mono` class references are replaced, the build fails silently or produces warnings that hit the `--max-warnings 0` ESLint limit.
**Why it happens:** Tailwind's purge step relies on the config being consistent with the content files.
**How to avoid:** Run the font migration first (grep for `font-mono`, replace all occurrences), then update the config.
**Warning signs:** `npm run build` errors mentioning unknown font utility class.

### Pitfall 3: Broken Pages from Removed Component Imports
**What goes wrong:** Deleting `TextSeparator.tsx` or `TextFrame.tsx` without updating all import sites causes TypeScript compilation failures.
**Why it happens:** TypeScript resolves imports at build time. A deleted file with active imports = build failure.
**How to avoid:** Before deleting any component, grep for all import references and replace them with placeholders first.
**Warning signs:** `Cannot find module '@/components/TextSeparator'` during build.

### Pitfall 4: Old Color Variables Referenced After Migration
**What goes wrong:** After removing old Tailwind color aliases (`blue`, `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`), component files that still use `text-blue-strong` or `bg-blue-soft` produce invalid CSS without any TypeScript error.
**Why it happens:** Tailwind class names are strings; TypeScript doesn't validate them.
**How to avoid:** Grep for all old alias names in the codebase before removing them from the config. Migration checklist: `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`, `text-ink-soft`, `bg-blue-soft`, `border-blue-line`.
**Warning signs:** Visual regression in the rendered page (wrong colors) without build errors.

### Pitfall 5: ascii-panel Deletion Breaks TypeScript Path Alias
**What goes wrong:** `src/ascii-panel/index.tsx` is the barrel export for `AsciiPanel`. If the directory is deleted but `@/ascii-panel` import in `[locale]/page.tsx` is not removed first, TypeScript fails to compile.
**Why it happens:** The `@/` path alias maps to `src/`. Deleting the directory removes the resolution target.
**How to avoid:** Remove the `AsciiPanel` import and usage from `[locale]/page.tsx` before deleting the `src/ascii-panel/` directory.

### Pitfall 6: Removing br-num-* Animations Too Early
**What goes wrong:** The `br-num-*` CSS classes and `@keyframes` in `globals.css` are used exclusively by the `AsciiPanel` component. Once `AsciiPanel` is deleted, these can be safely removed. However, if removed while `AsciiPanel` still exists, the animated counter breaks.
**Why it happens:** Ordering error — component deletion and CSS cleanup happen out of order.
**How to avoid:** Remove `br-num-*` utilities and `@keyframes` from `globals.css` in the same commit that deletes `src/ascii-panel/`. Similarly for `br-frame-sheet-*` keyframes. The `no-scrollbar` utility can be kept or removed — it is safe either way since no component actively depends on it after `AsciiPanel` is gone.

---

## Code Examples

### Complete globals.css @layer base replacement

```css
/* Source: CONTEXT.md D-05 through D-14 (locked decisions) */
@layer base {
  :root {
    --color-bg:          #ffffff;
    --color-surface:     #f8f8f8;
    --color-surface-alt: #f0f0f0;
    --color-border:      #e5e5e5;
    --color-text-primary:   #0a0a0a;
    --color-text-secondary: #6b7280;
    --color-text-muted:     #9ca3af;
    --color-accent:        #2563eb;
    --color-accent-hover:  #1d4ed8;
    --color-accent-subtle: #dbeafe;
    --radius-sm:  0.375rem;
    --radius-md:  0.75rem;
    --radius-lg:  1.25rem;
    --radius-xl:  1.75rem;
    --shadow-card:  0 1px 3px rgb(0 0 0 / 0.08), 0 4px 16px rgb(0 0 0 / 0.06);
    --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.12);
    --max-width: 72rem;
    --gutter: 1rem;
    --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    --bg-glass-92: color-mix(in srgb, var(--color-bg) 92%, transparent);
    --bg-glass-95: color-mix(in srgb, var(--color-bg) 95%, transparent);
    --bg-panel-88: color-mix(in srgb, var(--color-bg) 88%, transparent);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg:          #0a0a0a;
      --color-surface:     #141414;
      --color-surface-alt: #1e1e1e;
      --color-border:      #2a2a2a;
      --color-text-primary:   #f5f5f5;
      --color-text-secondary: #a3a3a3;
      --color-text-muted:     #6b6b6b;
      --color-accent:        #3b82f6;
      --color-accent-hover:  #60a5fa;
      --color-accent-subtle: #1e3a5f;
      --shadow-card:  0 1px 3px rgb(0 0 0 / 0.4), 0 4px 16px rgb(0 0 0 / 0.3);
      --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.5);
    }
  }

  html, body { padding: 0; margin: 0; }

  html {
    background: var(--color-bg);
    color: var(--color-text-primary);
    scroll-behavior: smooth;
    scroll-padding-top: 5.25rem;
  }

  body {
    font-family: var(--font-sans);
    line-height: 1.55;
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--color-accent) 45%, transparent);
    text-underline-offset: 0.2em;
  }

  a:hover {
    color: var(--color-accent-hover);
    text-decoration-color: color-mix(in srgb, var(--color-accent-hover) 85%, transparent);
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--color-accent-subtle);
  }
}
```

### File-by-file font-mono migration

All confirmed `font-mono` occurrences by file:

| File | Occurrences | Change |
|------|-------------|--------|
| `src/app/[locale]/layout.tsx` | 1 (footer div) | `font-mono tracking-[0.04em]` → `font-sans` |
| `src/app/[locale]/page.tsx` | 5 (`h2`, `p`, grid div) | `font-mono` → `font-sans`; remove exaggerated `tracking-[0.12em]` or reduce to `tracking-wide` |
| `src/app/page.tsx` | 1 (locale selector link) | `font-mono` → `font-sans` |
| `src/app/not-found.tsx` | 1 (h1) | `font-mono` → `font-sans` |
| `src/components/FaqAccordion.tsx` | 1 (summary) | `font-mono uppercase tracking-[0.1em]` → `font-sans` |
| `src/components/TextButton.tsx` | 1 (base class string) | `font-mono` → `font-sans` |
| `src/components/TextTabsNav.tsx` | 3 (tab, link, dropdown) | `font-mono` → `font-sans` |
| `src/components/DownloaderLandingPage.tsx` | 1 (breadcrumb div) | `font-mono` → `font-sans` |
| `src/components/BitRemoteWordmark.tsx` | 2 (SVG `<text>` elements) | `font-mono` → `font-sans` |
| `src/components/TextFrame.tsx` | 2 (header, label) | DELETED — no migration needed |
| `src/components/TextSeparator.tsx` | 1 (SVG text) | DELETED — no migration needed |
| `src/ascii-panel/components/AsciiPanelFrame.tsx` | 1 | DELETED (whole directory) |

**Total active migrations:** 16 class occurrences across 9 files (excluding deleted files).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `dark:` class prefix on every element | CSS variable override in single `@media` block | Tailwind 3.0+ | One block governs all dark mode; no per-component duplication |
| `[data-theme="dark"]` JS-driven toggle | `@media (prefers-color-scheme: dark)` CSS query | Static export era | Eliminates FOUC entirely on static sites |
| Web fonts (Google Fonts, Typekit) | System font stack | ~2020 design trend shift | Zero FOUT, instant load, matches native app feel on Apple devices |

---

## Open Questions

1. **Handling of existing `--bg` and `--fg` variable references in `globals.css` base styles**
   - What we know: `html` uses `background: var(--bg)` and `color: var(--fg)` in the existing file. These old aliases are not in any component file — they are only in `globals.css` itself.
   - What's unclear: Should `--bg` and `--fg` be replaced in-place or kept as aliases pointing to the new tokens for backward compatibility during the migration?
   - Recommendation: Replace `var(--bg)` with `var(--color-bg)` and `var(--fg)` with `var(--color-text-primary)` directly in `globals.css` since these are internal to the CSS file — no external component references them by name.

2. **`br-num-*` and `br-frame-sheet-*` cleanup timing**
   - What we know: These utilities and keyframes are used exclusively by `AsciiPanel`. Once the directory is deleted they are dead code.
   - What's unclear: CONTEXT.md leaves this as Claude's discretion — remove now or defer.
   - Recommendation: Remove them in the same commit as `src/ascii-panel/` deletion. Dead CSS adds confusion for Phase 2 engineers working in `globals.css`.

3. **Tracking values after `font-mono` removal**
   - What we know: Many `font-mono` usages come with `tracking-[0.04em]` or `tracking-[0.12em]` which were tuned for monospace. Sans-serif does not need the same letter-spacing.
   - What's unclear: The exact tracking values to use per element are Claude's discretion.
   - Recommendation: Remove all custom `tracking-[...]` values alongside the `font-mono` removal unless the element clearly benefits from slightly-loose tracking (e.g., small-caps labels, uppercase badges). Default `tracking-normal` is appropriate for body text and headings.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no `jest.config.*`, `vitest.config.*`, or `pytest.ini` in project |
| Config file | None — Wave 0 setup needed |
| Quick run command | `npm run build` (TypeScript compilation + Tailwind purge validates all class usage) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | CSS variables present in `:root` | build smoke | `npm run build` (fails if CSS invalid) | N/A |
| DSGN-02 | Dark override block uses `@media (prefers-color-scheme: dark)` | build smoke | `npm run build` | N/A |
| DSGN-03 | No non-blue hue tokens exist in `:root` | manual audit | grep for `--color-` in globals.css | N/A |
| DSGN-04 | `--color-bg` in dark = `#0a0a0a` not `#000000` | manual audit | grep globals.css for `#000` | N/A |
| DSGN-05 | Zero `font-mono` classes remain | automated grep | `grep -r "font-mono" src/` exits 0 | ❌ Wave 0 |
| DSGN-06 | TextSeparator, TextFrame, AsciiPanel files deleted | automated check | `ls src/components/TextSeparator.tsx` returns error | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — TypeScript and CSS compilation validates structural correctness
- **Per wave merge:** `npm run build && npm run lint` — zero warnings required
- **Phase gate:** Both commands green + manual visual check of light/dark theme in browser

### Wave 0 Gaps

- [ ] No automated test infrastructure — Wave 0 must establish grep-based shell assertions for DSGN-05 and DSGN-06 verification, or confirm manual verification is acceptable for this phase
- [ ] No unit tests exist in the project — this is by design (static site); build + lint + manual browser testing is the validation strategy

---

## Sources

### Primary (HIGH confidence)
- Tailwind CSS dark mode docs (tailwindcss.com/docs/dark-mode) — `darkMode: 'media'` pattern verified
- Tailwind CSS theme customization docs (tailwindcss.com/docs/theme) — CSS variable alias pattern verified
- Direct code inspection of `src/app/globals.css` — existing token structure confirmed
- Direct code inspection of `tailwind.config.ts` — existing Tailwind config confirmed
- Direct code inspection of all `src/` files — all 20+ `font-mono` occurrences catalogued
- CONTEXT.md locked decisions D-01 through D-20 — token values are pre-specified, not derived

### Secondary (MEDIUM confidence)
- ARCHITECTURE.md §Design Token System — token block and Tailwind config verified consistent with CONTEXT.md decisions
- SUMMARY.md §Key Findings — pitfall documentation consistent with direct code inspection

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; all work is in existing files with well-documented patterns
- Architecture: HIGH — token system pattern is standard Tailwind 3.x; all decisions are locked in CONTEXT.md
- Pitfalls: HIGH — derived from direct code inspection of affected files; ordering pitfalls are concrete

**Research date:** 2026-03-22
**Valid until:** 2026-09-22 (stable pattern — not sensitive to ecosystem changes)
