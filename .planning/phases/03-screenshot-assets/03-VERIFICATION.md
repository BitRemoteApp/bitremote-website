---
phase: 03-screenshot-assets
verified: 2026-03-24T00:00:00Z
status: human_needed
score: 8/8 must-haves verified
human_verification:
  - test: "Screenshot dark/light switching in browser"
    expected: "Toggling OS dark mode via DevTools (Rendering > Emulate CSS media: prefers-color-scheme: dark) switches the screenshot from light to dark variant without page reload or JS flash"
    why_human: "CSS media query behavior in a live browser cannot be verified by static file analysis"
  - test: "Scroll entrance animation plays"
    expected: "AppShowcaseClient fades/staggers in when the showcase section scrolls into view on http://localhost:3000/en/"
    why_human: "Scroll-triggered motion.div animation requires a live browser to observe"
  - test: "Reduced-motion preference disables animation"
    expected: "With DevTools Emulate prefers-reduced-motion: reduce, reloading the page shows the showcase section immediately visible with no animation"
    why_human: "useReducedMotion hook behavior requires live browser rendering to confirm"
  - test: "iPhone device frame visual appearance"
    expected: "Device frame has rounded corners, a notch, volume buttons, and power button; screenshot fills the screen area cleanly at all viewport widths down to 375px"
    why_human: "Visual correctness of CSS-only device mockup requires human inspection"
---

# Phase 03: Screenshot Assets Verification Report

**Phase Goal:** App screenshots are captured, optimized to WebP, sized for retina displays, and validated against the AppMockup component before any section that displays them is built
**Verified:** 2026-03-24T00:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Optimization script converts source PNGs to 1x and 2x WebP in public/screenshots/ | VERIFIED | `scripts/optimize-screenshots.mjs` exists; uses `sharp`, `TARGET_1X_WIDTH = 390`, `@2x.webp` output path, `{ recursive: true }` mkdir |
| 2 | Showcase section renders device-framed screenshots inside the locale home page | VERIFIED | `AppShowcaseClient` imported and rendered at line 132 of `src/app/[locale]/page.tsx` |
| 3 | Dark OS theme selects dark screenshots and light OS theme selects light screenshots via HTML picture element — no JavaScript | VERIFIED | `AppScreenshot.tsx` uses `<source media="(prefers-color-scheme: dark)">` with srcSet pointing to `/screenshots/dark/`; no `'use client'` directive |
| 4 | Screenshots animate into view on scroll using FadeInSection stagger variants | VERIFIED (code) | `AppShowcaseClient.tsx` imports and uses `staggerContainerVariants` + `staggerItemVariants`; wrapped in `FadeInSection`; `useReducedMotion` guard present — requires human to confirm live behavior |
| 5 | Source PNG directory is gitignored to prevent repo bloat | VERIFIED | `.gitignore` line 17: `screenshots-source/` |
| 6 | WebP files exist in public/screenshots/ at both 1x and 2x for light and dark | VERIFIED | All 4 files present: `light/iphone-home.webp` (12708 bytes), `light/iphone-home@2x.webp` (27418 bytes), `dark/iphone-home.webp` (12708 bytes), `dark/iphone-home@2x.webp` (27418 bytes) |
| 7 | Each 1x WebP is under 100KB performance budget | VERIFIED | light 1x: 12,708 bytes; dark 1x: 12,708 bytes — both well under 102,400 byte limit |
| 8 | WebP files are sized at correct retina dimensions (1x = 390px, 2x = 780px wide) | VERIFIED | Sharp metadata confirms: 1x = 390px wide, 2x = 780px wide |

