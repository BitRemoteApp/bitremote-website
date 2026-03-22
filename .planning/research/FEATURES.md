# Feature Landscape

**Domain:** Native Apple app marketing website (iOS/iPadOS/macOS, tech-savvy audience)
**Researched:** 2026-03-22
**Confidence:** MEDIUM — based on pattern analysis of exemplary sites (linear.app, things.app, bear.app), SaaS landing page research, and direct inspection of the existing BitRemote site. WebFetch was restricted; direct scraping of reference sites was not possible.

---

## Table Stakes

Features visitors expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with headline + subhead | First impression; orients visitors instantly | Low | BitRemote has this — needs visual upgrade, not content change |
| App Store download badge/CTA | The entire point of the page; absence kills conversion | Low | Exists; must be visually prominent and above the fold |
| App screenshots in the hero | Tech users evaluate UI quality before downloading | Medium | Currently absent — the single biggest gap vs. reference sites |
| Responsive layout (mobile/tablet/desktop) | 63%+ of web traffic is mobile; requirement for trust | Medium | Exists but needs to work with new visual components |
| Feature/benefits section | Answers "what does this do?" | Low | Exists as TextFrame grid — needs visual redesign |
| FAQ section | Reduces support burden; answers pre-download doubts | Low | Exists with accordion — keep behavior, restyle |
| Clear navigation (minimal) | Lets users jump to relevant sections | Low | Currently none beyond in-page anchors |
| Legal pages (privacy, terms, support) | Legal requirement; expected for any app | Low | Exists — footer links |
| Social links | Community trust signal for indie/niche apps | Low | Exists — Twitter, Discord, Telegram, GitHub |
| Consistent typography hierarchy | Readability baseline; sans-serif expected for modern apps | Low | Currently monospace throughout — must be replaced |
| Dark or light themed (not mixed/jarring) | Coherent identity; reflects app's polish | Low | Currently inconsistent with app's clean aesthetic |

---

## Differentiators

Features that set a marketing site apart. Not universally expected, but make exemplary sites memorable to tech audiences.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-linked screenshot reveal | App screenshots animate into view as user scrolls — creates engagement and shows depth | High | The "Linear look" and Apple product page approach. CSS scroll-driven animations (no JS needed in modern browsers) animating `transform` and `opacity` — GPU-friendly. Requires device mockup framing. |
| Device mockup framing (iPhone/iPad/Mac) | Grounds screenshots in reality; signals "this is a real polished app" | Medium | Static or lightly animated device frames. Can use CSS-only or pre-rendered PNGs. High return on perceived quality. |
| Bento grid feature layout | Replaces flat text grids with visually rich card compositions; each card can have different weight | Medium | Tech audiences recognize this from Linear, Vercel, Apple. Cards vary in size to show hierarchy of features. Monochromatic base with blue accent highlight cards. |
| Subtle ambient glow / gradient mesh background | Creates premium dark-theme depth without color noise | Medium | Single blue-tinted glow orb behind hero or key sections. Used by linear.app and Arc. Keep it restrained — one or two glow sources, not a rainbow. |
| Glassmorphism card surfaces | Frosted-glass cards over dark backgrounds create depth without heavy color | Medium | Pairs naturally with dark theme and subtle glow backgrounds. Use `backdrop-filter: blur()` on cards. Performance-safe when used selectively. |
| Thin SVG border lines on section dividers | Replaces ░ ASCII separators with ultra-thin `1px` lines or subtle grid patterns | Low | Directly from "linear look" pattern. Monochromatic, elegant, zero visual noise. Simple CSS border or SVG. |
| Downloader-specific landing pages with tailored content | Speaks directly to the visitor's setup (e.g., "for Synology users"); high relevance = high conversion | Medium | Already exists — needs visual upgrade to match new design system. Hero copy and screenshots should adapt per downloader. |
| Staggered section entrance animations | Content fades/slides in on scroll rather than rendering instantly — creates sense of quality and intentionality | Medium | CSS `@keyframes` with `IntersectionObserver` or CSS scroll-driven animations. Animate `opacity` + `translateY` only (no layout-triggering properties). |
| Wordmark / logotype as primary identity element | Replaces generic site names with a designed wordmark; signals brand intentionality | Low | BitRemoteWordmark component already exists — keep it, elevate its visual placement |
| Platform badge strip | Shows iOS, iPadOS, macOS badges in a single row — signals universal Apple platform coverage | Low | Signals "this is a serious cross-device app." Simple icon strip, no interaction needed. |
| Social proof pull-quote | One or two press mentions or App Store review excerpts, displayed in a minimal quote format | Low | Even a single credible quote significantly increases trust for indie apps. Tech audience is skeptical; authenticity matters over quantity. |
| Inline CTA repetition (top + middle + bottom) | Repeating the App Store link at natural scroll breaks prevents visitors from having to scroll back up | Low | Current site has CTA only at top. Add one in features section and one before FAQ. |

---

## Anti-Features

