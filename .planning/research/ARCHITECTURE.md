# Architecture Patterns

**Domain:** Marketing website visual redesign (Next.js 15 + Tailwind CSS)
**Researched:** 2026-03-22

---

## Recommended Architecture

Layer a design system on top of the existing Next.js App Router structure without changing routing, i18n, SEO, or domain layers. The redesign is a visual overhaul only — the data flow, locale resolution, and static generation pipeline stay untouched.

The architecture adds two new layers (design tokens, animation primitives) and replaces all existing components in `src/components/` and `src/ascii-panel/` with new ones. Pages (`src/app/`) require edits only to swap in new components — their structure stays the same.

```
┌──────────────────────────────────────────────────────────┐
│  Pages / Layouts  (src/app/)             [unchanged]      │
│  Routing, locale params, metadata, JSON-LD               │
├──────────────────────────────────────────────────────────┤
│  Section Components  (src/components/sections/)  [NEW]   │
│  Hero, Features, Screenshots, FAQ, CTA, Footer           │
│  Composed from primitives. One section = one file.       │
├──────────────────────────────────────────────────────────┤
│  Primitive Components  (src/components/ui/)      [NEW]   │
│  Button, Badge, Card, Divider, Wordmark, Typography      │
│  Stateless, token-driven, CVA variants                   │
├──────────────────────────────────────────────────────────┤
│  Animation Primitives  (src/components/motion/)  [NEW]   │
│  FadeIn, SlideIn, StaggerGroup, ParallaxLayer            │
│  Thin wrappers over Framer Motion. Isolated.             │
├──────────────────────────────────────────────────────────┤
│  Design Tokens  (tailwind.config.ts + globals.css)       │
│  CSS variables for color, radius, shadow, spacing        │
│  Dark mode as variable override, not class duplication   │
├──────────────────────────────────────────────────────────┤
│  Domain / i18n / SEO layers              [unchanged]     │
│  src/domain/, src/i18n/, src/seo/, src/messages/         │
└──────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### Component Hierarchy

| Component | Responsibility | Communicates With | Location |
|-----------|---------------|-------------------|----------|
| `src/app/[locale]/layout.tsx` | Locale shell, nav, footer | NavBar, Footer (sections) | unchanged |
| `src/app/[locale]/page.tsx` | Assemble home sections | HeroSection, FeaturesSection, ScreenshotsSection, FaqSection, CtaSection | minor edits |
| `src/app/[locale]/downloaders/[slug]/page.tsx` | Downloader landing | DownloaderHero, DownloaderFeatures (new section variants) | minor edits |
| `HeroSection` | Full-viewport hero with headline + app screenshot | Button (ui), AppMockup (ui), FadeIn (motion) | `src/components/sections/` |
| `FeaturesSection` | Feature grid with icons and descriptions | Card (ui), StaggerGroup (motion) | `src/components/sections/` |
| `ScreenshotsSection` | App screenshot gallery with captions | AppMockup (ui), SlideIn (motion) | `src/components/sections/` |
| `FaqSection` | Accordion for FAQ content | FaqAccordion (ui), FadeIn (motion) | `src/components/sections/` |
| `CtaSection` | Download prompt with App Store badge | Button (ui), FadeIn (motion) | `src/components/sections/` |
| `NavBar` | Site navigation with wordmark and locale toggle | Wordmark (ui), TextButton (ui) | `src/components/sections/` |
| `Footer` | Links, social icons, legal links | — | `src/components/sections/` |
| `AppMockup` | Device frame wrapping screenshot image | Next.js `<Image>` | `src/components/ui/` |
| `Card` | Surface container with rounded border and shadow | — | `src/components/ui/` |
| `Button` | CTA and navigation button with CVA variants | — | `src/components/ui/` |
| `Badge` | Pill label (e.g., "Free", "New") | — | `src/components/ui/` |
| `FadeIn` | Fade-in entrance via `whileInView` | Framer Motion | `src/components/motion/` |
| `SlideIn` | Directional slide entrance via `whileInView` | Framer Motion | `src/components/motion/` |
| `StaggerGroup` | Staggers children entrance with delay | FadeIn or SlideIn | `src/components/motion/` |
| `ParallaxLayer` | CSS `transform` scroll-linked parallax | Framer Motion `useScroll` + `useTransform` | `src/components/motion/` |

### Strict Boundary Rules

- Section components compose primitives. They never import other sections.
- Primitive (ui/) components have zero animation logic — animation is always a motion/ wrapper.
- Motion components have zero business or content logic — they render `children` only.
- Pages import sections only. Pages never import ui/ or motion/ directly.
- Domain, i18n, and SEO layers are not modified.

---

## Design Token System

**Decision: CSS variables in `globals.css`, consumed by `tailwind.config.ts` as semantic aliases.**

This is the correct pattern for a static Next.js site: no runtime overhead, dark mode is a single `[data-theme="dark"]` override block, and Tailwind utilities map to semantic names rather than literal colors. Confidence: HIGH (verified against Tailwind docs and current community consensus).

### Token Categories

```css
/* globals.css */
:root {
  /* Surface hierarchy */
  --color-bg:          #ffffff;
  --color-surface:     #f8f8f8;
  --color-surface-alt: #f0f0f0;
  --color-border:      #e5e5e5;

  /* Text */
  --color-text-primary:   #0a0a0a;
  --color-text-secondary: #6b7280;
  --color-text-muted:     #9ca3af;

  /* Accent (blue only) */
  --color-accent:        #2563eb;
  --color-accent-hover:  #1d4ed8;
  --color-accent-subtle: #dbeafe;

  /* Radius scale */
  --radius-sm:  0.375rem;   /* 6px  */
  --radius-md:  0.75rem;    /* 12px */
  --radius-lg:  1.25rem;    /* 20px */
  --radius-xl:  1.75rem;    /* 28px — cards matching app UI */

  /* Shadow */
  --shadow-card:  0 1px 3px rgb(0 0 0 / 0.08), 0 4px 16px rgb(0 0 0 / 0.06);
  --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.12);
}

