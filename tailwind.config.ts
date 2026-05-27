import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // font-display → Fraunces (editorial headlines)
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // font-sans → DM Sans (body copy and UI)
        sans: ['var(--font-dm-sans)', '-apple-system', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Option A — Warm canvas · Forest accent
        // Static hex values so Tailwind opacity modifiers (text-ink/60) work correctly.
        // CSS variables in globals.css remain as the source of truth for direct CSS use.
        canvas:  '#F6F4F0',
        ink:     '#141210',
        accent: {
          DEFAULT: '#1E6B56',
          hover:   '#185847',
        },
        surface: '#EFECE6',
        muted:   '#7A7470',
      },
      maxWidth: {
        content: '1280px',
      },
      letterSpacing: {
        tight:    '-0.02em',
        tighter:  '-0.03em',
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
