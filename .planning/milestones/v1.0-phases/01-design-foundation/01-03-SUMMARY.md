---
phase: 01-design-foundation
plan: 03
subsystem: ui
tags: [css, tailwind, ascii-panel, cleanup, design-tokens]

requires:
  - phase: 01-design-foundation plan 01
    provides: semantic CSS token system (--color-*, --radius-*, --shadow-*)
  - phase: 01-design-foundation plan 02
    provides: font/color class migration from old aliases to new semantic tokens

provides:
  - TextSeparator and TextFrame components deleted, usage sites replaced with semantic HTML
  - ascii-panel directory and all terminal UI components deleted
  - globals.css cleaned to only the semantic token system (no dead CSS, no backward compat aliases)
  - tailwind.config.ts cleaned to only semantic token mappings (no old color/font aliases)

affects: [all-pages, phase-03-ui, phase-04-cards]

tech-stack:
  added: []
  patterns:
    - section-as-placeholder: "<section aria-label={title}> replaces TextFrame until Phase 4 adds Card components"
    - hr-as-divider: "<hr className='border-t border-border my-12'> replaces TextSeparator until Phase 5 adds SVG dividers"

key-files:
  created: []
  modified:
    - src/app/[locale]/page.tsx
    - src/app/[locale]/privacy/page.tsx
    - src/app/[locale]/terms/page.tsx
    - src/app/[locale]/support/page.tsx
    - src/components/DownloaderLandingPage.tsx
    - src/app/globals.css
    - tailwind.config.ts

key-decisions:
  - "TextFrame replaced with <section aria-label> (neutral semantic placeholder) until Phase 4 Card component"
  - "TextSeparator replaced with <hr className='border-t border-border my-12'> until Phase 5 SVG dividers"
  - "AsciiPanel removed entirely from home page hero - no replacement until Phase 3/4 screenshot showcase"
  - "Hero section grid simplified from 2-column to single column (no right-column content until Phase 3)"
  - "Backward compat CSS variables (--bg, --fg, --blue, etc.) removed now that all usage sites are migrated"
  - "Glass token variables (--bg-glass-92, --bg-glass-95, --bg-panel-88) kept as they remain in use by TextTabsNav and page.tsx"

patterns-established:
  - "section-placeholder: TextFrame -> <section aria-label> pattern"
  - "hr-divider: TextSeparator -> <hr className='border-t border-border my-12'> pattern"

requirements-completed: [DSGN-06, DSGN-05, DSGN-01, DSGN-02]

duration: 5min
completed: 2026-03-22
---

# Phase 01 Plan 03: ASCII Component Deletion and CSS Cleanup Summary

**Deleted all ASCII/terminal UI (TextSeparator, TextFrame, ascii-panel) and stripped globals.css and tailwind.config.ts down to the pure semantic token system with no backward compat aliases or dead animation code**

## Performance

- **Duration:** ~5 minutes
- **Started:** 2026-03-22T14:23:55Z
- **Completed:** 2026-03-22T14:29:00Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Deleted 9 files: TextSeparator.tsx, TextFrame.tsx, and the entire ascii-panel directory (7 files)
- Updated 5 page/component files to replace TextFrame/TextSeparator/AsciiPanel with semantic HTML
- Stripped 212 lines of dead CSS and backward compat aliases from globals.css and tailwind.config.ts
- Build and lint pass clean with zero warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Delete ASCII components, update all import sites with placeholders** - `662628e` (feat)
2. **Task 2: Remove dead CSS, old variable aliases, and old Tailwind aliases** - `8ecef61` (chore)

**Plan metadata:** (committed with docs commit after SUMMARY)

## Files Created/Modified

- `src/app/[locale]/page.tsx` - Removed AsciiPanel import/usage; replaced TextSeparator with hr, TextFrame with section; simplified hero grid to single column
- `src/app/[locale]/privacy/page.tsx` - Removed TextFrame import; replaced with section
- `src/app/[locale]/terms/page.tsx` - Removed TextFrame import; replaced with section
- `src/app/[locale]/support/page.tsx` - Removed TextFrame import; replaced with section
- `src/components/DownloaderLandingPage.tsx` - Removed TextFrame and TextSeparator imports; replaced with section and hr
- `src/app/globals.css` - Removed backward compat block (10 variables), entire @layer utilities (76 lines), 8 @keyframes blocks (92 lines), @media prefers-reduced-motion block (10 lines)
- `tailwind.config.ts` - Removed 6 backward compat color aliases and fontFamily.mono

## Decisions Made

- Kept `--bg-glass-92`, `--bg-glass-95`, `--bg-panel-88` glass tokens in globals.css — still used by TextTabsNav and page.tsx for backdrop blur effects
- Hero grid changed from `grid-cols-[1.05fr_0.95fr]` to single column — no right-column content exists until Phase 3/4 screenshot showcase

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Migrated remaining text-ink-soft usages in files touched by this plan**
- **Found during:** Task 2 (CSS alias removal)
- **Issue:** privacy/page.tsx, terms/page.tsx, and support/page.tsx still had `text-ink-soft` class after Task 1's TextFrame replacement. Removing the `ink-soft` Tailwind alias would break these.
- **Fix:** Migrated `text-ink-soft` to `text-text-secondary` in all three files (Plan 02 had already done the same in other files)
- **Files modified:** src/app/[locale]/privacy/page.tsx, src/app/[locale]/terms/page.tsx, src/app/[locale]/support/page.tsx
- **Verification:** grep finds no remaining text-ink-soft in any .tsx file; lint passes
- **Committed in:** 662628e (Task 1 commit — files were staged as part of that commit)

**2. [Rule 1 - Bug] Migrated var(--blue) in BitRemoteWordmark.tsx SVG inline style**
- **Found during:** Task 2 (CSS alias removal)
- **Issue:** BitRemoteWordmark.tsx uses `fill="var(--blue)"` as inline SVG attribute, not a Tailwind class. Removing `--blue` CSS variable would make the SVG render with no fill color.
- **Fix:** Updated both occurrences to `fill="var(--color-accent)"` (the canonical token)
- **Files modified:** src/components/BitRemoteWordmark.tsx
- **Verification:** Build passes; SVG renders accent color correctly
- **Committed in:** 662628e (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug)
**Impact on plan:** Both fixes were required to safely remove the backward compat aliases without breaking the UI. No scope creep.

## Issues Encountered

None — plan executed smoothly. The parallel Plan 02 execution had already migrated most usages, leaving only a few in files directly touched by Plan 03.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 01 design foundation is now complete: semantic token system established, all old ASCII/terminal components removed, codebase uses only new design token classes
- Phase 02 can proceed: pages are structurally clean but visually bare — ready for card-based layouts and modern components
- Known placeholders: all former TextFrame sites are plain `<section>` elements (Phase 4 will add Card components); all former TextSeparator sites are plain `<hr>` elements (Phase 5 will add SVG dividers)
- Home page hero has no right-column content (blank until Phase 3/4 screenshot showcase)

---
*Phase: 01-design-foundation*
*Completed: 2026-03-22*