[data-theme="dark"] {
  --color-bg:          #0a0a0a;
  --color-surface:     #141414;
  --color-surface-alt: #1e1e1e;
  --color-border:      #2a2a2a;

  --color-text-primary:   #f5f5f5;
  --color-text-secondary: #a3a3a3;
  --color-text-muted:     #6b6b6b;

  --color-accent:        #3b82f6;
  --color-accent-hover:  #60a5fa;
  --color-accent-subtle: #1e3a5f;

  --shadow-card:  0 1px 3px rgb(0 0 0 / 0.4), 0 4px 16px rgb(0 0 0 / 0.3);
  --shadow-raise: 0 8px 32px rgb(0 0 0 / 0.5);
}
```

```typescript
// tailwind.config.ts — semantic extensions
theme: {
  extend: {
    colors: {
      bg:           'var(--color-bg)',
      surface:      'var(--color-surface)',
      'surface-alt':'var(--color-surface-alt)',
      border:       'var(--color-border)',
      text: {
        primary:   'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted:     'var(--color-text-muted)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        hover:   'var(--color-accent-hover)',
        subtle:  'var(--color-accent-subtle)',
      },
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
    },
    boxShadow: {
      card:  'var(--shadow-card)',
      raise: 'var(--shadow-raise)',
    },
  },
}
```

**Why semantic names, not literal ones:** Dark mode becomes one variable override block in CSS. Without this pattern, dark mode requires `dark:` variants on every utility class — exponentially harder to maintain.

**Theme activation:** Set `data-theme="dark"` on `<html>` in the root layout. Dark is the preferred default for the marketing site (premium feel). A `<ThemeToggle>` component can be added later without restructuring.

---

## Animation Orchestration Patterns

**Decision: Framer Motion (motion.dev) for all scroll animations and entrance effects. Pure CSS for hover and micro-interactions.**

Framer Motion is the correct choice for a React/Next.js site with scroll-triggered animations. CSS alone lacks the orchestration primitives needed for stagger groups and scroll-linked transforms. Confidence: HIGH (verified against motion.dev docs and LogRocket comparison).

### Pattern 1: Viewport-Triggered Entrance (FadeIn)

**What:** Section content fades and translates up when scrolled into view.
**When:** Use on every section below the hero fold. Fire once only.
**Implementation note:** Add `'use client'` — Framer Motion requires it in App Router.

```typescript
// src/components/motion/FadeIn.tsx
'use client';
import { motion } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}
```

**Key options:**
- `viewport={{ once: true }}` — animation fires once, not on scroll-back (performance + UX)
- `margin: '-80px'` — trigger 80px before element enters viewport for smooth feel
- Composite properties only (`opacity`, `transform`) — runs on compositor thread, not main thread

### Pattern 2: Staggered Group Entrance (StaggerGroup)

**What:** A group of children animate in sequentially with a delay between each.
**When:** Feature cards, screenshot gallery, any repeating item list.

```typescript
// src/components/motion/StaggerGroup.tsx
'use client';
import { motion } from 'motion/react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function StaggerGroup({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={item} className={className}>{children}</motion.div>;
}
```

### Pattern 3: Scroll-Linked Parallax (ParallaxLayer)

**What:** A layer moves at a slower rate than scroll, creating depth.
**When:** Hero background element or app screenshot decorative layer — one or two uses maximum.
**Warning:** Use sparingly. Overuse degrades performance and induces motion sickness. Every `useScroll` call attaches a scroll listener.

```typescript
// src/components/motion/ParallaxLayer.tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxLayer({ children, speed = 0.3 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}px`, `${speed * 50}px`]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

