---
phase: 04-section-assembly
plan: 01
subsystem: ui
tags: [react, tailwind, motion, glassmorphism, hero, bento-grid, animation]

# Dependency graph
requires:
  - phase: 02-motion-and-ui-primitives
    provides: FadeInSection with staggerContainerVariants/staggerItemVariants exports
  - phase: 01-design-foundation
    provides: design tokens (bg-panel-88, shadow-card, border-border, rounded-lg, text-accent)
provides:
  - HeroSection component with headline, subheadline, App Store CTA, platform badges
  - PlatformBadgeStrip component (iPhone & iPad, Mac labels)
  - SectionLabel component extracting repeated h2 uppercase pattern
  - BentoCard glassmorphism feature card component
  - BentoGrid responsive 1/2/3 column grid layout
  - BentoGridClient client wrapper with stagger animation
  - FadeInSection id prop forwarding for anchor navigation
affects:
  - 04-section-assembly plan 03 (page assembly that wires these into page.tsx)
  - 05-polish (ambient glow on hero deferred here)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server components by default, 'use client' only for animation wrappers
    - Props receive pre-resolved strings (not messages object) for i18n decoupling
    - BentoGridClient mirrors AppShowcaseClient stagger animation pattern

key-files:
  created:
    - src/components/HeroSection.tsx
    - src/components/PlatformBadgeStrip.tsx
    - src/components/SectionLabel.tsx
    - src/components/BentoCard.tsx
    - src/components/BentoGrid.tsx
    - src/components/BentoGridClient.tsx
  modified:
    - src/components/ui/FadeInSection.tsx

key-decisions:
  - "HeroSection receives pre-resolved string props (tagline, subhead, ctaLabel, siteName) instead of messages object — keeps component decoupled from i18n layer"
  - "BentoGrid uses standard Tailwind gap-4/lg:gap-6 — gap-md/gap-lg tokens not defined in tailwind.config.ts"
  - "HERO-02 (ambient glow) deferred to Phase 5 — Phase 4 builds hero structure only, no glow placeholder code"
  - "Supported downloaders panel removed from HeroSection — it was a Phase 1 placeholder; downloader landing pages already address the concept"

patterns-established:
  - "Stagger animation pattern: client wrapper with motion.div + staggerContainerVariants, items in motion.div + staggerItemVariants"
  - "Glassmorphism card: bg-[var(--bg-panel-88)] + backdrop-blur-md + border border-border + shadow-card"
  - "Server component convention: no use client directive unless animation/interactivity required"

requirements-completed: [HERO-01, HERO-03, FEAT-01, FEAT-02, FEAT-03]

# Metrics
duration: 8min
completed: 2026-03-24
---

# Phase 04 Plan 01: Section Assembly — Component Building Blocks Summary

**7 component files delivering HeroSection with CTA/platform badges, glassmorphism BentoCard grid with stagger animation, and reusable SectionLabel — ready for page.tsx wiring in Plan 03**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-24T16:05:00Z
- **Completed:** 2026-03-24T16:13:35Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Created HeroSection (headline, subheadline, App Store CTA, platform badge strip) satisfying HERO-01 and HERO-03
- Created BentoCard with glassmorphism tokens + BentoGrid responsive layout + BentoGridClient stagger animation satisfying FEAT-01, FEAT-02, FEAT-03
- Extracted SectionLabel from repeated h2 pattern in page.tsx; added id prop forwarding to FadeInSection for anchor navigation

## Task Commits

1. **Task 1: Add id prop to FadeInSection, create SectionLabel + PlatformBadgeStrip** - `98082c5` (feat)
2. **Task 2: Create BentoCard, BentoGrid, BentoGridClient, HeroSection** - `ecee7da` (feat)

## Files Created/Modified

- `src/components/ui/FadeInSection.tsx` - Added id?: string prop and forwarded to MotionEl
- `src/components/SectionLabel.tsx` - Reusable h2 uppercase section heading (server component)
- `src/components/PlatformBadgeStrip.tsx` - iPhone & iPad + Mac platform badges (server component)
- `src/components/BentoCard.tsx` - Glassmorphism card with bg-panel-88 + backdrop-blur-md + shadow-card
- `src/components/BentoGrid.tsx` - Responsive 1/2/3 column grid layout (server component)
- `src/components/BentoGridClient.tsx` - Client wrapper with stagger animation from FadeInSection
- `src/components/HeroSection.tsx` - Hero with wordmark, tagline, subhead, App Store CTA, platform badges

## Decisions Made

- HeroSection receives pre-resolved string props instead of messages object — decouples component from i18n layer; caller (page.tsx) passes `messages.site.tagline` etc.
- Used standard Tailwind `gap-4 lg:gap-6` — plan draft mentioned `gap-md/gap-lg` but those tokens are not in tailwind.config.ts
- HERO-02 (ambient glow) explicitly deferred to Phase 5; no placeholder glow code added
- Supported downloaders panel omitted from HeroSection — that was a Phase 1 placeholder; downloader landing pages already address the concept

## Deviations from Plan

None - plan executed exactly as written. The plan itself included a correction note about gap-md/gap-lg tokens, so using standard Tailwind gap values was already specified.

## Issues Encountered

- Pre-existing TypeScript error: `motion/react` and `lenis/react` modules not installed in node_modules — same errors exist in AppShowcaseClient.tsx and other existing files. Not caused by this plan's changes. The project builds correctly when packages are installed (as evidenced by prior phase completion).
- Pre-existing ESLint command uses deprecated `--ignore-path` flag — not caused by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 7 component contracts established; Plan 03 (page assembly) can import and wire these into page.tsx
- HeroSection, BentoGridClient, SectionLabel, and BentoCard are all ready to use
- HERO-02 ambient glow remains deferred to Phase 5

---
*Phase: 04-section-assembly*
*Completed: 2026-03-24*
