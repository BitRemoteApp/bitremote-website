# Phase 1: Design Foundation - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the design token system, typography, color palette, and dark/light theme that all other components depend on. Remove all ASCII/monospace aesthetic elements. This phase delivers the foundation that every downstream component consumes — no UI components or animations are built here.

Requirements: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06

</domain>

<decisions>
## Implementation Decisions

### Typography
- **D-01:** Use the system font stack for all text: `system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`. This matches the app's SF Pro usage on Apple devices and loads instantly with zero FOUT.
- **D-02:** Remove `--font-ui` monospace variable entirely. Replace it with the same sans-serif stack. All `font-mono` Tailwind usage across the codebase must be converted to `font-sans`.
- **D-03:** Define a type scale in the token system: `text-xs` through `text-4xl` with corresponding `leading-*` and `tracking-*` values tuned for the sans-serif stack. CJK locales (ja, zh-hans, zh-hant) inherit the same scale — system fonts handle CJK natively.

### Color Palette
- **D-04:** Monochromatic base (near-black, white, grays) with blue as the sole accent color. No other hues.
- **D-05:** Light theme: `--color-bg: #ffffff`, `--color-surface: #f8f8f8`, `--color-surface-alt: #f0f0f0`, `--color-border: #e5e5e5`
- **D-06:** Dark theme: `--color-bg: #0a0a0a` (near-black, not pure `#000`), `--color-surface: #141414`, `--color-surface-alt: #1e1e1e`, `--color-border: #2a2a2a`
- **D-07:** Text colors — light: primary `#0a0a0a`, secondary `#6b7280`, muted `#9ca3af`; dark: primary `#f5f5f5`, secondary `#a3a3a3`, muted `#6b6b6b`
- **D-08:** Blue accent — light: `#2563eb` (default), `#1d4ed8` (hover), `#dbeafe` (subtle); dark: `#3b82f6` (default), `#60a5fa` (hover), `#1e3a5f` (subtle). The blue shifts lighter in dark mode for accessible contrast.

### Theme Mechanism
- **D-09:** Use `@media (prefers-color-scheme: dark)` for theme switching — not `[data-theme]` or JavaScript. This avoids hydration mismatches and FOUC on static export. A manual toggle is deferred to v2 (ADV-03).
- **D-10:** Tailwind config keeps `darkMode: 'media'` (already set). Token overrides live in a single `@media (prefers-color-scheme: dark)` block in `globals.css`.

### Token System Scope
- **D-11:** Full semantic token system covering: surface hierarchy (bg, surface, surface-alt, border), text hierarchy (primary, secondary, muted), accent scale (default, hover, subtle), radius scale (sm/md/lg/xl), shadow scale (card, raise), and layout tokens (max-width, gutter).
- **D-12:** Border radius scale: `sm: 0.375rem (6px)`, `md: 0.75rem (12px)`, `lg: 1.25rem (20px)`, `xl: 1.75rem (28px)`. The `xl` value matches the app's card corner radius.
- **D-13:** Shadow scale: `card` (subtle elevation for cards) and `raise` (stronger elevation for modals/popovers). Both adapt between light (lighter shadows) and dark (heavier shadows).
- **D-14:** Glass tokens for future use: `--bg-glass-92`, `--bg-glass-95`, `--bg-panel-88` using `color-mix()`. These already exist and should be preserved/updated with new `--color-bg` values.

### ASCII/Monospace Removal
- **D-15:** Delete `src/components/TextSeparator.tsx` (░ pattern SVG) — it will be replaced by a thin styled `<hr>` or SVG divider in Phase 5.
- **D-16:** Delete `src/components/TextFrame.tsx` (terminal-style bordered sections) — it will be replaced by `Card` component in Phase 2/4.
- **D-17:** Update all files that import `TextSeparator` or `TextFrame` to remove those imports. Use a simple `<hr>` placeholder or remove the separator entirely, since proper replacements come in later phases.
- **D-18:** Replace all `font-mono` usage in layout, footer, nav, and page components with `font-sans`. The monospace font stack is removed from the design system.
- **D-19:** Remove the entire `src/ascii-panel/` directory — this is the animated terminal-style UI on the homepage. It will be replaced by the screenshot showcase in Phase 3/4. The homepage will temporarily lack this section until then.

