# BitRemote Website Redesign

## What This Is

A visual redesign of the BitRemote marketing website (bitremote.app) to align its design language with the BitRemote native app. The current site uses a retro ASCII/monospace aesthetic that misrepresents the product — a polished, modern native Apple app. The redesigned site should feel like a natural extension of the app itself while leveraging marketing-grade visual effects to convert visitors.

## Core Value

The website must look and feel like it belongs to the same product as the BitRemote app — clean, professional, and visually impressive enough to make tech-savvy visitors want to download it.

## Requirements

### Validated

- ✓ Multi-locale support (en, ja, zh-hans, zh-hant) — existing
- ✓ Static site generation via Next.js with Cloudflare Pages deployment — existing
- ✓ SEO optimization with JSON-LD schema, sitemap, robots.txt — existing
- ✓ Downloader-specific landing pages (qBittorrent, Synology DS, etc.) — existing
- ✓ App Store download link integration — existing
- ✓ FAQ section — existing
- ✓ Legal pages (privacy, terms, support) — existing
- ✓ Social links (Twitter, Discord, Telegram, GitHub) — existing
- ✓ LLM context route (/llms-full.txt) — existing

### Active

- [ ] Add polished visual effects suitable for a marketing site (scroll animations, parallax, glowing elements, smooth transitions)
- [ ] Showcase app screenshots as hero visuals — let the app's UI sell itself
- [ ] Use card-based layouts and rounded shapes that echo the app's native UI patterns
- [ ] Maintain all existing content and functionality during redesign
- [ ] Ensure responsive design across mobile, tablet, and desktop

### Validated in Phase 2

- ✓ Scroll entrance animations using only opacity and transform (GPU-composited, no layout thrash) — Validated in Phase 02: motion-and-ui-primitives
- ✓ Smooth scrolling via Lenis for premium weighted feel — Validated in Phase 02: motion-and-ui-primitives
- ✓ All animations respect prefers-reduced-motion (completely absent, not just skipped) — Validated in Phase 02: motion-and-ui-primitives
- ✓ No React hydration mismatches — animation/theme state handled without browser APIs during server render — Validated in Phase 02: motion-and-ui-primitives
- ✓ Static export remains compatible with Cloudflare Pages — Validated in Phase 02: motion-and-ui-primitives

### Validated in Phase 1

- ✓ Replace ASCII/monospace design language with modern sans-serif typography — Validated in Phase 01: design-foundation
- ✓ Implement monochromatic color palette (black/white/gray) with blue as the sole accent color — Validated in Phase 01: design-foundation
- ✓ Design can be dark or light themed (app supports both) — Validated in Phase 01: design-foundation
- ✓ Remove ASCII art separators, text-frame components, and terminal-style UI elements — Validated in Phase 01: design-foundation

### Out of Scope

- Backend/API functionality — this is a static marketing site
- User authentication or accounts
- Analytics integration — can be added separately later
- Blog or changelog — different initiative
- New content pages beyond what exists — focus is visual, not content
- App icon or branding changes — the app's identity stays as-is

## Context

**Product:** BitRemote is a native Apple app (iOS, iPadOS, macOS) for remotely managing download tasks on NAS and home servers. It supports aria2, Synology Download Station, QNAP Download Station, and Transmission.

**Target audience:** Tech-savvy users who run NAS/home servers. They appreciate good design and native app quality — the kind of people who notice when software is well-crafted.

**App design language (from App Store screenshots):**
- Monochromatic base (black/white/gray) with blue as the only accent color
- Clean sans-serif typography (SF Pro / system font)
- Card-based layouts with rounded corners and subtle backgrounds
- Data-rich but visually calm — professional and pretty
- The Activity Monitor page is an exception with colorful stat cards (green, purple, pink, cyan) to make monitoring engaging
- Supports both dark and light interfaces

**Current website problems:**
- Monospace/ASCII aesthetic makes the product look like a CLI tool
- Text-frame components and ░ separators feel retro when the app is modern
- No app screenshots showcased — the app's best selling point is hidden
- Visual disconnect undermines trust ("is this really the same product?")

**Tech stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3.4, static export to Cloudflare Pages

## Constraints

- **Tech stack**: Keep Next.js + Tailwind CSS + static export — no framework migration
- **Content preservation**: All existing localized content must carry over
- **Deployment**: Must remain compatible with Cloudflare Pages static hosting
- **Performance**: Static site must remain fast — visual effects should not degrade load times significantly
- **Accessibility**: Maintain existing aria labels, screen reader support, reduced motion support

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Blue as sole accent color | Matches app's design system — monochromatic + blue | ✓ Implemented in Phase 01 |
| Dark/light via prefers-color-scheme | CSS media query, no JS — both themes supported | ✓ Implemented in Phase 01 |
| Marketing-grade visual effects allowed | This is a conversion page, not docs — impressiveness matters | ✓ Foundation in Phase 02 (motion primitives ready) |
| Keep Next.js static export | No reason to change what works for deployment | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-23 after Phase 02 completion*
