# Technology Stack

**Project:** BitRemote Website Redesign
**Researched:** 2026-03-22
**Confidence:** MEDIUM-HIGH (core libs verified via npm/official sources; version numbers from WebSearch confirmed against npm registry)

---

## Existing Stack (Do Not Change)

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 15.1.0 | Framework — static export via `output: 'export'` |
| React | 19.0.0 | UI rendering |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 3.4.0 | Utility-first styling |
| Cloudflare Pages | — | Static hosting |

**Hard constraint:** All additions must be compatible with `output: 'export'`. No SSR-only APIs (no `next/image` optimization, no server components calling animations, no stream-based rendering).

---

## Recommended Additions

### Animation Core

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| `motion` | ^12.x (latest 12.38.0) | Scroll-triggered entrance animations, page transitions, micro-interactions | Successor to `framer-motion`. React-first, declarative API, `whileInView` replaces boilerplate IntersectionObserver hooks. Works purely client-side — fully compatible with static export. 30M+ monthly npm downloads; fastest-growing animation library in the ecosystem. |

**Import path:** `import { motion, AnimatePresence } from "motion/react"` (not the old `framer-motion`).

**Bundle optimization — mandatory:** Wrap the app in `LazyMotion` with `domAnimation` features. This cuts the animation payload from ~30KB gzipped to ~15KB. Without this, the full bundle unnecessarily loads gesture and layout animation code that a marketing site does not need.

```tsx
// layout.tsx or _app.tsx
import { LazyMotion, domAnimation } from "motion/react"

export default function RootLayout({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
```

Use `m.div` instead of `motion.div` inside `LazyMotion` to benefit from tree-shaking.

---

### Smooth Scrolling

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| `lenis` | ^1.3.x (latest 1.3.19) | Smooth, inertia-based page scroll | The browser's native scroll is abrupt on marketing-grade pages. Lenis replaces it with a physics-based scroll that makes parallax and scroll-linked animations feel polished. Pairs naturally with Motion's `useScroll`. Works client-side only — compatible with static export via `"use client"`. Previously `@studio-freight/lenis`; now published as `lenis`. |

**Do not use** `react-scroll-parallax` or `simpleParallax.js` separately — Motion + Lenis covers the same ground with less bundle overhead and better React integration.

---

### CSS Animation Utilities

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| `tailwindcss-animate` | ^1.0.x | Tailwind utility classes for CSS-only animations (`animate-in`, `fade-in`, `slide-in-from-*`, `zoom-in`) | Handles simple, stateless animations (modal entrance, tooltip fade) without JavaScript. Used by shadcn/ui — widely battle-tested. Cheaper than JS-powered Motion for animations that don't need scroll-linking or sequencing. |

**Note:** `tw-animate-css` is the Tailwind v4 CSS-first alternative. This project uses Tailwind 3.4, so stick with `tailwindcss-animate` for now.

---

### Optional: GSAP (ScrollTrigger)

| Library | Version | Purpose | Why (and when to add) |
|---------|---------|---------|----------------------|
| `gsap` | ^3.x | Complex sequenced scroll narratives, pinned sections, text split animations | Now fully free including ScrollTrigger and SplitText. More powerful than Motion for Hollywood-style scroll storytelling. **Only add if** a specific section needs sequential multi-element choreography that Motion's declarative API cannot express cleanly. GSAP is framework-agnostic JavaScript — static export compatible. |

**Default recommendation:** Start without GSAP. Motion handles 90% of marketing site animation needs. Add GSAP only when a specific design effect demands it.

---

## Visual Effects — CSS-Only (No Library Required)

These effects are achievable with Tailwind utility classes and custom CSS. No additional library needed.

### Glow Effects

```css
/* Blue glow on interactive elements — matches app's blue accent */
.glow-blue {
  box-shadow: 0 0 20px 4px rgba(59, 130, 246, 0.35);
}

/* Text glow for hero headlines */
.text-glow {
  text-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
}
```

Tailwind arbitrary values: `shadow-[0_0_20px_rgba(59,130,246,0.35)]`

### Glassmorphism / Frosted Cards

Tailwind already has all required utilities:
- `backdrop-blur-md` — frosted glass effect
- `bg-white/10` or `bg-black/20` — semi-transparent fill
- `border border-white/10` — hairline border for glass edge

**Performance warning:** `backdrop-filter` is GPU-accelerated but can cause repaints on browsers with many overlapping blur layers. Limit to 2-3 glass elements visible simultaneously.

### Gradients

```tsx
// Radial glow background — aurora/mesh gradient pattern
className="bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]"
```

These are pure CSS — zero JS cost.

---

## What NOT to Use

