---
phase: 06-corrective-total-ui-refresh
plan: 01
subsystem: ui
tags: [nextjs, react, tailwind, design-system, phase-6]
requires:
  - phase: 05-visual-polish
    provides: global tokens, hero glow, and shared component structure for the corrective refresh
provides:
  - Shared CTA primitive with calm primary and secondary variants
  - Static BitRemote brand lockup without glitch or pixel effects
  - Sentence-case section chrome for labels, platform badges, and FAQ rows
affects: [homepage, downloader-landings, support-pages, phase-06]
tech-stack:
  added: []
  patterns: [shared-product-ui-primitives, calm-surface-language, sentence-case-controls]
key-files:
  created: []
  modified:
    - src/app/globals.css
    - src/components/BitRemoteWordmark.tsx
    - src/components/TextButton.tsx
    - src/components/SectionLabel.tsx
    - src/components/PlatformBadgeStrip.tsx
    - src/components/FaqAccordion.tsx
key-decisions:
  - "Kept BitRemoteWordmark and TextButton APIs stable while replacing their retro rendering with static, app-aligned treatments."
  - "Added only a minimal set of shared surface tokens in globals.css so the new primitives can be reused across homepage and landing-page contexts."
patterns-established:
  - "Shared CTAs use rounded filled or quiet surface treatments instead of decorative bracket framing."
  - "Shared section chrome defaults to sentence case, medium-weight typography, and restrained surface styling."
requirements-completed: [DSGN-07, DSGN-08, BRAND-01]
duration: 12min
completed: 2026-03-26
---

# Phase 6 Plan 1: Shared corrective UI primitives Summary

**Static brand lockup, rounded App Store CTA treatments, and calmer section chrome aligned the shared UI primitives with the BitRemote app direction.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-25T17:27:00Z
- **Completed:** 2026-03-25T17:39:28Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Replaced the glitching SVG wordmark with a static typographic lockup that reads like a product brand mark.
- Rebuilt `TextButton` into reusable primary and secondary button styles without bracket wrappers or terminal styling.
- Normalized section labels, platform badges, and FAQ rows to the same calmer surface language while preserving existing semantics and behavior.

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace the remaining shared retro brand and CTA primitives** - `9d11ea4` (feat)
2. **Task 2: Normalize section chrome to match the corrective design direction** - `67f01e0` (feat)

## Files Created/Modified
- `src/app/globals.css` - Added minimal shared surface tokens for the new wordmark and button treatments.
- `src/components/BitRemoteWordmark.tsx` - Replaced animated glitch SVG output with a static product lockup.
- `src/components/TextButton.tsx` - Introduced rounded primary and secondary CTA variants with visible focus treatment.
- `src/components/SectionLabel.tsx` - Moved section headings to a calmer sentence-case heading style.
- `src/components/PlatformBadgeStrip.tsx` - Restyled support badges as quiet capability pills.
- `src/components/FaqAccordion.tsx` - Updated FAQ rows to match the new surface language while keeping `details/summary`.

## Decisions Made
- Kept existing component names and props stable so the corrective redesign can propagate through existing pages without temporary compatibility layers.
- Used shared CSS variables for button and brand surfaces instead of per-page overrides to keep the Phase 6 language consistent across homepage and landing pages.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Parallel `git add` operations caused transient `.git/index.lock` contention during staging. Resolved by switching the remaining git operations to serial execution.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Shared visual primitives now match the corrective Phase 6 direction and are ready for homepage and navigation restructuring in the remaining plans.
- Existing imports remained stable, and both lint and static export build passed after the component refresh.

## Self-Check: PASSED

- Found summary target file: `.planning/phases/06-corrective-total-ui-refresh/06-01-SUMMARY.md`
- Found task commit `9d11ea4`
- Found task commit `67f01e0`

---
*Phase: 06-corrective-total-ui-refresh*
*Completed: 2026-03-26*
