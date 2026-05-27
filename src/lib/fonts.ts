import { Instrument_Serif, DM_Sans, Fraunces, Poppins, Inter } from 'next/font/google';

// ─── Marketing display font ───────────────────────────────────────────────────
// Fraunces: editorial, distinctive, zero overlap with generic SaaS fonts.
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
});

// ─── Body / UI font ───────────────────────────────────────────────────────────
// DM Sans: clean, readable, not Inter. Used for all body copy and UI text.
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// ─── Product app fonts (keep — used by signup/onboarding flows) ───────────────
export const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Poppins: kept because existing marketing section components reference it.
// Will be removed once those sections are rebuilt in Phase 3.
export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

// Inter: kept only because about/products/pricing pages still reference it.
// Those pages are rebuilt in Phase 3 — remove this export then.
// CLAUDE.md prohibits Inter for new components.
export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