### Pattern 4: Reduced Motion Fallback

**What:** All Framer Motion animations respect `prefers-reduced-motion`.
**When:** Always. Accessibility requirement.

Framer Motion respects `prefers-reduced-motion` automatically when using `animate` + `initial` pairs. Verify by testing: with reduced motion enabled, `whileInView` will snap to final state without transition. This is the correct behavior — no additional code needed for the core case.

For `ParallaxLayer` specifically, add an explicit check:

```typescript
import { useReducedMotion } from 'motion/react';
// In ParallaxLayer: if (shouldReduceMotion) return <div>{children}</div>;
```

---

## Data Flow Direction

```
Build Time (Static):
  Next.js generateStaticParams()
    → locale params
    → Page component renders
    → getMessages(locale) → message dictionary
    → Section components receive messages as props
    → Primitive components receive typed props
    → Tailwind CSS produces class-driven styles from tokens
    → Static HTML exported

Runtime (Client):
  HTML loads from Cloudflare Pages CDN
    → React hydrates only 'use client' components (motion wrappers)
    → IntersectionObserver watches for whileInView targets
    → User scrolls → viewport triggers → motion animates
    → Theme: document.documentElement.dataset.theme set once at load
    → No server calls, no dynamic data fetching
```

**Hydration surface is minimal by design.** Server components render everything static. Only animation wrapper components carry `'use client'`. The hero section, feature cards, and screenshot gallery are server-rendered HTML that Framer Motion hydrates for animation — not for rendering.

---

## Component Build Order

Build in strict dependency order. Each tier must be complete before the next.

### Tier 1: Design Foundation (no dependencies)

1. CSS token variables in `globals.css` (color, radius, shadow, spacing)
2. Tailwind semantic aliases in `tailwind.config.ts`
3. Typography scale (font-size, line-height, letter-spacing in config)
4. Global resets and base styles (body background, selection color)

**Output:** Tailwind utilities like `bg-surface`, `text-text-primary`, `rounded-xl`, `shadow-card` are usable.

### Tier 2: Motion Primitives (depends on: Tier 1)

5. `FadeIn` component
6. `SlideIn` component (directional variant of FadeIn)
7. `StaggerGroup` + `StaggerItem` components
8. `ParallaxLayer` component

**Output:** Animation wrappers usable by any component above them.