| Library | Why Not |
|---------|---------|
| `react-spring` | Older physics-based library. Motion supersedes it with better React 19 compatibility and a cleaner API. |
| `anime.js` | Vanilla JS, not React-native. Requires imperative refs — fights against React's rendering model. Motion is a better fit. |
| `aos` (Animate on Scroll) | jQuery-era library. Adds a global class toggle pattern that clashes with React's component model. Replaced entirely by Motion's `whileInView`. |
| `react-scroll-parallax` | Adds ~22KB for functionality that `motion`'s `useScroll` + `useTransform` covers natively. |
| `three.js` / `@react-three/fiber` | 3D canvas — complete overkill for a marketing site. Huge bundle (~600KB+), significant performance cost on mobile. |
| GSAP + ScrollSmoother | Duplicates Lenis. Pick one scroll smoothing solution. |
| `next/image` with `unoptimized: false` | This project uses static export which requires `unoptimized: true`. Image optimization is not available. Use `<img>` or standard `next/image` with `unoptimized` flag. |
| CSS `position: fixed` parallax via scroll event listeners | Scroll events fire at best-effort intervals, causing jank. Always use CSS `transform` + Lenis + Motion's `useScroll` instead. |

---

## Installation

```bash
# Animation core
npm install motion

# Smooth scrolling
npm install lenis

# CSS animation utilities
npm install -D tailwindcss-animate
```

**tailwind.config.ts addition:**
```ts
import animatePlugin from "tailwindcss-animate"

export default {
  plugins: [animatePlugin],
}
```

---

## Architecture Notes for Static Export

1. **All animation code must be in `"use client"` components.** Motion, Lenis, and scroll hooks use browser APIs (`window`, `IntersectionObserver`, `requestAnimationFrame`) that do not exist during static HTML generation. Server components cannot import these libraries.

2. **Use `dynamic()` imports for heavy animated sections.** If a section contains a large animated component (e.g., a hero with complex scroll choreography), wrap it in `next/dynamic` with `{ ssr: false }` to prevent build-time errors and reduce initial JS parse cost.

3. **Respect `prefers-reduced-motion`.** Both Motion and Lenis have built-in support. In Motion, `useReducedMotion()` returns a boolean; use it to short-circuit animation values. This is also an accessibility requirement.

4. **Animate `transform` and `opacity` only.** Animating `width`, `height`, `top`, `left`, or `margin` triggers layout recalculation on every frame — guaranteed jank at 60fps. Motion's spring animations default to transform-based, but verify custom keyframes follow this rule.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Chosen |
|----------|-------------|-------------|---------------|
| Animation | `motion` | GSAP | GSAP is more powerful but adds complexity for a React-first project. Motion's declarative API is faster to develop with and bundles smaller. |
| Animation | `motion` | `react-spring` | `react-spring` is physics-first and excellent, but Motion has broader feature coverage (layout animations, scroll linking, gestures) and better Next.js community support. |
| Smooth scroll | `lenis` | native scroll | Native scroll is abrupt. Lenis is the community standard for polished scroll experiences; pairs best with Motion. |
| CSS animations | `tailwindcss-animate` | custom `@keyframes` only | Plugin provides the standard animate-in/animate-out pattern used by shadcn/ui, reducing bespoke CSS. Custom keyframes still used for one-off effects. |

---

## Confidence Assessment

| Decision | Confidence | Basis |
|----------|------------|-------|
| `motion` as primary animation library | HIGH | npm: 30M+/month downloads; official docs confirm static export compatibility; actively maintained (v12.38.0 as of research date) |
| `lenis` for smooth scroll | MEDIUM | npm package confirmed active (v1.3.19); integration guides for Next.js 15 confirmed; static export compatibility inferred (client-side only) — not verified against official Lenis docs directly |
| `tailwindcss-animate` | HIGH | Widely adopted via shadcn/ui; Tailwind 3.4 compatible; no runtime cost |
| GSAP optional | MEDIUM | Free licensing confirmed; ScrollTrigger confirmed included; static export compatibility confirmed (vanilla JS); "optional" recommendation is judgment call |
| CSS-only glow/glass effects | HIGH | Standard CSS; Tailwind 3.4 utility classes confirmed; no library dependency |
| Avoid heavy 3D libraries | HIGH | Performance rationale is well-established; no counter-evidence found |

---

## Sources

- [Motion npm package](https://www.npmjs.com/package/motion) — version 12.38.0, 30M+ weekly downloads
- [Motion for React — Getting Started](https://motion.dev/docs/react)
- [LazyMotion — Reduce Bundle Size](https://motion.dev/docs/react-lazy-motion)
- [GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion)
- [GSAP Pricing — Now Free](https://gsap.com/pricing/)
- [lenis npm package](https://www.npmjs.com/package/lenis) — version 1.3.19
- [react-intersection-observer npm](https://www.npmjs.com/package/react-intersection-observer) — v10.0.3
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports)
- [Performant Parallaxing — Chrome Developers](https://developer.chrome.com/blog/performant-parallaxing)
- [Glassmorphism with Tailwind CSS — Epic Web Dev](https://www.epicweb.dev/tips/creating-glassmorphism-effects-with-tailwind-css)
- [tw-animate-css vs tailwindcss-animate](https://github.com/Wombosvideo/tw-animate-css)
