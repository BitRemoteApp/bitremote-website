# Codebase Structure

**Analysis Date:** 2026-03-22

## Directory Layout

```
bitremote-website/
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflow definitions
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase analysis artifacts
├── .vscode/                    # VSCode editor configuration
├── public/                     # Static assets
│   └── textures/               # Image and texture files
├── src/                        # Source code
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── [locale]/           # Locale-parameterized pages
│   │   │   ├── downloaders/    # Downloader landing pages
│   │   │   │   └── [slug]/     # Dynamic downloader routes
│   │   │   ├── privacy/        # Privacy policy page
│   │   │   ├── support/        # Support page
│   │   │   ├── terms/          # Terms page
│   │   │   ├── layout.tsx      # Locale layout with nav and footer
│   │   │   └── page.tsx        # Home page (main marketing page)
│   │   ├── llms-full.txt/      # API route for LLM context
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Root redirect page (language selector)
│   │   ├── robots.ts           # Robots.txt generator
│   │   ├── sitemap.ts          # Sitemap.xml generator
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── globals.css         # Global styles
│   ├── ascii-panel/            # ASCII panel interactive component module
│   │   ├── components/         # ASCII panel sub-components
│   │   │   ├── AsciiPanelFrame.tsx
│   │   │   └── AsciiPanelSheet.tsx
│   │   ├── pages/              # ASCII panel page views
│   │   │   ├── HomePage.tsx
│   │   │   ├── NewClientPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   └── index.tsx           # Main ASCII panel component
│   ├── components/             # Shared reusable UI components
│   │   ├── BitRemoteWordmark.tsx
│   │   ├── DownloaderLandingPage.tsx
│   │   ├── FaqAccordion.tsx
│   │   ├── TextButton.tsx
│   │   ├── TextFrame.tsx
│   │   ├── TextSeparator.tsx
│   │   └── TextTabsNav.tsx
│   ├── domain/                 # Business logic and data models
│   │   ├── downloader-landings.ts   # Downloader landing page content
│   │   └── downloaders.ts           # Downloader enum and list
│   ├── i18n/                   # Internationalization
│   │   ├── links.ts            # External links configuration
│   │   ├── locales.ts          # Locale definitions and validation
│   │   ├── messages.ts         # Message loader and type
│   │   └── urls.ts             # URL building utilities
│   ├── messages/               # Localized content (JSON files)
│   │   ├── en.json             # English messages
│   │   ├── ja.json             # Japanese messages
│   │   ├── zh-hans.json        # Simplified Chinese messages
│   │   └── zh-hant.json        # Traditional Chinese messages
│   └── seo/                    # SEO and metadata generation
│       ├── downloader-metadata.ts
│       ├── metadata.ts
│       ├── routes.ts
│       └── schema.ts
├── .eslintrc.json              # ESLint configuration
├── .claude/                    # Claude Code workspace config
├── next.config.ts              # Next.js configuration
├── package.json                # npm dependencies and scripts
├── package-lock.json           # npm lock file
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── [root config files]         # Various root-level config files
```

## Directory Purposes

**src/app/:**
- Purpose: Next.js App Router pages, layouts, and route definitions
- Contains: Page components, layout components, metadata generation, route groups
- Key files: `[locale]/page.tsx` (home page), `[locale]/layout.tsx` (main layout), `layout.tsx` (root layout)

**src/app/[locale]/:**
- Purpose: Locale-parameterized routes for multi-language support
- Contains: All content pages that require locale context
- Key files: `page.tsx`, `layout.tsx`, subdirectories for specific pages

**src/ascii-panel/:**
- Purpose: Isolated interactive ASCII-art UI component for demonstration
- Contains: Coordinator component, sub-components, internal page states
- Key files: `index.tsx` (main component), `components/`, `pages/`

**src/components/:**
- Purpose: Reusable UI building blocks
- Contains: Button, frame, navigation, wordmark, landing page layouts
- Key files: `TextButton.tsx`, `TextFrame.tsx`, `TextTabsNav.tsx`, `BitRemoteWordmark.tsx`

**src/domain/:**
- Purpose: Business logic and data models
- Contains: Downloader definitions, landing page content mapping
- Key files: `downloaders.ts` (enum), `downloader-landings.ts` (content factory)

**src/i18n/:**
- Purpose: Localization and routing utilities
- Contains: Locale definitions, message loading, URL building, link configuration
- Key files: `locales.ts`, `messages.ts`, `urls.ts`, `links.ts`

**src/messages/:**
- Purpose: Centralized translatable content
- Contains: JSON files with all UI strings for each supported locale
- Key files: `en.json`, `ja.json`, `zh-hans.json`, `zh-hant.json`

