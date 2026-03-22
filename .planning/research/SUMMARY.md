# Project Research Summary

**Project:** BitRemote Website Redesign
**Domain:** Native Apple app marketing website (static Next.js, multi-locale)
**Researched:** 2026-03-22
**Confidence:** MEDIUM-HIGH

## Executive Summary

BitRemote's website redesign is a visual overhaul of an existing Next.js 15 static-export site. The existing routing, i18n, SEO, and domain layers are correct and working — they must not be touched. The entire work is confined to replacing the component layer: the current ASCII/monospace aesthetic and text-based panels are replaced with a modern design system (dark theme, glassmorphism cards, bento grid, device mockups, scroll entrance animations) that matches the visual language of exemplary native Apple app marketing sites such as Linear, Things, and Bear.

The recommended approach is to add three new libraries (`motion` for scroll animations, `lenis` for smooth scroll, `tailwindcss-animate` for CSS-only micro-interactions) on top of the existing Tailwind 3.4 stack, then build in strict tier order: design tokens first, motion and UI primitives second, section components third, page assembly last. The single most critical gap in the current site is the absence of app screenshots — this is the highest-priority visual change and the one most likely to improve conversion. A dark theme with blue accent is the correct direction, unlocking glassmorphism, glow effects, and high-contrast CTAs.

The primary risks are performance-related and must be addressed before assets are committed: app screenshots on a static export site are served unoptimized, making a 2–5 MB PNG hero image the most likely cause of LCP failure. Alongside this, all scroll animations must use only `transform` and `opacity` properties (compositor-thread only), must respect `prefers-reduced-motion`, and must not cause hydration mismatches. The i18n layer covering 4 locales is fragile — no component restructuring should touch the data flow or route generation.

## Key Findings

### Recommended Stack

The existing stack (Next.js 15.1, React 19, TypeScript 5.7, Tailwind 3.4, Cloudflare Pages) is locked and appropriate. The hard constraint is `output: 'export'` — every addition must be fully client-side with no SSR-only APIs. Three libraries are recommended additions:

- `motion` (v12.x, formerly `framer-motion`): scroll-triggered entrance animations, `whileInView` with `once: true`, `useScroll`/`useTransform` for parallax. Import as `motion/react`. Wrap app in `LazyMotion + domAnimation` to halve bundle size (~30KB → ~15KB gzipped). Use `m.div` instead of `motion.div` inside `LazyMotion`.
- `lenis` (v1.3.x): physics-based smooth scroll, pairs with Motion's `useScroll`, replaces abrupt native scroll. Client-side only.
- `tailwindcss-animate` (v1.0.x): CSS-only animation utilities for simple stateless transitions (modal fade, tooltip). Zero runtime cost.

GSAP is available and now fully free (ScrollTrigger included) but should be deferred unless a specific section demands sequential multi-element choreography that Motion cannot express. CSS-only glow, glassmorphism, and gradient effects require no library — Tailwind's `backdrop-blur-md`, `bg-white/10`, `shadow-[...]` arbitrary values, and custom CSS radial gradients cover all needed effects.

**Core technologies:**
- `motion` (motion/react): scroll animations and entrance effects — React-first, static-export compatible, LazyMotion reduces bundle cost
- `lenis`: smooth inertia scroll — community standard, pairs naturally with Motion's scroll hooks
- `tailwindcss-animate`: CSS-only animation utilities — zero runtime cost, used by shadcn/ui
- CSS variables + Tailwind semantic aliases: design token system — single override block per theme, no `dark:` class duplication
- `next/image` with `unoptimized: true`: images served as-is — requires pre-optimization of screenshot assets before commit

### Expected Features

The current site has correct structural elements (hero, features, FAQ, footer, CTA, social links, legal) but is missing the visual execution that tech-savvy audiences use to judge app quality. The single largest gap is the complete absence of app screenshots.

**Must have (conversion-critical):**
- App screenshots in device mockups (iPhone/iPad/Mac frames) — current absence is the highest-impact gap vs. reference sites
- Monochromatic + blue design system replacing all ASCII/monospace elements — current monospace font throughout signals an unfinished product
- Bento grid for features section — replaces flat TextFrame grid with visually rich card compositions
- Scroll entrance animations (staggered fade-in on `opacity` + `translateY`) — perceived quality signal for tech audiences
- Inline CTA repetition (top + bottom of page minimum) — current single CTA at top loses conversions on scroll

