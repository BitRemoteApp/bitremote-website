# Phase 3: Screenshot Assets - Research

**Researched:** 2026-03-23
**Domain:** Image optimization pipeline, CSS-driven dark/light image switching, CSS device mockup frames, scroll animation integration
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SHOW-01 | Dedicated showcase section below the hero displays app screenshots in device mockups | AppMockup component + FadeInSection wrapper placed in page.tsx |
| SHOW-02 | Screenshots are shown in realistic device frames (iPhone and/or Mac) | Pure Tailwind CSS device frame pattern — no external library needed |
| SHOW-03 | Dark theme shows dark-mode app screenshots, light theme shows light-mode screenshots | `<picture>` + `prefers-color-scheme` media on `<source>` — zero JS required |
| SHOW-04 | Screenshots animate into view on scroll | Existing FadeInSection component (Phase 2) wraps the showcase section |
| TECH-03 | App screenshots are pre-optimized to WebP before being added to the project | Node.js script using `sharp` (already installed as Next.js transitive dep) |

</phase_requirements>

---

## Summary

Phase 3 has two distinct concerns: (1) preparing the image assets on disk and (2) building the component that renders them. Both are simpler than they appear because the project already has the key infrastructure in place.

**Asset pipeline:** `sharp` 0.34.5 is already present as a transitive dependency of Next.js 15, so converting source PNGs to WebP requires only a short Node.js script — no new package installs. Screenshots go into `public/screenshots/` at the correct retina dimensions and the script writes a 1x and 2x variant for each image.

**Dark/light switching (SHOW-03):** The requirement says "no JavaScript state drives this on initial load." The correct solution is the HTML `<picture>` element with a `media="(prefers-color-scheme: dark)"` attribute on a `<source>` element. This is handled entirely by the browser with zero JS. It pairs perfectly with Next.js static export because the markup is server-rendered.

**Device frames (SHOW-02):** No library is needed. A pure Tailwind CSS iPhone frame (rounded rectangle, notch, side buttons as small absolute divs) is lightweight, fully accessible, and avoids a maintenance burden from an abandoned third-party CSS package. The `devices.css` library exists but was last updated in February 2023 and has no npm package — it would need to be vendored. The Flowbite pattern (pure Tailwind) is the right choice.

**Animation (SHOW-04):** The `FadeInSection` component from Phase 2 is ready to use. Wrap the entire showcase section in `<FadeInSection>`. Individual device frames can use `staggerItemVariants` with `motion.div` for a staggered entrance effect.

**Primary recommendation:** Write a `scripts/optimize-screenshots.mjs` that uses the already-installed `sharp` to batch-convert source PNGs → WebP at 1x and 2x. Build an `AppShowcase` server component that holds pure-Tailwind device frames and `<picture>` elements for CSS-native dark/light switching. Wire it into `page.tsx` wrapped in `FadeInSection`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `sharp` | 0.34.5 (already installed) | PNG → WebP conversion, resize to 1x/2x | Already present as Next.js transitive dep; fastest Node.js image processor |
| `next/image` with `unoptimized` | 15.1.0 (configured) | Serve WebP images with correct sizing | Already configured in `next.config.ts`; `unoptimized: true` is required for `output: 'export'` |
| HTML `<picture>` element | Native | CSS-only dark/light screenshot switching | Browser-native; no JS; works on initial render; pairs perfectly with static export |
| Tailwind CSS | 3.4.0 (already installed) | Pure-CSS device frame construction | No external library needed; fully under project control |
| `motion/react` FadeInSection | 12.38.0 (already installed) | Scroll entrance animation | Phase 2 delivered this; re-use, do not rebuild |

### No New Packages Required

All tools for this phase are already present in the project. No `npm install` needed.

**Version verification:** Confirmed by inspecting `node_modules/sharp` directly — `sharp` 0.34.5 with libwebp 1.6.0.

---

## Architecture Patterns

