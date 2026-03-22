# Technology Stack

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- TypeScript 5.7.3 - All application source code
- JSX/TSX - React component files

**Secondary:**
- JavaScript - PostCSS configuration
- CSS - Styling via Tailwind CSS

## Runtime

**Environment:**
- Node.js 25 (specified in `.github/workflows/ci.yml`)

**Package Manager:**
- npm (with package-lock.json)
- Lockfile: `package-lock.json` (218MB)

## Frameworks

**Core:**
- Next.js 15.1.0 - Full-stack React framework
  - Configured for static export (`output: 'export'` in `next.config.ts`)
  - Pages Router with dynamic localization via `[locale]` segments
  - API routes via file-based routing in `src/app/*/route.ts`

**UI & Styling:**
- React 19.0.0 - Component library
- React DOM 19.0.0 - React rendering
- Tailwind CSS 3.4.0 - Utility-first CSS framework
- PostCSS 8.4.0 - CSS transformation
- Autoprefixer 10.4.0 - CSS vendor prefixes

**Testing:**
- None detected

**Build/Dev:**
- TypeScript 5.7.3 - Static type checking
- ESLint 8.57.0 - Code linting
- eslint-config-next 15.1.0 - Next.js ESLint configuration

## Key Dependencies

**Critical:**
- `next` 15.1.0 - Framework backbone, builds static HTML export
- `react` 19.0.0 - Component rendering engine
- `tailwindcss` 3.4.0 - CSS generation from config

**Infrastructure:**
- `@types/node` 22.10.0 - Node.js type definitions
- `@types/react` 19.0.0 - React type definitions
- `@types/react-dom` 19.0.0 - React DOM type definitions

## Configuration

**Environment:**
- `NEXT_ALLOWED_DEV_ORIGINS` - Comma-separated list of allowed dev origins, parsed in `next.config.ts`
  - Optional setting, only used for development CORS configuration
  - See: `next.config.ts` lines 3-5

**Build:**
- `next.config.ts` - Next.js configuration with static export mode
- `tsconfig.json` - TypeScript compiler options
  - Target: ES2022
  - Module resolution: bundler
  - Path alias: `@/*` maps to `src/*`
- `tailwind.config.ts` - Tailwind CSS theme configuration with custom CSS variables
- `postcss.config.js` - PostCSS plugin chain (Tailwind + Autoprefixer)
- `.eslintrc.json` - ESLint configuration (extends Next.js core Web Vitals config)

## Platform Requirements

**Development:**
- Node.js 25
- npm
- Modern terminal/shell for build scripts

**Production:**
- Static hosting platform supporting SPA/SSG
- Current deployment: Cloudflare Pages (from commit "57ede02 Migrate to Cloudflare Pages")
- Previous: GitHub Pages with CNAME file for `bitremote.app`
- No server-side runtime required - output is pure static HTML/CSS/JS

## Build & Runtime Behavior

**Static Export Mode:**
- Next.js configured with `output: 'export'`
- All pages pre-rendered to static HTML during `npm run build`
- Output directory: `out/`
- Unoptimized images (no Next.js Image optimization)
- Trailing slashes enforced (`trailingSlash: true`)
- Powered-by header disabled (`poweredByHeader: false`)

**Development:**
- `npm run dev` - Starts Next.js dev server on http://localhost:3000
- Hot module replacement enabled
- Type checking on file save

**Scripts:**
```
npm run dev      # Start development server
npm run build    # Build static export to out/ directory
npm run start    # Start Next.js server (not typical for static export)
npm run lint     # Run ESLint with zero-warnings policy
```

---

*Stack analysis: 2026-03-22*
