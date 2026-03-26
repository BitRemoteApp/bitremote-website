---
phase: 01-design-foundation
plan: 02
subsystem: component-migration
tags: [tailwind, font-migration, color-migration, design-tokens, semantic-classes]
dependency_graph:
  requires: [design-token-system, semantic-tailwind-classes]
  provides: [migrated-components, migrated-pages]
  affects: [all-components, all-pages]
tech_stack:
  added: []
  patterns: [semantic-tailwind-color-classes, font-sans-system-ui]
key_files:
  created: []
  modified:
    - src/components/TextTabsNav.tsx
    - src/components/TextButton.tsx
    - src/components/BitRemoteWordmark.tsx
    - src/components/FaqAccordion.tsx
    - src/components/DownloaderLandingPage.tsx
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/app/page.tsx
    - src/app/not-found.tsx
    - src/app/[locale]/privacy/page.tsx
    - src/app/[locale]/terms/page.tsx
    - src/app/[locale]/support/page.tsx
decisions:
  - "Removed tracking-[0.08em]/[0.04em] from font-sans usage (default tracking-normal is appropriate for sans-serif)"
  - "Used tracking-wide for 0.12em headings and tracking-wider for 0.14em label text"
  - "Auto-fixed privacy, terms, and support pages (text-ink-soft occurrences not listed in plan)"
metrics:
  duration: "~4 minutes"
  completed: "2026-03-22T14:27:56Z"
  tasks_completed: 2
  files_modified: 12
---

# Phase 01 Plan 02: Design Token Migration Summary

Migrated all surviving .tsx component and page files from the old monospace/alias class system (`font-mono`, `text-blue-strong`, `text-ink-soft`, `border-blue-line`) to the new semantic token classes (`font-sans`, `text-accent`, `text-text-secondary`, `border-border`).

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Migrate font and color classes in component files (5 files) | adaf717 | TextTabsNav, TextButton, BitRemoteWordmark, FaqAccordion, DownloaderLandingPage |
| 2 | Migrate font and color classes in page/layout files (4+ files) | 717063b | layout, page, not-found, page.tsx + privacy/terms/support (auto-fix) |

## What Was Built

All surviving `.tsx` files now use:

- `font-sans` instead of `font-mono`
- `text-accent` / `bg-accent` instead of `text-blue-strong` / `bg-blue-strong`
- `text-text-primary` instead of `text-fg`
- `text-text-secondary` instead of `text-ink-soft`
- `border-border` instead of `border-blue-line`
- `tracking-wide` for heading labels (was `tracking-[0.12em]`)
- `tracking-wider` for small label text (was `tracking-[0.14em]`)

### Key changes per file

**src/components/TextTabsNav.tsx** — Navigation tabs and locale picker updated to use `font-sans`, `text-accent`, `text-text-primary`, `border-border`

**src/components/TextButton.tsx** — CTA button updated to `font-sans`, `text-accent`, `bg-accent`

**src/components/BitRemoteWordmark.tsx** — SVG `font-mono` replaced with `font-sans`; linter also updated inline `fill="var(--blue)"` to `fill="var(--color-accent)"`

**src/components/FaqAccordion.tsx** — Summary/question text uses `font-sans tracking-wide`, answer text uses `text-text-secondary`, border uses `border-border`

**src/components/DownloaderLandingPage.tsx** — Label uses `font-sans tracking-wider text-accent`, body text uses `text-text-secondary`

**src/app/[locale]/layout.tsx** — Footer updated with `border-border`, `text-text-secondary`, `font-sans`, footer links use `text-accent`/`bg-accent`

**src/app/[locale]/page.tsx** — All section headings, labels, and body text updated; downloader list uses semantic classes

**src/app/page.tsx** — Language selector updated with `font-sans`, `text-accent`, `bg-accent`

**src/app/not-found.tsx** — 404 heading and body text updated with semantic classes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] Migrated privacy, terms, and support pages**
- **Found during:** Task 2 verification (overall grep check)
- **Issue:** `src/app/[locale]/privacy/page.tsx`, `src/app/[locale]/terms/page.tsx`, and `src/app/[locale]/support/page.tsx` each had `text-ink-soft` occurrences but were not listed in the plan's file list
- **Fix:** Applied `text-ink-soft` → `text-text-secondary` migration to all three files (handled automatically by linter before manual edit was needed)
- **Files modified:** privacy/page.tsx, terms/page.tsx, support/page.tsx
- **Commit:** 717063b

**2. [Rule 2 - Missing Critical Functionality] BitRemoteWordmark SVG fill updated**
- **Found during:** Task 1 (linter auto-update)
- **Issue:** `BitRemoteWordmark.tsx` used `fill="var(--blue)"` (old backward-compat alias) in SVG element
- **Fix:** Linter updated to `fill="var(--color-accent)"` (direct semantic token)
- **Files modified:** src/components/BitRemoteWordmark.tsx
- **Commit:** 717063b

## Verification Results

- `grep -r "font-mono" src/ --include="*.tsx" | grep -v ascii-panel | grep -v TextSeparator | grep -v TextFrame` → 0 matches
- `grep -r "text-blue-strong|bg-blue-strong|border-blue-line|text-ink-soft|text-fg " src/ --include="*.tsx" | grep -v ascii-panel | grep -v TextSeparator | grep -v TextFrame` → 0 matches
- `npm run build` → exits 0
- `npm run lint` → exits 0 with zero warnings

## Known Stubs

None — all files use live semantic token classes connected to the token system established in Plan 01.

## Self-Check: PASSED