### Recommended Asset Directory Structure

```
public/
├── screenshots/
│   ├── light/
│   │   ├── iphone-home.webp         # 1x (e.g. 390px wide)
│   │   └── iphone-home@2x.webp      # 2x (e.g. 780px wide)
│   └── dark/
│       ├── iphone-home.webp
│       └── iphone-home@2x.webp
scripts/
└── optimize-screenshots.mjs         # One-off build script
src/
└── components/
    └── AppShowcase.tsx               # Server component, no 'use client'
```

### Recommended Component Structure

```
src/
└── components/
    └── AppShowcase.tsx              # <section> with device frames + <picture>
```

`AppShowcase` is a **server component** (no `'use client'`). It renders only HTML/CSS. The `FadeInSection` wrapper (already a client component) provides the animation layer above it.

### Pattern 1: CSS-only dark/light `<picture>` element

**What:** Use `<source media="(prefers-color-scheme: dark)">` inside `<picture>` to select between dark/light WebP assets with no JavaScript.

**When to use:** Always, for SHOW-03. The `prefers-color-scheme` media query on `<source>` is evaluated by the browser at paint time — no hydration, no flash of wrong image.

**Ordering rule:** Most specific source first. Dark+WebP → Light+WebP → Dark+PNG fallback → `<img>` light PNG fallback.

