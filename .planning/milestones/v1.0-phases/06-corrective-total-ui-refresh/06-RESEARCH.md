# Phase 6: Corrective total UI refresh - Research

**Researched:** 2026-03-26
**Domain:** Corrective information architecture, shared UI language replacement, downloader trust presentation, and product-demo restructuring in Next.js 15 / React 19 / Tailwind CSS 3.4 static export
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DSGN-07 | Impeccable design context is established before implementation and drives design decisions | `.impeccable.md`, `06-CONTEXT.md`, and `06-UI-SPEC.md` already exist; Phase 6 should treat them as hard inputs and convert them into shared primitives rather than more ad hoc styling |
| DSGN-08 | Remaining ASCII/terminal UI language is removed from primary experience | `TextButton`, `TextTabsNav`, `BitRemoteWordmark`, `SectionLabel`, `PlatformBadgeStrip`, and parts of `FaqAccordion` still carry uppercase/bracket/glitch language and can be replaced without architecture changes |
| NAV-04 | Navigation is reworked for calm professional app-like behavior | `TextTabsNav.tsx` already centralizes sticky nav, locale picker, and CTA entry points, making it the correct seam for active states, calmer controls, and downloaders anchor support |
| CONT-06 | Supported Downloaders returns as prominent homepage content | `supportedDownloaders` already exists in `src/domain/downloaders.ts`; `messages.sections.downloaders.title` already exists across locales; homepage only needs a dedicated section component and placement near the top |
| CONT-07 | Screenshot-led structure is reevaluated and screenshots become supporting proof | `AppShowcaseClient.tsx` is isolated and easy to replace or fold into a new interactive product-demo section; screenshot assets can remain secondary inputs rather than the section driver |
| BRAND-01 | Final UI feels calm, professional, and aligned with the native app | Existing token system, neutral palette, and motion primitives are already sufficient; the gap is component language, hierarchy, and information architecture rather than missing infrastructure |
</phase_requirements>

---

## Summary

Phase 6 is not blocked by missing infrastructure. The codebase already has the right technical base: static export-safe architecture, theme tokens, motion primitives, locale plumbing, downloader domain data, and reusable section composition. The failure is presentational and structural. The site still behaves like the previous retro concept with newer styling layered on top. The corrective work therefore needs to concentrate on shared UI language, homepage order, and trust-critical content placement.

The most important research conclusion is that this phase should avoid another surface-only pass. Replacing individual classes while preserving the current screenshot-first page structure will not satisfy the phase goal. The homepage should be rebuilt around a simpler sequence: hero, interactive product proof, supported downloaders, capabilities, onboarding/quickstart, subscription, and FAQ. The page already composes sections linearly in `src/app/[locale]/page.tsx`, so reordering and replacing sections is straightforward.

The second conclusion is that the retro language is concentrated in a small set of shared components. `TextButton.tsx` injects bracket characters and uppercase terminal-like spacing into every CTA. `TextTabsNav.tsx` intentionally avoids persistent active states and wraps locale labels in brackets. `BitRemoteWordmark.tsx` still uses animated pixel/glitch filters. `SectionLabel.tsx`, `PlatformBadgeStrip.tsx`, and `FaqAccordion.tsx` continue the uppercase utility/terminal feel. Replacing those shared seams will remove most of the old tone across the site and automatically improve downloader landings, legal pages, and footer interactions that consume the same patterns.

The third conclusion is that Supported Downloaders is low-risk to restore because the site already has the data and localized heading copy. The missing piece is presentation. A dedicated section should use the existing enum/domain values and link to existing downloader landing pages. This restores a core trust signal without introducing new product scope.