### Tier 3: UI Primitives (depends on: Tier 1)

9. `Button` with CVA variants (primary/secondary/ghost, sm/md/lg)
10. `Card` with token-driven surface, border, radius, shadow
11. `Badge` pill component
12. `AppMockup` device frame wrapping `next/image`
13. `Wordmark` (replace `BitRemoteWordmark.tsx` with token-styled version)
14. `FaqAccordion` (replace existing with token-styled version)

**Output:** Full primitive library composable into sections.

### Tier 4: Section Components (depends on: Tiers 1–3)

15. `NavBar` (navigation + wordmark + locale toggle)
16. `HeroSection` (headline + subheadline + CTA + AppMockup)
17. `FeaturesSection` (feature grid using StaggerGroup + Card)
18. `ScreenshotsSection` (gallery of AppMockup with captions)
19. `FaqSection` (FaqAccordion wrapped in FadeIn)
20. `CtaSection` (download prompt with App Store badge)
21. `Footer` (links, social, legal)

**Output:** All sections composable into pages.

### Tier 5: Page Assembly (depends on: Tier 4)

22. Update `src/app/[locale]/layout.tsx` — swap NavBar and Footer
23. Update `src/app/[locale]/page.tsx` — compose home sections
24. Update `src/app/[locale]/downloaders/[slug]/page.tsx` — reuse sections with downloader data
25. Update `src/app/page.tsx` (language selector root) — apply token-styled UI

**Output:** Fully redesigned site with all existing functionality preserved.

### Tier 6: Polish (depends on: Tiers 1–5)

26. Glow and blur decorative effects (CSS `box-shadow`, `backdrop-filter`)
27. Hover micro-interactions (pure CSS transitions on primitives)
28. Theme toggle component (if shipping dark/light toggle)
29. Responsive breakpoint audit across all sections

---

## Existing Code to Remove

The following existing components are fully replaced and should be deleted:

| File | Replaced By |
|------|------------|
| `src/ascii-panel/` (entire directory) | `ScreenshotsSection` + `AppMockup` |
| `src/components/TextFrame.tsx` | `Card` (ui primitive) |
| `src/components/TextButton.tsx` | `Button` (ui primitive) |
| `src/components/TextSeparator.tsx` | Token-driven `<hr>` or `Divider` |
| `src/components/TextTabsNav.tsx` | `NavBar` (section) |
| `src/components/BitRemoteWordmark.tsx` | `Wordmark` (ui primitive, token-styled) |
| `src/components/FaqAccordion.tsx` | `FaqAccordion` (ui primitive, token-styled) |
| `src/components/DownloaderLandingPage.tsx` | Section-composed downloader page |