```tsx
// Source: https://kyoshee.com/articles/guide-to-html-dark-mode-responsive-images
// (verified pattern — MDN-backed)
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    type="image/webp"
    srcSet="/screenshots/dark/iphone-home.webp 1x, /screenshots/dark/iphone-home@2x.webp 2x"
  />
  <source
    type="image/webp"
    srcSet="/screenshots/light/iphone-home.webp 1x, /screenshots/light/iphone-home@2x.webp 2x"
  />
  <img
    src="/screenshots/light/iphone-home.webp"
    alt="BitRemote app home screen"
    width={390}
    height={844}
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Why NOT `next/image`:** `next/image` does not support the `<picture>` element API. For the dark/light switching pattern, a raw `<picture>` element with `<img>` inside is the correct tool.

### Pattern 2: Pure Tailwind CSS iPhone frame

**What:** A static HTML structure using Tailwind utility classes to render a realistic phone outline around the screenshot. No images, no external CSS, no JavaScript.

**When to use:** SHOW-02 — wraps each `<picture>` element.

```tsx
// Source: Verified against Flowbite device-mockups pattern
// https://flowbite.com/docs/components/device-mockups/
// Tailwind-only — no external dependency
<div className="relative mx-auto border-[var(--border)] bg-[var(--bg-elevated)] border-[12px] rounded-[2.5rem] h-[600px] w-[290px] shadow-xl">
  {/* Notch */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[14px] bg-[var(--bg-elevated)] rounded-b-xl" />
  {/* Left volume buttons */}
  <div className="absolute -left-[14px] top-[100px] h-[40px] w-[3px] bg-[var(--bg-elevated)] rounded-l-lg" />
  <div className="absolute -left-[14px] top-[152px] h-[40px] w-[3px] bg-[var(--bg-elevated)] rounded-l-lg" />
  {/* Right power button */}
  <div className="absolute -right-[14px] top-[128px] h-[60px] w-[3px] bg-[var(--bg-elevated)] rounded-r-lg" />
  {/* Screen area */}
  <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
    {/* <picture> element goes here */}
  </div>
</div>
```

**Note:** Use CSS variables (`var(--bg-elevated)`, `var(--border)`) from the project's design token system, not hardcoded colors, so the frame adapts to dark/light theme automatically.

### Pattern 3: Staggered scroll entrance (SHOW-04)

**What:** Wrap the whole showcase section in `FadeInSection` and individual device frame cards in `motion.div` using the `staggerItemVariants` export from `FadeInSection.tsx`.

**When to use:** SHOW-04. Reuses Phase 2 infrastructure exactly as designed.

```tsx
// Source: src/components/ui/FadeInSection.tsx (project file)
import { FadeInSection, staggerContainerVariants, staggerItemVariants } from '@/components/ui/FadeInSection';
import { motion } from 'motion/react';

// In AppShowcase (or its wrapping page section):
<FadeInSection as="section" id="showcase">
  <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
    {screenshots.map((shot) => (
      <motion.div key={shot.id} variants={staggerItemVariants}>
        <IPhoneFrame>
          <AppScreenshot shot={shot} />
        </IPhoneFrame>
      </motion.div>
    ))}
  </motion.div>
</FadeInSection>
```

**Note:** `FadeInSection` uses `'use client'` — the `AppShowcase` wrapper that uses `motion.div` also needs `'use client'`. Keep the pure `<picture>`/`<img>` markup in a nested server component or inline — both approaches work in Next.js 15.

### Pattern 4: Sharp optimization script

**What:** A one-time Node.js script in `scripts/` that reads source screenshots and writes 1x and 2x WebP to `public/screenshots/`.

**When to use:** TECH-03. Run once manually (or as an npm script). Not a build-time step — assets are committed to git.

```js
// scripts/optimize-screenshots.mjs
// Uses sharp already installed at node_modules/sharp
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';

const SOURCE_DIR = 'screenshots-source'; // gitignored raw PNG source
const OUT_DIR = 'public/screenshots';
const QUALITY = 85;

// For each light/dark variant:
// - Read PNG
// - Resize to 1x display size (e.g., width: 390 for iPhone 15)
// - Write WebP
// - Resize to 2x
// - Write @2x WebP
```

### Anti-Patterns to Avoid

- **Using `next/image` for dark/light switching:** `next/image` renders a single `<img>`, not `<picture>`. You cannot attach `prefers-color-scheme` to it natively.
- **Importing `devices.css` from npm:** The only npm result found (`marvelapp/devices.css`) is from 2018 (v0.1.15). The `picturepan2/devices.css` has no npm package and was last updated Feb 2023. Either approach incurs external maintenance risk.
- **CSS `filter: invert()` or `filter: brightness()` to "fake" dark screenshots:** This looks wrong — the actual app screenshots look different in dark mode, not just inverted.
- **JavaScript state to drive image switching:** Violates SHOW-03 and TECH-02. Using `useState` + OS preference detection causes hydration mismatch risk and a flash of wrong content on load.
- **Storing screenshot source PNGs in `public/`:** Large unoptimized PNGs bloat the git repo. Keep source files in a gitignored directory and only commit WebP output.
- **`unoptimized: false` in next.config.ts:** The project is a static export. `next/image` optimization server does not exist at build time for `output: 'export'`. The config already has `unoptimized: true` — leave it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PNG → WebP conversion | Custom ImageMagick wrapper | `sharp` (already installed) | libvips-backed, 4-5x faster than ImageMagick, handles retina resizing cleanly |
| CSS device frame library | Download + vendor `devices.css` | Pure Tailwind utility classes | `devices.css` is unmaintained since 2023, no npm package, adds 20KB CSS; Tailwind pattern is 15 lines |
| Dark/light image selection | JS `useEffect` + `useState` checking `prefers-color-scheme` | HTML `<picture>` + `<source media>` | Browser-native; SSR-safe; zero JS; eliminates hydration mismatch risk |
| Scroll animation | New animation component | Existing `FadeInSection` + `staggerItemVariants` from Phase 2 | Already built and tested; stagger variants were designed exactly for this use case |

**Key insight:** The entire phase can be executed with zero new npm dependencies. Every tool is already in the project.

---

## Common Pitfalls

### Pitfall 1: Wrong `<source>` element ordering in `<picture>`

**What goes wrong:** If the light WebP `<source>` appears before the dark one, dark-mode users always get the light screenshot regardless of OS preference.
**Why it happens:** The browser picks the first matching `<source>`. Without a `media` attribute, a `<source>` matches all conditions.
**How to avoid:** Always put dark (most specific — has a `media` condition) before light (default). The `<img>` fallback is always last.
**Warning signs:** Dark-mode users see light screenshots on initial render.

### Pitfall 2: `motion.div` inside a server component without `'use client'`

**What goes wrong:** Build-time TypeScript error — `motion` from `motion/react` requires the client rendering pipeline.
**Why it happens:** The stagger wrapper uses `motion.div` which is a client component.
**How to avoid:** Any component that imports `motion.div` needs `'use client'`. Split `AppShowcase` into a server component that renders `<picture>` + frame markup, and a thin `AppShowcaseClient` wrapper that applies stagger animation.
**Warning signs:** Next.js build error: "Component is not a Client Component".

### Pitfall 3: LCP caused by above-the-fold screenshot

**What goes wrong:** If a screenshot is visible in the initial viewport without `loading="lazy"` and without `fetchpriority="high"`, Lighthouse flags it as blocking LCP.
**Why it happens:** Large WebP images below the hero are rarely LCP elements, but the first visible screenshot (if positioned near top) could be.
**How to avoid:** Add `loading="lazy"` to all screenshot `<img>` elements since the showcase section is below the hero. If a screenshot is hero-position, use `fetchpriority="high"` instead of lazy.
**Warning signs:** Lighthouse LCP element report points to a screenshot image.

### Pitfall 4: Retina screenshots appear blurry at 1x

**What goes wrong:** A screenshot generated at exactly the CSS pixel size (1:1) looks blurry on Retina displays.
**Why it happens:** Retina displays have 2x device pixel ratio. Without a 2x image served via `srcset`, the 1x image is upscaled.
**How to avoid:** Always produce both `name.webp` (1x) and `name@2x.webp` (2x) and include both in `srcSet="1x, 2x"` on the `<source>` element.
**Warning signs:** Screenshots look slightly blurry on MacBook Pro or iPhone screen, sharp on standard displays.

### Pitfall 5: Source PNGs committed to git causing repo bloat

**What goes wrong:** Raw iOS Simulator screenshots are 1-5 MB each. Committing them inflates the git history permanently.
**Why it happens:** Developers add them to `public/` directly without a gitignore rule.
**How to avoid:** Create a `screenshots-source/` directory at project root, add it to `.gitignore`, and only commit the WebP output in `public/screenshots/`.
**Warning signs:** `git status` shows 3-15 MB PNG additions; `public/` directory size spikes.

---

## Code Examples

### Complete `<picture>` element with WebP + dark/light + retina

```tsx
// Source: MDN + verified pattern from kyoshee.com/articles/guide-to-html-dark-mode-responsive-images
// Server component — no 'use client' needed
type AppScreenshotProps = {
  slug: string;
  alt: string;
  width: number;
  height: number;
};

export function AppScreenshot({ slug, alt, width, height }: AppScreenshotProps) {
  return (
    <picture>
      {/* Dark + WebP (most specific — evaluated first) */}
      <source
        media="(prefers-color-scheme: dark)"
        type="image/webp"
        srcSet={`/screenshots/dark/${slug}.webp 1x, /screenshots/dark/${slug}@2x.webp 2x`}
      />
      {/* Light + WebP (default format) */}
      <source
        type="image/webp"
        srcSet={`/screenshots/light/${slug}.webp 1x, /screenshots/light/${slug}@2x.webp 2x`}
      />
      {/* Ultimate fallback */}
      <img
        src={`/screenshots/light/${slug}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
```

### Sharp optimization script skeleton

```js
// scripts/optimize-screenshots.mjs
// Run: node scripts/optimize-screenshots.mjs
// Requires: node_modules/sharp (already present as Next.js dep)
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const THEMES = ['light', 'dark'];
const WEBP_QUALITY = 85;
// iPhone 15 logical width = 393px; use 390 for clean numbers
const TARGET_1X_WIDTH = 390;

for (const theme of THEMES) {
  const sourceDir = path.join('screenshots-source', theme);
  const outDir = path.join('public', 'screenshots', theme);
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const files = (await readdir(sourceDir)).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const slug = path.basename(file, '.png');
    const src = path.join(sourceDir, file);

    // 1x
    await sharp(src)
      .resize({ width: TARGET_1X_WIDTH })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, `${slug}.webp`));

    // 2x
    await sharp(src)
      .resize({ width: TARGET_1X_WIDTH * 2 })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, `${slug}@2x.webp`));

    console.log(`[${theme}] ${slug}: 1x + 2x WebP written`);
  }
}
```

### Pure Tailwind iPhone frame (design-token-safe)

```tsx
// Source: Flowbite device-mockups pattern adapted to project token system
// https://flowbite.com/docs/components/device-mockups/
type IPhoneFrameProps = { children: React.ReactNode };

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto border-[12px] border-[var(--bg-elevated)] rounded-[2.5rem] h-[600px] w-[290px] shadow-2xl bg-[var(--bg-elevated)]">
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[14px] bg-[var(--bg-elevated)] rounded-b-xl"
        aria-hidden="true"
      />
      {/* Left volume buttons */}
      <div
        className="absolute -left-[14px] top-[100px] h-[40px] w-[3px] bg-[var(--bg-elevated)] rounded-l-lg"
        aria-hidden="true"
      />
      <div
        className="absolute -left-[14px] top-[152px] h-[40px] w-[3px] bg-[var(--bg-elevated)] rounded-l-lg"
        aria-hidden="true"
      />
      {/* Right power button */}
      <div
        className="absolute -right-[14px] top-[128px] h-[60px] w-[3px] bg-[var(--bg-elevated)] rounded-r-lg"
        aria-hidden="true"
      />
      {/* Screen area */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
        {children}
      </div>
    </div>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/image` auto-WebP | Pre-optimize to WebP + `unoptimized: true` | Required for `output: 'export'` | Must do conversion manually; `sharp` script handles it |
| JS `matchMedia` for dark screenshot | `<picture>` + `<source media>` | HTML5 spec, widely supported since 2019 | Zero JS, SSR-safe, no hydration risk |
| `squoosh` CLI for WebP | `sharp` Node.js module | Squoosh CLI abandoned early 2023 | Use `sharp` directly in a script |
| External `devices.css` library | Pure Tailwind CSS device frame | Library unmaintained since 2023 | No external dependency; design tokens apply naturally |

**Deprecated/outdated:**
- `@squoosh/cli`: Abandoned since early 2023 — do not use.
- `devices.css` npm package: v0.1.15 from 2018, no recent releases — do not add as a dependency.
- `next-optimized-images`: Older plugin for Pages Router; not maintained for App Router.

---

## Open Questions

1. **What screenshots exist / which ones to capture**
   - What we know: No screenshots exist in the project yet; BitRemote is an iOS/macOS app
   - What's unclear: How many screens to show? Home screen only, or multiple? iPhone-only or also Mac?
   - Recommendation: Start with 1-2 iPhone screenshots (e.g., home screen + a detail screen) in both light and dark. This can be expanded in Phase 4 without changing the component architecture. Screenshots must be captured in iOS Simulator before the optimization script can run.

2. **Exact CSS pixel dimensions for the device frame**
   - What we know: iPhone 15 logical display is 393 × 852pt; iPhone 15 Pro is 393 × 852pt
   - What's unclear: Which specific iPhone model should the mockup represent?
   - Recommendation: Use iPhone 15 proportions (393 × 852) — most common current model. The `IPhoneFrame` component takes fixed dimensions; use 290 × 628px CSS size (roughly 0.74x logical) to fit comfortably in a desktop section column.

3. **Whether `--bg-elevated` token exists in the design system**
   - What we know: `globals.css` has `--bg`, `--bg-glass-92`, `--bg-glass-95`; no `--bg-elevated` confirmed
   - What's unclear: What token should the device frame border use?
   - Recommendation: Read `globals.css` at plan time and use whichever surface token (e.g., `--bg-glass-92` or a new `--bg-elevated`) best represents a slightly raised surface. The planner should check before specifying frame CSS.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — this phase does not introduce a test framework |
| Config file | None |
| Quick run command | `npm run lint` (ESLint with `--max-warnings 0`) |
| Full suite command | `npm run build` (static export validates all TypeScript and JSX at build time) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TECH-03 | WebP files exist in `public/screenshots/` | manual smoke | `ls public/screenshots/light/*.webp public/screenshots/dark/*.webp` | ❌ Wave 0 (files created by script) |
| SHOW-01 | Showcase section renders in DOM | build smoke | `npm run build` (build fails if component errors) | ❌ Wave 0 |
| SHOW-02 | Device frame renders correctly | visual | Manual browser inspection | N/A |
| SHOW-03 | Dark OS → dark screenshot, light OS → light screenshot | manual smoke | Browser DevTools: Rendering → Emulate CSS prefers-color-scheme | N/A |
| SHOW-04 | Animation plays on scroll | manual smoke | Browser scroll test + reduced-motion toggle in DevTools | N/A |

**Note:** No automated test framework is used in this project. Validation is TypeScript compilation (`npm run build`) + ESLint (`npm run lint`) + manual browser checks. These match the project's established convention from Phases 1 and 2.

### Sampling Rate

- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run build`
- **Phase gate:** Static export builds clean AND all manual smoke checks pass

### Wave 0 Gaps

- [ ] `screenshots-source/light/` — directory for raw PNG source files (gitignored, must exist for script to run)
- [ ] `screenshots-source/dark/` — same for dark screenshots
- [ ] `public/screenshots/light/` and `public/screenshots/dark/` — output directories (created by script)
- [ ] `scripts/optimize-screenshots.mjs` — conversion script (created in Wave 1)
- [ ] `src/components/AppShowcase.tsx` — main showcase component (created in Wave 1)

---

## Sources

### Primary (HIGH confidence)

- MDN — `<picture>` element with `media` attribute + `prefers-color-scheme` — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- Project codebase — `next.config.ts` (confirmed `unoptimized: true`), `package.json` (confirmed `sharp` 0.34.5 installed), `FadeInSection.tsx` (confirmed stagger variants available)
- `sharp` official docs — https://sharp.pixelplumbing.com/ — WebP output, resize API

### Secondary (MEDIUM confidence)

- kyoshee.com — HTML `<picture>` + WebP + dark/light ordering guide — https://kyoshee.com/articles/guide-to-html-dark-mode-responsive-images (verified pattern matches MDN `<picture>` spec)
- Flowbite device mockups — https://flowbite.com/docs/components/device-mockups/ — Tailwind-only iPhone frame structure (verified against live page)

### Tertiary (LOW confidence)

- `devices.css` library status — https://github.com/picturepan2/devices.css — last commit Feb 2023; used only to establish that this library should NOT be adopted

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — zero new dependencies; all tools verified in `node_modules`
- Architecture: HIGH — `<picture>` + `prefers-color-scheme` is browser spec; patterns verified with official/semi-official sources
- Pitfalls: HIGH — sourcing pitfalls from direct examination of the project's constraints (`output: 'export'`, `unoptimized: true`, existing Phase 2 motion setup)
- Device frame approach: MEDIUM — Tailwind-only pattern verified as correct concept but exact token names (e.g., `--bg-elevated`) need to be confirmed against `globals.css` at plan time

**Research date:** 2026-03-23
**Valid until:** 2026-06-23 (90 days — stable browser specs, no fast-moving dependencies)
