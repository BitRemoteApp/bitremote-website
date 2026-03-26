# Phase 2: Motion and UI Primitives - Research

**Researched:** 2026-03-22
**Domain:** Scroll entrance animations, smooth scroll, reduced-motion accessibility, Next.js hydration safety
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VFX-01 | Sections use staggered fade-in entrance animations triggered on scroll | `motion/react` `whileInView` + variants with `staggerChildren` covers this completely; a reusable `FadeInSection` wrapper component delivers it to all sections |
| VFX-02 | Smooth scrolling implemented via lenis for premium feel | `lenis` 1.3.x with `lenis/react`'s `<ReactLenis root>` in the root layout; `autoRaf: true` handles the RAF loop |
| VFX-04 | All animations respect `prefers-reduced-motion` — baked in from day one | `<MotionConfig reducedMotion="user">` in root layout disables all transform/layout animations automatically; lenis must be conditionally skipped via `matchMedia` check in `useEffect` |
| VFX-05 | Animations only use `transform` and `opacity` (GPU-composited, no layout thrashing) | Enforced by using only `opacity`, `y` (translateY), and `scale` in motion variants — never `height`, `width`, `margin`, `padding` |
| TECH-01 | Site remains a Next.js static export compatible with Cloudflare Pages | All animation components use `"use client"` and no SSR-only APIs; lenis and motion both work in static export |
| TECH-02 | No hydration mismatches — theme detection uses CSS media queries, not JS on initial render | Lenis initialized in `useEffect` only (client-only); motion components pre-render fine on server; `useReducedMotion` defaults to `true` on server (no mismatch) |
| TECH-04 | Animation components use `"use client"` directive; static content stays server-renderable | Provider components (`LenisProvider`, `MotionConfig` wrapper) are client components; all page content and section text remain server components |
</phase_requirements>

---

## Summary

Phase 2 establishes two classes of animation primitives: **scroll entrance animations** (sections fade and slide up as they enter the viewport) and **smooth scroll** (the native scroll is replaced with a physically-weighted feel via Lenis). Both must be completely transparent to visitors with `prefers-reduced-motion` enabled — not "skipped" or "instant" but entirely absent.

The standard stack for this phase is `motion` (version 12.x, formerly Framer Motion) for scroll entrance animations and `lenis` (version 1.3.x) for smooth scroll. These two libraries are independent and do not conflict. Both are installed as runtime dependencies. `motion` is the current package name — `framer-motion` is the legacy name and still works, but the canonical import path is now `motion/react`.

The critical constraint is TECH-02 and TECH-04: animation-related components must use `"use client"` so they never run server-side, while all static HTML content remains server-rendered. This prevents hydration mismatches. The pattern is a thin client-side provider shell wrapping server-rendered children — not converting entire pages to client components.

