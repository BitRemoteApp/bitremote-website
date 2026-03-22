---
phase: 02-motion-and-ui-primitives
plan: 02
subsystem: ui
tags: [motion, lenis, smooth-scroll, animation, providers, next.js, react]

# Dependency graph
requires:
  - phase: 02-01
    provides: LenisProvider.tsx, MotionProvider.tsx, FadeInSection.tsx components created

provides:
  - Root layout wired with MotionProvider > LenisProvider providers
  - lenis/dist/lenis.css imported in server root layout
  - scroll-behavior: smooth removed from globals.css (Lenis owns scroll)
  - Every page on the site automatically gets smooth scroll and reduced-motion support

affects: [03-hero-section, 04-features-section, all future page sections using FadeInSection]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Root layout provider composition: server layout imports client providers as JSX wrappers around server-rendered children"
    - "MotionProvider outer, LenisProvider inner — motion must be ancestor of all motion.* elements"
    - "lenis CSS imported in server layout not in client component"

key-files:
  created: []
  modified:
    - src/app/layout.tsx
    - src/app/globals.css

key-decisions:
  - "MotionProvider wraps LenisProvider (MotionConfig must be ancestor of all motion.* elements)"
  - "lenis/dist/lenis.css imported before globals.css so globals can override if needed"
  - "scroll-behavior: smooth removed from globals.css — Lenis owns scroll behavior; CSS property redundant and unsafe for reduced-motion users who skip Lenis"

patterns-established:
  - "Pattern 1: Server layout wraps children with client providers — no 'use client' on layout.tsx"
  - "Pattern 2: Provider nesting order — MotionProvider > LenisProvider > children"

requirements-completed: [TECH-01, TECH-02]

# Metrics
duration: 4min
completed: 2026-03-22
---

# Phase 02 Plan 02: Wire Animation Providers into Root Layout Summary

**MotionProvider and LenisProvider mounted in root layout — every page now has smooth scroll (Lenis inertia) and automatic reduced-motion support (MotionConfig) with zero per-page configuration**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-22T16:28:01Z
- **Completed:** 2026-03-22T16:32:00Z
- **Tasks:** 1 of 2 (Task 2 is human-verify checkpoint)
- **Files modified:** 2

## Accomplishments
- Imported `LenisProvider`, `MotionProvider`, and `lenis/dist/lenis.css` into `src/app/layout.tsx`
- Wrapped `{children}` with `MotionProvider > LenisProvider` in the body element
- Removed `scroll-behavior: smooth` from `globals.css` html block (Lenis now owns scroll)
- `npm run build` and `npm run lint` both pass with zero errors and zero warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire providers into root layout and remove scroll-behavior CSS** - `5f0f6d9` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `src/app/layout.tsx` - Added provider imports, lenis CSS import, MotionProvider > LenisProvider body wrapper
- `src/app/globals.css` - Removed `scroll-behavior: smooth` from html rule block; kept `scroll-padding-top: 5.25rem`

## Decisions Made
- `lenis/dist/lenis.css` imported before `./globals.css` so globals.css can override Lenis styles if needed — matches research Pitfall 4 guidance
- `MotionProvider` is the outer wrapper, `LenisProvider` is inner — MotionConfig must be ancestor of all motion.* elements while Lenis is independent

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Animation infrastructure is live on all pages
- `FadeInSection`, `sectionVariants`, `staggerContainerVariants`, `staggerItemVariants` ready for import by Phase 3-4 section components
- Phase 3 (hero section) can begin immediately after Task 2 browser verification is approved
- Blocker: Screenshot content (exact screenshots, device frame approach, dimensions) still undefined — noted in STATE.md before Phase 3 planning

---
*Phase: 02-motion-and-ui-primitives*
*Completed: 2026-03-22*