**Do not touch:** `src/domain/`, `src/i18n/`, `src/seo/`, `src/messages/`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms-full.txt/`.

---

## Scalability Considerations

| Concern | At current scale | If content grows |
|---------|-----------------|-----------------|
| CSS bundle | Token approach produces minimal CSS — no dark: duplication | No change needed |
| Animation performance | whileInView + once:true is O(1) per element via IntersectionObserver pool | Add `will-change: transform` hint on high-frequency parallax targets |
| New locales | Tokens are locale-agnostic — add message keys only | No architectural change |
| New pages | Add section components, compose in new page.tsx | Sections are already reusable by design |
| Light/dark toggle | data-theme swap on `<html>` — CSS handles the rest | ThemeToggle component is a one-line addition |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: dark: Class Duplication

**What:** Writing `bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100` on every element.
**Why bad:** Doubles the utility classes in every component. Dark mode becomes a global find-and-replace problem. Any token change requires updating dozens of files.
**Instead:** Use CSS variable tokens — one `:root` / `[data-theme="dark"]` override governs the entire site.

### Anti-Pattern 2: Motion Logic Inside Section Components

**What:** Importing Framer Motion directly in `HeroSection.tsx` and writing animation logic there.
**Why bad:** Couples content logic with animation logic. Makes sections hard to test, snapshot, or use in a Storybook. Forces `'use client'` on entire section when only the animation needs it.
**Instead:** Wrap content children in `FadeIn`, `StaggerGroup`, etc. from `src/components/motion/`. Section stays a Server Component; only the wrapper is a Client Component.

### Anti-Pattern 3: Inline Style Animations

**What:** Using JavaScript `element.style.transform = ...` on scroll events with `addEventListener`.
**Why bad:** Runs on main thread. Blocks paint. Causes jank on lower-end devices. No cleanup.
**Instead:** Framer Motion `useScroll` + `useTransform` uses `requestAnimationFrame` and GPU-composited properties.

### Anti-Pattern 4: Replacing the Routing Layer

**What:** Migrating to a different router or layout structure as part of the visual redesign.
**Why bad:** This project is a visual overhaul only. The existing locale routing, `generateStaticParams`, `generateMetadata`, and i18n layers are correct and working. Touching them adds risk with no visual benefit.
**Instead:** Edit only the component composition inside page files. Leave `generateStaticParams`, `generateMetadata`, locale resolution, and SEO schema generation completely intact.

### Anti-Pattern 5: Animating Layout Properties

**What:** Animating `height`, `width`, `top`, `left`, `padding`, `margin` with Framer Motion.
**Why bad:** Triggers layout recalculation and paint on every frame. Causes jank.
**Instead:** Animate only `opacity` and `transform` (translate, scale, rotate). These run on the GPU compositor thread and never trigger layout.

---

## Dependency Map

```
globals.css (tokens)
  └── tailwind.config.ts (semantic aliases)
        ├── src/components/ui/Button.tsx
        ├── src/components/ui/Card.tsx
        ├── src/components/ui/AppMockup.tsx
        ├── src/components/ui/Badge.tsx
        ├── src/components/ui/Wordmark.tsx
        └── src/components/ui/FaqAccordion.tsx

motion/ (animation primitives — no token dependency, only Framer Motion)
  ├── FadeIn.tsx
  ├── SlideIn.tsx
  ├── StaggerGroup.tsx
  └── ParallaxLayer.tsx

ui/ + motion/ → sections/
  ├── NavBar.tsx
  ├── HeroSection.tsx        (ui/AppMockup + motion/FadeIn + ui/Button)
  ├── FeaturesSection.tsx    (ui/Card + motion/StaggerGroup)
  ├── ScreenshotsSection.tsx (ui/AppMockup + motion/SlideIn)
  ├── FaqSection.tsx         (ui/FaqAccordion + motion/FadeIn)
  ├── CtaSection.tsx         (ui/Button + motion/FadeIn)
  └── Footer.tsx

sections/ → src/app/ (pages, via props only — no shared state)

[unchanged]
  src/domain/ → src/i18n/ → src/seo/ → src/messages/
  All flow through generateMetadata() and page render props as before.
```

---

## Sources

- Motion (Framer Motion) scroll animations docs: [motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations) — HIGH confidence
- Tailwind CSS dark mode docs: [tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode) — HIGH confidence
- Tailwind CSS theme variables: [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme) — HIGH confidence
- Class Variance Authority: [cva.style/docs](https://cva.style/docs) — HIGH confidence
- Design tokens with Tailwind dark mode pattern: [richinfante.com](https://www.richinfante.com/2024/10/21/tailwind-dark-mode-design-tokens-themes-css) — MEDIUM confidence
- LogRocket React animation library comparison: [blog.logrocket.com/best-react-animation-libraries](https://blog.logrocket.com/best-react-animation-libraries/) — MEDIUM confidence
- FreeCodcamp design system with CVA + Tailwind: [freecodecamp.org](https://www.freecodecamp.org/news/how-a-design-system-in-next-js-with-tailwind-css-and-class-variance-authority/) — MEDIUM confidence
- Framer Motion whileInView viewport once pattern: [dev.to/shivamkatare](https://dev.to/shivamkatare/create-beautiful-scroll-animations-using-framer-motion-1a7b) — MEDIUM confidence
