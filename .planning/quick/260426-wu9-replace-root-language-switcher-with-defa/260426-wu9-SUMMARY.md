---
phase: 260426-wu9-replace-root-language-switcher-with-defa
plan: 01
subsystem: app-routing
tags: [routing, i18n, seo, refactor]
dependency_graph:
  requires:
    - "src/components/TextTabsNav.tsx"
    - "src/seo/metadata.ts"
    - "src/seo/schema.ts"
    - "src/i18n/{locales,messages,urls}.ts"
  provides:
    - "src/components/SiteChrome.tsx (reusable site chrome)"
    - "src/components/HomeView.tsx (reusable homepage body)"
  affects:
    - "src/app/page.tsx (root)"
    - "src/app/[locale]/layout.tsx"
    - "src/app/[locale]/page.tsx"
tech_stack:
  added: []
  patterns:
    - "Shared chrome + body components rendered by both root and locale routes"
    - "Inline metadata for root page (canonical=/) distinct from buildMetadataForCurrentLocalePage"
key_files:
  created:
    - "src/components/SiteChrome.tsx"
    - "src/components/HomeView.tsx"
  modified:
    - "src/app/page.tsx"
    - "src/app/[locale]/layout.tsx"
    - "src/app/[locale]/page.tsx"
decisions:
  - "Root page builds its metadata inline (canonical=/) rather than using buildMetadataForCurrentLocalePage, whose canonical would resolve to /en/."
  - "openGraphLocaleByLocale duplicated locally in src/app/page.tsx (kept self-contained per plan; not exported from metadata.ts)."
  - "SiteChrome calls getMessages(locale) internally so callers only pass locale + children."
metrics:
  duration_seconds: 224
  duration_human: "~4 minutes"
  tasks_completed: 3
  files_changed: 5
  completed: "2026-04-26T14:45:45Z"
requirements:
  - QUICK-WU9-01
---

# Quick Task 260426-wu9: Replace Root Language Switcher with Default-Locale Homepage Summary

The root `/` route now renders the same SiteChrome + HomeView the locale routes render with the default locale, mirroring the arkstudios-website pattern. Two new shared components (`SiteChrome`, `HomeView`) were extracted so the root page (which does not inherit `[locale]/layout.tsx`) can compose them directly with `defaultLocale`.

## What Changed

### Files Added

- **`src/components/SiteChrome.tsx`** — Reusable site chrome (skip-link + `TextTabsNav` + footer with social icons). Server component. Props: `{ locale, children }`. Calls `getMessages(locale)` internally. Footer-icon helper components (`FooterIcon`, `GithubIcon`, `TwitterIcon`, `DiscordIcon`, `TelegramIcon`, `MailIcon`) are file-local and unchanged from their prior definitions in `[locale]/layout.tsx`.
- **`src/components/HomeView.tsx`** — Reusable homepage body. Server component. Props: `{ locale }`. Renders `<main id="main-content">` with both JSON-LD scripts, the hero (`HeroSection` inside `FadeInSection`), `AppShowcaseClient`, `DownloaderOrbitSection`, the quickstart steps block, and the FAQ block.

### Files Modified

- **`src/app/[locale]/layout.tsx`** — Reduced to `export const dynamicParams`, `generateStaticParams`, and a body that resolves locale and returns `<SiteChrome locale={locale}>{children}</SiteChrome>`. All chrome JSX and footer-icon helpers were moved into `SiteChrome`. Unused imports (`TextTabsNav`, `LINKS`, `localePath`, `localeLang`, `getMessages`) were removed.
- **`src/app/[locale]/page.tsx`** — `LocaleHomePage` body is now `return <HomeView locale={locale} />`. `generateMetadata` is unchanged (still uses `buildMetadataForCurrentLocalePage` with `pathname:'/'`, `page:'home'`).
- **`src/app/page.tsx`** — Rewritten. Now renders `<SiteChrome locale={defaultLocale}><HomeView locale={defaultLocale} /></SiteChrome>`. Metadata is built inline:
  - `title/description/keywords` come from `messages.seo.home.*` (not `languageSelector`).
  - `alternates.canonical = absoluteUrl('/')`.
  - `alternates.languages` maps every locale's hreflang to `absoluteUrl(localeRoot(locale))` plus `x-default → absoluteUrl('/')`.
  - `openGraph.locale = 'en_US'`, `alternateLocale` lists the other three; `openGraph.url = absoluteUrl('/')`. The `openGraphLocaleByLocale` mapping is duplicated locally per plan instruction.

## Verification

### Lint

```
npm run lint -- --max-warnings 0
```

Exit 0 after each task. No warnings.

### Build

```
npm run build
```

Exit 0 after each task. Static export emits all expected routes:

- `/index.html`
- `/en/index.html`, `/ja/index.html`, `/zh-hans/index.html`, `/zh-hant/index.html`
- `/_/downloaders/_/index.html` for every locale × downloader pair
- `/_/terms/index.html` for every locale
- `/llms-full.txt`, `/robots.txt`, `/sitemap.xml`

### Spot Checks

- `out/index.html` `<link rel="canonical" href="https://bitremote.app/">` — confirmed.
- `out/en/index.html` `<link rel="canonical" href="https://bitremote.app/en/">` — confirmed (no regression).
- `out/index.html` hreflang alternates: `en`, `ja`, `zh-CN`, `zh-TW`, `x-default` — all present pointing to the correct URLs.
- `out/index.html` contains `id="main-content"`, the `Skip to content` skip-link, and the four landmark section IDs (`top`, `feature`, `how-it-works`, `faq`).
- `src/app/page.tsx` no longer references `messages.seo.languageSelector` (`grep -q languageSelector` returns non-zero).

## Commits

| Task | Description                                                        | Commit  |
| ---- | ------------------------------------------------------------------ | ------- |
| 1    | Extract SiteChrome from `[locale]/layout.tsx`                       | 27838b7 |
| 2    | Extract HomeView from `[locale]/page.tsx`                           | 65ee827 |
| 3    | Rewrite root `src/app/page.tsx` to use default-locale homepage      | 3b21035 |

## Deviations from Plan

None. Plan executed exactly as written.

## Notes / Out-of-Scope Observations

- **Pre-existing RSC payload contains full `messages` JSON.** Every built page (`/index.html`, `/en/index.html`, etc.) inlines the full `messages` object — including `seo.languageSelector.description = "Choose your language..."` — inside the React Server Component payload because `TextTabsNav` is a client component receiving the entire `messages` prop. This was confirmed pre-existing by checking out the prior commit and rebuilding (`/en/index.html` had the same payload before this plan). It is unrelated to the language-selector landing UI removal: the actual visible UI on `/` is now the homepage, and `messages.seo.languageSelector` is no longer used by `src/app/page.tsx` source. The leaked JSON is an RSC artifact, not a rendered UI element. Out-of-scope for this plan; not a regression.
- The `messages.seo.languageSelector` keys remain in `src/messages/*.json` per plan instruction (other code paths or future work may want them). Just no longer consumed by `/`.

## Self-Check: PASSED

Verified:

- [x] `src/components/SiteChrome.tsx` exists.
- [x] `src/components/HomeView.tsx` exists.
- [x] `src/app/page.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` modified as specified.
- [x] Commits 27838b7, 65ee827, 3b21035 present in git history (`git log --oneline | grep`).
- [x] `npm run lint -- --max-warnings 0` exited 0.
- [x] `npm run build` exited 0; all expected static files emitted.
- [x] Root canonical `https://bitremote.app/`; hreflang alternates correct.
- [x] `src/app/page.tsx` contains no reference to `languageSelector`.