The fourth conclusion is that the screenshot showcase should stop acting as the page's main proof block. `AppShowcaseClient.tsx` is a narrow, isolated component showing a single screenshot in an iPhone frame. That is useful as a supporting asset but not enough to carry the product story. The better replacement is a modern, app-like interactive demo section that can incorporate screenshot assets, simplified UI states, or both, while preserving reduced-motion and static-export safety. A client component is acceptable here because the site already uses motion-safe client wrappers and the phase context explicitly allows corrective restoration of a simulator-like proof block.

**Primary recommendation:** execute Phase 6 in four slices:
1. replace shared retro UI primitives and establish the calmer brand language in code,
2. rebuild navigation and homepage structure around the new hierarchy,
3. implement the new product-proof and Supported Downloaders sections while normalizing remaining content sections,
4. verify across locales, breakpoints, and requirement traceability with both automated and human checks.

---

## Standard Stack

### Core (all already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^15.1.0 | Static export, App Router | Existing project standard |
| react | ^19.0.0 | Component model and client interaction | Existing project standard |
| motion | existing dependency | Reduced-motion-aware section and demo transitions | Already used in `FadeInSection` and `AppShowcaseClient` |
| tailwindcss | ^3.4.0 | Tokens, utilities, responsive layout | Existing project standard |

**No new package is required.** Phase 6 is a composition and component-language correction, not a framework or dependency problem.

---

## Architecture Patterns

### Pattern 1: Replace Shared Retro Primitives First

The fastest path to a visible phase shift is to replace the small number of shared components that still broadcast the old aesthetic:

- `src/components/TextButton.tsx`
- `src/components/TextTabsNav.tsx`
- `src/components/BitRemoteWordmark.tsx`
- `src/components/SectionLabel.tsx`
- `src/components/PlatformBadgeStrip.tsx`
- `src/components/FaqAccordion.tsx`

Because these components are reused, changing them produces broad impact without risky page-by-page divergence. This aligns with the UI spec requirement to redesign shared components rather than layer one-off overrides in page code.

### Pattern 2: Treat Homepage Order as a First-Class Deliverable

`src/app/[locale]/page.tsx` already composes the homepage as a stack of section components separated by `SvgDivider`. That means Phase 6 does not need routing or architecture changes to fix hierarchy. It only needs:

- a new section order,
- new section components where the current ones are wrong,
- reduced divider usage where spacing alone provides structure.

The recommended page order is the one already captured in `06-UI-SPEC.md`:

1. sticky navigation,
2. hero,
3. interactive product demo,
4. supported downloaders,
5. benefits,
6. quickstart,
7. BitRemote Plus,
8. FAQ.

### Pattern 3: Restore Trust with Existing Downloader Data

The downloader trust section should build on existing domain data, not new content systems.

Available sources:
- `src/domain/downloaders.ts` for the canonical supported list,
- `src/domain/downloader-landings.ts` for downloader-specific page coverage,
- `src/messages/*.json` for section titles and CTA text,
- existing route structure under `src/app/[locale]/downloaders/[slug]/page.tsx`.

Recommended presentation:
- calm tiles, segmented rows, or capability matrix,
- each entry links to its landing page,
- sentence case labels,
- no decorative brackets or faux-terminal affordances.

### Pattern 4: Product Demo as App-Like Proof, Not Screenshot Gallery

`AppShowcaseClient.tsx` currently renders a single device frame with one screenshot and a generic heading. This is too thin to justify its position near the top of the page.

Recommended replacement:
- a new dedicated component, likely client-rendered,
- restrained interactivity using explicit selected states,
- app-like panels showing queue/status/progress behaviors,
- optional screenshot support inside the demo rather than as a standalone section,
- reduced-motion compliance inherited from existing motion primitives,
- strong fallback/empty/error states so the proof block never feels broken.

This satisfies the context requirement to restore interactive proof without reviving ASCII styling.

### Pattern 5: Preserve Locale and Static-Export Safety

Phase 6 will likely require copy and section-label changes. Because the project uses typed JSON message imports, any new homepage strings should be added in all four locale files at once:

