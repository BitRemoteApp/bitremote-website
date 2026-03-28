---
phase: 4
slug: section-assembly
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-24
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no test framework installed |
| **Config file** | none |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~30-60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-XX-01 | XX | X | HERO-01 | build + manual visual | `npm run build` | N/A | ⬜ pending |
| 04-XX-02 | XX | X | HERO-02 | Deferred to Phase 5 | — | Deferred | ⬜ pending |
| 04-XX-03 | XX | X | HERO-03 | build + manual visual | `npm run build` | N/A | ⬜ pending |
| 04-XX-04 | XX | X | FEAT-01 | build + manual visual | `npm run build` | N/A | ⬜ pending |
| 04-XX-05 | XX | X | FEAT-02 | manual visual (dark mode) | — | manual-only | ⬜ pending |
| 04-XX-06 | XX | X | FEAT-03 | build (TS catches missing keys) | `npm run build` | N/A | ⬜ pending |
| 04-XX-07 | XX | X | NAV-01 | build + manual | `npm run build` | N/A | ⬜ pending |
| 04-XX-08 | XX | X | NAV-02 | build + manual | `npm run build` | N/A | ⬜ pending |
| 04-XX-09 | XX | X | NAV-03 | manual (375px viewport) | — | manual-only | ⬜ pending |
| 04-XX-10 | XX | X | CONT-01 | build + ls | `npm run build && ls out/ja/ out/zh-hans/ out/zh-hant/` | N/A | ⬜ pending |
| 04-XX-11 | XX | X | CONT-02 | build + manual | `npm run build` | N/A | ⬜ pending |
| 04-XX-12 | XX | X | CONT-03 | build + manual | `npm run build` | N/A | ⬜ pending |
| 04-XX-13 | XX | X | CONT-04 | build + manual | `npm run build` | N/A | ⬜ pending |
| 04-XX-14 | XX | X | CONT-05 | build (TS) + manual (head) | `npm run build` | N/A | ⬜ pending |
| 04-XX-15 | XX | X | TECH-05 | build + ls | `npm run build && ls out/ja/ out/zh-hans/ out/zh-hant/` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed.
- TypeScript compilation via `npm run build`
- ESLint with `--max-warnings 0` via `npm run lint`
- Manual visual verification at 375px, 768px, 1280px viewports

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Glassmorphism styling in dark mode | FEAT-02 | Visual appearance, backdrop-blur rendering | Toggle DevTools prefers-color-scheme: dark, verify glass effect on feature cards |
| Mobile nav layout | NAV-03 | Responsive layout at 375px | Resize to 375px, verify nav collapses correctly |
| SEO metadata intact | CONT-05 | Head tag inspection | View source, verify og:title, description, JSON-LD present |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
