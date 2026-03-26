# Phase 5: Visual Polish - Research

**Researched:** 2026-03-25
**Domain:** CSS/SVG decorative effects, CSS gradient glows, responsive audit — all implemented in Next.js 15 / Tailwind CSS 3.4 static export
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VFX-03 | Section dividers use thin elegant SVG lines replacing ASCII separators | `<hr>` elements already in page.tsx — replace with an `SvgDivider` server component; pure SVG/CSS, no new packages |
| HERO-02 | Hero section has ambient blue-tinted glow effect that adapts to theme | CSS `radial-gradient` positioned absolutely behind HeroSection content; theme adaptation via CSS custom properties; no JS, SSR-safe |
</phase_requirements>

---

## Summary

Phase 5 has exactly two feature requirements (VFX-03, HERO-02) plus a responsive audit obligation implied by the success criteria. Every tool needed to implement them is already in the project.

**VFX-03 — SVG section dividers.** The five `<hr className="border-t border-border" />` elements in `page.tsx` (and two in `DownloaderLandingPage.tsx`) are the only remaining plain dividers. The replacement is a simple server-rendered React component that renders an SVG `<line>` with a `linearGradient` fill: solid in the center, fading to transparent at both ends. This gives the "thin, elegant" line described in the requirement without any JavaScript, animations, or new packages. The SVG approach also sidesteps the cross-browser `<hr>` styling inconsistencies that would arise from trying to achieve a fade via CSS border alone.

**HERO-02 — Ambient glow.** The hero glow is a `position: absolute` decorative `<div>` placed inside the `HeroSection` container, using a CSS `radial-gradient` from `var(--color-accent)` (blue) at low opacity to fully transparent. Because it uses the CSS custom property `--color-accent` directly, the value automatically adapts when the dark/light `@media (prefers-color-scheme: dark)` block switches the accent from `#2563eb` (light) to `#3b82f6` (dark) — no JavaScript required, no hydration risk, no `dark:` Tailwind prefixes needed. The dark theme uses a lower opacity (the background is near-black so even a 12–18% opacity glow is visible and dramatic); the light theme needs an even lower opacity (5–8%) to avoid washing out the white background.

**Responsive audit.** The success criteria require the site to look intentional at 375px (mobile), 768px (tablet), and 1280px+ (desktop). This is a verification task, not a new implementation: the existing Tailwind responsive classes and container constraints were built with these breakpoints in mind. The audit identifies any overflow, text size, spacing, or layout issues that escaped phase-by-phase testing and fixes them.

**Primary recommendation:** Implement both VFX-03 and HERO-02 as pure CSS/SVG — no new packages. Treat the responsive audit as a structured checklist against the three viewport widths in browser DevTools.

---

## Standard Stack

### Core (all already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^15.1.0 | Static export, App Router | Project standard |
| react | ^19.0.0 | Component model | Project standard |
| tailwindcss | ^3.4.0 | Utility CSS, responsive breakpoints | Project standard |

**No new installations required.** Both VFX-03 and HERO-02 are pure HTML/CSS/SVG work. Phase 5 has no new runtime dependencies.

---

## Architecture Patterns

### Recommended Project Structure

No new directories needed. New and modified files:

```
src/
├── components/
│   ├── SvgDivider.tsx        # NEW — server component, replaces <hr> with SVG line
│   └── HeroSection.tsx       # MODIFIED — add ambient glow <div> inside existing layout
└── app/[locale]/
    └── page.tsx              # MODIFIED — replace <hr> with <SvgDivider />
```

