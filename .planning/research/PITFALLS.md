# Domain Pitfalls

**Domain:** Static Next.js marketing site redesign with scroll animations, dark theme, app screenshots, and multi-locale support
**Researched:** 2026-03-22
**Overall confidence:** HIGH (verified against official Next.js docs, MDN, W3C, and multi-source corroboration)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken deployments, or severe accessibility violations.

---

### Pitfall 1: Image Optimization Is Silently Disabled on Static Export

**What goes wrong:** The project already has `images: { unoptimized: true }` in `next.config.ts` because Cloudflare Pages cannot run the Next.js Image Optimization API. Developers adding app screenshots forget this constraint and expect `next/image` to handle WebP conversion, lazy loading, and responsive `srcset` automatically. It does not — images are served as-is at original size. A 3x retina iOS screenshot can easily be 2-5 MB.

**Why it happens:** The `next/image` component's API looks identical whether optimization is enabled or not. No build warning fires. Images load fine in development. The problem only surfaces in Lighthouse audits or slow connections after deploy.

**Consequences:**
- Hero section loads several megabytes of PNG before any content becomes interactive
- LCP (Largest Contentful Paint) degrades dramatically — the screenshot IS the hero
- Mobile users on 4G face multi-second blank screens
- Core Web Vitals fail, which affects SEO ranking

**Prevention:**
- Use `next-image-export-optimizer` (npm package) as a post-build step — it generates optimized WebP/AVIF variants and correct `srcset` for static exports without a server
- Alternatively, pre-optimize screenshots manually: export at 2x max (not 3x), convert to WebP before import, and add `width`/`height` props explicitly to avoid layout shift
- Set `priority` prop on the above-the-fold hero screenshot
- Add a Lighthouse budget CI check to catch regressions

**Detection:**
- Run `next build` and inspect the `out/` directory — images are raw copies of source files
- Lighthouse audit with throttled mobile profile: LCP > 4s is a red flag
- Chrome DevTools Network panel: any image request > 500 KB in the hero is a problem

**Phase:** Address in the visual redesign phase, before any screenshot assets are committed.

---

### Pitfall 2: Scroll Animations Triggering Layout Reflow

**What goes wrong:** Scroll-triggered animations implemented with `scroll` event listeners (or animation libraries configured to read DOM geometry on scroll) force synchronous style recalculation on every scroll tick. This blocks the main thread and causes jank on mobile, especially with multiple animated sections.

**Why it happens:** Animating properties like `top`, `left`, `height`, `margin`, or `padding` forces layout recalculation (reflow). Reading `getBoundingClientRect()` inside a scroll listener forces the browser to flush pending styles before responding — a pattern called layout thrashing. On a marketing page with 6-8 animated sections, this compounds.

**Consequences:**
- Frame rate drops below 60fps on mid-range Android devices
- iOS Safari jank during fast scroll, causing users to miss animated content entirely
- Battery drain on mobile from continuous GPU/CPU churn

**Prevention:**
- Use IntersectionObserver exclusively for triggering animations — it fires asynchronously off the main thread
- Animate only `transform` and `opacity` — these are composited by the GPU and do not trigger reflow
- With Framer Motion: use `whileInView` with `viewport={{ once: true }}` to fire once on entry, not on every re-enter
- With Tailwind: define keyframe animations using `translate-*` and `opacity-*`, never `top`/`left`/`height`
- Never call `getBoundingClientRect()` inside a scroll handler

**Detection:**
- Chrome DevTools Performance panel: look for long "Recalculate Style" and "Layout" tasks on scroll
- "Rendering" tab with "Paint flashing" enabled: excessive green flashing indicates over-painting
- FPS meter dropping below 55fps during scroll = problem

**Phase:** Architecture decision in animation phase — establish the pattern before building individual sections.

---

### Pitfall 3: Ignoring `prefers-reduced-motion` Accessibility Requirement

**What goes wrong:** Scroll animations, parallax effects, glowing elements, and smooth transitions are implemented without respecting the OS-level "Reduce Motion" setting. This causes nausea, dizziness, or cognitive overwhelm for users with vestibular disorders, ADHD, or motion sensitivities.

