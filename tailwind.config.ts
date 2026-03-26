import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
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
