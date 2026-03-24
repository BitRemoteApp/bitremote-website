# Roadmap: BitRemote Website Redesign

## Overview

The redesign replaces the current ASCII/monospace aesthetic with a modern design system that matches the BitRemote native app. Work proceeds in strict dependency order: design tokens first, motion and UI primitives second, screenshot assets third, section components and page assembly fourth, and visual polish differentiators last. The result is a marketing site that looks and feels like it belongs to the same product as the app.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design Foundation** - Establish the design token system, typography, color palette, and dark theme that all other components depend on
- [ ] **Phase 2: Motion and UI Primitives** - Build reusable animation and UI components with GPU-safe constraints baked in from day one
- [ ] **Phase 3: Screenshot Assets** - Prepare, optimize, and validate app screenshot assets before any section that displays them is built
- [ ] **Phase 4: Section Assembly** - Build all section components and assemble the full page using tokens, primitives, and optimized assets
- [ ] **Phase 5: Visual Polish** - Add differentiating effects (SVG dividers, glassmorphism, ambient glow, platform badges) and audit responsive behavior

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
**Plans**: TBD

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
**Plans**: TBD

### Phase 3: Screenshot Assets
**Goal**: App screenshots are captured, optimized to WebP, sized for retina displays, and validated against the AppMockup component before any section that displays them is built
**Depends on**: Phase 2
**Requirements**: SHOW-01, SHOW-02, SHOW-03, SHOW-04, TECH-03
**Success Criteria** (what must be TRUE):
  1. A dedicated showcase section exists on the page and displays app screenshots inside realistic device frames (iPhone and/or Mac)
  2. All screenshot images are WebP format and under the performance budget — page LCP is not caused by an unoptimized image asset
  3. Visiting the site in dark OS theme shows dark-mode app screenshots; light OS theme shows light-mode screenshots — no JavaScript state drives this on initial load
  4. Screenshots animate into view as the visitor scrolls to the showcase section
**Plans**: TBD

### Phase 4: Section Assembly
**Goal**: All sections are built and the home page is fully assembled — visitors experience a complete, content-correct redesigned marketing page with all existing localized content preserved
**Depends on**: Phase 3
**Requirements**: HERO-01, HERO-02, HERO-03, FEAT-01, FEAT-02, FEAT-03, NAV-01, NAV-02, NAV-03, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, TECH-05
**Success Criteria** (what must be TRUE):
  1. The hero section displays a compelling headline, subheadline, prominent App Store download button, and platform badge strip (iOS, iPadOS, macOS) above the fold
  2. The features section uses a bento grid layout with glassmorphism-styled cards that communicate what the app does and why it matters
  3. A sticky navigation bar is present with section anchor links and an App Store download button; a second CTA appears mid-page or bottom — visitors never scroll past a CTA
  4. Navigation collapses to a mobile-appropriate layout on small screens without breaking usability
  5. Visiting /ja/, /zh-hans/, and /zh-hant/ routes produces complete, correctly localized pages — no locale routes are missing from the static build output
**Plans**: TBD

### Phase 5: Visual Polish
**Goal**: Differentiating visual effects are added and responsive behavior is audited — the site looks premium and works correctly across all screen sizes
**Depends on**: Phase 4
**Requirements**: VFX-03
**Success Criteria** (what must be TRUE):
  1. Section boundaries are separated by thin, elegant SVG lines — no ASCII separator patterns remain as dividers
  2. The hero section has an ambient blue-tinted glow effect that adapts correctly between dark and light themes without visual artifacts
  3. The site renders correctly and looks intentional on mobile (375px), tablet (768px), and desktop (1280px+) screen widths
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Foundation | 0/? | Not started | - |
| 2. Motion and UI Primitives | 0/? | Not started | - |
| 3. Screenshot Assets | 0/? | Not started | - |
| 4. Section Assembly | 0/? | Not started | - |
| 5. Visual Polish | 0/? | Not started | - |
