---
phase: 01-design-foundation
plan: 01
subsystem: design-tokens
tags: [css-variables, tailwind, dark-mode, typography, color-palette]
dependency_graph:
  requires: []
  provides: [design-token-system, semantic-tailwind-classes]
  affects: [all-components, all-pages]
tech_stack:
  added: []
  patterns: [css-variable-token-system, tailwind-semantic-aliases, prefers-color-scheme-dark-mode]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - tailwind.config.ts
decisions:
  - "Backward compat aliases (--bg, --fg, --blue, --blue-strong, etc.) preserved as CSS variable pointers to new semantic tokens; removed in Plan 02 after migration"
  - "fontFamily.mono kept in Tailwind config pointing to --font-ui which aliases to --font-sans; removed in Plan 02"
  - "br-num-* and br-frame-sheet-* utilities and keyframes kept unchanged; removed when ascii-panel directory is deleted in Plan 03"
metrics:
  duration: "~2 minutes"
  completed: "2026-03-22T14:21:56Z"
  tasks_completed: 2
  files_modified: 2
---

# Phase 01 Plan 01: Design Token System Summary

Established the complete CSS variable semantic token system in globals.css and exposed all tokens as Tailwind utility classes in tailwind.config.ts, with full backward compatibility for existing components.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Replace globals.css token system with full semantic design tokens | f10d366 | src/app/globals.css |
| 2 | Update Tailwind config with semantic color aliases and token mappings | 1edadab | tailwind.config.ts |

## What Was Built

### globals.css

- Complete `:root` block with full semantic token set:
  - Surface hierarchy: `--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`
  - Text hierarchy: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
  - Accent scale: `--color-accent`, `--color-accent-hover`, `--color-accent-subtle`
  - Radius scale: `--radius-sm` through `--radius-xl`
  - Shadow scale: `--shadow-card`, `--shadow-raise`
  - Layout tokens: `--max-width`, `--gutter`
  - Font: `--font-sans` (system UI stack)
  - Glass tokens: `--bg-glass-92`, `--bg-glass-95`, `--bg-panel-88` using `color-mix()`
- Single `@media (prefers-color-scheme: dark)` override block with `#0a0a0a` near-black background (not `#000000`)
- Base styles updated to use `--color-*` variable names (`html`, `body`, `a`, `:focus-visible`, `::selection`)
- Backward compat aliases: old `--bg`, `--fg`, `--blue`, `--blue-strong`, `--blue-line`, `--blue-soft`, `--ink-soft`, `--font-ui`, `--font-body` all aliased to new semantic tokens

### tailwind.config.ts

- New semantic color tokens: `bg`, `surface`, `surface-alt`, `border`, `text-primary`, `text-secondary`, `text-muted`, `accent` (with `DEFAULT`, `hover`, `subtle` sub-keys)
- `borderRadius` tokens: `sm`, `md`, `lg`, `xl` mapped to CSS variables
- `boxShadow` tokens: `card`, `raise` mapped to CSS variables
- `fontFamily.sans` updated to `var(--font-sans)`
- Backward compat color aliases preserved: `fg`, `blue`, `blue-strong`, `blue-line`, `blue-soft`, `ink-soft`
- `fontFamily.mono` kept pointing to `var(--font-ui)` (backward compat)
- `darkMode: 'media'` unchanged

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- `npm run build` exits 0
- `npm run lint` exits 0 with zero warnings
- `--color-bg: #ffffff` present in `:root`
- `--color-bg: #0a0a0a` present in dark media query (near-black, not `#000000`)
- `--color-surface: #f8f8f8` present
- `--color-accent: #2563eb` present
- `prefers-color-scheme: dark` media query present
- `surface` token present in tailwind.config.ts
- `--bg: var(--color-bg)` backward compat alias present (not a direct hex value)
- `html` block uses `var(--color-bg)` not `var(--bg)`
- `body` block uses `var(--font-sans)` not `var(--font-body)` or `var(--font-ui)`

## Known Stubs

None — this plan establishes the token foundation. No UI components render token values yet.

## Self-Check: PASSED
