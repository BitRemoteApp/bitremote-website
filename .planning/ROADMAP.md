# Roadmap: BitRemote Website Redesign

## Overview

The redesign replaces the current ASCII/monospace aesthetic with a modern design system that matches the BitRemote native app. Work proceeds in strict dependency order: design tokens first, motion and UI primitives second, screenshot assets third, section components and page assembly fourth, and visual polish differentiators last. The result is a marketing site that looks and feels like it belongs to the same product as the app.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Design Foundation** - Establish the design token system, typography, color palette, and dark theme that all other components depend on (completed 2026-03-22)
- [x] **Phase 2: Motion and UI Primitives** - Build reusable animation and UI components with GPU-safe constraints baked in from day one (completed 2026-03-22)
- [x] **Phase 3: Screenshot Assets** - Prepare, optimize, and validate app screenshot assets before any section that displays them is built (completed 2026-03-23)
- [x] **Phase 4: Section Assembly** - Build all section components and assemble the full page using tokens, primitives, and optimized assets
- [x] **Phase 5: Visual Polish** - Add differentiating effects (SVG dividers, glassmorphism, ambient glow, platform badges) and audit responsive behavior
- [ ] **Phase 6: Corrective total UI refresh** - Correct the redesign drift by redoing the site as a true UI refresh: establish Impeccable design context first, remove remaining ASCII/terminal language, restore critical homepage content, and realign the site with the calm, professional BitRemote app aesthetic

## Phase Details

