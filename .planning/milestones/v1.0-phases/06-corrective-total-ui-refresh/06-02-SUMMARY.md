---
phase: 06-corrective-total-ui-refresh
plan: 02
subsystem: ui
tags: [nextjs, react, tailwind, navigation, information-architecture, phase-6]
requires:
  - phase: 06-corrective-total-ui-refresh
    provides: shared Phase 6 visual primitives from 06-01
provides:
  - Sticky navigation with persistent active states and integrated Downloaders anchor
  - Calmer locale switcher and footer language aligned with the new shared surface language
  - Homepage section order that moves product proof and downloader trust to the top
affects: [homepage, locale-layout, navigation, footer, phase-06]
tech-stack:
  added: []
  patterns: [active-nav-states, homepage-reordering, locale-safe-anchor-navigation]
key-files:
  created: []
  modified:
    - src/components/TextTabsNav.tsx
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
key-decisions:
  - "Kept the existing TextTabsNav component boundary but replaced hover-only styling with persistent active states and a downloader-aware nav model."
  - "Moved the product-proof block directly below the hero and restored a top-level downloaders section so the homepage structure matches the Phase 6 UI contract before deeper content redesign."
patterns-established:
  - "Homepage section ids now support anchor navigation for features, downloaders, quickstart, plus, and FAQ."
  - "Locale navigation remains path-safe across downloader pages while still exposing a selected-state language picker."
requirements-completed: [NAV-04, DSGN-08, BRAND-01]
duration: 14min
completed: 2026-03-26
---

# Phase 6 Plan 2: Navigation and homepage structure Summary

**The site skeleton now reads like a composed product page: clear sticky navigation, visible selected states, and a homepage order built around hero, proof, and downloader trust instead of the old screenshot-first flow.**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-25T17:27:00Z
- **Completed:** 2026-03-25T17:41:54Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Rebuilt `TextTabsNav` around persistent active states, calmer rounded surfaces, a dedicated `#downloaders` anchor, and a selected-state locale picker.
- Updated the locale layout and footer chrome to align with the corrected nav treatment.
- Reordered the homepage so the proof block sits immediately after the hero, the Downloaders section is restored near the top, and the remaining sections follow the new Phase 6 hierarchy.

## Task Commits

Each task was committed atomically:

1. **Task 1: Redesign navigation and locale switching around clear state, not hover theatrics** - `71fa531` (feat)
2. **Task 2: Reorder the homepage around hero, product proof, and downloader trust** - `1dee66d` (feat)
3. **Task 2 fix: keep homepage structure locale-safe** - `369314e` (fix)

## Files Created/Modified
- `src/components/TextTabsNav.tsx` - Added persistent nav active states, a downloaders anchor, and calmer locale switching.
- `src/app/[locale]/layout.tsx` - Tuned shared layout and footer link chrome to match the new navigation language.
- `src/app/[locale]/page.tsx` - Reordered the homepage into hero, proof, downloaders, benefits, quickstart, plus, and FAQ.

## Decisions Made
- Preserved locale-aware routing behavior while allowing the homepage nav to highlight top-level product sections and downloader pages coherently.
- Treated the product-proof block as part of the page's top-of-funnel structure instead of a standalone screenshot-led section.

## Deviations from Plan

None. The only follow-up within the task was a locale-safety fix after the initial page reorder.

## Issues Encountered

- The first page reorder used a structure that was less robust for non-home locale paths. A follow-up fix tightened the locale-safe behavior without changing the approved IA.

## User Setup Required

None.

## Next Phase Readiness

- Wave 2 can now replace the proof block content and restore the full Supported Downloaders storytelling within the corrected homepage skeleton.
- Lint and static export build passed on the integrated Wave 1 state.

## Self-Check: PASSED

- Found task commit `71fa531`
- Found task commit `1dee66d`
- Found task commit `369314e`
- Verified `src/app/[locale]/page.tsx` contains `id="downloaders"`

---
*Phase: 06-corrective-total-ui-refresh*
*Completed: 2026-03-26*
