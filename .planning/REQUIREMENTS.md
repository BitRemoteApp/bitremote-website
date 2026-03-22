# Requirements: BitRemote Website Redesign

**Defined:** 2026-03-22
**Core Value:** The website must look and feel like it belongs to the same product as the BitRemote app — clean, professional, and visually impressive enough to make tech-savvy visitors want to download it.

## v1 Requirements

Requirements for the redesign. Each maps to roadmap phases.

### Design Foundation

- [x] **DSGN-01**: Site uses a CSS variable design token system for colors, spacing, typography, and border radius
- [x] **DSGN-02**: Site supports both dark and light themes, switching automatically via `prefers-color-scheme`
- [x] **DSGN-03**: Color palette is monochromatic (near-black/white/gray) with blue as the sole accent color, matching the app
- [x] **DSGN-04**: Dark theme uses near-black backgrounds (not pure `#000`) to avoid halation
- [x] **DSGN-05**: Typography uses a modern sans-serif font throughout, replacing all monospace usage
- [x] **DSGN-06**: All ASCII art separators (░ patterns) and terminal-style UI elements are removed

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

- [x] **VFX-01**: Sections use staggered fade-in entrance animations triggered on scroll
- [x] **VFX-02**: Smooth scrolling implemented via lenis for premium feel
- [ ] **VFX-03**: Section dividers use thin elegant SVG lines replacing ASCII separators
- [x] **VFX-04**: All animations respect `prefers-reduced-motion` — baked in from day one, not retrofitted
- [x] **VFX-05**: Animations only use `transform` and `opacity` (GPU-composited, no layout thrashing)

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
- [x] **TECH-04**: Animation components use `"use client"` directive; static content stays server-renderable
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
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Complete |
| DSGN-04 | Phase 1 | Complete |
| DSGN-05 | Phase 1 | Complete |
| DSGN-06 | Phase 1 | Complete |
| VFX-01 | Phase 2 | Complete |
| VFX-02 | Phase 2 | Complete |
| VFX-04 | Phase 2 | Complete |
| VFX-05 | Phase 2 | Complete |
| TECH-01 | Phase 2 | Pending |
| TECH-02 | Phase 2 | Pending |
| TECH-04 | Phase 2 | Complete |
| SHOW-01 | Phase 3 | Pending |
| SHOW-02 | Phase 3 | Pending |
| SHOW-03 | Phase 3 | Pending |
| SHOW-04 | Phase 3 | Pending |
| TECH-03 | Phase 3 | Pending |
| HERO-01 | Phase 4 | Pending |
| HERO-02 | Phase 4 | Pending |
| HERO-03 | Phase 4 | Pending |
| FEAT-01 | Phase 4 | Pending |
| FEAT-02 | Phase 4 | Pending |
| FEAT-03 | Phase 4 | Pending |
| NAV-01 | Phase 4 | Pending |
| NAV-02 | Phase 4 | Pending |
| NAV-03 | Phase 4 | Pending |
| CONT-01 | Phase 4 | Pending |
| CONT-02 | Phase 4 | Pending |
| CONT-03 | Phase 4 | Pending |
| CONT-04 | Phase 4 | Pending |
| CONT-05 | Phase 4 | Pending |
| TECH-05 | Phase 4 | Pending |
| VFX-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-03-22*
*Last updated: 2026-03-22 after roadmap creation*
