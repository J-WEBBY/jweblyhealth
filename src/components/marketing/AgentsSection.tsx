'use client';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { poppins } from '@/lib/fonts';

const FONT_HEAD = poppins.style.fontFamily;
const FONT_BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const C = { TEXT: '#172430', TEXT2: '#426D84', MUTED: '#7B98A6', BORDER: '#C5D8E8' };

const AGENTS = [
  {
    key: 'primary', agentName: 'Primary Agent', role: 'Clinical Command Centre', color: '#077CA5',
    tag: 'Total Practice Intelligence',
    headline: "Give your practitioners\nAI superpowers.",
    desc: "The Primary Agent is your AI operations director — monitoring every signal, coordinating your specialist agents, and managing the operational workload of your practice so your team can focus on patient care.",
    points: [
      ["Eliminate your ops overhead", "Acts as your AI practice manager — without the salary or the gaps."],
      ["CQC compliance, always audit-ready", "Monitors all five domains continuously. Evidence captured and filed automatically."],
      ["One AI. Your whole practice.", "Signals, staff coordination, compliance, and oversight — handled in one place."],
    ],
    caps: ['Compliance oversight', 'Agent coordination', 'Practice management'],
  },
  {
    key: 'voice', agentName: 'Voice Agent', role: 'AI Receptionist', color: '#8B5CF6',
    tag: 'Never Lose a Lead Again',
    headline: "Stop losing revenue\nto missed calls.",
    desc: "Every unanswered call is a booking lost. The Voice Agent handles inbound and outbound calls 24/7 — booking directly into your live calendar, triaging queries, and handing off to your team when clinical judgment is needed.",
    points: [
      ["Zero missed enquiries — ever", "Calls answered round the clock, including evenings and weekends, at zero staffing cost."],
      ["Live calendar booking during the call", "Availability checked, appointment confirmed, reminder sent — all in a single call."],
      ["Seamless handover to your team", "Escalates instantly when clinical judgment or a personal touch is required."],
    ],
    caps: ['Inbound & outbound calls', 'Live appointment booking', 'Call triage & handover'],
  },
  {
    key: 'relationship', agentName: 'Relationship Agent', role: 'Patient Engagement', color: '#10B981',
    tag: 'Personalised at Scale',
    headline: "Every client feels like\nyour only client.",
    desc: "The Relationship Agent monitors your full client pipeline in real time, fires personalised re-engagement campaigns, and handles 24/7 conversations across four channels without your team lifting a finger.",
    points: [
      ["Recover lapsed clients before they leave", "Re-engagement fires when a client's engagement score drops below threshold."],
      ["Four channels. One agent.", "SMS, WhatsApp, email, and web — all managed, personalised, and tracked in one place."],
      ["Reduce no-shows and recover revenue", "Intelligent reminders, follow-up sequences, and billing support built into every journey."],
    ],
    caps: ['Pipeline monitoring', 'Re-engagement campaigns', 'Inbound messaging'],
  },
  {
    key: 'clinical', agentName: 'Clinical Agent', role: 'Clinical Intelligence', color: '#0EA5E9',
    tag: 'More Patient Time. Less Admin.',
    headline: "Hours back in every\npractitioner's day.",
    desc: "Clinical documentation consumes hours that belong with patients. The Clinical Agent scribes sessions live, drafts EHR notes and prescriptions, and flags consent and safety gaps before they become a risk.",
    points: [
      ["Notes ready before you leave the room", "Scribes during the session so practitioners review — not write from scratch."],
      ["Consent and safety flagged in real time", "Catches gaps under pressure before they become clinical or regulatory risk."],
      ["Research, letters, and prescriptions", "Evidence retrieval, clinical letter drafting, and prescribing support in one agent."],
    ],
    caps: ['Live session scribing', 'EHR & prescription assist', 'Safety & consent monitoring'],
  },
  {
    key: 'social', agentName: 'Social Agent', role: 'Digital Presence', color: '#F59E0B',
    tag: 'Premium Presence. Zero Agency Cost.',
    headline: "Look like a premium practice\nwithout the agency bill.",
    desc: "Your online presence shapes first impressions. The Social Agent monitors every DM and review, plans and drafts content and campaigns — with nothing published without your explicit approval.",
    points: [
      ["No DM, review, or enquiry ever missed", "Every channel monitored 24/7. Responses drafted and ready for your review."],
      ["Content and campaigns planned for you", "Posts, copy, and campaigns managed in one place and approved before going live."],
      ["Replace your agency retainer", "Full social management capability at a fraction of what an external team would cost."],
    ],
    caps: ['DM & review monitoring', 'Content creation', 'Campaign management'],
  },
] as const;