**Should have (differentiating for tech audience):**
- Ambient glow / radial gradient mesh in hero (one orb, restrained)
- Thin `1px` SVG section dividers replacing ASCII TextSeparator
- Platform badge strip (iOS / iPadOS / macOS icons in a single row)
- Glassmorphism card surfaces (dark theme only — `backdrop-blur-md` + `bg-white/10` + `border-white/10`)

**Defer to follow-on phase:**
- Scroll-linked screenshot reveal (high complexity, high reward — requires device mockups and design system to be established first)
- Social proof pull-quote section (requires real press quotes or curated App Store review text to be sourced)
- Downloader landing page visual redesign (must follow home page completion — design system must be finalized first)

### Architecture Approach

The architecture layers a new design system on top of the unchanged routing structure. Pages (`src/app/`) are edited only to swap in new section components — routing, locale resolution, `generateStaticParams`, `generateMetadata`, and the SEO/i18n/domain layers are untouched. The entire `src/ascii-panel/` directory and existing `src/components/` files are replaced. Component boundaries are strictly enforced: pages import sections only; sections compose ui/ and motion/ primitives; motion/ components have no business logic; ui/ primitives have no animation logic.

**Major components (build order):**
1. Design tokens — CSS variables in `globals.css`, Tailwind semantic aliases in `tailwind.config.ts`; dark mode as `[data-theme="dark"]` override block
2. Motion primitives (`src/components/motion/`) — `FadeIn`, `SlideIn`, `StaggerGroup`/`StaggerItem`, `ParallaxLayer`; all `"use client"`, all animate `opacity` + `transform` only
3. UI primitives (`src/components/ui/`) — `Button` (CVA variants), `Card`, `Badge`, `AppMockup`, `Wordmark`, `FaqAccordion`; stateless, token-driven
4. Section components (`src/components/sections/`) — `NavBar`, `HeroSection`, `FeaturesSection`, `ScreenshotsSection`, `FaqSection`, `CtaSection`, `Footer`; composed from primitives
5. Page assembly — swap section imports in `src/app/[locale]/page.tsx`, `layout.tsx`, and downloader pages; structure unchanged

### Critical Pitfalls

1. **Unoptimized screenshot images (CRITICAL)** — `output: 'export'` disables Next.js image optimization silently. A 3x retina iOS screenshot can be 2–5 MB, causing LCP failure and Core Web Vitals penalties. Use `next-image-export-optimizer` or pre-convert all screenshots to WebP at 2x max before committing. Set `priority` on the hero image. Add explicit `width`/`height` to all images to prevent CLS.

2. **Scroll animation layout reflow (CRITICAL)** — Animating CSS properties other than `opacity` and `transform` triggers layout recalculation on every scroll frame, causing jank on mobile. Never animate `height`, `width`, `top`, `left`, `margin`, or `padding`. Never call `getBoundingClientRect()` inside scroll handlers. Establish this constraint before building any animated component — it cannot be audited retroactively.

3. **Missing `prefers-reduced-motion` support (CRITICAL)** — Scroll animations without reduced-motion fallbacks violate WCAG 2.1 SC 2.3.3. Add a global CSS `@media (prefers-reduced-motion: reduce)` baseline and use Framer Motion's `useReducedMotion()` hook in `ParallaxLayer`. Establish this in the first animation component built.

4. **Hydration mismatches from browser-only animation state (CRITICAL)** — Any animation component that reads `window`, `localStorage`, or theme state during render will cause server/client HTML mismatches, silently degrading the page to client-side rendering and causing FOWC (flash of wrong content). Wrap all browser API reads in `useEffect`. Use CSS `prefers-color-scheme` media queries for initial dark/light screenshot variants, not JavaScript state.

5. **i18n route dropout during component restructuring (MODERATE)** — The existing 4-locale setup uses manual `generateStaticParams()`. Refactoring components without understanding this silently drops locale routes from the static build with no error. Never restructure the i18n data layer and the visual layer in the same PR. After every build, verify `out/ja/`, `out/zh-hans/`, and `out/zh-hant/` contain all expected pages.

## Implications for Roadmap

Based on the architecture's strict tier dependency order and the pitfall sequencing requirements, the suggested phase structure is:

### Phase 1: Design Foundation

