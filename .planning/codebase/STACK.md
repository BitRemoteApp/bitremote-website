# Technology Stack

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- TypeScript 5.7.3 - All source code in `src/`
- JavaScript - Build configuration and scripts

**Secondary:**
- JSON - Internationalization messages and configuration
- CSS - Styling via Tailwind (processed through PostCSS)

## Runtime

**Environment:**
- Node.js 25 (required for CI, see `.github/workflows/ci.yml`)

**Package Manager:**
- npm (with lockfile `package-lock.json`)
- Lockfile: Present

## Frameworks

**Core:**
- Next.js 15.1.0 - Full-stack React framework for SSR/static generation
- React 19.0.0 - UI component library
- React DOM 19.0.0 - DOM rendering

**Styling:**
- Tailwind CSS 3.4.0 - Utility-first CSS framework
- PostCSS 8.4.0 - CSS transformations
- Autoprefixer 10.4.0 - Vendor prefix automation

**Build/Dev:**
- TypeScript 5.7.3 - Language compilation
- ESLint 8.57.0 with next/core-web-vitals - Code linting
- ESLint Config Next 15.1.0 - Next.js specific linting rules

## Key Dependencies

**Critical:**
- next (15.1.0) - Framework providing server rendering, static generation, and API routes
- react (19.0.0) - Component library and state management
- react-dom (19.0.0) - Renders React components to DOM

**Infrastructure:**
- autoprefixer (10.4.0) - Auto-adds vendor prefixes to CSS
- postcss (8.4.0) - CSS processing pipeline
- tailwindcss (3.4.0) - CSS utility generation from config

**Development:**
- @types/node (22.10.0) - Node.js type definitions
- @types/react (19.0.0) - React component type definitions
- @types/react-dom (19.0.0) - React DOM type definitions
- typescript (5.7.3) - TypeScript compiler

## Configuration

**Environment:**
- `NEXT_ALLOWED_DEV_ORIGINS` (optional) - Comma-separated list of allowed origins for development
  - Read in `next.config.ts` line 3-5
  - Used to configure dev server CORS if needed

**Build:**
- `next.config.ts` - Next.js configuration
  - Static export mode: `output: 'export'` (line 8)
  - Image optimization disabled: `unoptimized: true` (line 12)
  - Trailing slashes enabled: `trailingSlash: true` (line 9)
  - Removes powered-by header: `poweredByHeader: false` (line 14)
- `tsconfig.json` - TypeScript compiler settings
  - Target: ES2022
  - Path aliases: `@/*` maps to `src/*`
  - Strict mode enabled
  - Module: ESNext with bundler resolution
- `tailwind.config.ts` - Tailwind CSS configuration
  - Content scan: `src/**/*.{js,ts,jsx,tsx,mdx}`
  - Dark mode: media preference based
  - Custom theme colors using CSS variables: `--bg`, `--fg`, `--blue`, etc.
  - Custom font families: `--font-body` (sans), `--font-ui` (mono)
- `.eslintrc.json` - ESLint configuration
  - Extends: `next/core-web-vitals`
- `postcss.config.js` - PostCSS pipeline
  - Plugins: tailwindcss, autoprefixer

## Platform Requirements

**Development:**
- Node.js 25 (see `.github/workflows/ci.yml`)
- npm with lockfile caching support
- TypeScript compiler

**Production:**
- Cloudflare Pages (deployment target based on recent commit history)
- Static file hosting (output is `out/` directory)
- No server-side runtime required (static export)

## Build Output

- Static export to `out/` directory
- No API runtime required
- Suitable for static hosting (Cloudflare Pages, GitHub Pages)

---

*Stack analysis: 2026-03-22*