### Tailwind Config
- **D-20:** Expand `tailwind.config.ts` color map to use the new semantic token names: `bg`, `surface`, `surface-alt`, `border`, `text-primary`, `text-secondary`, `text-muted`, `accent` (with DEFAULT/hover/subtle). Remove old aliases (`blue`, `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`) after migrating all references.

### Claude's Discretion
- Exact spacing values for the type scale (line-height, letter-spacing per size)
- Whether to keep `--max-width` at `72rem` or adjust
- Order of migration across files (as long as all 15 affected files are updated)
- Handling of `BitRemoteWordmark.tsx` — may keep its structure but update font references
- Whether the `no-scrollbar` and `br-num-*` animation utilities in globals.css should be removed now or left for cleanup when their parent components are deleted

</decisions>

<specifics>
## Specific Ideas

- The site should feel like it belongs to the same product as the BitRemote app — clean, professional, visually calm
- Reference sites: Linear, Things, Bear — monochromatic with one accent color, generous whitespace, premium feel
- The "Linear look": thin borders, restrained palette, subtle surfaces — not flashy, just well-crafted
- Dark theme should feel premium, not gloomy. Near-black backgrounds with slightly elevated surfaces create depth.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design token specification
- `.planning/research/ARCHITECTURE.md` §Design Token System — Exact CSS variable names, values, and Tailwind config structure
- `.planning/research/ARCHITECTURE.md` §Anti-Patterns to Avoid — Why semantic tokens over `dark:` class duplication

### Color and theme
- `.planning/PROJECT.md` §Context — App design language description (monochromatic + blue, SF Pro, card-based)
- `.planning/REQUIREMENTS.md` §Design Foundation — DSGN-01 through DSGN-06 requirements

### Existing code to modify
- `.planning/research/ARCHITECTURE.md` §Existing Code to Remove — Full list of files to delete/replace
- `.planning/research/SUMMARY.md` §Key Findings — Recommended stack decisions and pitfall avoidance

### Typography
- `.planning/research/STACK.md` §Existing Stack — Current font configuration
- `.planning/research/PITFALLS.md` — CJK text overflow considerations (if applicable)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css`: Already has CSS variable structure with `--bg`, `--fg`, `--blue-*` tokens and `prefers-color-scheme` media query — this is the foundation to expand, not replace
- `tailwind.config.ts`: Already maps CSS variables to Tailwind aliases — expand this pattern with new semantic names
- `--bg-glass-*` tokens: Already defined using `color-mix()` — preserve and adapt to new color values
- `prefers-reduced-motion` block in `globals.css`: Already respects motion preferences — preserve

### Established Patterns
- **CSS variable → Tailwind alias pattern**: The codebase already uses `var(--bg)` consumed as `bg-bg` in Tailwind. This exact pattern scales to the full token system.
- **`darkMode: 'media'` in Tailwind config**: Already set. No change needed for the theme mechanism.
- **`@layer base` for token definitions**: Already used in `globals.css`. Continue this pattern.

### Integration Points
- **15 files reference `font-mono`**: All must be updated to `font-sans`
- **`TextSeparator` imported in**: page components (check `[locale]/page.tsx`, downloader pages)
- **`TextFrame` imported in**: page components, downloader landing page
- **`TextTabsNav` uses `font-mono`**: Navigation component needs font update
- **Footer in `[locale]/layout.tsx`**: Uses `font-mono tracking-[0.04em]` — needs update
- **`AsciiPanel` in homepage**: Entire `src/ascii-panel/` directory to remove

</code_context>

<deferred>
## Deferred Ideas

- Manual theme toggle (light/dark switch) — v2 requirement ADV-03
- Web font (Inter, Geist) instead of system font stack — reconsider if system fonts feel too generic after assembly
- Spacing scale tokens — may be needed for Phase 4 section assembly, add then if required

</deferred>

---

*Phase: 01-design-foundation*
*Context gathered: 2026-03-22*
