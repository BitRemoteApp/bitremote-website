---
phase: 04-section-assembly
plan: 03
subsystem: ui

tags: [react, tailwind, motion, page-assembly, fade-in, hero, bento-grid, legal-pages]

# Dependency graph
requires:
  - phase: 04-section-assembly
    plan: 01
    provides: HeroSection, SectionLabel, BentoGridClient, BentoCard, PlatformBadgeStrip
  - phase: 04-section-assembly
    plan: 02
    provides: FaqAccordion restyled, TextTabsNav with App Store CTA (NAV-02)
  - phase: 02-motion-and-ui-primitives
    provides: FadeInSection with sectionVariants/staggerContainerVariants/staggerItemVariants

provides:
  - Fully assembled home page with HeroSection, BentoGridClient, SectionLabel, FadeInSection
  - FadeInSection scroll entrance on all content sections (features, quickstart, plus, faq)
  - Mid-page App Store CTA in pricing section (NAV-02 second placement)
  - Legal pages (privacy, terms, support) with FadeInSection wrapping (CONT-03)
  - All locale routes (en, ja, zh-hans, zh-hant) verified in build output (TECH-05)

affects:
  - src/app/[locale]/page.tsx
  - src/app/[locale]/privacy/page.tsx
  - src/app/[locale]/terms/page.tsx
  - src/app/[locale]/support/page.tsx

# Tech stack
tech-stack:
  added: []
  patterns:
    - FadeInSection wrapping pattern for scroll entrance animation on page sections
    - Index-based keys for quickstart steps (avoids duplicates when step titles match across locales)
    - supportedDownloaders kept for JSON-LD schema featureList while visual panel removed from home page

# Key files
key-files:
  created: []
  modified:
    - src/app/[locale]/page.tsx
    - src/app/[locale]/privacy/page.tsx
    - src/app/[locale]/terms/page.tsx
    - src/app/[locale]/support/page.tsx

# Key decisions
decisions:
  - Keep supportedDownloaders import in page.tsx for buildSoftwareApplicationSchema featureList even though the visual downloaders panel was removed
  - Quickstart steps styled as cards with border/bg-surface/rounded-md and index-based keys (avoids React key collisions)
  - FadeInSection wraps HeroSection with as="div" (HeroSection already renders a <section> internally)

# Metrics
metrics:
  duration: "~15 minutes"
  completed: "2026-03-24"
  tasks_completed: 2
  files_modified: 4
---

# Phase 04 Plan 03: Page Assembly and Legal Pages Summary

**One-liner:** Home page assembled with HeroSection, BentoGridClient, and FadeInSection wrapping all content sections; legal pages wrapped in FadeInSection for scroll entrance animation.

## What Was Built

### Task 1: Home page rewired with new section components

Rewrote `src/app/[locale]/page.tsx` to use the section components from Plans 01 and 02:

- **HeroSection** replaces the inline hero markup, wrapped in `<FadeInSection as="div" id="top">` (as="div" because HeroSection already renders a `<section>` internally)
- **BentoGridClient** replaces the simple 2-column grid for the benefits/features section with a stagger-animated 1/2/3 column bento layout
- **SectionLabel** replaces the repeated `<h2 className="...uppercase text-accent">` pattern across all sections
- **FadeInSection** wraps the features, quickstart, plus, and faq sections for scroll entrance animations
- **Downloaders panel removed** from home page (the visual list of supported downloaders was removed; content is on individual landing pages). The `supportedDownloaders` import was kept to feed `buildSoftwareApplicationSchema`'s `featureList`
- **Mid-page App Store CTA** added in plus (pricing) section per NAV-02
- **Quickstart steps** converted from `<section aria-label>` to card divs with `border border-border bg-surface rounded-md p-6`, using index-based keys instead of `key={step.title}` to prevent React key collisions
- **JSON-LD schemas** (softwareApplicationSchema, faqPageSchema) preserved unchanged

### Task 2: Legal pages restyled and full build verified

Added `FadeInSection` wrapping to all three legal pages:
- `privacy/page.tsx` — `<section aria-label>` wrapped in `<FadeInSection as="div">`
- `terms/page.tsx` — `<section aria-label>` wrapped in `<FadeInSection as="div">`
- `support/page.tsx` — `<section aria-label>` wrapped in `<FadeInSection as="div">`, all social links preserved (Discord, Telegram, Twitter, GitHub)

Full build verified with all 4 locale routes and legal pages in `out/`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Missing npm dependencies (motion, lenis packages)**

- **Found during:** Task 1 verification (first build attempt)
- **Issue:** `npm run build` failed with "Cannot find module 'motion/react'" and "Cannot find module 'lenis/react'" — the `node_modules/` directory was missing the packages despite them being in `package.json`
- **Fix:** Ran `npm install` to install all dependencies from `package-lock.json`
- **Files modified:** `node_modules/` (not committed)
- **Commit:** N/A (node_modules not tracked)

## Known Stubs

None — all sections have full data wired from `getMessages(locale)`. No placeholder content, hardcoded empty values, or TODO stubs exist in the modified files.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 1 | 4192996 | feat(04-03): rewire home page with HeroSection, BentoGridClient, FadeInSection |
| 2 | ff052db | feat(04-03): restyle legal pages with FadeInSection wrapping |

## Self-Check: PASSED

- [x] `src/app/[locale]/page.tsx` exists and contains HeroSection, BentoGridClient, FadeInSection, SectionLabel
- [x] `src/app/[locale]/privacy/page.tsx` exists and contains FadeInSection
- [x] `src/app/[locale]/terms/page.tsx` exists and contains FadeInSection
- [x] `src/app/[locale]/support/page.tsx` exists and contains FadeInSection
- [x] Commit 4192996 exists
- [x] Commit ff052db exists
- [x] `out/ja/index.html`, `out/zh-hans/index.html`, `out/zh-hant/index.html` exist (TECH-05)
- [x] `out/en/privacy/index.html`, `out/en/support/index.html`, `out/en/terms/index.html` exist (CONT-03)
- [x] Build exits 0