`DownloaderLandingPage.tsx` also contains two `<hr>` elements. Whether those are in scope for VFX-03 is a planner decision — the requirement says "section dividers" on the site; the downloader landing pages are part of the site. Recommend replacing them too for consistency (out-of-scope per REQUIREMENTS.md DLP-01/DLP-02 which is v2, but VFX-03 doesn't restrict to home page).

### Pattern 1: SvgDivider Component

A server component that renders an inline SVG horizontal rule. The gradient fades from transparent → accent-color → transparent, creating an elegant centerline glow effect.

```tsx
// SvgDivider.tsx — pure server component, no 'use client' needed
type Props = {
  className?: string;
};

export function SvgDivider({ className }: Props) {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className={className}
      width="100%"
      height="1"
      viewBox="0 0 800 1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="divider-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="var(--color-border)" stopOpacity="0" />
          <stop offset="30%"  stopColor="var(--color-border)" stopOpacity="1" />
          <stop offset="70%"  stopColor="var(--color-border)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-border)" stopOpacity="1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="0" x2="800" y2="0" stroke="url(#divider-grad)" strokeWidth="1" />
    </svg>
  );
}
```

**Critical: the `linearGradient` `id` must be unique if multiple `SvgDivider` instances exist on the page.** When multiple SVGs share the same `id="divider-grad"`, only the first definition wins — all subsequent uses will reference that first gradient. This is a well-known SVG pitfall. Solutions:

1. **Use a single shared `<defs>` in the document** — move the gradient definition once into a hidden SVG in layout and reference `url(#divider-grad)` globally. Works but couples layout and component.
2. **Inline unique IDs per instance** — pass a unique `id` prop to each `SvgDivider`. Verbose.
3. **CSS gradient via `::after` pseudo-element instead of SVG** — simpler and avoids the ID collision. The same fade effect can be achieved with CSS `background: linear-gradient(to right, transparent, var(--color-border), transparent)` on a 1px-tall `<div>`. **This is the recommended approach** — no SVG ID scoping issues, pure CSS, equally elegant, SSR-safe.

### Pattern 2: CSS-Only Divider (Recommended Alternative)

Instead of SVG, a styled `<div>` with a CSS gradient achieves the same visual with zero SVG ID concerns:

```tsx
// SvgDivider.tsx — despite the name, implement as CSS gradient div
// (name kept for semantic clarity; implementation is pure CSS)
type Props = {
  className?: string;
};

export function SvgDivider({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--color-border) 30%, var(--color-border) 70%, transparent)',
      }}
    />
  );
}
```

Or as a Tailwind utility class using arbitrary value syntax:

```tsx
<div
  aria-hidden="true"
  className="h-px bg-[linear-gradient(to_right,transparent,var(--color-border)_30%,var(--color-border)_70%,transparent)]"
/>
```

The Tailwind arbitrary value approach is more consistent with the project's styling conventions and avoids inline `style` props (which otherwise don't exist anywhere in the codebase).

### Pattern 3: Hero Ambient Glow

The glow is a `position: absolute` decorative element placed inside `HeroSection`. The `HeroSection` parent already renders `<section id="top" className="flex flex-col gap-6">`. Adding `relative` to the section and inserting an absolutely-positioned glow `<div>` behind the content is the correct approach.

```tsx
// HeroSection.tsx — modified to add ambient glow
export function HeroSection({ tagline, subhead, ctaLabel, siteName }: Props) {
  return (
    <section id="top" className="relative flex flex-col gap-6">
      {/* Ambient glow — decorative, pointer-events-none, aria-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* existing content below */}
      <BitRemoteWordmark />
      ...
    </section>
  );
}
```

**Why `opacity-[0.12]` and `filter: blur(40px)`:**
- Dark theme: `var(--color-accent)` = `#3b82f6`. At 12% opacity with a 40px blur spread over 600×400px, the glow is visible but not garish — a subtle blue halo.
- Light theme: `var(--color-accent)` = `#2563eb`. The same 12% opacity is too strong on white backgrounds; it risks a blue wash. Light mode needs separate treatment.

**Theme adaptation options:**

Option A — single element with CSS variable opacity:
```css
/* In globals.css */
--glow-opacity: 0.12;

@media (prefers-color-scheme: dark) {
  --glow-opacity: 0.15;
}
```
Then in JSX: `style={{ opacity: 'var(--glow-opacity)' }}`. Simple, SSR-safe.

Option B — two CSS variables for the radial gradient:
```css
:root {
  --hero-glow-color: color-mix(in srgb, var(--color-accent) 8%, transparent);
}
@media (prefers-color-scheme: dark) {
  :root {
    --hero-glow-color: color-mix(in srgb, var(--color-accent) 15%, transparent);
  }
}
```
Then in JSX: `style={{ background: 'radial-gradient(ellipse at center, var(--hero-glow-color) 0%, transparent 70%)' }}`. More explicit, bakes the theme opacity into the token. **Recommended** — consistent with the project's CSS variable token system (`--bg-panel-88` uses the same `color-mix` pattern).

