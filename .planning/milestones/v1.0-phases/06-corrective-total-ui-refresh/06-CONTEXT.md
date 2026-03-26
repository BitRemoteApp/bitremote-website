# Phase 6: Corrective total UI refresh - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Correct the redesign drift and deliver a true end-to-end UI refresh for the BitRemote marketing site. This phase must replace the remaining retro/ASCII language, restore missing trust-critical homepage content, and rebuild the homepage information architecture and shared brand language so the site feels extremely modern, professional, and aligned with the BitRemote app.

This phase is corrective redesign work within the existing website scope. It may restore or reinterpret interactive homepage product demonstration behavior that existed before this milestone, as part of correcting the redesign.

</domain>

<decisions>
## Implementation Decisions

### Overall design direction
- **D-01:** The corrective redesign should lean toward **premium utility**, but explicitly not in a luxury or ornamental direction. The target feeling is **extremely modern, professional, and product-serious**.
- **D-02:** “Calm and professional” remains a non-negotiable outcome from the original brief. The redesign must avoid playful, novelty-driven, retro, or ironic visual language.
- **D-03:** Phase 6 design decisions should use the Impeccable skill set as the decision-making authority for unresolved design details, not ad hoc visual experimentation.

### Impeccable-first design process
- **D-04:** Before implementation planning begins, this phase must establish project design context through the Impeccable workflow (`teach-impeccable`) so downstream design and planning decisions are grounded in explicit guidance.
- **D-05:** Homepage structure and brand-expression choices that remain unresolved in this discussion are delegated to the Impeccable-guided design process and should be decided there, not by preserving the current layout by default.

### Retro language removal
- **D-06:** Remaining retro/terminal UI language must be removed from the primary experience, including bracket-style buttons, bracketed language-picker treatments, the pixelated/glitch wordmark treatment, and hover patterns that reinforce the old-school terminal aesthetic.
- **D-07:** The replacement interaction language should feel modern, restrained, and product-grade rather than decorative.

### Homepage structure
- **D-08:** The current screenshot-led homepage structure is rejected. The homepage should be restructured through the Impeccable-guided design process rather than lightly patched.
- **D-09:** Supported Downloaders must return as a prominent homepage section because it is core trust and capability information for BitRemote.
- **D-10:** The final homepage structure should prioritize product clarity and professional communication over spectacle or filler sections.

### Interactive product demonstration
- **D-11:** Standalone screenshot sections should not drive the homepage structure in Phase 6.
- **D-12:** Replace the screenshot-led homepage section with an interactive web simulator or app-like product demo that restores the stronger product-experience role the homepage had before this milestone.
- **D-13:** The simulator/demo should be treated as corrective restoration work, not as a new v2 feature, because an interactive simulator-like experience existed on the homepage before it was removed during this milestone.
- **D-14:** The interactive demo should serve product understanding and credibility, not retro nostalgia. It must be redesigned to fit the new extremely modern, professional direction rather than reintroducing the old ASCII aesthetic.
- **D-15:** Existing screenshots may still be used sparingly inside the redesign if helpful, but they are secondary to the restored interactive demo and must not define the homepage architecture.

### the agent's Discretion
- Use the Impeccable workflow to determine the final homepage section ordering and brand-expression system within the boundaries above.
- Decide the exact replacement style for the current wordmark treatment, CTA styling, navigation styling, and section presentation as long as the result stays extremely modern, calm, and professional.
- Decide whether any screenshot usage remains after the redesign, provided screenshots are not allowed to define the homepage architecture.

</decisions>

<specifics>
## Specific Ideas

- The current site feels like “the old interface with a new skin” and that outcome is explicitly unacceptable.
- The user considers the remaining `[ BUTTON ]` styling, ASCII-like wordmark behavior, and retro hover language evidence that the redesign missed the original request.
- The user considers removing Supported Downloaders from the homepage a serious product communication regression.
- The user wants the outcome to feel **extremely modern and professional**, not “premium” in a luxury-marketing sense.
- The user explicitly asked that homepage structure and unresolved brand-expression decisions be guided by the Impeccable skill set instead of being decided casually.
- The user considers restoring a web simulator to be a correction because an interactive simulator-like homepage experience existed before this milestone.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and redesign intent
- `.planning/PROJECT.md` — Original redesign brief, product context, target audience, core value, and existing constraints
- `.planning/REQUIREMENTS.md` — Current requirement baseline and scope constraints that must remain intact
- `.planning/ROADMAP.md` — Phase 6 definition, success criteria, and milestone context
- `.planning/STATE.md` — Roadmap evolution note describing why Phase 6 was added and what corrective scope it must cover

### Prior design decisions
- `.planning/phases/01-design-foundation/1-CONTEXT.md` — Earlier design direction, anti-retro intent, and references such as Linear / Things / Bear

### Current implementation to replace or correct
- `src/app/[locale]/page.tsx` — Current homepage composition, including screenshot-led structure and missing Supported Downloaders section
- `src/components/TextButton.tsx` — Current bracket-style CTA treatment that must be removed
- `src/components/TextTabsNav.tsx` — Current navigation and locale picker styling that still carries retro language
- `src/components/BitRemoteWordmark.tsx` — Current pixelated/glitch wordmark treatment that must be replaced
- `src/components/HeroSection.tsx` — Current hero composition and CTA integration
- `src/components/AppShowcaseClient.tsx` — Current standalone screenshot section to reevaluate or remove
- `.planning/phases/01-design-foundation/01-03-PLAN.md` — Documents that the old homepage simulator (`ascii-panel`) was removed during this milestone sequence
- `.planning/phases/01-design-foundation/01-03-SUMMARY.md` — Confirms the homepage simulator/panel removal and the screenshot showcase replacement direction

### Design-process requirement
- `.impeccable.md` — Must be created or updated in this phase before implementation design decisions are finalized

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FadeInSection` and the motion primitives from Phase 2 can be reused if they support the corrective redesign without reintroducing gimmick-heavy presentation.
- Locale-aware message loading, metadata builders, and downloader landing routes already exist and should be preserved rather than redesigned as new systems.
- Existing Tailwind token infrastructure from Phase 1 provides the base styling system; this phase is about correcting composition, brand language, and UI expression on top of that foundation.

### Established Patterns
- The current homepage is assembled in `src/app/[locale]/page.tsx` from section components separated by `SvgDivider`; this makes structural reordering feasible without architectural changes.
- CTA styling is centralized through `TextButton`, so replacing the bracketed button language can be done systematically.
- Navigation and locale picker styling are centralized in `TextTabsNav`, making it a primary integration point for removing retro treatment.

### Integration Points
- Homepage correction work will concentrate in `src/app/[locale]/page.tsx`, `src/components/HeroSection.tsx`, `src/components/TextButton.tsx`, `src/components/TextTabsNav.tsx`, `src/components/BitRemoteWordmark.tsx`, and any replacement sections added for Supported Downloaders.
- `supportedDownloaders` already exists in the domain/schema layer and is still used for structured data, so restoring a homepage section should build on existing product data rather than inventing a new source.
- `src/ascii-panel/` no longer exists, but prior planning artifacts document its role closely enough for planner/researcher work on a modern replacement.
- If screenshots remain at all, `AppShowcaseClient`, `IPhoneFrame`, and `AppScreenshot` are reusable implementation assets, but their current dedicated-section usage is not a locked requirement for Phase 6.

</code_context>

<deferred>
## Deferred Ideas

None — simulator restoration is considered in-scope corrective work for Phase 6.

</deferred>

---

*Phase: 06-corrective-total-ui-refresh*
*Context gathered: 2026-03-26*
