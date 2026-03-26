---
phase: 03-screenshot-assets
plan: "01"
subsystem: components/screenshot-pipeline
tags: [screenshot, webp, device-frame, animation, dark-mode, picture-element]
dependency_graph:
  requires:
    - "02-motion-and-ui-primitives (FadeInSection + stagger variants)"
  provides:
    - "screenshot optimization pipeline (scripts/optimize-screenshots.mjs)"
    - "IPhoneFrame server component (CSS-only device mockup)"
    - "AppScreenshot server component (picture element dark/light switching)"
    - "AppShowcaseClient client component (stagger animation wrapper)"
    - "AppShowcase server component (assembles frames and screenshots)"
  affects:
    - "src/app/[locale]/page.tsx (showcase section inserted between hero and features)"
tech_stack:
  added: []
  patterns:
    - "HTML picture element with prefers-color-scheme media query for CSS-native dark/light image switching"
    - "Pure Tailwind CSS iPhone device frame using surface-alt and shadow-raise design tokens"
    - "Server component + client wrapper split: IPhoneFrame/AppScreenshot/AppShowcase are server, AppShowcaseClient is client"
    - "staggerContainerVariants + staggerItemVariants from FadeInSection for scroll-triggered stagger animation"
key_files:
  created:
    - scripts/optimize-screenshots.mjs
    - src/components/AppScreenshot.tsx
    - src/components/IPhoneFrame.tsx
    - src/components/AppShowcase.tsx
    - src/components/AppShowcaseClient.tsx
  modified:
    - src/app/[locale]/page.tsx
    - .gitignore
decisions:
  - "Used raw <picture> element instead of next/image — next/image does not support picture + prefers-color-scheme source switching"
  - "split AppShowcase (server) from AppShowcaseClient (client) — motion.div requires use client but IPhoneFrame/AppScreenshot are pure HTML/CSS and benefit from server rendering"
  - "screenshots-source/ gitignored at project root — only WebP output in public/screenshots/ committed to prevent raw PNG repo bloat"
  - "AppShowcaseClient inserted after first hr in page.tsx with a second hr separator to maintain consistent visual rhythm between sections"
metrics:
  duration: "2 minutes"
  completed_date: "2026-03-22"
  tasks_completed: 2
  files_changed: 7
---

# Phase 03 Plan 01: Screenshot Asset Pipeline and Showcase Components Summary

**One-liner:** Sharp-based PNG to WebP optimization pipeline (1x + 2x retina) with pure-Tailwind iPhone frame, CSS-native dark/light picture element switching, and stagger-animated showcase section wired into the home page.

---

## What Was Built

### Task 1: Screenshot Optimization Script and Directory Infrastructure

- `scripts/optimize-screenshots.mjs` — Node.js script using `sharp` (already installed as Next.js 15 transitive dep at 0.34.5) to batch-convert source PNGs to 1x WebP (390px) and 2x WebP (780px) per theme
- `screenshots-source/light/` and `screenshots-source/dark/` directories created at project root
- `.gitignore` updated with `screenshots-source/` rule to prevent raw PNG files from entering git history

**Commit:** `72877f5`

### Task 2: Showcase Components and Home Page Integration

Four new React components:

1. `src/components/AppScreenshot.tsx` — Server component. Renders a `<picture>` element with `<source media="(prefers-color-scheme: dark)">` for CSS-native theme-based image switching. No JavaScript. Includes `loading="lazy"` and `decoding="async"`.

2. `src/components/IPhoneFrame.tsx` — Server component. Pure Tailwind CSS iPhone device frame (290px × 628px, iPhone 15 proportions at ~0.74x). Uses `border-surface-alt`, `bg-surface-alt`, and `shadow-raise` design tokens so the frame auto-adapts to dark/light theme. All decorative elements carry `aria-hidden="true"`.

3. `src/components/AppShowcase.tsx` — Server component. Assembles `IPhoneFrame` + `AppScreenshot` for a `SCREENSHOTS` data array. Starts with one screenshot (`iphone-home`); extensible by adding to the array.

4. `src/components/AppShowcaseClient.tsx` — Client component (`'use client'`). Wraps the showcase section in `FadeInSection` for scroll entrance animation. Uses `staggerContainerVariants` + `staggerItemVariants` from `FadeInSection.tsx` for staggered device frame appearance. Respects `prefers-reduced-motion` via `useReducedMotion()` hook — sets `initial="visible"` to completely skip animations.

`src/app/[locale]/page.tsx` updated to import and render `<AppShowcaseClient />` after the hero `<hr>` separator, with a second `<hr>` after it before the features section.

**Commit:** `3793821`

---

## Verification

- `npm run lint` — PASS (zero warnings)
- `npm run build` — PASS (static export builds clean)
- All 4 new component files exist in `src/components/`
- `AppShowcaseClient` present in `src/app/[locale]/page.tsx`
- No `next/image` used for screenshots (raw `<picture>` element)
- No `'use client'` on `AppScreenshot.tsx`, `IPhoneFrame.tsx`, or `AppShowcase.tsx`

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Known Stubs

**`SCREENSHOTS` array in `AppShowcase.tsx` and `AppShowcaseClient.tsx`:**
- File: `src/components/AppShowcase.tsx` and `src/components/AppShowcaseClient.tsx`
- Current value: One placeholder entry `{ slug: 'iphone-home', ... }` pointing to `public/screenshots/light/iphone-home.webp` and `public/screenshots/dark/iphone-home.webp`
- These WebP files do not yet exist — they will be generated by `scripts/optimize-screenshots.mjs` once the user provides source PNG screenshots
- Reason: The showcase component architecture is complete and correct; the actual image assets require the user to capture iOS Simulator screenshots and run the optimization script. The component renders the correct HTML structure and will display images as soon as files exist at those paths.
- Resolution: Phase 03 Plan 02 (or user action) — user captures screenshots, places PNGs in `screenshots-source/light/` and `screenshots-source/dark/`, runs `node scripts/optimize-screenshots.mjs`, then commits the WebP output.

The stub does NOT prevent the plan's goal from being achieved — the pipeline and component architecture are complete. The absence of actual image files causes broken `<img>` elements in the browser until screenshots are provided, which is expected and acceptable at this stage.