**Rationale:** Every other tier depends on design tokens. Colors, typography, radius, and shadow must be locked before any component is built — retrofitting tokens into finished components is extremely expensive. The dark theme decision and the background color choice (`#0A0A0A`, not `#000000`) must be made here. CJK typography defaults must be set globally before any layout component is built.
**Delivers:** `globals.css` with CSS variable token system, `tailwind.config.ts` semantic aliases, typography scale, global resets, `[data-theme="dark"]` override block
**Addresses:** Design system replacing ASCII/monospace aesthetic; dark background color (Pitfall 8)
**Avoids:** Pitfall 8 (halation from pure black), Pitfall 9 (CJK text overflow from fixed layouts)

### Phase 2: Animation and UI Primitives

**Rationale:** Motion primitives and UI primitives are independent of each other but both depend on Tier 1 tokens. They must be complete before section components can be built. This is the phase where the `transform`/`opacity`-only animation rule and the `prefers-reduced-motion` pattern must be established — these cannot be retrofitted.
**Delivers:** `FadeIn`, `SlideIn`, `StaggerGroup`, `ParallaxLayer` motion components; `Button`, `Card`, `Badge`, `AppMockup`, `Wordmark`, `FaqAccordion` UI components
**Uses:** `motion` (LazyMotion + domAnimation), `tailwindcss-animate`, design tokens from Phase 1
**Implements:** Architecture Tiers 2 and 3
**Avoids:** Pitfall 2 (layout reflow), Pitfall 3 (missing reduced-motion), Pitfall 4 (hydration mismatches), Pitfall 6 (over-promoting GPU layers)

### Phase 3: Screenshot Asset Preparation

**Rationale:** App screenshots are the highest-impact missing element and must be prepared before the hero section is built. Pre-optimization must happen before assets are committed to the repository — not after. This phase is explicitly sequenced before section assembly to prevent the unoptimized image pitfall from being discovered late.
**Delivers:** WebP-converted, 2x-max app screenshots (iPhone, iPad, Mac); explicit dimensions documented; device mockup frames sourced or built; `AppMockup` component validated
**Addresses:** Must-have feature (screenshots in device mockups — highest-impact gap)
**Avoids:** Pitfall 1 (unoptimized images, LCP failure), Pitfall 7 (CLS from images without reserved space)

### Phase 4: Section Components and Page Assembly

**Rationale:** With tokens, primitives, motion wrappers, and screenshot assets all ready, section components can be built without risk of rework. Sections are built in page-order (NavBar, Hero, Features, Screenshots, FAQ, CTA, Footer) then assembled into pages. The i18n validation check must run after every build to detect locale route dropout.
**Delivers:** All section components; updated `layout.tsx` and `page.tsx`; fully redesigned home page; preserved downloader landing page structure
**Implements:** Architecture Tiers 4 and 5; all must-have features from FEATURES.md
**Avoids:** Pitfall 5 (i18n route dropout), Pitfall 9 (CJK layout testing during development, not after)

### Phase 5: Visual Polish and Differentiators

**Rationale:** Glow effects, glassmorphism, gradient mesh, platform badges, and thin dividers are deferred to a dedicated polish phase because they do not affect conversion directly and carry GPU performance risk on low-end hardware. This phase also covers the responsive audit and hover micro-interactions.
**Delivers:** Ambient glow / gradient mesh in hero, glassmorphism card surfaces, thin SVG section dividers, platform badge strip, hover micro-interactions, responsive breakpoint audit
**Uses:** CSS-only effects (no additional library); `tailwindcss-animate` for micro-interactions
**Addresses:** Should-have differentiating features from FEATURES.md
**Avoids:** Pitfall 12 (blur effects on low-end hardware — test on throttled GPU before finalizing)

### Phase 6: Deferred Features (Follow-on)

**Rationale:** Scroll-linked screenshot reveal requires both design system and screenshot assets to be finalized. Social proof requires real content to be sourced. Downloader landing page redesign must follow the home page. These are high-value but have pre-requisites that cannot be shortcut.
**Delivers:** Scroll-linked screenshot reveal animation, social proof pull-quote section, visual redesign of downloader landing pages
**Addresses:** Deferred features from FEATURES.md

### Phase Ordering Rationale

