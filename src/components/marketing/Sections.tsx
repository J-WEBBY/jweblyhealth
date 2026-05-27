'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Logo, LogoMark } from './JweblyLogo';
import { useIsMobile } from '@/hooks/useIsMobile';
import { poppins } from '@/lib/fonts';

const FONT_HEAD = poppins.style.fontFamily;
const FONT_BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const C = { ACCENT: '#077CA5', DEEP: '#054668', TEXT: '#172430', TEXT2: '#426D84', MUTED: '#7B98A6', BORDER: '#C5D8E8', BG: '#E2F3F8', WHITE: '#FFFFFF' };

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedNumber({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const isNum = typeof target === 'number';
  useEffect(() => {
    if (!inView || !isNum) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * (target as number)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, isNum, target]);
  return <span ref={ref}>{isNum ? val : target}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
const ClinicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M12 11v5M9.5 13.5h5" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 6.5v5c0 4.75 3.8 9.15 9 10.5 5.2-1.35 9-5.75 9-10.5v-5L12 2z" />
    <path d="M8.5 12l2.5 2.5 4-4" />
  </svg>
);
const SectorsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const TRUST_STATS = [
  { n: 50 as number | string, suffix: '+', label: 'Private practices',    sub: 'Across the United Kingdom',                          icon: <ClinicIcon /> },
  { n: 'UK',                  suffix: '',  label: 'Secure & compliant',   sub: 'GDPR · ICO · CQC · NHS DSP · ISO 27001 · Cyber Essentials', icon: <ShieldCheckIcon /> },
  { n: 25 as number | string, suffix: '+', label: 'Industries & specialties', sub: 'From clinical to wellness practices',             icon: <SectorsIcon /> },
];

export function StatsStrip() {
  const isMobile = useIsMobile();
  return (
    <div style={{ background: C.WHITE, borderTop: `1px solid ${C.BORDER}`, borderBottom: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* Trust stats */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
          {TRUST_STATS.map((s, i) => (
            <div key={s.label} style={{ padding: isMobile ? '28px 0' : '36px 0', textAlign: 'center', borderRight: !isMobile && i < 2 ? `1px solid ${C.BG}` : undefined, borderBottom: isMobile && i < 2 ? `1px solid ${C.BG}` : undefined }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.ACCENT}0A`, border: `1px solid ${C.ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 36 : 44, fontWeight: 800, color: C.TEXT, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
                <AnimatedNumber target={s.n} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: C.TEXT, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.MUTED }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const BADGES = [
  { label: 'UK GDPR',          sub: 'Data Protection Act 2018',        detail: 'Patient data processed lawfully. Consent tracked. Data subject rights supported across every module.' },
  { label: 'ICO Registered',   sub: 'Information Commissioner Office', detail: 'Registered with the ICO. Lawful basis documented for every data processing activity on the platform.' },
  { label: 'CQC Compatible',   sub: 'All 5 Inspection Domains',        detail: 'Built across Safe, Effective, Caring, Responsive, and Well-led. Evidence tracked and exportable on demand.' },
  { label: 'NHS DSP Aligned',  sub: 'Data Security and Protection',    detail: 'Aligned to NHS DSP Toolkit requirements for data security governance and staff accountability.' },
  { label: 'ISO 27001',         sub: 'Information Security Standards',  detail: 'Information security controls built to ISO 27001 standards across all platform and infrastructure layers.' },
  { label: 'Cyber Essentials',  sub: 'NCSC Accredited Framework',      detail: 'Cyber Essentials-aligned controls covering access management, system patching, and network security.' },
];

export function ComplianceBadges() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section id="compliance" style={{ background: C.WHITE, padding: isMobile ? '72px 24px' : '100px 48px', borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.7fr', gap: isMobile ? 48 : 80, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: C.ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Compliance and Security</div>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(24px, 6vw, 34px)' : 'clamp(24px, 2.8vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', color: C.TEXT, margin: '0 0 16px', lineHeight: 1.12 }}>
              Built for the regulatory reality of UK private healthcare.
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 15.5, color: C.TEXT2, lineHeight: 1.75, margin: '0 0 28px' }}>
              HealthOS is designed from the ground up for UK compliance obligations. Every module, every data flow, and every agent action is built with your regulatory environment in mind. Not adapted from a generic SaaS template.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.BG, border: `1px solid ${C.BORDER}`, borderRadius: 10, padding: '11px 16px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 600, color: C.TEXT2 }}>All data stored and processed in the United Kingdom</span>
            </div>
          </div>
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {BADGES.map((b, i) => (
              <div key={b.label} style={{ background: C.BG, border: `1px solid ${C.BORDER}`, borderRadius: 14, padding: '18px 18px', opacity: inView ? 1 : 0, transition: `opacity 0.5s ${i * 0.06}s ease` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.WHITE, border: `1px solid ${C.BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="15" viewBox="0 0 16 18" fill="none">
                      <path d="M8 1L1 4v5c0 4.5 3 7.4 7 8.5C15 16.4 15 13 15 9V4L8 1z" fill={`${C.ACCENT}15`} stroke={C.ACCENT} strokeWidth="1.2" />
                      <path d="M5 9l2 2 4-4" stroke={C.ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700, color: C.TEXT }}>{b.label}</div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.MUTED }}>{b.sub}</div>
                  </div>
                </div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.TEXT2, lineHeight: 1.6 }}>{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function FoundingProgramme() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const isMobile = useIsMobile();
  const INCLUDED = [
    'Full platform access including all five AI agents',
    'Founding client rate locked for the lifetime of your subscription',
    'Priority access to every new feature and module as it ships',
    'Direct access to the Jwebly founding team',
  ];
  return (
    <section id="founding" style={{ background: `linear-gradient(160deg, #020D1A 0%, ${C.DEEP} 100%)`, padding: isMobile ? '72px 24px' : '100px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 48 : 80, alignItems: isMobile ? 'stretch' : 'center' }}>
          <div style={{ flex: 1 }} ref={ref}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(7,124,165,0.15)', border: '1px solid rgba(7,124,165,0.3)', borderRadius: 99, padding: '5px 14px', marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: '#67E8F9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Founding Programme</span>
            </div>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(28px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
              15 founding clinic spots.<br />Locked pricing. Lifetime rate.
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 32px', maxWidth: 500 }}>
              The first 15 clinics to join HealthOS become founding clients. You shape the product, influence the roadmap, and secure the lowest price the platform will ever be.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {INCLUDED.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 13.5 : 14.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', height: 52, padding: '0 36px', borderRadius: 10, background: C.ACCENT, color: '#fff', fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(7,124,165,0.35)', letterSpacing: '-0.01em' }}>
              Book a demo
            </Link>
          </div>
          <div style={{ flexShrink: 0, width: isMobile ? '100%' : 280 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: isMobile ? '28px 24px' : '36px 28px', opacity: inView ? 1 : 0, transition: 'opacity 0.6s 0.2s ease' }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: 'rgba(7,124,165,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Founding Rate</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: FONT_HEAD, fontSize: 52, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>£149</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/month</span>
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 28 }}>Locked for life. Includes everything.</div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 20 }} />
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Spots remaining</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: '#10B981' }} />
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i + 15} style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />
                ))}
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: '#10B981' }}>15 of 50 spots remaining</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function IndustryPill({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent ? `${C.ACCENT}12` : C.WHITE, border: `1px solid ${accent ? C.ACCENT + '30' : C.BORDER}`, borderRadius: 99, padding: '9px 18px', flexShrink: 0 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: accent ? C.ACCENT : '#9BBCCE', flexShrink: 0 }} />
      <span style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 600, color: accent ? C.ACCENT : C.TEXT, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

export function Industries() {
  const isMobile = useIsMobile();

  const ROW1_BASE = [
    { label: 'Medical Aesthetics', accent: true },
    { label: 'Private Dental' },
    { label: 'Private GP' },
    { label: 'Dermatology', accent: true },
    { label: 'Physiotherapy' },
    { label: 'Cosmetic Surgery' },
    { label: 'Weight Loss Clinic' },
    { label: 'Hair Transplant' },
    { label: 'Mental Health', accent: true },
    { label: 'Chiropractic' },
    { label: 'Fertility & IVF' },
    { label: 'Ophthalmology' },
  ];
  const ROW2_BASE = [
    { label: 'Aesthetic Clinic', accent: true },
    { label: 'Dental Practice' },
    { label: 'Sports Medicine' },
    { label: 'Wellness Centre', accent: true },
    { label: 'Plastic Surgery' },
    { label: 'Osteopathy' },
    { label: 'Private Primary Care' },
    { label: 'Counselling & Therapy', accent: true },
    { label: 'Optometry' },
    { label: 'Rehabilitation' },
    { label: 'Psychology Practice' },
    { label: 'Skin Clinic' },
  ];

  const ROW1 = [...ROW1_BASE, ...ROW1_BASE];
  const ROW2 = [...ROW2_BASE, ...ROW2_BASE];

  const KF = `
    @keyframes ind-l { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes ind-r { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  `;

  return (
    <section id="industries" style={{ background: C.BG, paddingTop: isMobile ? 72 : 100, paddingBottom: isMobile ? 72 : 100, borderTop: `1px solid ${C.BORDER}`, overflow: 'hidden' }}>
      <style>{KF}</style>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '0 24px' : '0 48px', textAlign: 'center', marginBottom: isMobile ? 44 : 60 }}>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: C.ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Industries</div>
        <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.TEXT, margin: '0 0 16px', lineHeight: 1.1 }}>
          Built for every private<br />healthcare clinic.
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 16, color: C.TEXT2, lineHeight: 1.7, margin: '0 auto 8px', maxWidth: 540 }}>
          One platform, any specialty. The same agents, pipeline, compliance, and EHR adapted for your discipline. If you hold a CQC registration, HealthOS is built for you.
        </p>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 600, color: C.MUTED, marginBottom: 0 }}>25+ clinic specialties supported</div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: isMobile ? 40 : 100, background: `linear-gradient(to right, ${C.BG}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: isMobile ? 40 : 100, background: `linear-gradient(to left, ${C.BG}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 10, animation: 'ind-l 32s linear infinite', width: 'max-content' }}>
            {ROW1.map((p, i) => <IndustryPill key={i} label={p.label} accent={p.accent} />)}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 10, animation: 'ind-r 28s linear infinite', width: 'max-content' }}>
            {ROW2.map((p, i) => <IndustryPill key={i} label={p.label} accent={p.accent} />)}
          </div>
        </div>
      </div>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function Integrations() {
  const isMobile = useIsMobile();

  const CATEGORIES = [
    {
      label: 'Practice Management',
      sub: 'PMS and EHR systems',
      color: '#077CA5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#077CA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h6M9 12h6M9 15h4" />
        </svg>
      ),
      tools: ['Cliniko', 'Nookal', 'Jane App', 'Power Diary', 'Pabau', 'WriteUpp'],
    },
    {
      label: 'Billing and Finance',
      sub: 'Payments and accounting',
      color: '#10B981',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
      ),
      tools: ['Stripe', 'GoCardless', 'Xero', 'QuickBooks', 'Sage'],
    },
    {
      label: 'Calendars and Scheduling',
      sub: 'Diary and booking tools',
      color: '#8B5CF6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      tools: ['Google Calendar', 'Microsoft Outlook', 'Calendly', 'Acuity', 'Apple Calendar'],
    },
    {
      label: 'CRM and Marketing',
      sub: 'Client and lead management',
      color: '#F59E0B',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      tools: ['GoHighLevel', 'HubSpot', 'Salesforce', 'Mailchimp', 'ActiveCampaign'],
    },
  ];

  return (
    <section id="integrations" style={{ background: C.WHITE, padding: isMobile ? '72px 24px' : '100px 48px', borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 80, alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? 48 : 64 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: C.ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Integrations</div>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.TEXT, margin: '0 0 16px', lineHeight: 1.1 }}>
              Works with the tools<br />your clinic already runs.
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 16, color: C.TEXT2, lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
              HealthOS connects to your existing PMS, billing, calendar, and CRM tools. No ripping and replacing. No workflow disruption.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.label} style={{ background: C.BG, border: `1px solid ${C.BORDER}`, borderRadius: 16, padding: '22px 20px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: C.WHITE, border: `1px solid ${C.BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                {cat.icon}
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: C.TEXT, lineHeight: 1.25, marginBottom: 3 }}>{cat.label}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.MUTED, marginBottom: 14 }}>{cat.sub}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cat.tools.map(t => (
                  <span key={t} style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 600, color: C.TEXT2, background: C.WHITE, border: `1px solid ${C.BORDER}`, borderRadius: 99, padding: '4px 11px' }}>{t}</span>
                ))}
                <span style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 600, color: C.MUTED, background: 'transparent', border: `1px dashed ${C.BORDER}`, borderRadius: 99, padding: '4px 11px' }}>+ more</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: `linear-gradient(140deg, #020D1A 0%, #054668 55%, #077CA5 100%)`, borderRadius: 20, padding: isMobile ? '40px 28px' : '48px 52px', border: '1px solid rgba(7,124,165,0.25)', boxShadow: '0 24px 60px rgba(2,8,20,0.16)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(7,124,165,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 24 : 48 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: '#67E8F9', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Custom Integration Service</div>
              <h3 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 22 : 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 12px', lineHeight: 1.15 }}>
                Not on the list? Jwebly<br />builds it for you.
              </h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 13.5 : 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                Our integration specialists connect HealthOS to any tool your clinic uses. From bespoke PMS systems to legacy databases, we handle the complexity so your workflow never changes.
              </p>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, alignItems: isMobile ? 'flex-start' : 'center' }}>
              {['Any PMS system', 'Legacy databases', 'Custom workflows'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                </div>
              ))}
              <Link href="/contact" style={{ marginTop: 8, fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 10, padding: '11px 24px', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
                Talk to the team
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function AboutJwebly() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<'mission' | 'company' | 'product'>('mission');
  const TABS = {
    mission: {
      badge: 'Our Mission',
      heading: 'AI that works the way your operations do.',
      body: 'We believe AI should be embedded in the fabric of how organisations work, not bolted on as a chatbot or a disconnected tool. Every product Jwebly builds is designed from the ground up to change how a specific industry runs day to day. HealthOS is that product for private healthcare.',
      points: ['Embedded intelligence, not surface-level automation', 'Built around your workflows, not around the technology', 'Designed to make your team more capable, not replace them'],
    },
    company: {
      badge: 'Jwebly Ltd',
      heading: 'AI operational intelligence for UK industries.',
      body: 'Jwebly Ltd is a UK-based AI operational intelligence company helping organisations across sectors integrate AI meaningfully into their day-to-day operations. Jwebly Health is our healthcare division, focused entirely on private clinics and CQC-registered practices.',
      points: ['Headquartered in Birmingham, United Kingdom', 'Focused on UK-regulated industries', 'Building a vertical series of AI operating systems'],
    },
    product: {
      badge: 'HealthOS',
      heading: 'The AI operating system for private clinics.',
      body: 'HealthOS is our flagship product and the first in a vertical series of AI operating systems being built by the Jwebly team. Five specialist agents, a complete patient management system, CQC compliance infrastructure, and a client-facing portal. All in one connected platform built exclusively for private healthcare in the UK.',
      points: ['Five specialist AI agents working as a coordinated team', 'CQC compliance infrastructure built into the core', 'PMS, EHR, billing, and client portal in one platform'],
    },
  } as const;
  const active = TABS[tab];
  return (
    <section id="about" style={{ background: `linear-gradient(145deg, #020D1A 0%, #054668 100%)`, padding: isMobile ? '72px 24px' : '100px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: 20 }}><LogoMark size={44} variant="dark" /></div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: '#67E8F9', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>About Jwebly Health</div>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(24px, 6vw, 34px)' : 'clamp(24px, 2.8vw, 38px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 16px', lineHeight: 1.12 }}>
              Intelligence built by people who understand both healthcare and operations.
            </h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 15.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 32px' }}>
              Jwebly Health is the healthcare division of Jwebly Ltd. We are a UK-based team building AI operating systems for regulated industries, starting with private healthcare.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://www.linkedin.com/company/jweblyhealth" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 18px', textDecoration: 'none' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
                LinkedIn
              </a>
              <a href="https://x.com/jweblyhealth" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 18px', textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Follow on X
              </a>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: isMobile ? '24px' : '32px', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 4 }}>
              {(['mission', 'company', 'product'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 34, borderRadius: 7, border: 'none', cursor: 'pointer', background: tab === t ? 'rgba(255,255,255,0.12)' : 'transparent', fontFamily: FONT_HEAD, fontSize: 12, fontWeight: tab === t ? 700 : 500, color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                  {t === 'mission' ? 'Mission' : t === 'company' ? 'Jwebly Ltd' : 'HealthOS'}
                </button>
              ))}
            </div>
            <div key={tab} style={{ animation: 'none' }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: '#67E8F9', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{active.badge}</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 16 : 18, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.25 }}>{active.heading}</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 20px' }}>{active.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {active.points.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function DiscoveryPresentation() {
  const isMobile = useIsMobile();
  return (
    <section id="book" style={{ background: `linear-gradient(180deg, ${C.BG} 0%, ${C.WHITE} 100%)`, padding: isMobile ? '80px 24px' : '112px 48px', borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${C.ACCENT}10`, border: `1px solid ${C.ACCENT}28`, borderRadius: 99, padding: '5px 16px', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: C.ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Demo</span>
        </div>
        <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(28px, 8vw, 42px)' : 'clamp(32px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.TEXT, margin: '0 0 16px', lineHeight: 1.07 }}>
          See HealthOS working in<br />a real clinic scenario.
        </h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 15 : 17, color: C.TEXT2, lineHeight: 1.7, margin: '0 auto 48px', maxWidth: 520 }}>
          A focused 45-minute walkthrough of the full system, configured for your specialty. See the agents work, the pipeline move, and the platform think in real time.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, maxWidth: 540, margin: '0 auto 40px' }}>
          {[
            { label: 'Practice Visit', sub: 'Birmingham, UK office', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { label: 'Virtual',        sub: 'Via video link, anywhere', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
          ].map(opt => (
            <div key={opt.label} style={{ background: C.WHITE, border: `1px solid ${C.BORDER}`, borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', boxShadow: '0 2px 12px rgba(23,36,48,0.05)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `${C.ACCENT}0D`, border: `1px solid ${C.ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{opt.icon}</div>
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, color: C.TEXT, marginBottom: 3 }}>{opt.label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.MUTED }}>{opt.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', height: 56, padding: '0 48px', borderRadius: 12, background: `linear-gradient(135deg, ${C.ACCENT} 0%, ${C.DEEP} 100%)`, color: '#fff', fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 12px 40px rgba(7,124,165,0.28)', letterSpacing: '-0.01em' }}>
          Book your demo
        </Link>
        <div style={{ marginTop: 16, fontFamily: FONT_BODY, fontSize: 12, color: C.MUTED }}>No commitment required. Presented by the founding team.</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function CTABanner() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px' : '100px 48px', background: C.BG, borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: `linear-gradient(160deg, #020D1A 0%, #054668 60%, #032E44 100%)`, borderRadius: 24, padding: isMobile ? '52px 28px' : 'clamp(56px, 8vw, 88px) clamp(32px, 6vw, 80px)', border: '1px solid rgba(7,124,165,0.2)', boxShadow: '0 32px 80px rgba(2,8,20,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(7,124,165,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
            <LogoMark size={52} variant="dark" />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(7,124,165,0.15)', border: '1px solid rgba(7,124,165,0.3)', borderRadius: 99, padding: '5px 16px', marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: '#67E8F9', letterSpacing: '0.06em' }}>NOW LIVE · AESTHETIC & WELLNESS</span>
          </div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
            Ready to see it in action?
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.45)', margin: '0 auto 40px', lineHeight: 1.65, maxWidth: 480 }}>
            Book a 30-minute demo. We will walk you through the system, configured for your type of clinic.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: 52, padding: '0 40px', borderRadius: 10, background: C.ACCENT, color: '#fff', fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(7,124,165,0.4)', letterSpacing: '-0.01em' }}>
            Book a Demo
          </Link>
          <p style={{ marginTop: 18, fontFamily: FONT_BODY, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Onboarded by Jwebly. Built for your clinic.</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const ShieldIcon = ({ color = 'rgba(255,255,255,0.35)' }) => (
  <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
    <path d="M6 1L1 3.2v4c0 3.2 2.1 6.1 5 7 2.9-.9 5-3.8 5-7v-4L6 1z" fill={color + '20'} stroke={color} strokeWidth="1" strokeLinejoin="round" />
    <path d="M4 7l1.5 1.5L8 5.5" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const COMP_BADGES = [
  { label: 'UK GDPR' }, { label: 'ICO Registered' }, { label: 'CQC Compatible' },
  { label: 'NHS DSP' }, { label: 'ISO 27001' }, { label: 'Cyber Essentials' },
];

const SOCIAL = [
  { href: 'https://www.linkedin.com/company/jweblyhealth', label: 'LinkedIn', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg> },
  { href: 'https://x.com/jweblyhealth', label: 'X', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { href: 'https://www.instagram.com/jweblyhealth', label: 'Instagram', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.5)" stroke="none"/></svg> },
];

export function MarketingFooter() {
  const isMobile = useIsMobile();
  const COLS = [
    { heading: 'PLATFORM', links: [
      { l: 'AI Agents', h: '/#features' }, { l: 'Workspace', h: '/#features' },
      { l: 'PMS and EHR', h: '/#features' }, { l: 'Compliance', h: '/#features' },
      { l: 'Client Portal', h: '/#features' },
    ]},
    { heading: 'COMPANY', links: [
      { l: 'About Jwebly Health', h: '/#about' }, { l: 'Founding Programme', h: '/#founding' },
      { l: 'Integrations', h: '/#integrations' }, { l: 'Book a Demo', h: '/book' },
      { l: 'Contact', h: '/contact' },
    ]},
    { heading: 'LEGAL', links: [
      { l: 'Privacy Policy', h: '/legal/privacy' }, { l: 'Terms of Service', h: '/legal/terms' },
      { l: 'GDPR Policy', h: '/legal/gdpr' }, { l: 'Cookie Policy', h: '/legal/cookies' },
    ]},
  ];
  return (
    <footer style={{ background: C.TEXT, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: isMobile ? '48px 24px 32px' : '56px 48px 36px' }}>

        {/* Compliance badges strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 28, marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', marginRight: 4 }}>COMPLIANCE</span>
          {COMP_BADGES.map(b => (
            <div key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 9px' }}>
              <ShieldIcon />
              <span style={{ fontFamily: FONT_HEAD, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>{b.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.6fr 1fr 1fr 1fr', gap: isMobile ? 32 : 40, marginBottom: 40 }}>
          <div style={{ gridColumn: isMobile ? '1 / -1' : undefined }}>
            <div style={{ marginBottom: 14 }}><Logo size={28} variant="dark" showTag={false} /></div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'rgba(255,255,255,0.28)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 230 }}>
              The AI operating system for private healthcare. A product of Jwebly Ltd, United Kingdom.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)')}
                >{s.icon}</a>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', marginBottom: 16 }}>{col.heading}</div>
              {col.links.map(l => (
                <div key={l.l} style={{ marginBottom: 10 }}>
                  <Link href={l.h} style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)')}
                  >{l.l}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 8 }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: 'rgba(255,255,255,0.16)' }}>
            © 2026 Jwebly Ltd. Registered in England and Wales. Company No. 16122803. Trading as Jwebly Health.
          </span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: 'rgba(255,255,255,0.14)' }}>
            hello@jwebly.co.uk
          </span>
        </div>
      </div>
    </footer>
  );
}
