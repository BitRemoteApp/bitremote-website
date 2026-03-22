# Requirements: BitRemote Website Redesign

**Defined:** 2026-03-22
**Core Value:** The website must look and feel like it belongs to the same product as the BitRemote app — clean, professional, and visually impressive enough to make tech-savvy visitors want to download it.

## v1 Requirements

Requirements for the redesign. Each maps to roadmap phases.

### Design Foundation

- [ ] **DSGN-01**: Site uses a CSS variable design token system for colors, spacing, typography, and border radius
- [ ] **DSGN-02**: Site supports both dark and light themes, switching automatically via `prefers-color-scheme`
- [ ] **DSGN-03**: Color palette is monochromatic (near-black/white/gray) with blue as the sole accent color, matching the app
- [ ] **DSGN-04**: Dark theme uses near-black backgrounds (not pure `#000`) to avoid halation
- [ ] **DSGN-05**: Typography uses a modern sans-serif font throughout, replacing all monospace usage
- [ ] **DSGN-06**: All ASCII art separators (░ patterns) and terminal-style UI elements are removed

### Hero Section

- [ ] **HERO-01**: Hero section has a compelling headline, subheadline, and prominent App Store download button
- [ ] **HERO-02**: Hero features a subtle ambient glow effect (blue-tinted gradient orb) that adapts to theme
- [ ] **HERO-03**: Platform badge strip shows iOS, iPadOS, and macOS support

### App Showcase

- [ ] **SHOW-01**: Dedicated showcase section below the hero displays app screenshots in device mockups
- [ ] **SHOW-02**: Screenshots are shown in realistic device frames (iPhone and/or Mac)
- [ ] **SHOW-03**: Dark theme shows dark-mode app screenshots, light theme shows light-mode screenshots
- [ ] **SHOW-04**: Screenshots animate into view on scroll

### Features Section

- [ ] **FEAT-01**: Features/benefits are presented in a bento grid layout with varied card sizes
- [ ] **FEAT-02**: Cards use glassmorphism styling (blur + translucency on dark, subtle shadow + border on light)
- [ ] **FEAT-03**: Feature content communicates what the app does and why it matters

### Navigation & CTAs

- [ ] **NAV-01**: Sticky navigation bar with section anchor links
- [ ] **NAV-02**: App Store download button appears at top, mid-page, and bottom (inline CTA repetition)
- [ ] **NAV-03**: Navigation adapts to mobile (hamburger or simplified)

### Visual Effects

- [ ] **VFX-01**: Sections use staggered fade-in entrance animations triggered on scroll
- [ ] **VFX-02**: Smooth scrolling implemented via lenis for premium feel
- [ ] **VFX-03**: Section dividers use thin elegant SVG lines replacing ASCII separators
- [ ] **VFX-04**: All animations respect `prefers-reduced-motion` — baked in from day one, not retrofitted
- [ ] **VFX-05**: Animations only use `transform` and `opacity` (GPU-composited, no layout thrashing)

### Content Preservation

- [ ] **CONT-01**: All existing localized content (en, ja, zh-hans, zh-hant) carries over to the new design
- [ ] **CONT-02**: FAQ section is restyled to match new design system (keep accordion behavior)
- [ ] **CONT-03**: Legal pages (privacy, terms, support) are restyled
- [ ] **CONT-04**: Social links (Twitter, Discord, Telegram, GitHub) remain accessible
- [ ] **CONT-05**: SEO metadata, JSON-LD schemas, sitemap, and robots.txt continue working

### Technical

- [ ] **TECH-01**: Site remains a Next.js static export compatible with Cloudflare Pages
- [ ] **TECH-02**: No hydration mismatches — theme detection uses CSS media queries, not JS localStorage on initial render
- [ ] **TECH-03**: App screenshots are pre-optimized to WebP before being added to the project
- [ ] **TECH-04**: Animation components use `"use client"` directive; static content stays server-renderable
- [ ] **TECH-05**: Build produces correct output for all locale paths

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Visual

- **ADV-01**: Scroll-linked screenshot reveal (screenshots animate in sync with scroll position, not just on-enter)
- **ADV-02**: Social proof section with curated App Store reviews or press quotes
- **ADV-03**: Manual theme toggle switch (beyond automatic `prefers-color-scheme`)

### Downloader Pages

- **DLP-01**: Downloader-specific landing pages receive full visual redesign matching new design system
- **DLP-02**: Each downloader page features tailored screenshots for that client

## Out of Scope

| Feature | Reason |
|---------|--------|
| Video background / autoplaying hero video | Heavy assets kill performance; distracting for tech audience |
| Email newsletter / lead capture form | Wrong funnel for a paid native app; adds GDPR complexity |
| Testimonial carousel / slider | Low engagement; tech users skip them |
| Chat widget | Wrong support channel; Discord/Telegram/GitHub are better for this audience |
| Cookie consent banner | Static site with no tracking — nothing to consent to |
| Animated particle / canvas backgrounds | Performance penalty; often looks generic |
| Pricing comparison table | Single paid app, no tiers to compare |
| Blog or changelog | Different initiative, not part of visual redesign |
| Analytics integration | Can be added separately, not a design concern |
| Tailwind v3 → v4 migration | No framework migration — keep what works |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Pending | Pending |
| DSGN-02 | Pending | Pending |
| DSGN-03 | Pending | Pending |
| DSGN-04 | Pending | Pending |
| DSGN-05 | Pending | Pending |
| DSGN-06 | Pending | Pending |
| HERO-01 | Pending | Pending |
| HERO-02 | Pending | Pending |
| HERO-03 | Pending | Pending |
| SHOW-01 | Pending | Pending |
| SHOW-02 | Pending | Pending |
| SHOW-03 | Pending | Pending |
| SHOW-04 | Pending | Pending |
| FEAT-01 | Pending | Pending |
| FEAT-02 | Pending | Pending |
| FEAT-03 | Pending | Pending |
| NAV-01 | Pending | Pending |
| NAV-02 | Pending | Pending |
| NAV-03 | Pending | Pending |
| VFX-01 | Pending | Pending |
| VFX-02 | Pending | Pending |
| VFX-03 | Pending | Pending |
| VFX-04 | Pending | Pending |
| VFX-05 | Pending | Pending |
| CONT-01 | Pending | Pending |
| CONT-02 | Pending | Pending |
| CONT-03 | Pending | Pending |
| CONT-04 | Pending | Pending |
| CONT-05 | Pending | Pending |
| TECH-01 | Pending | Pending |
| TECH-02 | Pending | Pending |
| TECH-03 | Pending | Pending |
| TECH-04 | Pending | Pending |
| TECH-05 | Pending | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 0
- Unmapped: 34 ⚠️

---
*Requirements defined: 2026-03-22*
*Last updated: 2026-03-22 after initial definition*