### Phase 1: Design Foundation
**Goal**: The design system is established — tokens, palette, typography, and dark theme are in place and ready for all downstream components to consume
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06
**Success Criteria** (what must be TRUE):
  1. The site renders in dark and light themes automatically based on the visitor's OS preference, with no flash of wrong content on load
  2. All text across the site uses a modern sans-serif font — no monospace type remains anywhere on the page
  3. The color palette uses only near-black, white, gray, and blue across all themed surfaces — no other hues appear
  4. Dark backgrounds use near-black (not pure #000), visually distinguishable from pure black on any display
  5. No ASCII art separators (░ patterns), terminal borders, or monospace decorative elements exist anywhere in the codebase or rendered page
**Plans:** 3/3 plans complete
Plans:
- [x] 01-01-PLAN.md — Token system and Tailwind config (globals.css + tailwind.config.ts)
- [x] 01-02-PLAN.md — Font and color class migration across all surviving component/page files
- [x] 01-03-PLAN.md — ASCII/terminal component deletion, import site cleanup, dead code removal

### Phase 2: Motion and UI Primitives
**Goal**: All reusable animation and UI building blocks exist and enforce correct constraints — transform/opacity-only animations, reduced-motion support, and hydration safety are baked in before any section is built
**Depends on**: Phase 1
**Requirements**: VFX-01, VFX-02, VFX-04, VFX-05, TECH-01, TECH-02, TECH-04
**Success Criteria** (what must be TRUE):
  1. Scroll entrance animations play correctly on all section components and use only opacity and transform — no layout properties are animated
  2. Smooth scroll (lenis) is active and page navigation feels physically weighted rather than abrupt
  3. All animations are completely absent (not just skipped) for visitors with prefers-reduced-motion enabled
  4. The site produces no React hydration mismatch warnings — theme and animation state are handled without reading browser APIs during server render
  5. The site remains a Next.js static export deployable to Cloudflare Pages with no SSR-only dependencies introduced
**Plans:** 2/2 plans complete
Plans:
- [x] 02-01-PLAN.md — Install motion + lenis, create LenisProvider, MotionProvider, and FadeInSection components
- [x] 02-02-PLAN.md — Wire providers into root layout, remove scroll-behavior CSS, browser verification

### Phase 3: Screenshot Assets
**Goal**: App screenshots are captured, optimized to WebP, sized for retina displays, and validated against the AppMockup component before any section that displays them is built
**Depends on**: Phase 2
**Requirements**: SHOW-01, SHOW-02, SHOW-03, SHOW-04, TECH-03
**Success Criteria** (what must be TRUE):
  1. A dedicated showcase section exists on the page and displays app screenshots inside realistic device frames (iPhone and/or Mac)
  2. All screenshot images are WebP format and under the performance budget — page LCP is not caused by an unoptimized image asset
  3. Visiting the site in dark OS theme shows dark-mode app screenshots; light OS theme shows light-mode screenshots — no JavaScript state drives this on initial load
  4. Screenshots animate into view as the visitor scrolls to the showcase section
**Plans:** 2/2 plans complete
Plans:
- [x] 03-01-PLAN.md — Optimization script, showcase components, and page wiring
- [x] 03-02-PLAN.md — Screenshot capture, pipeline execution, and visual verification

### Phase 4: Section Assembly
**Goal**: All sections are built and the home page is fully assembled — visitors experience a complete, content-correct redesigned marketing page with all existing localized content preserved
**Depends on**: Phase 3
**Requirements**: HERO-01, HERO-03, FEAT-01, FEAT-02, FEAT-03, NAV-01, NAV-02, NAV-03, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, TECH-05
**Success Criteria** (what must be TRUE):
  1. The hero section displays a compelling headline, subheadline, prominent App Store download button, and platform badge strip (iOS, iPadOS, macOS) above the fold
  2. The features section uses a bento grid layout with glassmorphism-styled cards that communicate what the app does and why it matters
  3. A sticky navigation bar is present with section anchor links and an App Store download button; a second CTA appears mid-page or bottom — visitors never scroll past a CTA
  4. Navigation collapses to a mobile-appropriate layout on small screens without breaking usability
  5. Visiting /ja/, /zh-hans/, and /zh-hant/ routes produces complete, correctly localized pages — no locale routes are missing from the static build output
**Plans:** 4/4 plans complete
Plans:
- [x] 04-01-PLAN.md — Create section components (HeroSection, BentoGrid, BentoCard, SectionLabel, PlatformBadgeStrip, BentoGridClient)
- [x] 04-02-PLAN.md — Restyle FaqAccordion and add App Store CTA to TextTabsNav
- [x] 04-03-PLAN.md — Assemble home page with new components, restyle legal pages, verify build
- [x] 04-04-PLAN.md — Visual verification checkpoint across viewports, themes, and locales

### Phase 5: Visual Polish
**Goal**: Differentiating visual effects are added and responsive behavior is audited — the site looks premium and works correctly across all screen sizes
**Depends on**: Phase 4
**Requirements**: VFX-03, HERO-02
**Success Criteria** (what must be TRUE):
  1. Section boundaries are separated by thin, elegant SVG lines — no ASCII separator patterns remain as dividers
  2. The hero section has an ambient blue-tinted glow effect that adapts correctly between dark and light themes without visual artifacts
  3. The site renders correctly and looks intentional on mobile (375px), tablet (768px), and desktop (1280px+) screen widths
**Plans:** 2/2 plans complete
Plans:
- [x] 05-01-PLAN.md — Create SvgDivider component and hero ambient glow effect
- [x] 05-02-PLAN.md — Visual verification across viewports, themes, and locales

### Phase 6: Corrective total UI refresh
**Goal**: The redesign is corrected into a true end-to-end UI refresh that fulfills the original brief — the site no longer feels like the old interface with a new skin, and instead presents BitRemote with a calm, professional, native-app-aligned visual language and information architecture
**Depends on**: Phase 5
**Requirements**: DSGN-07, DSGN-08, NAV-04, CONT-06, CONT-07, BRAND-01
**Success Criteria** (what must be TRUE):
  1. Impeccable design context is established before implementation work begins, and Phase 6 design decisions explicitly follow that context rather than ad hoc styling choices
  2. Remaining ASCII/terminal UI language is removed from the primary experience, including bracket-style buttons, the pixelated/glitch wordmark treatment, and hover behavior that reinforces the old retro aesthetic
  3. The homepage information architecture is reworked as needed to support the original refresh brief instead of preserving the old structure under new styling
  4. Supported Downloaders is restored as a prominent homepage section because it is core product trust and capability information
  5. The screenshot-led homepage structure is reevaluated; screenshots must support the story of the page rather than consuming a section without clear product communication value
  6. The final homepage and shared UI feel calm, professional, and aligned with the BitRemote native app rather than playful, retro, or novelty-driven
  7. Existing localized content, downloader landing pages, legal pages, and static export behavior remain intact through the redesign
**Plans:** 2/4 plans complete
Plans:
- [x] 06-01-PLAN.md — Establish Impeccable design context and translate the original brief into explicit design constraints for the corrective redesign
- [x] 06-02-PLAN.md — Redesign homepage information architecture and shared brand, CTA, and navigation language to remove remaining retro UI patterns
- [ ] 06-03-PLAN.md — Restore and redesign critical content sections, including Supported Downloaders and screenshot usage, within the new calm professional layout
- [ ] 06-04-PLAN.md — Verify the corrective redesign across locales, responsive breakpoints, and the original brief requirements

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Foundation | 3/3 | Complete   | 2026-03-22 |
| 2. Motion and UI Primitives | 2/2 | Complete   | 2026-03-22 |
| 3. Screenshot Assets | 2/2 | Complete   | 2026-03-23 |
| 4. Section Assembly | 4/4 | Complete   | 2026-03-25 |
| 5. Visual Polish | 2/2 | Complete   | 2026-03-26 |
| 6. Corrective total UI refresh | 0/4 | Planned | — |
