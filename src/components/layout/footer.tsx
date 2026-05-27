import Link from 'next/link';
import { cn } from '@/lib/utils';

// Full footer content built in Phase 3. This shell establishes
// correct company details, legal links, and the design system baseline.

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Cookie Policy',    href: '/legal/cookies' },
  { label: 'GDPR Policy',      href: '/legal/gdpr' },
] as const;

const NAV_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'AI Agents',          href: '/#features' },
      { label: 'Patient Management', href: '/#features' },
      { label: 'CQC Compliance',     href: '/#features' },
      { label: 'How it works',       href: '/#how-it-works' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Pricing',            href: '/#pricing' },
      { label: 'FAQ',                href: '/#faq' },
      { label: 'Book a Demo',        href: '/book' },
      { label: 'Contact',            href: '/contact' },
    ],
  },
] as const;

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/jweblyhealth',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/jweblyhealth',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  return (
    <footer
      className="bg-ink text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-content mx-auto px-6 pt-16 pb-10">

        {/* ── Top row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-12 mb-14">

          {/* Brand block */}
          <div>
            <Link
              href="/"
              className="inline-flex items-baseline gap-[3px] mb-4 hover:opacity-75 transition-opacity duration-150"
              aria-label="Jwebly Health — home"
            >
              <span className="font-display text-[24px] font-light tracking-tightest text-white leading-none">
                Jwebly
              </span>
              <span className="font-display text-[24px] font-bold tracking-tightest text-white leading-none">
                Health
              </span>
            </Link>
            <p className="text-[13px] text-white/35 leading-relaxed max-w-[260px] mb-5">
              The AI operating system for UK private healthcare clinics.
              Administrative software — not medical advice.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-lg',
                    'text-white/35 bg-white/[0.05] border border-white/[0.08]',
                    'hover:text-white/70 hover:bg-white/[0.10]',
                    'transition-all duration-150',
                  )}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.10em] mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-white/35 hover:text-white/65 transition-colors duration-150"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.07] pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <p className="text-[11.5px] text-white/20 leading-relaxed">
            © 2026 Jwebly Ltd. Registered in England and Wales.
            <span className="mx-2 opacity-50">·</span>
            Company No. 17060148
            <span className="mx-2 opacity-50">·</span>
            Birmingham, United Kingdom
          </p>

          <nav aria-label="Legal links" className="flex items-center flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[11.5px] text-white/22 hover:text-white/50 transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </footer>
  );
}
