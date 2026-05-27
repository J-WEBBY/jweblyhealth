'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Platform',      href: '/#features' },
  { label: 'How it works',  href: '/#how-it-works' },
  { label: 'Pricing',       href: '/#pricing' },
  { label: 'FAQ',           href: '/#faq' },
] as const;

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => { if (scrolled) setMenuOpen(false); }, [scrolled]);

  return (
    <header
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-full sm:max-w-[840px] z-50"
      role="banner"
    >
      {/* ── Pill ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={cn(
          'w-full flex items-center justify-between',
          'pl-5 pr-2.5 py-2 rounded-[30px]',
          'bg-[rgba(246,244,240,0.90)] backdrop-blur-md',
          'transition-shadow duration-300',
          scrolled
            ? 'shadow-[0_4px_28px_rgba(20,18,16,0.13)] border border-[rgba(20,18,16,0.11)]'
            : 'shadow-[0_2px_16px_rgba(20,18,16,0.07)] border border-[rgba(20,18,16,0.08)]',
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-[3px] shrink-0 hover:opacity-75 transition-opacity duration-150"
          aria-label="Jwebly Health — home"
        >
          <span className="font-display text-[20px] sm:text-[22px] font-light tracking-tightest text-ink leading-none">
            Jwebly
          </span>
          <span className="font-display text-[20px] sm:text-[22px] font-bold tracking-tightest text-ink leading-none">
            Health
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 mx-5" role="list">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              role="listitem"
              className={cn(
                'px-3.5 py-1.5 rounded-xl',
                'text-[13.5px] font-medium text-ink/50',
                'hover:text-ink hover:bg-surface/70',
                'transition-all duration-150 whitespace-nowrap',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-1.5">
          <Link
            href="/lookup"
            className={cn(
              'px-4 py-2 rounded-xl',
              'text-[13.5px] font-medium text-ink/50',
              'hover:text-ink hover:bg-surface/70',
              'transition-all duration-150',
            )}
          >
            Log in
          </Link>

          <Link
            href="#pricing"
            className={cn(
              'inline-flex items-center h-9 px-5 rounded-[22px]',
              'bg-accent text-white text-[13.5px] font-semibold tracking-tight',
              'shadow-[0_2px_14px_rgba(30,107,86,0.30)]',
              'hover:bg-accent-hover hover:shadow-[0_4px_22px_rgba(30,107,86,0.40)]',
              'transition-all duration-200',
            )}
          >
            Claim Founding Spot
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            'md:hidden p-2 rounded-xl',
            'hover:bg-surface/70 transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
          )}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span className="flex flex-col gap-[5px]" aria-hidden="true">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className={cn(
                  'block w-[18px] h-[1.5px] bg-ink rounded-full',
                  'transition-transform duration-200 origin-center',
                  menuOpen && i === 0 && 'translate-y-[6.5px] rotate-45',
                  menuOpen && i === 1 && 'scale-x-0 opacity-0',
                  menuOpen && i === 2 && '-translate-y-[6.5px] -rotate-45',
                )}
              />
            ))}
          </span>
        </button>
      </nav>

      {/* ── Mobile dropdown ────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-label="Navigation menu"
          className={cn(
            'md:hidden mt-2 w-full',
            'rounded-[22px] overflow-hidden',
            'bg-[rgba(246,244,240,0.97)] backdrop-blur-md',
            'border border-[rgba(20,18,16,0.10)]',
            'shadow-[0_8px_40px_rgba(20,18,16,0.14)]',
          )}
        >
          <div className="p-2.5 flex flex-col gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl',
                  'text-[15px] font-medium text-ink/60',
                  'hover:text-ink hover:bg-surface/60',
                  'transition-all duration-150',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="px-2.5 pb-2.5 flex flex-col gap-2 border-t border-[rgba(20,18,16,0.07)] pt-2.5">
            <Link
              href="/lookup"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'py-2.5 text-center rounded-xl',
                'text-[15px] font-medium text-ink/55',
                'hover:text-ink hover:bg-surface/60',
                'transition-all duration-150',
              )}
            >
              Log in
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'py-3 text-center rounded-[18px]',
                'bg-accent text-white text-[15px] font-semibold',
                'shadow-[0_2px_12px_rgba(30,107,86,0.25)]',
              )}
            >
              Claim Founding Spot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
