---
phase: 06-corrective-total-ui-refresh
plan: 03
subsystem: homepage
tags: [nextjs, react, tailwind, localization, product-proof, downloader-landing, phase-6]
requires:
  - phase: 06-corrective-total-ui-refresh
    provides: corrected nav and homepage structure from 06-02
provides:
  - Interactive product-proof section with localized stateful content
  - Prominent Supported Downloaders trust section wired to canonical downloader data
  - Normalized homepage and downloader-landing surfaces aligned with the corrective design language
affects: [homepage, downloader-landings, localization, phase-06]
tech-stack:
  added: []
  patterns: [localized-proof-tabs, downloader-trust-grid, calm-surface-normalization]
key-files:
  created: []
  modified:
    - src/app/[locale]/page.tsx
    - src/components/AppShowcaseClient.tsx
    - src/components/HeroSection.tsx
    - src/components/BentoCard.tsx
    - src/components/DownloaderLandingPage.tsx
    - src/messages/en.json
    - src/messages/ja.json
    - src/messages/zh-hans.json
    - src/messages/zh-hant.json
key-decisions:
  - "Replaced the screenshot-led section with a tabbed proof surface that explains queue control, queue review, and transfer monitoring through restrained app-like states."
  - "Moved proof copy and downloader-trust copy into all locale files so the new homepage content remains fully localized rather than falling back to English literals."
patterns-established:
  - "Homepage trust content uses canonical supportedDownloaders data with direct links to downloader landing pages."
  - "Downloader landing pages now share the same calm surface language as the homepage instead of divider-heavy retro framing."
requirements-completed: [CONT-06, CONT-07, BRAND-01, DSGN-08]
duration: 25min
completed: 2026-03-26
---

# Phase 6 Plan 3: Product proof and downloader trust Summary

**The homepage now proves the product through an interactive, app-like preview and restores Supported Downloaders as first-class trust content near the top of the page.**

## Performance

- **Duration:** 25 min
- **Started:** 2026-03-25T17:27:00Z
- **Completed:** 2026-03-25T17:52:50Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Replaced the old single-screenshot showcase with a tabbed proof section that communicates queue control, queue review, and transfer monitoring with explicit selected and helper states.
- Restored a prominent Supported Downloaders section that is powered by `supportedDownloaders` and links directly to the existing downloader landing pages.
- Localized the new proof and downloader-trust copy across English, Japanese, Simplified Chinese, and Traditional Chinese.
- Normalized benefit cards and downloader landing-page surfaces so the wider site reads as one calm, product-first system.

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace screenshot-led proof with an app-like demo section** - `0ceb2b4` (feat)
2. **Task 2: Restore Supported Downloaders and normalize remaining homepage content sections** - `f861098` (feat)

## Files Created/Modified
- `src/components/AppShowcaseClient.tsx` - Added the new tabbed proof surface with helper and fallback states.
- `src/app/[locale]/page.tsx` - Wired localized proof content and the restored Supported Downloaders section into the final homepage order.
- `src/components/HeroSection.tsx` - Tightened hero composition so it pairs cleanly with the new proof block.
- `src/components/BentoCard.tsx` - Updated feature cards to the calmer Phase 6 surface treatment.
- `src/components/DownloaderLandingPage.tsx` - Removed divider-heavy retro framing in favor of matched product surfaces.
- `src/messages/en.json` - Added proof and downloader-trust copy.
- `src/messages/ja.json` - Added proof and downloader-trust copy.
- `src/messages/zh-hans.json` - Added proof and downloader-trust copy.
- `src/messages/zh-hant.json` - Added proof and downloader-trust copy.

## Decisions Made
- Kept screenshots as supporting proof inside the new demo instead of letting them define the homepage structure.
- Used localized proof tab data from message files so the new interaction remains coherent across locales and mobile layouts.

## Deviations from Plan

None. The only orchestration deviation was finishing Task 2 inline after the executor stalled during patch application.

## Issues Encountered

- The delegated executor stalled during the second task after a patch-context mismatch in `src/app/[locale]/page.tsx`. The task was completed inline without changing scope.

## User Setup Required

None.

## Next Phase Readiness

- Phase 6 is ready for final regression checks and human visual approval.
- Lint and static export build both pass with the new proof section, downloader trust content, and localized copy in place.

## Self-Check: PASSED

- Found task commit `0ceb2b4`
- Found task commit `f861098`
- Verified homepage `id="downloaders"` still uses `supportedDownloaders`
- Verified lint and build pass on the completed Wave 2 state

---
*Phase: 06-corrective-total-ui-refresh*
*Completed: 2026-03-26*