Option C — Tailwind `dark:` with `opacity-[var]`:
Using `dark:opacity-[0.15]` requires `darkMode: 'media'` (already set) but Tailwind dark mode utilities only apply to elements with predefined Tailwind utilities — arbitrary values like `dark:opacity-[0.15]` work. However, the project convention is to use CSS variable tokens rather than `dark:` prefix because the design system already handles all theme-switching through `@media (prefers-color-scheme: dark)` in globals.css. **Avoid Option C** to stay consistent with project conventions.

**Final recommendation for glow:** Use Option B (CSS variable `--hero-glow-color` with `color-mix`) defined in `globals.css`, referenced in a `style` inline prop on the glow `<div>`. This is SSR-safe, theme-responsive without JS, and consistent with `--bg-panel-88` / `--bg-glass-92` patterns already in the codebase.

**`filter: blur()` and static export:** CSS `filter: blur()` is fully supported in all modern browsers, requires no JS, and has no interaction with Next.js static export behavior. Safe to use.

**`overflow: hidden` caution:** Adding `position: absolute` to a glow element outside the section's bounding box (`-top-16`) can cause horizontal scroll if the section doesn't clip overflow. The `<main>` in `page.tsx` uses `overflow` implicitly. Add `overflow-x: hidden` or `overflow: hidden` to the `<section>` — but this breaks sticky positioning on child elements. Instead, set `overflow: clip` (not `hidden`) on the main container, which prevents scroll bar appearance without affecting `position: sticky`. Alternatively, size the glow to stay within the section bounds: `top-0` instead of `-top-16` and `max-w-full`.

**Safer approach:** Keep the glow fully within the section bounds using `inset-0` for the container and centering the gradient via `background-position`:

```tsx
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 overflow-hidden"
>
  <div
    className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] aspect-[3/2]"
    style={{
      background: 'radial-gradient(ellipse at center, var(--hero-glow-color) 0%, transparent 70%)',
      filter: 'blur(60px)',
    }}
  />
</div>
```

The outer `overflow-hidden` clips any bleed; since it's inside the section (not above the nav), sticky nav behavior is unaffected.

### Pattern 4: Responsive Audit Protocol

The responsive audit is a structured manual verification, not a code change. The audit covers these checkpoints at each viewport:

| Viewport | Width | Key Checks |
|----------|-------|------------|
| Mobile | 375px | Nav overflow, hero text size/wrapping, bento grid single-column, glow doesn't bleed, touch targets ≥ 44px |
| Tablet | 768px | Bento grid 2-column, showcase section layout, nav not showing truncated items |
| Desktop | 1280px+ | Max-width container respected, 3-column bento, glow positioned correctly |

Current Tailwind breakpoints in use: `sm:` (640px), `md:` (768px), `lg:` (1024px). The main container uses `max-w-6xl` (72rem = 1152px), which clips at 1280px screens — appropriate.

Known responsive areas to audit:
- `TextTabsNav` at 375px: The nav has `overflow-x-auto` for tabs, and the App Store CTA is `hidden min-[480px]:block`. At 375px, only the tab links scroll — verify this doesn't conflict with Lenis scroll capture.
- `HeroSection` tagline: `text-[clamp(2rem,4vw,3rem)]` — at 375px this clamps to 2rem, which is correct. Verify the line doesn't wrap awkwardly for long Japanese/Chinese taglines.
- `BentoGridClient` at 375px: `grid-cols-1` — single column. Cards should fill width.
- `AppShowcase` layout: Check iPhone frame doesn't overflow at 375px.

### Anti-Patterns to Avoid

