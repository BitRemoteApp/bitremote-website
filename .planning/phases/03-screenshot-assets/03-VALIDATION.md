---
phase: 3
slug: screenshot-assets
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — build + lint is the validation strategy (project convention) |
| **Config file** | none |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | TECH-03 | file check | `ls public/screenshots/light/*.webp public/screenshots/dark/*.webp` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | SHOW-01, SHOW-02 | build smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | SHOW-03 | manual | Browser DevTools: Rendering → Emulate CSS prefers-color-scheme | N/A | ⬜ pending |
| 3-01-04 | 01 | 1 | SHOW-04 | manual | Browser scroll test + reduced-motion toggle | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `screenshots-source/light/` — directory for raw PNG source files
- [ ] `screenshots-source/dark/` — same for dark screenshots
- [ ] `public/screenshots/light/` and `public/screenshots/dark/` — output directories
- [ ] `scripts/optimize-screenshots.mjs` — conversion script
- [ ] `src/components/AppShowcase.tsx` — main showcase component

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Device frame renders correctly around screenshot | SHOW-02 | Visual fidelity requires human eye | Inspect showcase section in browser — frame should look like realistic iPhone/Mac |
| Dark OS → dark screenshots, light OS → light | SHOW-03 | Requires OS-level theme toggle | Toggle OS theme or use DevTools Rendering → Emulate prefers-color-scheme |
| Screenshots animate on scroll | SHOW-04 | Requires visual inspection of animation | Scroll to showcase section — screenshots should fade in with stagger |
| Images under performance budget | TECH-03 | Requires Lighthouse/DevTools check | Run Lighthouse → check LCP is not caused by screenshot images |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