**Primary recommendation:** Create two provider components (`LenisProvider` and `MotionProvider`) placed in `src/app/layout.tsx`, then create a reusable `FadeInSection` component that all future section components wrap themselves in. This delivers all three requirements (smooth scroll, scroll animations, reduced-motion) with minimal surface area and no per-section boilerplate.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` | 12.38.0 | Scroll entrance animations, `whileInView`, stagger, reduced-motion config | Industry standard for React animation; has React 19 support; `motion/react` is the current import path replacing `framer-motion` |
| `lenis` | 1.3.19 | Smooth scroll — normalizes trackpad/wheel/touch, physically-weighted inertia | The de-facto smooth scroll library for marketing sites; `lenis/react` sub-path included in same package |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lenis/react` | (included in `lenis`) | `<ReactLenis>` component and `useLenis` hook | Always — use this instead of manually instantiating `Lenis` in `useEffect` |
| `motion/react` | (included in `motion`) | `<motion.div>`, `<MotionConfig>`, `useReducedMotion` | Always — this is the import path for all React-specific motion APIs |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` (12.x) | Pure CSS `@keyframes` + IntersectionObserver + Tailwind | CSS-only is zero-dependency but requires hand-rolling stagger, viewport detection, and reduced-motion — all solved by `motion` already. Given the project already needs animation for Phases 3-4, installing `motion` now amortizes the cost. |
| `motion` (12.x) | `@formkit/auto-animate` | Auto-animate is great for list animations but has no `whileInView` or scroll primitives — wrong tool here |
| `lenis` | `scroll-behavior: smooth` in CSS | CSS smooth scroll is already set in `globals.css` (Phase 1). Lenis adds inertia, weight, and cross-browser consistency. For marketing-grade feel, Lenis is the difference that matters. |

**Installation:**
```bash
npm install motion lenis
```

**Version verification (confirmed 2026-03-22):**
```bash
npm view motion version    # 12.38.0
npm view lenis version     # 1.3.19
```

---

## Architecture Patterns

### Recommended Structure After Phase 2

```
src/
├── app/
│   ├── layout.tsx              # MODIFIED: wrap body with LenisProvider + MotionProvider
│   │                           # import lenis/dist/lenis.css here
│   └── globals.css             # UNCHANGED (Phase 1 output)
├── components/
│   ├── providers/
│   │   ├── LenisProvider.tsx   # NEW: "use client" — ReactLenis root wrapper
│   │   └── MotionProvider.tsx  # NEW: "use client" — MotionConfig with reducedMotion="user"
│   └── ui/
│       └── FadeInSection.tsx   # NEW: "use client" — motion.div with whileInView + variants
└── (all existing files unchanged)
```

### Pattern 1: Root Layout Provider Composition

**What:** Server layout renders client providers as wrappers around server-rendered children.
**When to use:** Required — this is the correct pattern to satisfy TECH-04 (client for animation, server for content).

```tsx
// src/app/layout.tsx — server component, no "use client"
import { LenisProvider } from '@/components/providers/LenisProvider';
import { MotionProvider } from '@/components/providers/MotionProvider';
import 'lenis/dist/lenis.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
```

**Why `MotionProvider` wraps `LenisProvider`:** `MotionConfig` must be an ancestor of all `motion.*` elements to propagate `reducedMotion="user"`. Lenis is independent and does not need to be inside the motion tree.

### Pattern 2: LenisProvider

**What:** Wraps the entire app in `<ReactLenis root>` with `autoRaf: true`. Conditionally skips initialization when `prefers-reduced-motion` is enabled.
**When to use:** Once, in root layout.

```tsx
// src/components/providers/LenisProvider.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // When reduced-motion is active, render children without Lenis
  // so native scroll behavior is fully preserved
  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

**Critical:** `ReactLenis` with `root` prop attaches to `<html>` scroll. Do NOT use `root` with a custom wrapper `<div>` — it creates a nested scroll container.

**Hydration safety:** The `reducedMotion` state starts as `false` on server (matches server render of `<ReactLenis>` active). Then `useEffect` runs on client and may switch to `true` (no Lenis rendered). This means a brief flash of Lenis initialization before the switch. The safer default is to start as `true` (no Lenis), then enable on client. See Pitfall 3 for the fix.

### Pattern 3: MotionProvider

**What:** Wraps the app in `<MotionConfig reducedMotion="user">` to propagate reduced-motion policy to all `motion.*` elements.
**When to use:** Once, in root layout.

```tsx
// src/components/providers/MotionProvider.tsx
'use client';

import { MotionConfig } from 'motion/react';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

**What `reducedMotion="user"` does:** When the visitor has `prefers-reduced-motion: reduce` set in their OS:
- All `transform` and `layout` animations in motion components are **completely disabled** (elements jump to their final state with no animation)
- `opacity` and `backgroundColor` animations **are preserved** (these are not motion-inducing)

**Important note for VFX-04:** The requirement says animations should be "completely absent (not just skipped)." With `reducedMotion="user"`, transform animations are disabled — elements snap to their final state instantly. Since the initial state for `FadeInSection` is `opacity: 0, y: 20`, with reduced motion the element will instantly appear at `opacity: 1, y: 0` with no transition. This satisfies "completely absent" in that no motion occurs. If a true "no opacity change either" behavior is needed, use `useReducedMotion()` hook in `FadeInSection` and set `initial` to the final state when reduced motion is active.

### Pattern 4: FadeInSection Component

**What:** Reusable entrance animation wrapper. Sections import and wrap their content in this.
**When to use:** On every major section component in Phases 3-4.

```tsx
// src/components/ui/FadeInSection.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
    },
  },
};