type Agent = typeof AGENTS[number];

function useInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return v;
}

function AgentCard({ a }: { a: Agent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${hovered ? `${a.color}45` : `${a.color}28`}`,
        boxShadow: hovered
          ? `0 32px 80px ${a.color}28, 0 8px 32px rgba(23,36,48,0.12)`
          : `0 20px 60px ${a.color}18, 0 4px 20px rgba(23,36,48,0.07)`,
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Colored gradient header */}
      <div style={{ background: `linear-gradient(140deg, ${a.color} 0%, ${a.color}C0 100%)`, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -44, right: -32, width: 170, height: 170, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -28, left: 52, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <pattern id={`d-${a.key}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.14)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#d-${a.key})`} />
        </svg>
        <div style={{ width: 50, height: 50, borderRadius: 15, background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff' }} />
        </div>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 6, position: 'relative' }}>{a.agentName}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.09em', textTransform: 'uppercase', position: 'relative' }}>{a.role}</div>
      </div>

      {/* Card body — capabilities only */}
      <div style={{ background: `linear-gradient(160deg, #fff 60%, ${a.color}05 100%)`, padding: '24px 28px' }}>
        {a.caps.map((cap, i) => (
          <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: 11, paddingBottom: i < a.caps.length - 1 ? 14 : 0, marginBottom: i < a.caps.length - 1 ? 14 : 0, borderBottom: i < a.caps.length - 1 ? '1px solid #EEF5FA' : 'none' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: C.TEXT2 }}>{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentRow({ a, isMobile, isLast }: { a: Agent; isMobile: boolean; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 44 : 88, alignItems: isMobile ? 'stretch' : 'center', paddingTop: isMobile ? 56 : 80, paddingBottom: isMobile ? 56 : 80, borderBottom: isLast ? 'none' : `1px solid ${C.BORDER}` }}>
      <div style={{ flex: 1, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${a.color}0F`, border: `1px solid ${a.color}28`, borderRadius: 99, padding: '5px 14px', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color }} />
          <span style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: a.color, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{a.tag}</span>
        </div>
        <h3 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 26 : 36, fontWeight: 800, color: C.TEXT, letterSpacing: '-0.03em', lineHeight: 1.08, margin: '0 0 18px', whiteSpace: 'pre-line' }}>{a.headline}</h3>
        <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 16, color: C.TEXT2, lineHeight: 1.78, margin: '0 0 36px', maxWidth: 480 }}>{a.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {a.points.map(([head, body]) => (
            <div key={head} style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 3, flexShrink: 0, background: `linear-gradient(to bottom, ${a.color}, ${a.color}50)`, borderRadius: 2, alignSelf: 'stretch', minHeight: 44 }} />
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 700, color: C.TEXT, marginBottom: 5, lineHeight: 1.3 }}>{head}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.TEXT2, lineHeight: 1.65 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: isMobile ? '100%' : 380, flexShrink: 0, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(32px)', transition: 'opacity 0.7s 0.14s ease, transform 0.7s 0.14s ease' }}>
        <AgentCard a={a} />
      </div>
    </div>
  );
}

export function AgentsSection() {
  const isMobile = useIsMobile();
  return (
    <section id="agents" style={{ background: '#E2F3F8', borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '72px 24px 0' : '100px 48px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto', paddingBottom: isMobile ? 56 : 80 }}>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: '#077CA5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Your AI Clinical Team</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(34px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.TEXT, margin: '0 0 20px', lineHeight: 1.06 }}>
            Your advanced AI team.<br />Built for private practice.
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 15 : 17, color: C.TEXT2, lineHeight: 1.72, margin: 0 }}>
            Specialist AI employees working in unison — handling your practice operations, patient management, compliance, and growth. Saving your practice time, money, and headcount.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 24px 72px' : '0 48px 100px' }}>
        {AGENTS.map((a, i) => (
          <AgentRow key={a.key} a={a} isMobile={isMobile} isLast={i === AGENTS.length - 1} />
        ))}
      </div>
    </section>
  );
}