**src/seo/:**
- Purpose: SEO optimization and metadata generation
- Contains: Schema.org JSON-LD builders, metadata generators, route definitions
- Key files: `schema.ts`, `metadata.ts`, `downloader-metadata.ts`

**public/:**
- Purpose: Static assets served directly
- Contains: Favicon, manifest, images, textures
- Key files: `textures/` for visual assets

## Key File Locations

**Entry Points:**
- `src/app/page.tsx`: Root page (language selector)
- `src/app/[locale]/page.tsx`: Home page for each locale
- `src/app/[locale]/layout.tsx`: Main layout wrapper with nav and footer
- `src/app/layout.tsx`: Root layout with global metadata and CSS

**Configuration:**
- `next.config.ts`: Next.js build and behavior settings
- `tsconfig.json`: TypeScript compiler options and path aliases
- `tailwind.config.ts`: Tailwind CSS customization
- `postcss.config.js`: PostCSS plugins (autoprefixer, tailwindcss)
- `.eslintrc.json`: ESLint rules and config

**Core Logic:**
- `src/i18n/locales.ts`: Locale types and validation
- `src/i18n/messages.ts`: Message loader function
- `src/domain/downloaders.ts`: Downloader types and enum
- `src/domain/downloader-landings.ts`: Landing content factories

**Testing:**
- Not detected - no test files found in current structure

## Naming Conventions

**Files:**
- React components: PascalCase with `.tsx` extension (e.g., `TextButton.tsx`, `AsciiPanel.tsx`)
- Utility/helper functions: camelCase with `.ts` extension (e.g., `locales.ts`, `urls.ts`, `schema.ts`)
- Config files: Root level in kebab-case (e.g., `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`)
- Message files: locale codes in kebab-case (e.g., `en.json`, `zh-hans.json`)

**Directories:**
- Feature directories: kebab-case (e.g., `ascii-panel`, `downloader-landings`)
- Feature groupings: lowercase plural (e.g., `components`, `messages`, `pages`)
- Dynamic routes: square brackets (e.g., `[locale]`, `[slug]`) per Next.js convention
- Private routes/groups: parentheses (not currently used in this codebase)

**Functions:**
- Export functions: camelCase (e.g., `getMessages()`, `localeRoot()`, `buildSoftwareApplicationSchema()`)
- React components: PascalCase (e.g., `TextButton`, `AsciiPanel`)
- Type guards: camelCase (e.g., `isLocale()`)

**Types/Interfaces:**
- TypeScript types: PascalCase (e.g., `Locale`, `Messages`, `Metadata`)
- Enums: PascalCase (e.g., `Downloader`)
- Type aliases for unions: PascalCase (e.g., `DownloaderLandingSlug`)

## Where to Add New Code

**New Feature (Downloader or Page Section):**
- Primary code: Create page route in `src/app/[locale]/{feature}/page.tsx`
- Logic: Add domain logic in `src/domain/` if needed
- Content: Add message keys to all files in `src/messages/`
- Components: Create shared components in `src/components/`
- Tests: Create alongside feature code (pattern to be established)

**New Component/Module:**
- Shared component: Add to `src/components/{ComponentName}.tsx`
- Isolated module (like ASCII panel): Create in `src/{module-name}/` with `index.tsx` and subdirectories
- Import: Use path alias `@/` (configured in `tsconfig.json`)

**Utilities:**
- Shared helpers: Add to `src/i18n/`, `src/seo/`, or `src/domain/` based on responsibility
- Configuration/constants: Add to appropriate domain folder or create new `src/utils/` if needed

**Styling:**
- Global styles: Add to `src/app/globals.css`
- Component styles: Use Tailwind CSS utility classes directly in component JSX (not separate CSS files)
- Theme customization: Modify `tailwind.config.ts` for custom colors, spacing, etc.

**Localization:**
- New UI strings: Add keys to all four JSON files in `src/messages/` (en, ja, zh-hans, zh-hant)
- Message type safety: Update type when message structure changes; `Messages` type is inferred from `en.json`

## Special Directories

**src/app/llms-full.txt/:**
- Purpose: API route providing full LLM context of codebase
- Generated: No - manually maintained
- Committed: Yes - checked into git

**public/:**
- Purpose: Static asset serving
- Generated: No
- Committed: Yes

**.next/, dist/, build/:**
- Purpose: Build output directories
- Generated: Yes - during `npm run build`
- Committed: No (should be in .gitignore)

**.planning/codebase/:**
- Purpose: GSD mapping and analysis documents
- Generated: Yes - by GSD mapping command
- Committed: Yes - to track planning decisions

---

*Structure analysis: 2026-03-22*
