---
phase: 2
slug: motion-and-ui-primitives
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — build + lint is the validation strategy (no jest/vitest in project) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | VFX-02, VFX-04 | build smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 1 | VFX-04 | build smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 2-01-03 | 01 | 1 | VFX-01, VFX-05 | build smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 2-01-04 | 01 | 1 | TECH-01, TECH-02, TECH-04 | build smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 2-02-01 | 02 | 2 | VFX-01 | build + grep | `npm run build && grep -r "whileInView" src/` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 2 | VFX-04 | manual | Browser test with OS reduced-motion enabled | N/A | ⬜ pending |
| 2-02-03 | 02 | 2 | TECH-02 | manual | Chrome DevTools console — no hydration errors | N/A | ⬜ pending |
| 2-02-04 | 02 | 2 | VFX-05 | automated grep | `grep -r "animate.*height\|animate.*width\|animate.*margin\|animate.*padding" src/` (empty = pass) | N/A | ⬜ pending |
| 2-02-05 | 02 | 2 | TECH-04 | automated grep | `grep -L '"use client"' src/components/providers/*.tsx` (empty = pass) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/providers/LenisProvider.tsx` — new file for VFX-02 + VFX-04 (lenis side)
- [ ] `src/components/providers/MotionProvider.tsx` — new file for VFX-04 (motion side)
- [ ] `src/components/ui/FadeInSection.tsx` — new file for VFX-01 + VFX-05
- [ ] Root layout modification to wrap with both providers — TECH-01, TECH-02, TECH-04
- [ ] No test framework setup needed — `npm run build` validates TypeScript correctness

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reduced-motion completely disables animations | VFX-04 | Requires OS-level `prefers-reduced-motion` toggle | Enable reduced-motion in OS settings; verify no scroll inertia and no entrance animation motion |
| No hydration warnings in console | TECH-02 | Requires browser DevTools inspection | Open Chrome DevTools console, navigate to all pages; no hydration errors visible |
| Smooth scroll feels physically weighted | VFX-02 | Subjective quality assessment | Navigate between sections; scroll feels weighted/inertial, not abrupt |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