Features to deliberately NOT build for this type of site.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Video background / autoplaying hero video | Heavy assets kill performance on static Cloudflare Pages; distracting for data-focused tech users; inaccessible | Use high-quality static screenshots in device mockups with subtle scroll animation |
| Email newsletter signup / lead capture form | Wrong funnel for a paid native app — no product to nurture toward; adds GDPR complexity with no benefit | Direct visitors straight to App Store; no detour |
| Testimonial carousel / slider | Carousels are low-engagement; users skip them; they also signal padded social proof | Use 1-2 static pull-quotes in-line, or omit entirely if no strong press quotes exist |
| Pricing comparison table | BitRemote is a single paid app; no tiers to compare; a table implies complexity that doesn't exist | Display price naturally in the App Store CTA copy if needed |
| Cookie consent banner | Static site with no analytics or tracking — nothing to consent to | Keep the site cookieless and banner-free |
| Chat widget (Intercom, Drift, etc.) | Wrong support channel for a native Apple app; tech users prefer Discord/GitHub issues | Keep existing social links (Discord, Telegram, GitHub) as support channels |
| Animated particle system / canvas backgrounds | Performance penalty; often looks generic or dated; distracts from app UI | Subtle CSS gradient mesh or single glow orb is sufficient and far more performant |
| Infinite scroll or paginated content | This is a one-page marketing site; paginated content belongs to a blog (out of scope) | Single-page scrolling experience with anchor navigation |
| User-generated content / review aggregator | Requires backend, moderation, and real-time data — incompatible with static export | Pull-quote one or two curated App Store reviews statically in the HTML |
| Dark pattern CTAs ("Download FREE - No Credit Card") | Tech-savvy users know apps cost money; patronizing language erodes trust | Honest CTA: "Download on the App Store" or "Get BitRemote" |
| Modal popups or exit-intent overlays | Aggressive; alienates the exact audience that values focused, clean software | Never |

---

## Feature Dependencies

```
App screenshots required → device mockup framing
Device mockup framing required → scroll-linked screenshot reveal
Scroll-linked screenshot reveal requires → CSS scroll-driven animations or IntersectionObserver

Bento grid layout requires → design system (spacing, card surface, border radius) finalized
Glassmorphism card surfaces require → dark background behind them (works only in dark theme)
Ambient glow / gradient mesh requires → dark background (degrades badly on light)

Dark theme decision → unlocks: glassmorphism cards, ambient glow, gradient mesh, high-contrast blue accents
Light theme decision → requires: different card treatment (subtle shadow, light gray surface)

Downloader landing page redesign requires → home page design system finalized first
Social proof section requires → real press quotes or App Store review text sourced from real users

Inline CTA repetition → no dependency; can be added at any point
Platform badge strip → no dependency; static HTML/SVG icons
Thin SVG divider lines → replaces TextSeparator component; zero dependency
```

---

## MVP Recommendation

For the redesign milestone, prioritize in this order:

**Must have (conversion-critical):**
1. App screenshots in device mockups — current absence is the highest-impact gap
2. Monochromatic + blue design system replacing all ASCII/monospace elements
3. Bento grid for features section — replaces flat TextFrame grid
4. Scroll entrance animations (staggered fade-in) — perceived quality signal
5. Inline CTA at top + bottom of page

**Should have (differentiating for tech audience):**
6. Ambient glow / gradient mesh in hero (restrained — one orb maximum)
7. Thin SVG section dividers replacing TextSeparator
8. Platform badge strip (iOS / iPadOS / macOS)
9. Glassmorphism card surfaces (dark theme only)

**Defer:**
- Scroll-linked screenshot reveal: High complexity, high reward — good for a follow-on phase after core design system is established
- Social proof pull-quote: Requires real content to be sourced before implementation
- Downloader landing page visual redesign: Should follow home page completion

---

## Sources

- [Linear App Style Landing Page — Figma (50+ sections)](https://www.figma.com/community/file/1367670334751609522/linear-app-style-landing-page-collection-50-sections-100-editable-free) — MEDIUM confidence
- [The Linear Look — Frontend Horse](https://frontend.horse/articles/the-linear-look/) — MEDIUM confidence (referenced by WebSearch results)
- [10 SaaS Landing Page Trends for 2026 — SaaSFrame Blog](https://www.saasframe.io/blog/blog/10-saas-landing-page-trends-for-2026-with-real-examples) — MEDIUM confidence
- [CSS Scroll-Driven Animations — Smashing Magazine](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/) — HIGH confidence (official web platform documentation)
- [Avoid non-composited animations — Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations) — HIGH confidence (official Chrome docs)
- [App Store Marketing Guidelines — Apple Developer](https://developer.apple.com/app-store/marketing/guidelines/) — HIGH confidence
- [Social proof landing page examples — Wisernotify](https://wisernotify.com/blog/landing-page-social-proof/) — LOW confidence (single source, marketing content)
- [Hero Section Design Best Practices 2026 — Perfect Afternoon](https://www.perfectafternoon.com/2025/hero-section-design/) — LOW confidence (WebSearch only)
- [SaaS Landing Page UI Best Practices 2025 — Procreator](https://procreator.design/blog/saas-landing-page-best-ui-design-practices/) — LOW confidence (WebSearch only)
- Direct code inspection of existing `src/app/[locale]/page.tsx` — HIGH confidence (primary source)
