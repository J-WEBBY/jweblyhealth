'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './JweblyLogo';
import { useIsMobile } from '@/hooks/useIsMobile';
import { poppins } from '@/lib/fonts';

const FONT_HEAD = poppins.style.fontFamily;
const C = { ACCENT: '#077CA5', TEXT: '#172430', TEXT2: '#426D84', BORDER: '#C5D8E8' };

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Agents',     href: '/#agents' },
  { label: 'Platform',   href: '/#features' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Pricing',    href: '/#founding' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'About',      href: '/#about' },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { if (scrolled) setOpen(false); }, [scrolled]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${C.BORDER}`,
      boxShadow: scrolled ? '0 2px 16px rgba(23,36,48,0.08)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 40px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Logo size={28} variant="light" textColor={C.TEXT} showTag={false} />
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 600,
                color: C.TEXT, textDecoration: 'none', padding: '6px 13px', borderRadius: 8,
                transition: 'color 0.15s, background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.TEXT; (e.currentTarget as HTMLAnchorElement).style.background = '#F0F6FA'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.TEXT; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isMobile && (
            <Link href="/lookup" style={{
              height: 38, padding: '0 16px', borderRadius: 8,
              fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 500,
              color: C.TEXT2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              border: `1px solid ${C.BORDER}`, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F0F6FA'; (e.currentTarget as HTMLAnchorElement).style.color = C.TEXT; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.TEXT2; }}
            >
              Sign In
            </Link>
          )}
          <Link href="/book" style={{
            height: 38, padding: '0 20px', borderRadius: 8,
            background: C.ACCENT, color: '#fff',
            fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            boxShadow: '0 2px 10px rgba(7,124,165,0.35)',
            transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.88')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          >
            Book a Demo
          </Link>

          {isMobile && (
            <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 2, borderRadius: 2,
                  background: C.TEXT,
                  transform: open && i === 0 ? 'translateY(6px) rotate(45deg)' : open && i === 2 ? 'translateY(-6px) rotate(-45deg)' : open && i === 1 ? 'scaleX(0)' : undefined,
                  transition: 'transform 0.2s',
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {isMobile && open && (
        <div style={{ background: '#fff', borderTop: `1px solid ${C.BORDER}`, padding: '12px 20px 24px' }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: 16, fontWeight: 500, color: C.TEXT2, textDecoration: 'none', borderBottom: `1px solid #EEF5FA`,
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/lookup" style={{ display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 600, color: C.TEXT2, textDecoration: 'none', textAlign: 'center', border: `1px solid ${C.BORDER}`, borderRadius: 8 }}>
              Sign In
            </Link>
            <Link href="/book" style={{ display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 700, color: '#fff', textDecoration: 'none', textAlign: 'center', background: C.ACCENT, borderRadius: 8 }}>
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