- **Unique SVG `linearGradient` IDs without scoping:** Multiple `<SvgDivider>` on the same page will conflict. Use CSS gradient div instead.
- **`filter: blur()` on elements outside overflow bounds:** Causes horizontal scrollbar. Always wrap the glow in an `overflow-hidden` container sized to the section.
- **Using `dark:` Tailwind prefix for glow opacity:** Inconsistent with project CSS variable token pattern. Use `color-mix` CSS variable in globals.css.
- **Animating the glow with `motion/react`:** The glow is decorative and static. Adding animation (even a subtle pulse) would require `'use client'`, conflict with `prefers-reduced-motion`, and add unnecessary complexity. Keep it static CSS.
- **Using `backdrop-filter` on the glow div:** The glow should be a gradient orb, not a blur effect on content behind it. `filter: blur()` blurs the gradient itself (spreads it out softly) — this is correct. `backdrop-filter: blur()` blurs what's behind the element — this is not what's wanted.
- **Adding the glow above the nav (z-index issues):** The glow must be inside `HeroSection` which is a child of `<main>`, well below the sticky nav (`z-10`). No z-index conflicts expected.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fading divider line | Custom SVG per component | CSS gradient `<div>` with Tailwind arbitrary value | No SVG ID scoping issues, simpler markup |
| Theme-adaptive glow color | JavaScript `window.matchMedia` listener | CSS `color-mix()` variable in globals.css | SSR-safe, instant response, no hydration risk |
| Responsive layout | Media query JS hooks | Existing Tailwind `sm:`/`md:`/`lg:` breakpoints | Already in use throughout the project |
| Reduced-motion glow | Manual `prefers-reduced-motion` check in JS | Static CSS — the glow has no animation, no check needed | Glow is a static gradient; doesn't move |

**Key insight:** Both requirements are pure CSS. No new packages, no client components, no JavaScript. The project already has the design token system and responsive primitives that make this trivial.

---

## Common Pitfalls

### Pitfall 1: SVG `linearGradient` ID Collision

**What goes wrong:** Multiple `<SvgDivider>` components render on the page. All reference `url(#divider-grad)`. The browser uses the first `<linearGradient id="divider-grad">` it encounters for all of them — later definitions are ignored. All dividers end up rendering with the same gradient, which may not be the intended result if gradients differ.
**Why it happens:** SVG `id` attributes are document-scoped. Multiple inline SVGs with the same `id` are a well-known gotcha.
**How to avoid:** Use a CSS gradient `<div>` instead of an SVG — the `background: linear-gradient()` approach has no ID scoping at all.
**Warning signs:** After replacing the second `<hr>`, the dividers look different from the first one despite identical markup.

### Pitfall 2: Glow Causing Horizontal Scrollbar

**What goes wrong:** The hero glow `<div>` extends beyond the horizontal viewport edge, creating a horizontal scrollbar on mobile.
**Why it happens:** `position: absolute` with `left: 50%` and `width: 600px` bleeds outside narrow viewports. The `overflow: hidden` that would clip it needs to be on a containing block, not a distant ancestor.
**How to avoid:** Wrap the glow in a `position: absolute; inset: 0; overflow: hidden` container directly around it inside `HeroSection`. This clips any bleed without affecting Lenis scroll or sticky nav.
**Warning signs:** Horizontal scrollbar appears at 375px in browser DevTools.

### Pitfall 3: Glow Opacity Too Strong on Light Theme

**What goes wrong:** The glow that looks subtle on dark backgrounds (`#0a0a0a`) appears as a vivid blue blotch on white (`#ffffff`) at the same opacity.
**Why it happens:** Dark backgrounds absorb the blue halo; white backgrounds reflect it fully.
**How to avoid:** Use separate `--hero-glow-color` CSS variable values for dark and light modes. In `:root` (light theme), use a much lower opacity via `color-mix(in srgb, var(--color-accent) 6%, transparent)`. In the dark media query, use `color-mix(in srgb, var(--color-accent) 14%, transparent)`.
**Warning signs:** The hero looks washed in blue when viewed in light mode.

### Pitfall 4: Glow Appearing Above or Behind Other Elements (z-index)

**What goes wrong:** The glow `<div>` appears on top of text content, making it difficult to read.
**Why it happens:** Absolute positioning creates a new stacking context. Without an explicit `z-index: -1` on the glow or a stacking context on the section, natural document order may place the glow above subsequent siblings in the same section.
**How to avoid:** Either (a) place the glow as the first child of the section and give it `z-index: -1` with the section having `isolation: isolate`, or (b) use CSS variable order: place the glow before content children in JSX and rely on paint order (content below glow in the DOM is painted on top). The wrapper pattern with a containing `overflow-hidden` div is cleanest. Test explicitly.
**Warning signs:** Text in the hero section appears faint or blurry because the glow `<div>` is painted over it.

