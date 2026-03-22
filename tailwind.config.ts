import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        /* New semantic tokens (per D-20) */
        bg:            'var(--color-bg)',
        surface:       'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        border:        'var(--color-border)',
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          subtle:  'var(--color-accent-subtle)',
        },

        /* Backward compat aliases (removed in Plan 02) */
        fg:            'var(--fg)',
        blue:          'var(--blue)',
        'blue-strong': 'var(--blue-strong)',
        'blue-line':   'var(--blue-line)',
        'blue-soft':   'var(--blue-soft)',
        'ink-soft':    'var(--ink-soft)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-ui)'],  /* Kept for compat; removed in Plan 02 */
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card:  'var(--shadow-card)',
        raise: 'var(--shadow-raise)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