- `src/messages/en.json`
- `src/messages/ja.json`
- `src/messages/zh-hans.json`
- `src/messages/zh-hant.json`

This is safer than hardcoding new English text inside components and preserves the phase requirement that localized routes remain intact.

The phase should continue to avoid:
- client-only theme logic,
- SSR-only APIs,
- data fetching that would break static export,
- animation patterns that violate reduced-motion support.

---

## File-Level Findings

### `src/components/TextButton.tsx`

- Injects literal `[` and `]` into every button.
- Uses uppercase + tiny padding + accent inversion that reads as retro command UI.
- A redesign here will automatically affect homepage, nav CTA, downloader pages, and other shared CTAs.

### `src/components/TextTabsNav.tsx`

- Contains a comment explicitly stating active states are intentionally not used.
- Locale picker, nav links, and CTA all inherit the same bracket-heavy treatment.
- Already owns the sticky navigation and locale switching logic, so it is the right place to normalize behavior.

### `src/components/BitRemoteWordmark.tsx`

- Uses animated SVG filter/pixelation plus reduced-motion fallback.
- This directly conflicts with the phase goal to remove glitch/pixel language.
- Replace with a static lockup or clean typographic rendering.

### `src/app/[locale]/page.tsx`

- Current order is hero -> screenshot showcase -> benefits -> quickstart -> pricing -> FAQ.
- Supported Downloaders is absent despite remaining in schema data.
- Multiple `SvgDivider` boundaries create an overly segmented rhythm for the calmer Phase 6 direction.

### `src/components/AppShowcaseClient.tsx`

- Section heading is generic.
- Shows only one screenshot.
- Strong candidate for deletion or absorption into a richer demo section.

### `src/components/FaqAccordion.tsx`

- Still uses uppercase summary styling and accent inversion wrappers.
- Can be normalized to match the calmer shared surface language with minimal logic change.

### `src/components/DownloaderLandingPage.tsx`

- Still consumes `TextButton`, so Phase 6 shared CTA changes will affect it automatically.
- Must stay content-correct and route-stable even if the main homepage is significantly reworked.

---

## Anti-Patterns to Avoid

- Re-skinning the existing screenshot-first homepage instead of rebuilding the hierarchy.
- Replacing brackets in only one or two places while leaving the shared primitives intact.
- Solving "modern" with louder gradients, more blur, or decorative motion.
- Hardcoding new English-only strings inside components.
- Building the downloader section from duplicated page-local arrays when canonical data already exists.
- Reintroducing a simulator that mimics terminal aesthetics or fake command output.
- Keeping hover-only discoverability in nav, locale selection, or demo controls.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| New visual system | One-off page-level class overrides | Shared component updates + existing token system | Keeps Phase 6 coherent and reusable |
| Downloader trust section data | New duplicated objects in page.tsx | `supportedDownloaders` and existing landing-page routing | Prevents drift from canonical product coverage |
| Theme-aware proof section | JS theme state or route-based theme logic | Existing CSS media-query theme system and static screenshot assets | Preserves hydration safety and static export |
| New interactivity | Heavy client framework or remote data dependency | Small client component using existing motion patterns | Enough for product proof without deployment risk |

---

## Recommended Execution Order

### Plan 01
Establish the new shared design language in code: brand lockup, CTA treatment, section label tone, platform badges, and FAQ surface language.

### Plan 02
Rebuild navigation and homepage information architecture: calm active states, locale picker redesign, downloaders anchor, and page reordering.

### Plan 03
Implement the new proof/content sections: interactive product demo, Supported Downloaders, screenshot demotion to supporting role, and section normalization.

### Plan 04
Run automated and human verification across all locales, responsive breakpoints, downloader routes, and Phase 6 success criteria.

---

_Research completed: 2026-03-26_
_Research source of truth: `.impeccable.md`, `06-CONTEXT.md`, `06-UI-SPEC.md`, current component inventory_