### Pitfall 5: Responsive Audit Misses Non-English Content

**What goes wrong:** Responsive audit is performed only in English. Japanese and Chinese strings are longer or shorter, breaking text wrapping at critical widths.
**Why it happens:** English strings are the developer's native testing path.
**How to avoid:** Test responsive breakpoints with at least one non-Latin locale (Japanese recommended — longest strings). The `tagline` in Japanese may wrap differently at 375px.
**Warning signs:** Japanese hero tagline overflows its container or wraps to 4 lines at mobile width.

### Pitfall 6: `overflow-hidden` on Section Breaking Sticky Nav

**What goes wrong:** Developer adds `overflow: hidden` to `<section id="top">` to clip the glow. This doesn't affect the sticky nav (which is outside `<main>`), but it would prevent any child `position: sticky` elements within the section from working.
**Why it happens:** `overflow: hidden` and `overflow: clip` have the same effect for static positioning but different effects on sticky children.
**How to avoid:** If clipping is needed, use `overflow: clip` (CSS, not `hidden`) which clips without establishing a scroll container and doesn't affect `position: sticky`. In the HeroSection there are no sticky children, so `overflow-hidden` on the inner glow wrapper is fine. Do NOT add `overflow-hidden` to the outer `<section>` tag.
**Warning signs:** This pitfall has no warning sign until sticky elements are added inside the section; it's a future-proofing concern. Safe to use `overflow-clip` now.

---

## Code Examples

### SvgDivider as CSS Gradient (Recommended)

```tsx
// Source: CSS linear-gradient pattern, Tailwind arbitrary values
// src/components/SvgDivider.tsx

type Props = {
  className?: string;
};

export function SvgDivider({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={
        'h-px bg-[linear-gradient(to_right,transparent,var(--color-border)_25%,var(--color-border)_75%,transparent)]' +
        (className ? ' ' + className : '')
      }
    />
  );
}
```

Usage in `page.tsx`:
```tsx
// Replace: <hr className="border-t border-border" />
// With:
<SvgDivider />
```

### Hero Glow CSS Token (globals.css addition)

```css
/* Add to :root block in globals.css */
:root {
  --hero-glow-color: color-mix(in srgb, var(--color-accent) 6%, transparent);
}

@media (prefers-color-scheme: dark) {
  :root {
    --hero-glow-color: color-mix(in srgb, var(--color-accent) 14%, transparent);
  }
}
```

### Hero Ambient Glow in HeroSection.tsx

```tsx
// Source: CSS radial-gradient pattern, project CSS variable token system
// Modified: src/components/HeroSection.tsx

export function HeroSection({ tagline, subhead, ctaLabel, siteName }: Props) {
  return (
    <section id="top" className="relative flex flex-col gap-6">
      {/* Ambient glow — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] aspect-[3/2]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--hero-glow-color) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Existing content — unchanged below this line */}
      <BitRemoteWordmark />
      <h1 className="sr-only">{siteName}</h1>
      ...
    </section>
  );
}
```

### Responsive Breakpoints Already in Use

The project uses standard Tailwind breakpoints. No changes needed — audit only:

```
375px  → default (no prefix)  — mobile
640px  → sm:                  — small tablet
768px  → md:                  — tablet
1024px → lg:                  — desktop
```

Container width: `max-w-6xl` = 72rem = 1152px. With `px-4` gutter, content is 1120px max on wide screens.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no unit test framework installed |
| Config file | Not present |
| Quick run command | `npm run lint` (ESLint, < 10s) |
| Full suite command | `npm run build` (Next.js static export, ~30–60s) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VFX-03 | SVG dividers render instead of `<hr>` | build + manual visual | `npm run build` | N/A |
| HERO-02 | Ambient glow visible in dark mode, subtle in light mode, no artifacts | manual visual (dark + light mode, 375px/768px/1280px) | — | manual-only |
| (success criteria) | Site renders correctly at 375px, 768px, 1280px | manual responsive audit | — | manual-only |