**Why it happens:** Developers test on their own machine where reduced motion is not enabled. Framer Motion and GSAP animate by default — they require explicit opt-out. Marketing sites prioritize visual impact over accessibility, and the failure is invisible during review.

**Consequences:**
- WCAG 2.1 Success Criterion 2.3.3 violation (Animation from Interactions)
- Legal exposure in jurisdictions with accessibility laws
- Users with disabilities cannot use the site
- Parallax and auto-playing decorative animations are the highest-risk elements

**Prevention:**
- Add a global CSS rule as a baseline safety net:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- With Framer Motion: use the `useReducedMotion()` hook to conditionally disable animations
- Separate "motion is informational" from "motion is decorative" — only the former needs a static alternative; the latter can simply be hidden
- Any animation that auto-plays for more than 5 seconds must have a pause mechanism even for users without reduced motion enabled (WCAG 2.2.2)

**Detection:**
- Enable "Reduce Motion" in macOS/iOS system settings and verify every animated section
- Use axe DevTools browser extension to flag animation violations
- Manually check: does content still fully display without any animation?

**Phase:** Establish the reduced-motion pattern in the first animation implementation. It cannot be retrofitted across a finished site without touching every component.

---

### Pitfall 4: Hydration Mismatches from Browser-Only Animation State

**What goes wrong:** Animation libraries that read `window`, `document`, or browser APIs (viewport size, scroll position, theme from `localStorage`) during render cause server/client HTML mismatches with Next.js SSG. This triggers React hydration errors in production, which silently fall back to client-side rendering and break SSG performance benefits.

**Why it happens:** Next.js pre-renders pages to static HTML at build time. If an animation component checks `window.innerWidth` to decide its initial state, the server renders with `undefined` (different state) and the client renders the real width — React detects the mismatch and throws.

**Specific risk for this project:** Dark theme implementation using `next-themes` or custom theme detection reads from `localStorage` on the client. Any component whose initial render differs between server and client (based on theme) will hydrate incorrectly. This is especially dangerous for screenshot display — if dark/light mode screenshots are shown conditionally, the SSG HTML will not match.

**Consequences:**
- Hydration errors logged in production
- Entire page falls back to client-side rendering, losing SSG performance
- Flash of wrong content (FOWC) on initial paint — screenshot shows wrong variant
- In Next.js 15 + React 19, hydration errors can be stricter and harder to suppress

**Prevention:**
- Wrap any browser-only animation initializations in `useEffect` — they will only run on the client after hydration
- For dark/light screenshot variants: use CSS media queries (`prefers-color-scheme`) rather than JavaScript state to switch images — no JS needed, no hydration risk
- For theme state: use `suppressHydrationWarning` only on the `<html>` element (the officially sanctioned location per next-themes docs), not throughout the component tree
- Avoid `if (typeof window !== 'undefined')` inside render — use `useEffect` instead

**Detection:**
- Open browser console in production build: any "Hydration failed" error is this pitfall
- Test with JavaScript disabled: the page should render correctly with static content visible
- Run `next build && next start` locally and inspect hydration errors before deploying

**Phase:** High priority in any phase that introduces dark theme or animation state — must be validated before shipping.

---

## Moderate Pitfalls

---

### Pitfall 5: Breaking i18n Routes During Component Restructuring

**What goes wrong:** During a visual redesign, components are extracted, renamed, or merged. The locale-aware routing structure (`/[locale]/page.tsx`, `generateStaticParams()`) breaks silently when a developer refactors without understanding that every new page or layout must explicitly participate in static locale generation.