export function FadeInSection({ children, className, delay = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      variants={containerVariants}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

// Export item variant for child stagger use
export { itemVariants };
```

**Usage in a section component:**
```tsx
// Any section — server component, no "use client"
import { FadeInSection, itemVariants } from '@/components/ui/FadeInSection';
import { motion } from 'motion/react'; // still works in server component tree

export function FeaturesSection() {
  return (
    <FadeInSection>
      <motion.h2 variants={itemVariants}>Features</motion.h2>
      <motion.p variants={itemVariants}>Content...</motion.p>
    </FadeInSection>
  );
}
```

**Wait** — `motion.h2` inside a server component will cause an error. Server components cannot use `motion.*` directly. Only the wrapper `FadeInSection` is a client component. Children with `motion.*` must either be in a client component themselves, or the stagger pattern must use CSS custom properties / regular HTML elements instead. See Anti-Patterns below.

### Correct Stagger Pattern for Server Components

For server-rendered section content, the stagger happens at the section level (the section fades in as a unit). Per-child stagger requires the children to also be in client component scope:

```tsx
// Option A: Section fades as unit (server-friendly)
// FadeInSection is "use client", children are regular HTML
export function HeroSection() {
  return (
    <FadeInSection className="py-24">
      <h1>Headline</h1>   {/* these are regular HTML, no variants */}
      <p>Subtext</p>
    </FadeInSection>
  );
}

// Option B: Per-child stagger (requires "use client" on section)
'use client';
import { motion } from 'motion/react';
import { containerVariants, itemVariants } from '@/components/ui/FadeInSection';

export function FeatureGrid() {
  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {features.map((f) => (
        <motion.div key={f.id} variants={itemVariants}>{f.title}</motion.div>
      ))}
    </motion.div>
  );
}
```

VFX-01 says "staggered fade-in entrance animations." To achieve actual per-card stagger for a feature grid, the grid component must be a client component. This is expected and correct — mark interactive/animated section components with `"use client"`, keep static text blocks as server components.

### Anti-Patterns to Avoid

- **Using `motion.*` directly in server components:** Causes build errors. Only use `motion.*` inside `"use client"` files.
- **Animating `height`, `width`, `margin`, or `padding`:** Triggers layout/paint — violates VFX-05. Use `transform: scaleY()` or `opacity` for show/hide effects.
- **`viewport={{ once: false }}`:** Animating every time the section scrolls in/out causes animation fatigue. Always use `once: true`.
- **Putting Lenis in a `<div>` wrapper without `root` prop:** Creates a separate scroll container — the page will have broken scroll behavior.
- **Instantiating `new Lenis()` in `useEffect` instead of `<ReactLenis>`:** Duplicates the RAF loop. Use the React component.
- **Using `lenis/dist/lenis.css` inside a client component import:** CSS must be imported in the server layout (`src/app/layout.tsx`) or `globals.css`, not inside a `"use client"` file.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll entrance animation | IntersectionObserver + class toggle + CSS transitions | `motion/react` `whileInView` | Hand-rolled approach requires: managing observer lifecycle, handling stagger delays manually, wiring reduced-motion, unobserving after trigger. Motion handles all of this. |
| Smooth scroll inertia | Custom `requestAnimationFrame` loop with easing | `lenis` + `<ReactLenis>` | Getting cross-device scroll normalization (trackpad, touch, wheel) right is 500+ lines of edge-case code. Lenis solves it. |
| Reduced-motion policy | Manual `matchMedia` + conditional class on every component | `<MotionConfig reducedMotion="user">` | One line at the root. No per-component logic. |
| Stagger timing | CSS `animation-delay` with nth-child | `staggerChildren` in motion variants | Motion stagger is dynamic (works for variable-length lists); CSS nth-child requires knowing the count at build time. |

**Key insight:** Both `motion` and `lenis` are zero-configuration for the 90% case. The primitives this phase builds are thin wrappers around them — the complexity lives in the library, not the codebase.

---

## Common Pitfalls

### Pitfall 1: Hydration Mismatch from `useReducedMotion` Server/Client Disagreement

**What goes wrong:** `useReducedMotion()` returns `null` on the server (no `window.matchMedia` available), but returns `true` or `false` on the client. If the initial state of a motion component depends on this value, the server renders one thing and the client hydrates with something different — React throws a hydration warning.

**Why it happens:** The hook reads a browser API that does not exist during server-side rendering. Next.js renders the server HTML first, then the client React takes over.

**How to avoid:** In `FadeInSection`, when `shouldReduceMotion` is `null` (server render), treat it as `false` (animations enabled). This means the server and client initial render agree. The reduced-motion check fires after hydration via `useEffect` inside motion's hook.

**Warning signs:** Console error: "Hydration failed because the server rendered HTML did not match the client." Combined with motion components in your component tree.

### Pitfall 2: `motion.*` Used in Server Components

**What goes wrong:** `motion.div`, `motion.h2`, etc. from `motion/react` require the React client context to work. Using them in server components (no `"use client"` directive) causes a build error or runtime crash.

**Why it happens:** Motion components rely on React hooks internally, which are only valid in client components.

**How to avoid:** Only use `motion.*` elements inside files marked `"use client"`. Server components pass children to client animation wrappers — they never use motion primitives directly.

**Warning signs:** Build error mentioning "hooks can only be called inside of the body of a function component" or similar React context errors.

### Pitfall 3: Lenis Activating for Reduced-Motion Users

**What goes wrong:** If `LenisProvider` initializes `<ReactLenis>` unconditionally, users with `prefers-reduced-motion: reduce` get Lenis smooth scroll, which physically simulates inertia. This is exactly the kind of motion those users are trying to avoid.

**Why it happens:** Lenis does not auto-check `prefers-reduced-motion`. It must be conditionally mounted.

**How to avoid:** Default the `reducedMotion` state to `true` (Lenis disabled) during SSR and initial render, then switch to `false` (Lenis enabled) only after the client-side `matchMedia` check confirms the user has no motion preference. Pattern:

```tsx
// Hydration-safe: server renders no Lenis (state = true = skip Lenis)
// Client useEffect: check matchMedia and switch to false if no preference
const [skipLenis, setSkipLenis] = useState(true); // default: no Lenis

useEffect(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  setSkipLenis(mq.matches); // false if user has no preference
  // ... add change listener
}, []);
```

This means the Lenis CSS and JS are only activated on the client after confirming the user preference. The brief no-Lenis initial render is imperceptible.

**Warning signs:** Smooth scroll inertia present when OS "Reduce Motion" is enabled.

### Pitfall 4: `lenis/dist/lenis.css` Import in Wrong Location

**What goes wrong:** Importing `lenis/dist/lenis.css` inside a `"use client"` component causes Next.js to complain about CSS imports in client modules, or the CSS fails to apply globally.

**Why it happens:** Next.js CSS import rules differ between server and client components.

**How to avoid:** Import `lenis/dist/lenis.css` only in the root server layout (`src/app/layout.tsx`) or in `globals.css` via `@import`.

**Warning signs:** Build warning "CSS cannot be imported from a client component" or scroll container styling breaking.

### Pitfall 5: Lenis `root` Prop Creates Wrong Scroll Container

**What goes wrong:** Using `<ReactLenis>` without `root` prop, or with `root` but wrapping a non-body div, creates a custom scroll container. The page's native scroll stops working; links, anchor navigation, and keyboard scroll may break.

**Why it happens:** Without `root={true}`, Lenis creates its own scroll container on the wrapper element rather than attaching to `<html>`.

**How to avoid:** Always use `<ReactLenis root>` (with the `root` prop) when integrating at the layout level. This tells Lenis to manage the `<html>` element's scroll.

**Warning signs:** Page can no longer be scrolled with the keyboard; anchor links stop jumping to the right position; browser scroll position indicator disappears.

### Pitfall 6: Animating Layout Properties (Violates VFX-05)

**What goes wrong:** Animating `height`, `maxHeight`, `padding`, `margin`, or `width` triggers layout recalculation (reflow) on every animation frame — expensive on low-end devices, causes jank.

**Why it happens:** CSS layout properties are not compositor-only. Any change forces the browser to recalculate positions of surrounding elements.

**How to avoid:** Only animate `opacity` and `transform` properties. For entrance animations: `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }`. For reveal effects: `scaleY`, `scaleX`. Never animate `height: 0 → auto`.

**Warning signs:** Scroll jank or dropped frames visible in Chrome DevTools Performance tab; "Layout" tasks appearing in the flame chart during animation.

---

## Code Examples

### Complete LenisProvider (hydration-safe)

```tsx
// Source: lenis/react README + Josh W. Comeau reduced-motion pattern
// src/components/providers/LenisProvider.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // Default to true (no Lenis) — matches server render, avoids hydration mismatch
  const [skipLenis, setSkipLenis] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSkipLenis(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSkipLenis(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (skipLenis) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

**Note on brief no-Lenis flash:** With this pattern, Lenis activates on the first client render after hydration. For most users (no reduced motion preference), this is the default. The flash is: server renders no-Lenis → client mounts → `useEffect` fires → `skipLenis` becomes `false` → `ReactLenis` mounts. In practice this is imperceptible (< 100ms).

### Complete MotionProvider

```tsx
// Source: motion.dev docs (MotionConfig API)
// src/components/providers/MotionProvider.tsx
'use client';

import { MotionConfig } from 'motion/react';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

### FadeInSection with Full Reduced-Motion Handling

```tsx
// Source: motion.dev docs (whileInView, useReducedMotion, variants)
// src/components/ui/FadeInSection.tsx
'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'section' | 'div' | 'article';
};

export function FadeInSection({ children, className, delay = 0, as = 'section' }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const MotionEl = motion[as];

  return (
    <MotionEl
      className={className}
      variants={sectionVariants}
      // When reduced motion: start at final state (visible), no animation plays
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </MotionEl>
  );
}
```

### Root Layout with Providers

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { MotionProvider } from '@/components/providers/MotionProvider';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = { /* existing */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package with `motion/react` imports | Late 2024 | Same API, new package name. `framer-motion` still works but is the legacy path. |
| `@studio-freight/lenis` | `lenis` (official package from darkroomengineering) | 2023-2024 | `@studio-freight/lenis` and `@studio-freight/react-lenis` are deprecated. Use `lenis` only. |
| Manual `new Lenis()` in `useEffect` | `<ReactLenis root>` component from `lenis/react` | Lenis 1.x | Provider component eliminates boilerplate and handles cleanup correctly. |
| Scroll event listeners for entrance animations | `IntersectionObserver` → `motion` `whileInView` | 2020-2022 | `whileInView` is higher-level and handles observer lifecycle, stagger, and SSR automatically. |

**Deprecated/outdated:**
- `@studio-freight/lenis`: Archived, no updates. Use `lenis` instead.
- `@studio-freight/react-lenis`: Archived. Use `lenis/react` sub-path from `lenis` package.
- `framer-motion` package name: Superseded by `motion`, though the npm package still works and auto-redirects.

---

## Open Questions

1. **`lenis/dist/lenis.css` contents — is it required?**
   - What we know: The Lenis README states "Import stylesheet." The CSS likely resets certain scroll-related properties to prevent visual glitches.
   - What's unclear: Whether omitting it causes visible problems on this site.
   - Recommendation: Always import it as documented. Add to `src/app/layout.tsx`.

2. **Anchor navigation with Lenis and Next.js `<Link>` component**
   - What we know: Lenis 1.3.19 changelog mentions "fix stopInertiaOnNavigate and anchors compatibility." The `anchors: true` option enables Lenis to handle anchor link scrolling.
   - What's unclear: Whether Next.js `<Link href="#section">` works seamlessly with Lenis's anchor handling or requires additional configuration.
   - Recommendation: Enable `anchors: true` in Lenis options. Test anchor navigation manually after integration. If broken, use `lenis.scrollTo('#section')` via `useLenis` hook.

3. **Should `scroll-behavior: smooth` in `globals.css` be removed when Lenis is active?**
   - What we know: Phase 1 set `scroll-behavior: smooth` on `html` in `globals.css`. Lenis overrides native scroll behavior, so this CSS property becomes a no-op when Lenis is active.
   - What's unclear: Whether the CSS property conflicts with Lenis or simply does nothing.
   - Recommendation: Remove `scroll-behavior: smooth` from `globals.css` in Phase 2. Lenis owns scroll behavior. The CSS property is redundant and could cause unexpected native scroll on reduced-motion users (who skip Lenis).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no jest/vitest detected; build + lint is the validation strategy (established in Phase 1) |
| Config file | None |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VFX-01 | FadeInSection component exists and uses `whileInView` | build smoke | `npm run build` (TypeScript compile fails if component missing) | ❌ Wave 0 |
| VFX-02 | Lenis provider mounted in root layout | build smoke | `npm run build` | ❌ Wave 0 |
| VFX-04 | `MotionConfig reducedMotion="user"` present; Lenis skipped on reduced-motion | manual | Test in browser with OS reduced-motion enabled; verify no scroll inertia and no entrance animation motion | N/A |
| VFX-05 | No layout properties animated | code review | `grep -r "animate.*height\|animate.*width\|animate.*margin\|animate.*padding" src/` | N/A |
| TECH-01 | Build succeeds and produces `out/` directory | build smoke | `npm run build` | N/A |
| TECH-02 | No hydration warning in browser console | manual | Open Chrome DevTools console, navigate to site; no hydration errors | N/A |
| TECH-04 | Provider files have `"use client"` directive | automated grep | `grep -L '"use client"' src/components/providers/*.tsx` (should return empty) | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — catches TypeScript and module resolution errors immediately
- **Per wave merge:** `npm run build && npm run lint` — zero warnings required
- **Phase gate:** Build green + manual browser test with OS reduced-motion enabled + hydration check in DevTools

### Wave 0 Gaps

- [ ] `src/components/providers/LenisProvider.tsx` — new file, covers VFX-02 + VFX-04 (lenis side)
- [ ] `src/components/providers/MotionProvider.tsx` — new file, covers VFX-04 (motion side)
- [ ] `src/components/ui/FadeInSection.tsx` — new file, covers VFX-01 + VFX-05
- [ ] Root layout modification to import and wrap with both providers — covers TECH-01, TECH-02, TECH-04
- [ ] No test framework setup needed — `npm run build` validates TypeScript correctness

---

## Sources

### Primary (HIGH confidence)
- `npm view motion version` / `npm view lenis version` — Package versions verified 2026-03-22
- motion.dev docs (via WebSearch verified against official source) — `MotionConfig reducedMotion="user"` behavior, `whileInView` API, `staggerChildren` pattern, `useReducedMotion` hook
- `https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md` — ReactLenis component API, `root` prop, `useLenis` hook signature
- `https://bridger.to/lenis-nextjs` — Next.js App Router integration pattern with `autoRaf: true`
- `https://motion.dev/docs/react-accessibility` — Confirmed `reducedMotion="user"` disables transform/layout, preserves opacity (WebSearch citation)

### Secondary (MEDIUM confidence)
- `https://inhaq.com/blog/framer-motion-complete-guide-react-nextjs-developers.html` — Import path `motion/react` confirmed, `MotionConfig` pattern, stagger + `whileInView` example
- `https://www.joshwcomeau.com/react/prefers-reduced-motion/` — SSR-safe reduced-motion hook pattern (default `true` on server)
- WebSearch: `lenis` renamed from `@studio-freight/lenis`, React 19 support confirmed in latest version

### Tertiary (LOW confidence)
- Lenis `scroll-behavior: smooth` conflict — inferred from library behavior, not explicitly documented

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified from npm registry; both libraries confirmed React 19 compatible
- Architecture: HIGH — provider composition pattern is well-documented Next.js App Router practice; lenis/react README confirms `<ReactLenis root>` API
- Pitfalls: HIGH for hydration/SSR pitfalls (directly observed in community issues); MEDIUM for anchor navigation edge case (not personally verified)

**Research date:** 2026-03-22
**Valid until:** 2026-09-22 (motion and lenis are stable; API unlikely to change before then)