- Phases 1 → 2 → 4 follow strict architectural dependency order (tokens → primitives → sections → pages)
- Phase 3 is inserted before section assembly because screenshot assets are a pre-requisite for the hero section and their performance implications must be resolved before committing assets
- Phase 5 is separated from section assembly to avoid scope creep during the core build and to ensure GPU performance testing happens on finished layouts
- i18n route validation is embedded in Phase 4 rather than a separate phase — it is a check, not work
- The most dangerous pitfalls (image optimization, animation reflow, reduced-motion, hydration) are all addressed in Phases 1–3, before any user-visible component is shipped

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Screenshot Assets):** Device mockup sourcing (CSS-only vs. pre-rendered PNG frames), `next-image-export-optimizer` integration, and optimal screenshot dimensions for retina displays need specific validation against the project's actual image assets
- **Phase 6 (Scroll-Linked Reveal):** CSS scroll-driven animations vs. Motion `useScroll` + `useTransform` trade-offs for the specific screenshot reveal effect need evaluation once Phase 4 is complete

Phases with standard patterns (skip research-phase):
- **Phase 1 (Design Tokens):** CSS variable + Tailwind semantic alias pattern is well-documented; token values are fully specified in ARCHITECTURE.md
- **Phase 2 (Primitives):** Animation component implementations are fully specified in ARCHITECTURE.md with working code; UI primitives follow shadcn/ui patterns
- **Phase 4 (Section Assembly):** Component compositions are fully mapped in ARCHITECTURE.md; no novel patterns required
- **Phase 5 (Visual Polish):** All CSS effects are documented in STACK.md with exact utility classes

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core libraries verified via npm registry; version numbers confirmed; static export compatibility verified against official Next.js docs |
| Features | MEDIUM | Pattern analysis of exemplary sites (Linear, Things, Bear); WebFetch was restricted, direct scraping not possible; existing site inspected at HIGH confidence via source code |
| Architecture | HIGH | Component hierarchy and token system verified against Tailwind docs, Motion docs, and CVA docs; code implementations provided and verified |
| Pitfalls | HIGH | Verified against official Next.js docs, MDN, W3C, WCAG; multi-source corroboration for all critical pitfalls |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Screenshot asset specifics:** The exact screenshots, dimensions, and device frame approach are not defined in research — this requires a design decision from the team before Phase 3 can begin. The research establishes the technical requirements (WebP, 2x max, explicit dimensions) but not the content.
- **Social proof content:** Whether usable App Store reviews or press mentions exist is unknown — this determines whether Phase 6's social proof section is feasible. Needs content audit.
- **`lenis` static export compatibility:** Confirmed client-side only and inferred compatible with static export, but not verified against official Lenis docs directly. Low risk — confirm during Phase 2 implementation.
- **Dark vs. light theme default:** Research recommends dark as the premium default, but the final decision is a product/brand call. This affects glassmorphism and glow feature feasibility (both require dark backgrounds).

## Sources

### Primary (HIGH confidence)
- [Motion npm package](https://www.npmjs.com/package/motion) — v12.38.0, 30M+ weekly downloads; static export compatibility
- [Motion for React docs](https://motion.dev/docs/react) — whileInView, LazyMotion, useScroll, useTransform patterns
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) — output: 'export' constraints
- [Tailwind CSS dark mode docs](https://tailwindcss.com/docs/dark-mode) — CSS variable token pattern
- [WCAG 2.1 SC 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) — prefers-reduced-motion requirement
- [web.dev CLS optimization](https://web.dev/articles/optimize-cls) — image sizing and animation CLS rules
- [App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — badge usage
- [CSS Scroll-Driven Animations — Smashing Magazine](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/) — scroll animation patterns
- Direct code inspection of `src/app/[locale]/page.tsx` — existing site structure

### Secondary (MEDIUM confidence)
- [lenis npm package](https://www.npmjs.com/package/lenis) — v1.3.19; Next.js 15 integration guides
- [GSAP Pricing — Now Free](https://gsap.com/pricing/) — ScrollTrigger and SplitText inclusion
- [The Linear Look — Frontend Horse](https://frontend.horse/articles/the-linear-look/) — bento grid, thin dividers, monochromatic patterns
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) — static export image optimization
- [Design tokens with Tailwind dark mode](https://www.richinfante.com/2024/10/21/tailwind-dark-mode-design-tokens-themes-css) — CSS variable alias pattern

### Tertiary (LOW confidence)
- [SaaS Landing Page Trends 2026 — SaaSFrame](https://www.saasframe.io/blog/blog/10-saas-landing-page-trends-for-2026-with-real-examples) — differentiating feature patterns
- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/) — layout conventions
- [Social proof landing page examples](https://wisernotify.com/blog/landing-page-social-proof/) — pull-quote patterns (single source)

---
*Research completed: 2026-03-22*
*Ready for roadmap: yes*
