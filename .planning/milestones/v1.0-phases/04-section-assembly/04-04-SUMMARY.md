---
phase: 04-section-assembly
plan: 04
subsystem: verification

tags: [visual-verification, anchor-scroll, lenis, nav-offset]

requires:
  - phase: 04-section-assembly
    plan: 03
    provides: Fully assembled page with all sections

provides:
  - Visual verification sign-off from user
  - Anchor scroll fix: nav offset applied via Lenis scrollTo with AnchorScrollHandler
  - FadeInSection translateY compensation for long-distance scroll accuracy
  - 16px breathing room below sticky nav on anchor scroll

affects:
  - src/components/providers/LenisProvider.tsx
---

## What happened

User performed visual verification of the assembled page. Anchor navigation to Features and Quickstart sections was hidden behind the sticky nav.

## Issues found and fixed

### Anchor scroll offset (blocking)

**Problem:** Clicking nav links (Features, Quickstart) scrolled the target section behind the sticky nav. Lenis's built-in `anchors: true` doesn't support nav-height offset, and it ignores both CSS `scroll-padding-top` and `scroll-margin-top`.

**Root cause:** Lenis calculates scroll target via `element.getBoundingClientRect().top + animatedScroll` without accounting for sticky elements.

**Solution:** Added `AnchorScrollHandler` component inside `<ReactLenis>`:
- Disabled Lenis `anchors` (set to `false`)
- Document-level click listener intercepts same-page hash links
- Calls `lenis.scrollTo(target, { offset })` with nav height + 16px breathing room
- Compensates for FadeInSection's `translateY(24px)` transform on offscreen sections to prevent overshoot on long-distance scrolls

**Files changed:** `src/components/providers/LenisProvider.tsx`

## Verification result

User approved the assembled page across desktop viewport with anchor navigation working correctly.
