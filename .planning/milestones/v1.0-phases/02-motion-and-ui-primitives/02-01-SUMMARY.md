---
phase: 02-motion-and-ui-primitives
plan: 01
subsystem: ui
tags: [motion, lenis, animation, framer-motion, smooth-scroll, reduced-motion, react]

# Dependency graph
requires: []
provides:
  - LenisProvider: hydration-safe smooth scroll wrapper using lenis/react ReactLenis
  - MotionProvider: global reduced-motion config via MotionConfig reducedMotion="user"
  - FadeInSection: scroll-triggered entrance animation wrapper with whileInView + variants
  - sectionVariants: opacity/y animation variants for FadeInSection
  - staggerContainerVariants: stagger wrapper variants for per-child animated grids
  - staggerItemVariants: per-child animation variants for stagger grids
affects:
  - 02-02 (root layout integration of LenisProvider + MotionProvider)
  - phase 3 (HeroSection will use FadeInSection)
  - phase 4 (feature grids will use staggerContainerVariants + staggerItemVariants)

# Tech tracking
tech-stack:
  added:
    - motion 12.x (npm) — scroll entrance animations, MotionConfig, useReducedMotion
    - lenis 1.3.x (npm) — smooth scroll with inertia via ReactLenis
  patterns:
    - Client provider shell wrapping server-rendered children (TECH-04 compliance)
    - Hydration-safe state: useState(true) default for Lenis, switches in useEffect
    - Reduced-motion: FadeInSection starts at 'visible' state when shouldReduceMotion is truthy
    - Easing typed as Easing from motion/react to satisfy TypeScript variance

key-files:
  created:
    - src/components/providers/LenisProvider.tsx
    - src/components/providers/MotionProvider.tsx
    - src/components/ui/FadeInSection.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Typed easing constant as Easing from motion/react rather than inline tuple — resolves TypeScript number[] vs Easing variance error"
  - "LenisProvider defaults skipLenis=true to avoid any hydration mismatch (server renders no Lenis, client enables after matchMedia check)"
  - "FadeInSection exports sectionVariants, staggerContainerVariants, staggerItemVariants as named exports for Phase 4 client stagger components"

patterns-established:
  - "Pattern: animation provider components in src/components/providers/ — thin 'use client' wrappers, no UI output"
  - "Pattern: reusable animation primitives in src/components/ui/ — FadeInSection as zero-margin wrapper, spacing controlled by consumer"
  - "Pattern: Easing type import from motion/react for all bezier ease arrays"

requirements-completed: [VFX-01, VFX-02, VFX-04, VFX-05, TECH-04]

# Metrics
duration: 8min
completed: 2026-03-23
---

# Phase 2 Plan 01: Motion and UI Primitives Summary

**motion 12.x + lenis 1.3.x installed; LenisProvider (hydration-safe), MotionProvider (reducedMotion="user"), and FadeInSection (whileInView with reduced-motion fallback) created as reusable animation primitives**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-23T00:00:00Z
- **Completed:** 2026-03-23
- **Tasks:** 2 of 2
- **Files modified:** 5

## Accomplishments

- Installed motion 12.x and lenis 1.3.x as runtime dependencies
- Created LenisProvider with hydration-safe skipLenis=true default, matchMedia change listener, and clean conditional ReactLenis mounting
- Created MotionProvider wrapping all children in MotionConfig with reducedMotion="user" for global reduced-motion policy
- Created FadeInSection with three exported variant sets (section, staggerContainer, staggerItem), useReducedMotion hook, whileInView trigger, and viewport once:true/amount:0.08

## Task Commits

Each task was committed atomically:

1. **Task 1: Install motion and lenis, create provider components** - `35882c8` (feat)
2. **Task 2: Create FadeInSection with exported animation variants** - `7b03501` (feat)

## Files Created/Modified

- `package.json` — added motion and lenis runtime dependencies
- `package-lock.json` — lockfile updated
- `src/components/providers/LenisProvider.tsx` — hydration-safe Lenis smooth scroll wrapper with reduced-motion awareness
- `src/components/providers/MotionProvider.tsx` — MotionConfig wrapper propagating reducedMotion="user"
- `src/components/ui/FadeInSection.tsx` — scroll-triggered entrance animation with three exported variant objects

## Decisions Made

- Typed the bezier ease array as `const easeOutQuart: Easing` using the `Easing` type from `motion/react`. This resolves a TypeScript error where `number[]` was not assignable to the `Easing` union type that motion's variant transition expects.
- Retained the `skipLenis=true` default from the plan (Pitfall 3 pattern) for maximum hydration safety — no Lenis on server, enabled on client after confirming no reduced-motion preference.
- Exported all three variant sets (`sectionVariants`, `staggerContainerVariants`, `staggerItemVariants`) as named exports from FadeInSection.tsx so Phase 4 client section components can import them for per-child stagger without redefining the animation values.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript type error on ease bezier array**
- **Found during:** Task 2 (FadeInSection component)
- **Issue:** TypeScript rejected `ease: [0.25, 0.46, 0.45, 0.94]` as `number[]` is not assignable to motion's `Easing` type
- **Fix:** Imported `Easing` type from `motion/react` and declared `const easeOutQuart: Easing = [0.25, 0.46, 0.45, 0.94]`; both variant objects reference this constant
- **Files modified:** `src/components/ui/FadeInSection.tsx`
- **Verification:** `npm run build` passes with zero TypeScript errors; `npm run lint` passes with zero warnings
- **Committed in:** `7b03501` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - TypeScript type bug)
**Impact on plan:** Essential for build correctness. No scope creep — animation values and behavior unchanged; only the type annotation was added.

## Issues Encountered

None beyond the TypeScript ease type error documented above.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- LenisProvider, MotionProvider, and FadeInSection are complete and verified — ready for 02-02 (root layout integration)
- The lenis CSS import (`lenis/dist/lenis.css`) must be added in `src/app/layout.tsx` (server layout) — this is addressed in plan 02-02
- Phase 3 HeroSection can import and wrap content with `<FadeInSection>` immediately
- Phase 4 animated feature grids can import `staggerContainerVariants` and `staggerItemVariants` from FadeInSection.tsx
- Blocker from STATE.md still applies: screenshot content (device frames, exact screenshots, dimensions) not yet defined — Phase 3 planning requires this decision before execution

---
*Phase: 02-motion-and-ui-primitives*
*Completed: 2026-03-23*