### Sampling Rate

- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run build`
- **Phase gate:** `npm run build` green + manual visual verification in both dark and light themes at 375px, 768px, 1280px before phase sign-off

### Wave 0 Gaps

None — existing ESLint + TypeScript build infrastructure covers all automated checks. No test files need creating.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<hr className="border-t border-border" />` plain rule | `SvgDivider` CSS gradient fade | Phase 5 (this phase) | VFX-03 requirement |
| No hero glow | CSS `radial-gradient` via `--hero-glow-color` token | Phase 5 (this phase) | HERO-02 requirement |
| ASCII `░` separators | `<hr>` plain rule | Phase 1 | First replacement |

**Deprecated/outdated:**
- `<hr className="border-t border-border" />` in `page.tsx` — replaced by `SvgDivider` in this phase.
- `TextSeparator` component — already removed in Phase 1. Not relevant.

---

## Open Questions

1. **Should `SvgDivider` replace `<hr>` in `DownloaderLandingPage.tsx` as well?**
   - What we know: VFX-03 says "section boundaries are separated by thin, elegant SVG lines — no ASCII separator patterns remain as dividers." The downloader landing pages use `<hr className="border-t border-border my-12" />`.
   - What's unclear: DLP-01 (downloader page visual redesign) is a v2 requirement — but VFX-03 says "no ASCII separator patterns remain," implying full-site scope.
   - Recommendation: Replace them. The `<hr>` is not an ASCII separator, but the requirement implies global consistency. Cost is low (two line substitutions). Planner should make this explicit.

2. **Glow size on mobile (375px)**
   - What we know: The glow uses `w-[80%] max-w-[600px]`. At 375px, 80% = 300px wide. The `aspect-[3/2]` makes it 200px tall. Centered behind the hero.
   - What's unclear: Whether 300×200px with 60px blur is enough to be visible on mobile, or whether it disappears entirely.
   - Recommendation: Increase to `w-[90%]` or `w-full` on mobile. Since it's clipped by `overflow-hidden`, making it larger than needed is safe — it just gets clipped.

3. **Glow interaction with `FadeInSection` on hero**
   - What we know: The hero is wrapped in `<FadeInSection as="div" id="top">`. The glow is inside `HeroSection` which is inside `FadeInSection`. When the section fades in (`opacity: 0 → 1`), the glow fades in as part of the hero — this is correct behavior.
   - What's unclear: Whether the glow needs its own entrance delay vs. appearing with the hero text.
   - Recommendation: Let the glow animate with the hero (`opacity: 0 → 1` at the same time). No separate animation needed.

---

## Sources

### Primary (HIGH confidence)

- Source code inspection: `/Users/tatsuzo/Fork/bitremote-website/src/` — direct read of all relevant files
- `globals.css` — verified existing CSS variable structure, `color-mix` pattern, dark/light media query
- `tailwind.config.ts` — verified `darkMode: 'media'`, breakpoints, color tokens
- `HeroSection.tsx` — verified current markup structure
- `page.tsx` (locale) — verified all five `<hr>` element locations
- `FadeInSection.tsx` — verified animation infrastructure
- Phase 4 RESEARCH.md — confirmed no glow was implemented; `--bg-panel-88` token pattern with `color-mix`

### Secondary (MEDIUM confidence)

- MDN Web Docs (CSS `radial-gradient`) — CSS gradient behavior for decorative backgrounds is well-established
- CSS `color-mix()` support — supported in all evergreen browsers since 2023, confirmed compatible with Next.js static export pattern

### Tertiary (LOW confidence)

None — all findings are from direct source inspection and well-established CSS features.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages, all tools already in project
- Architecture (SvgDivider): HIGH — CSS gradient approach verified by direct source inspection, no SVG ID pitfall
- Architecture (hero glow): HIGH — CSS custom property pattern directly mirrors existing `--bg-panel-88` token in globals.css
- Pitfalls: HIGH — sourced from known CSS/SVG behaviors and direct code inspection
- Responsive audit: MEDIUM — breakpoints verified by source inspection; actual visual issues can only be confirmed by browser testing

**Research date:** 2026-03-25
**Valid until:** 2026-04-25 (stable CSS features, 30-day window)