**Why it happens:** The project uses a manual i18n approach (compatible with `output: 'export'` — Next.js App Router's built-in i18n routing uses middleware, which does not work with static export). This means `generateStaticParams()` must be present and correct in every dynamic route file. Forgetting it during a refactor causes the locale to be excluded from the static build.

**Specific risk:** The existing `getDownloaderLandingContent()` function in `downloader-landings.ts` is 557 lines of hardcoded content across 4 locales. During redesign, any changes to how this data is consumed (restructuring the DownloaderLandingPage component) risks silently dropping one locale's content — no build error fires, the page just renders empty for that locale.

**Consequences:**
- Japanese or Chinese locale pages return 404 after deploy
- Downloader-specific landing pages missing for some locale combinations
- SEO impact: indexed pages return 404, losing ranking
- Not detected in development because dev server handles routes dynamically

**Prevention:**
- Add a build-time validation script that asserts all `locale × route` combinations produce output files in `out/`
- Run `next build` and verify the `out/` directory contains all expected locale paths before every deploy
- Do not restructure the i18n data layer and the visual layer in the same PR — separate concerns
- The `CONCERNS.md` already recommends adding Zod validation for downloader landing content — implement this before the redesign to catch missing content early

**Detection:**
- After `next build`, run: `ls out/ja/ out/zh-hans/ out/zh-hant/` and verify all expected pages exist
- Review `generateStaticParams()` in any modified route file after refactoring

**Phase:** Must be addressed before any component restructuring in the redesign phase.

---

### Pitfall 6: Over-Promoting GPU Layers with `will-change`

**What goes wrong:** Developers add `will-change: transform` (Tailwind: `will-change-transform`) to every animated element anticipating better performance. Instead, this forces the browser to allocate a separate GPU compositing layer for each element, consuming memory and paradoxically causing performance degradation on low-memory mobile devices.

**Why it happens:** The Tailwind docs include `will-change` as a utility, making it easy to apply. Performance improvement is visible on developer's high-end machine. On a 2GB RAM phone, the extra layers cause frame drops.

**Consequences:**
- Memory pressure on mobile causing scroll jank
- Can cause blurry text on non-retina screens when elements are promoted to their own layer
- No runtime error — requires profiling to discover

**Prevention:**
- Apply `will-change` only immediately before an animation starts and remove it afterward (use JS, not static CSS classes)
- Prefer `transform-gpu` (Tailwind) only for elements that are frequently animated and on screen simultaneously
- For scroll-reveal animations that fire once: no `will-change` needed — IntersectionObserver + CSS class toggle is sufficient
- Use Chrome DevTools Layers panel to verify layer count stays reasonable (< 20 layers for a marketing page)

**Detection:**
- Chrome DevTools > Rendering > Layer borders: excessive yellow borders indicate over-promotion
- Memory panel: high compositor memory usage on a simulated low-end mobile device

**Phase:** Animation implementation phase — establish the rule before building individual components.

---

### Pitfall 7: CLS from Animated Elements Without Reserved Space

**What goes wrong:** Scroll-reveal animations that start elements at `opacity: 0` with a vertical translate (e.g., `translateY(20px)`) cause layout shifts if the element's space is not reserved in the DOM before animation begins. This is particularly acute for app screenshot images — if the image loads after the surrounding text, the text shifts down.

**Why it happens:** The initial state of the animation (`opacity: 0; transform: translateY(20px)`) visually hides the element, but if the element is also removed from layout flow (using `display: none` or conditional rendering), layout shifts occur when it enters. Additionally, images without explicit `width`/`height` attributes cause CLS on load.

**Consequences:**
- Poor Core Web Vitals CLS score (target is < 0.1)
- Text jumps as images load, creating a poor first impression
- Google penalizes high CLS in page ranking

**Prevention:**
- Always animate with `opacity` and `transform` only — these do not affect layout flow
- Never use `visibility: hidden` → `visible` or `display: none` → `block` as animation states
- All `<Image>` components (or `<img>` tags) must have explicit `width` and `height` attributes, or use `fill` with a sized container
- For hero screenshots: set `priority` prop and explicit dimensions determined at build time

**Detection:**
- Chrome DevTools Performance panel: look for "Layout Shift" events in the timeline
- WebPageTest CLS filmstrip view reveals which element is causing the shift
- Lighthouse CLS score > 0.1 is a flag

**Phase:** Visual redesign phase — establish image sizing conventions before building the hero section.

---

### Pitfall 8: Dark Theme with Pure Black Backgrounds Causing Halation

**What goes wrong:** The team chooses `#000000` as the background color for the dark theme because it looks premium in mockups and performs well on OLED. In practice, pure black backgrounds create a "halation" effect — a glowing halo around light text — that affects users with astigmatism (approximately 1 in 3 people). The high contrast also causes eye strain during extended reading.

**Why it happens:** Mockup tools render on calibrated designer monitors. Marketing sites are reviewed in short sessions. The problem is only noticed by users spending more than a few seconds reading content.

**Consequences:**
- Reduced readability for a significant portion of the target audience
- Tech-savvy users (the target audience) are more likely to use OLED phones where this is most visible
- The "premium" aesthetic goal backfires — the site feels harsh rather than polished

**Prevention:**
- Use `#0A0A0A` or `#111111` as the base dark background, not `#000000`
- Use `#E8E8E8` or `#F0F0F0` for body text, not `#FFFFFF`
- Reserve pure `#000000` only for the absolute outermost shell if the OLED battery argument is being made
- Check color contrast ratios: minimum 4.5:1 for body text, 3:1 for large headings (WCAG AA)
- App screenshots (which have their own dark UI) will visually blend better against a dark gray than pure black

**Detection:**
- Test on a physical OLED iPhone in a dim room — halation is immediately visible
- Use contrast ratio checker tools (WebAIM Contrast Checker) on every text/background combination
- Apply the Tailwind CSS color scale: `gray-950` (`#030712`) or `gray-900` (`#111827`) are safe starting points

**Phase:** Design token definition — must be decided before any component is built, not retrofitted.

---

### Pitfall 9: Text Expansion Breaking Japanese and Chinese Layouts

**What goes wrong:** UI components are laid out with English text length in mind. Japanese and Chinese text is often denser (fewer characters for the same meaning) but English UI strings frequently have no Chinese equivalent available — so translators add descriptive context, making strings longer. Card layouts with fixed heights or truncated text clip translated content.

**Why it happens:** Designers and developers test with English copy. The i18n message files exist and work, but layout testing with ja/zh-hans/zh-hant content is skipped during development.

**Specific risk for this project:** The current site has 4 locales hardcoded in a 557-line data file. The redesign will introduce card-based layouts, which are particularly vulnerable to text overflow. Japanese typography also requires different line-height and character spacing (`letter-spacing: 0` or negative values are standard for Japanese; positive values appropriate for English look wrong in CJK).

**Consequences:**
- Card components clip or overflow with CJK content
- Navigation items wrap onto two lines in Japanese
- The redesigned site looks broken in 3 of 4 supported locales

**Prevention:**
- Test every new layout component with all 4 locales during development, not at the end
- Use `min-height` rather than `height` for cards; allow text containers to grow
- Avoid hardcoded character counts for truncation (`line-clamp`) without checking all locales
- For CJK typography: set `word-break: break-all` and `overflow-wrap: break-word` as defaults
- Add `lang` attribute handling to set locale-appropriate font metrics (already likely present in the i18n setup — verify)

**Detection:**
- Switch locale in the development server and visually inspect every redesigned component
- Specifically check: navigation bar, feature cards, CTA buttons, hero headline, FAQ items

**Phase:** Component development phase — establish testing discipline before building card layouts.

---

## Minor Pitfalls

---

### Pitfall 10: `useParams()` Unreliability in Static Export

**What goes wrong:** In App Router with `output: 'export'`, there is a known issue where `useParams()` on the client does not reliably return locale values in all Next.js versions. The project's existing i18n structure may use `params.locale` passed as a prop instead — but any new components that try to use `useParams()` for locale detection will fail silently in static export.

**Prevention:**
- Pass `locale` as an explicit prop from the page level, do not rely on `useParams()` in deeply nested client components
- Verify the existing pattern in `src/app/[locale]/page.tsx` and replicate it for any new route segments

**Phase:** Any phase that adds new localized client components.

---

### Pitfall 11: Framer Motion Bundle Size in Static Export

**What goes wrong:** Adding Framer Motion to a marketing site adds approximately 40-50 KB gzipped to the JavaScript bundle. For a static marketing site where many visitors only see the above-the-fold content, this is a non-trivial cost. Over-using `motion.*` wrappers on every element amplifies the impact.

**Prevention:**
- Use Framer Motion only for complex choreographed animations that cannot be achieved with CSS
- For simple fade-in / slide-up reveal animations: use CSS `@keyframes` with IntersectionObserver class toggling instead — zero bundle cost
- Use dynamic import with `ssr: false` for heavy animation components so they don't block the initial render
- Audit with `next build` output: watch the route bundle size; flag if the main page bundle exceeds 150 KB gzipped

**Phase:** Animation implementation phase.

---

### Pitfall 12: Glowing/Blur Effects Degrading on Low-End Hardware

**What goes wrong:** CSS `backdrop-filter: blur()`, `filter: blur()`, and large box-shadow glow effects are GPU-intensive. On older iPhones (iPhone 8, iPhone X era — still common among the app's target demographic of NAS owners who buy hardware infrequently) and low-end Android devices, these effects cause visible frame drops.

**Prevention:**
- Test blur effects on a physical device with throttled GPU (Chrome DevTools > Rendering > GPU throttle) or on an older phone
- Apply blurs sparingly: one prominent element (hero card, nav bar) is fine; blurring 10 cards per page is not
- Wrap expensive visual effects in a `@media (prefers-reduced-transparency)` check where applicable (Safari 17+)
- Provide a fallback: `@supports not (backdrop-filter: blur())` should degrade gracefully to a solid semi-transparent background

**Phase:** Visual effects implementation phase — test on constrained hardware before finalizing design.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Design token definition (colors, typography) | Pure black dark theme causing halation; CJK typography ignored | Decide background color (`#111` not `#000`); set CJK line-height defaults |
| Screenshot asset preparation | Raw PNG images too large for static export; missing `width`/`height` causing CLS | Pre-optimize to WebP; set explicit dimensions; use `next-image-export-optimizer` |
| Hero and above-the-fold section | LCP from unoptimized screenshots; hydration mismatch from theme detection | `priority` on hero image; use CSS media query for dark/light screenshot swap |
| Scroll animation architecture | Layout reflow from wrong CSS properties; missing reduced-motion support | Establish IntersectionObserver + transform/opacity pattern first |
| Card layout for features | Text overflow in ja/zh locales; CLS from fixed heights | Test all 4 locales; use `min-height` |
| i18n content migration | Silent locale route dropout during component refactor | Validate `out/` directory for all locale paths post-build |
| Visual effects (blur, glow) | GPU memory pressure on low-end devices | Test on throttled GPU; limit simultaneous blur surfaces |
| Dark theme rollout | Hydration mismatch from `localStorage`-based theme detection | Use CSS `prefers-color-scheme` for initial render; client theme switcher after hydration |

---

## Sources

- Next.js Static Export documentation: https://nextjs.org/docs/pages/guides/static-exports
- Next.js Image Optimization with static export: https://github.com/vercel/next.js/discussions/60977
- `next-image-export-optimizer` package: https://github.com/Niels-IO/next-image-export-optimizer
- Next.js App Router `useParams()` static export issue: https://github.com/vercel/next.js/issues/54393
- WCAG 2.1 SC 2.3.3 Animation from Interactions: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- Cumulative Layout Shift optimization (web.dev): https://web.dev/articles/optimize-cls
- Tailwind CSS `will-change` documentation: https://tailwindcss.com/docs/will-change
- GSAP + Next.js 15 animation cleanup: https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232
- Dark Mode pitfalls (halation, contrast): https://webwave.me/blog/dark-mode-design-trends
- Cloudflare Pages + Next.js image limitations: https://www.thetombomb.com/posts/nextjs-pages-cloudflare-pages
- Next.js i18n static export incompatibility: https://github.com/vercel/next.js/discussions/18957
- Intersection Observer vs scroll events performance: https://codebyumar.medium.com/most-developers-still-use-scroll-events-instead-of-intersection-observer-908273dd9c99
- Next.js hydration error documentation: https://nextjs.org/docs/messages/react-hydration-error
