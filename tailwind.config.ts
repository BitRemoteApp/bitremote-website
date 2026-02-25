import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        blue: 'var(--blue)',
        'blue-strong': 'var(--blue-strong)',
        'blue-line': 'var(--blue-line)',
        'blue-soft': 'var(--blue-soft)',
        'ink-soft': 'var(--ink-soft)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        mono: ['var(--font-ui)'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
