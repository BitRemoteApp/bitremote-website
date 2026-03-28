---
phase: 5
slug: visual-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no unit test framework installed |
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
| 05-01-01 | 01 | 1 | VFX-03 | build + manual visual | `npm run build` | N/A | ⬜ pending |
| 05-02-01 | 02 | 1 | HERO-02 | build + manual visual | `npm run build` | N/A | ⬜ pending |
| 05-03-01 | 03 | 2 | (success criteria) | manual responsive audit | — | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| SVG dividers render with gradient fade | VFX-03 | Visual appearance cannot be verified by lint/build | Inspect dividers in browser — confirm gradient fade from transparent to border color |
| Ambient glow visible in dark mode, subtle in light mode | HERO-02 | Color/opacity is visual judgment | Toggle dark/light themes — glow visible but not garish in dark, barely visible in light |
| No horizontal scrollbar from glow on mobile | HERO-02 | Layout overflow is viewport-dependent | Check at 375px in DevTools — no horizontal scrollbar |
| Site renders correctly at 375px, 768px, 1280px | Success criteria | Responsive layout is visual | Resize viewport to each width — check nav, hero, bento grid, showcase |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
