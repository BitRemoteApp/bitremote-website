# External Integrations

**Analysis Date:** 2026-03-22

## APIs & External Services

**App Distribution:**
- Apple App Store - Distribution of native BitRemote app for iOS/macOS
  - Link: `https://apps.apple.com/app/id6477765303`
  - Reference: `src/i18n/links.ts` line 4

**Social & Community:**
- Twitter/X
  - Link: `https://twitter.com/bitremote`
  - Reference: `src/i18n/links.ts` line 5

- Discord - Community server
  - Link: `https://discord.gg/x5TP2z6cFj`
  - Reference: `src/i18n/links.ts` line 6

- Telegram - Messaging channel
  - Link: `https://t.me/bitremote`
  - Reference: `src/i18n/links.ts` line 7

**Source Code:**
- GitHub - BitRemote app repository
  - Link: `https://github.com/BitRemoteApp/BitRemote`
  - Reference: `src/i18n/links.ts` line 8

## Data Storage

**Databases:**
- None - This is a static website with no dynamic backend
- All data is read-only content from JSON message files

**File Storage:**
- Static assets in `public/` directory
  - Favicons, touch icons, PNG/SVG files
  - Web manifest: `public/site.webmanifest`
  - CNAME file for custom domain: `public/CNAME` (points to `bitremote.app`)
  - Textures directory for design assets: `public/textures/`
  - OpenGraph image: `public/opengraph.jpg`

**Caching:**
- None configured - Depends on Cloudflare Pages CDN caching

## Authentication & Identity

**Auth Provider:**
- None - Static website requires no authentication
- No user login or accounts system

## Legal & Compliance

**Legal Documents:**
- Privacy Policy - Hosted externally at Ark Studios
  - English: `https://arkstudios.co.jp/en/privacy/bitremote`
  - Japanese: `https://arkstudios.co.jp/ja/privacy/bitremote`
  - Retrieval: `src/i18n/links.ts` via `privacyPolicyUrl(locale)` function

- End User License Agreement (EULA) - Hosted externally at Ark Studios
  - English: `https://arkstudios.co.jp/en/eula/bitremote`
  - Japanese: `https://arkstudios.co.jp/ja/eula/bitremote`
  - Retrieval: `src/i18n/links.ts` via `eulaUrl(locale)` function

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- No application logging configured
- Build logs available via GitHub Actions CI

**Analytics:**
- Not detected in codebase

## CI/CD & Deployment

**Hosting:**
- Cloudflare Pages (current)
  - Previous: GitHub Pages
  - Deployment via git push to main/develop branches

**CI Pipeline:**
- GitHub Actions - Single workflow: `CI`
  - File: `.github/workflows/ci.yml`
  - Trigger: Pull requests to `main` branch
  - Steps:
    1. Checkout code (uses actions/checkout@v6)
    2. Setup Node 25 (uses actions/setup-node@v6)
    3. Restore Next.js build cache (uses actions/cache@v5)
    4. Install dependencies via `npm ci`
    5. Lint with ESLint: `npx --no-install eslint src/`
    6. Build with `npx --no-install next build`

**Dependency Management:**
- Dependabot configuration in `.github/dependabot.yml`
  - Monitors npm packages and GitHub Actions
  - Weekly checks on Mondays at 09:00 JST
  - Creates PRs against `develop` branch
  - Groups all update types (major, minor, patch)
  - Limit: 5 open pull requests max

## Environment Configuration

**Required env vars:**
- `NEXT_ALLOWED_DEV_ORIGINS` (optional)
  - Comma-separated list of allowed origins for development
  - Parsed in `next.config.ts` line 3-5
  - Used for dev server CORS configuration

**Secrets location:**
- No secrets stored in repository
- `.gitignore` prevents committing sensitive files
- Cloudflare Pages likely handles API keys/tokens securely

## Webhooks & Callbacks

**Incoming:**
- None - Static website receives no webhooks

**Outgoing:**
- GitHub webhook trigger on push to main (handled by Cloudflare Pages integration)
- No custom outgoing webhooks implemented

## External Content & Localization

**Localization Sources:**
- Message files are committed to repository
  - `src/messages/en.json` - English
  - `src/messages/ja.json` - Japanese
  - `src/messages/zh-hans.json` - Simplified Chinese
  - `src/messages/zh-hant.json` - Traditional Chinese
- Loader: `src/i18n/messages.ts` maps locales to message objects

**SEO & Discovery:**
- Robots.txt metadata: `src/app/robots.ts`
  - Sitemap endpoint: `https://bitremote.app/sitemap.xml`

- Sitemap generation: `src/app/sitemap.ts`
  - Dynamic routes for all locales
  - Downloader landing pages with locale alternates
  - Auto-generated static XML

- OpenGraph metadata: `src/app/layout.tsx`
  - Base URL: `https://bitremote.app`
  - Manifest: `/site.webmanifest`

## No External Dependencies

**Notable absences:**
- No database client (Firebase, Supabase, PostgreSQL, etc.)
- No payment processor (Stripe, PayPal)
- No email service (SendGrid, Mailgun)
- No CDN beyond Cloudflare Pages
- No third-party API clients imported
- No analytics SDK
- No A/B testing framework

The site is fully self-contained with only outbound links to social platforms and app stores.

---

*Integration audit: 2026-03-22*