**Score:** 8/8 truths verified (automated); 4 items also require human confirmation (visual/interactive behavior)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/optimize-screenshots.mjs` | Sharp-based PNG to WebP conversion script | VERIFIED | Contains `sharp`, `WEBP_QUALITY = 85`, `TARGET_1X_WIDTH = 390`, `@2x.webp`, `{ recursive: true }` |
| `src/components/AppScreenshot.tsx` | Picture element with dark/light source switching | VERIFIED | Contains `prefers-color-scheme`, `loading="lazy"`, `decoding="async"`, `@2x.webp 2x`; no `'use client'` |
| `src/components/IPhoneFrame.tsx` | Pure Tailwind CSS iPhone device frame | VERIFIED | Contains `border-surface-alt`, `shadow-raise`, `rounded-[2.5rem]`, `h-[628px]`, `w-[290px]`, `aria-hidden="true"` on decoratives; no `'use client'` |
| `src/components/AppShowcase.tsx` | Server component assembling frames and screenshots | VERIFIED | Contains `IPhoneFrame` and `AppScreenshot`; no `'use client'` |
| `src/components/AppShowcaseClient.tsx` | Client component with stagger animation wrapper | VERIFIED | `'use client'` on line 1; contains `staggerContainerVariants`, `staggerItemVariants`, `useReducedMotion` |
| `src/app/[locale]/page.tsx` | Home page with showcase section wired in | VERIFIED | Imports `AppShowcaseClient` at line 3; renders `<AppShowcaseClient />` at line 132 |
| `public/screenshots/light/iphone-home.webp` | 1x light mode WebP screenshot | VERIFIED | Exists, 12,708 bytes, 390px wide |
| `public/screenshots/light/iphone-home@2x.webp` | 2x light mode WebP screenshot | VERIFIED | Exists, 27,418 bytes, 780px wide |
| `public/screenshots/dark/iphone-home.webp` | 1x dark mode WebP screenshot | VERIFIED | Exists, 12,708 bytes, 390px wide |
| `public/screenshots/dark/iphone-home@2x.webp` | 2x dark mode WebP screenshot | VERIFIED | Exists, 27,418 bytes, 780px wide |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `AppShowcaseClient.tsx` | `ui/FadeInSection.tsx` | imports `staggerContainerVariants` and `staggerItemVariants` | WIRED | Line 5: import confirmed; lines 23, 29: both variants used in JSX |
| `AppScreenshot.tsx` | `public/screenshots/` | srcSet paths in picture element | WIRED | Dark srcSet: `/screenshots/dark/${slug}.webp 1x, /screenshots/dark/${slug}@2x.webp 2x`; slug `iphone-home` matches files on disk |
| `src/app/[locale]/page.tsx` | `AppShowcaseClient.tsx` | import and render in JSX | WIRED | Import at line 3; `<AppShowcaseClient />` rendered at line 132 |
| `public/screenshots/` | `AppScreenshot.tsx` | srcSet slug `iphone-home` matches filenames on disk | WIRED | `iphone-home.webp` and `iphone-home@2x.webp` present in both light/ and dark/ |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| SHOW-01 | 03-01, 03-02 | Dedicated showcase section below hero displays app screenshots in device mockups | SATISFIED | `AppShowcaseClient` inserted in `page.tsx` after hero hr; `IPhoneFrame` wraps each screenshot |
| SHOW-02 | 03-01, 03-02 | Screenshots shown in realistic device frames (iPhone and/or Mac) | SATISFIED | `IPhoneFrame.tsx` renders 290×628px frame with notch, volume buttons, power button via pure Tailwind CSS |
| SHOW-03 | 03-01, 03-02 | Dark theme shows dark-mode screenshots, light theme shows light-mode screenshots | SATISFIED | `AppScreenshot.tsx` uses `<source media="(prefers-color-scheme: dark)">` — zero JavaScript; visual behavior requires human confirmation |
| SHOW-04 | 03-01, 03-02 | Screenshots animate into view on scroll | SATISFIED (code) | `AppShowcaseClient.tsx` uses `FadeInSection` + `staggerContainerVariants` + `staggerItemVariants` with `whileInView`; visual behavior requires human confirmation |
| TECH-03 | 03-01, 03-02 | App screenshots pre-optimized to WebP before added to project | SATISFIED | `scripts/optimize-screenshots.mjs` converts PNG to 1x/2x WebP at quality 85; 4 WebP files committed; 1x files at 12,708 bytes (well under 100KB budget) |

No orphaned requirements — all 5 IDs declared in both plan frontmatter files, all 5 listed in REQUIREMENTS.md as Phase 3 / Complete.

---

### Anti-Patterns Found

No blockers or warnings found.

Scanned: `scripts/optimize-screenshots.mjs`, `src/components/AppScreenshot.tsx`, `src/components/IPhoneFrame.tsx`, `src/components/AppShowcase.tsx`, `src/components/AppShowcaseClient.tsx`, `src/app/[locale]/page.tsx`

- No TODO / FIXME / placeholder comments
- No empty return values or stub implementations
- No `next/image` used (correct — plan intentionally uses raw `<picture>` element for `prefers-color-scheme` source switching, which `next/image` does not support)
- `SCREENSHOTS` array in both `AppShowcase.tsx` and `AppShowcaseClient.tsx` contains slug `iphone-home` which matches actual WebP files on disk — not a stub

---

### Human Verification Required

#### 1. Dark/Light Screenshot Switching

**Test:** Start dev server (`npm run dev`), open `http://localhost:3000/en/`, open DevTools > Rendering > Emulate CSS media: `prefers-color-scheme: dark`
**Expected:** The screenshot inside the iPhone frame switches to the dark variant with no page reload and no JavaScript flash; toggling back to light restores the light screenshot
**Why human:** CSS `prefers-color-scheme` media query behavior in a `<picture>` element requires a live browser environment to observe

#### 2. Scroll Entrance Animation

**Test:** Open `http://localhost:3000/en/`, scroll down past the hero section
**Expected:** The showcase section (device frame + screenshot) fades/staggers into view as it enters the viewport
**Why human:** `motion.div` with `whileInView` requires live browser rendering; viewport intersection cannot be verified statically

#### 3. Reduced-Motion Preference

**Test:** Open DevTools > Rendering > Emulate CSS media: `prefers-reduced-motion: reduce`, then reload `http://localhost:3000/en/` and scroll to the showcase section
**Expected:** The showcase section appears immediately with no animation
**Why human:** `useReducedMotion` hook from `motion/react` requires live React rendering to confirm the `initial="visible"` path is taken correctly

#### 4. iPhone Device Frame Visual Appearance

**Test:** View `http://localhost:3000/en/` at 375px viewport width and full desktop width
**Expected:** Device frame renders with visible rounded corners, notch, volume buttons, and power button; screenshot fills the screen area cleanly; frame is centered and not clipped on mobile
**Why human:** Visual CSS correctness of a purely decorative component requires human inspection

---

### Gaps Summary

No gaps. All automated checks pass across all must-haves from both plan frontmatter definitions. The 4 items flagged for human verification are interactive/visual behaviors that cannot be confirmed by static file analysis — they are not blockers to proceeding, but should be spot-checked before shipping Phase 4 content that depends on this section.

---

## Commit Verification

All documented commits verified present in git history:
- `72877f5` — feat(03-01): add screenshot optimization script and source directory infrastructure
- `3793821` — feat(03-01): build showcase components and wire into home page
- `d1ccb6e` — feat(03-02): add optimized WebP screenshots for showcase section

---

_Verified: 2026-03-24T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
