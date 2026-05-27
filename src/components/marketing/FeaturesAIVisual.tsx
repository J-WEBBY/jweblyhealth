'use client';
import { useState } from 'react';
import { poppins } from '@/lib/fonts';

const FH = poppins.style.fontFamily;
const FB = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const D = { BG: '#060e1a', CARD: '#0d1f33', LINE: '#1a3349' };

const KF = `
@keyframes hx-pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes hx-wave{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
@keyframes hx-blink{0%,80%,100%{opacity:0;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
@keyframes hx-in{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
@keyframes hx-spin{to{transform:rotate(360deg)}}
@keyframes hx-flow{0%{top:-6px;opacity:0}50%{opacity:1}100%{top:calc(100% + 6px);opacity:0}}
`;

const AGENTS = [
  { key: 'primary', label: 'Primary', color: '#077CA5', msgs: [
    { u: false, t: '22 clients are below the engagement threshold. A re-engagement sweep is recommended for the top 8.' },
    { u: true,  t: 'Run it now and brief the team.' },
    { u: false, t: 'Delegating to Relationship Agent. Tasks created. Team briefing sent to all practitioners.' },
  ]},
  { key: 'voice', label: 'Voice', color: '#8B5CF6', msgs: [
    { u: false, t: '14 inbound calls handled today. 11 bookings confirmed, 2 transferred to staff, 1 voicemail.' },
    { u: true,  t: 'What did the 2pm caller want?' },
    { u: false, t: 'New patient dental hygiene enquiry. Pricing discussed. Appointment provisionally booked for Thursday.' },
  ]},
  { key: 'relationship', label: 'Relate.', color: '#10B981', msgs: [
    { u: false, t: '6 clients are past their predicted visit window. Re-engagement messages are ready for review.' },
    { u: true,  t: 'Approve the low-risk ones now.' },
    { u: false, t: '4 messages approved and queued. 2 flagged for staff review — promotional content detected.' },
  ]},
  { key: 'clinical', label: 'Clinical', color: '#0EA5E9', msgs: [
    { u: false, t: 'Session note drafted for Marcus H. Physio assessment complete. No contraindications detected.' },
    { u: true,  t: 'Does he need a follow-up protocol?' },
    { u: false, t: 'Recommended 6-week plan based on intake notes. Consent form sent for signature.' },
  ]},
  { key: 'social', label: 'Social', color: '#F59E0B', msgs: [
    { u: false, t: '3 Instagram DMs and 1 Google review are waiting. Responses drafted and ready for approval.' },
    { u: true,  t: 'Show me the Google review.' },
    { u: false, t: '5-star from Tom H. A warm, professional response has been drafted. Ready when you are.' },
  ]},
] as const;

function ChatVisual() {
  const [sel, setSel] = useState(0);
  const ag = AGENTS[sel];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02)' }}>
      {/* Chrome bar */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F56','#FFBD2E','#27C93F'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.75 }} />)}
        </div>
        <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>Agent Workspace</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'hx-pulse 2s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#10B981' }}>5 agents active</span>
        </div>
      </div>
      {/* Agent switcher */}
      <div style={{ display: 'flex', padding: '8px 10px', borderBottom: `1px solid ${D.LINE}`, gap: 2 }}>
        {AGENTS.map((a, i) => (
          <button key={a.key} onClick={() => setSel(i)} style={{ flex: 1, padding: '6px 4px', border: 'none', borderRadius: 7, cursor: 'pointer', background: sel === i ? `${a.color}18` : 'transparent', transition: 'background 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: sel === i ? a.color : 'rgba(255,255,255,0.15)', transition: 'background 0.15s' }} />
            <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: sel === i ? a.color : 'rgba(255,255,255,0.25)', transition: 'color 0.15s' }}>{a.label}</span>
          </button>
        ))}
      </div>
      {/* Agent header */}
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${ag.color}20`, border: `1px solid ${ag.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: ag.color }} />
        </div>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>{ag.label} Agent</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.3)' }}>Online</span>
        </div>
      </div>
      {/* Messages */}
      <div key={sel} style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 168 }}>
        {ag.msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.u ? 'flex-end' : 'flex-start', gap: 7, animation: `hx-in 0.35s ${i * 0.12}s both` }}>
            {!m.u && <div style={{ width: 20, height: 20, borderRadius: 6, background: `${ag.color}20`, border: `1px solid ${ag.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: ag.color }} /></div>}
            <div style={{ maxWidth: '78%', padding: '8px 11px', fontSize: 11.5, fontFamily: FB, lineHeight: 1.55, color: m.u ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.78)', background: m.u ? 'rgba(255,255,255,0.07)' : `${ag.color}18`, border: `1px solid ${m.u ? 'rgba(255,255,255,0.07)' : `${ag.color}28`}`, borderRadius: m.u ? '12px 12px 3px 12px' : '3px 12px 12px 12px' }}>{m.t}</div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: `${ag.color}20`, border: `1px solid ${ag.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: ag.color }} /></div>
          <div style={{ display: 'flex', gap: 3, padding: '8px 12px', background: `${ag.color}12`, border: `1px solid ${ag.color}22`, borderRadius: '3px 12px 12px 12px' }}>
            {[0, 0.18, 0.36].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: ag.color, animation: `hx-blink 1.2s ${d}s infinite` }} />)}
          </div>
        </div>
      </div>
      {/* Input */}
      <div style={{ margin: '0 12px 12px', padding: '9px 12px', background: D.CARD, border: `1px solid ${D.LINE}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1, fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>Ask {ag.label} Agent...</span>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: ag.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 5 2 2v2.3L6 5l-4 .7V8z" fill="#fff" /></svg>
        </div>
      </div>
    </div>
  );
}

function ReceptionistVisual() {
  const N = 26;
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 32px 80px rgba(139,92,246,0.14), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '16px 20px', background: 'rgba(139,92,246,0.07)', borderBottom: '1px solid rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(139,92,246,0.2)', border: '1.5px solid rgba(139,92,246,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: FH, fontSize: 13, fontWeight: 700, color: '#fff' }}>Priya M.</div>
            <div style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.38)' }}>+44 7700 900 123 · New patient</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', animation: 'hx-pulse 1s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: '#ef4444' }}>LIVE</span>
        </div>
      </div>
      {/* Waveform */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 72 }}>
        {Array.from({ length: N }, (_, i) => {
          const h = 6 + Math.abs(Math.sin(i * 0.8) * 28);
          return <div key={i} style={{ width: 4, borderRadius: 2, background: '#8B5CF6', opacity: 0.45 + (i % 3) * 0.18, height: h, transformOrigin: 'bottom', animation: `hx-wave ${0.55 + (i % 5) * 0.1}s ${i * 0.04}s ease-in-out infinite` }} />;
        })}
      </div>
      {/* Transcript */}
      <div style={{ margin: '0 16px 12px', padding: '12px 14px', background: D.CARD, border: '1px solid rgba(139,92,246,0.15)', borderRadius: 11 }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(139,92,246,0.7)', letterSpacing: '0.08em', marginBottom: 6 }}>LIVE TRANSCRIPT</div>
        <p style={{ fontFamily: FB, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>&ldquo;Hi, I need to book a dental hygiene appointment. I had one six months ago and I think I am due another. Can you check availability?&rdquo;</p>
      </div>
      <div style={{ margin: '0 16px 16px', padding: '11px 14px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #10B981', borderTopColor: 'transparent', animation: 'hx-spin 0.9s linear infinite', flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: '#10B981' }}>Checking availability</div>
          <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Thursday 15 May at 2:00 PM</div>
        </div>
      </div>
    </div>
  );
}

function AutomationsVisual() {
  const steps = [
    { tag: 'Trigger', text: 'At-risk client detected by pipeline', color: '#F59E0B', done: true },
    { tag: 'Relationship Agent', text: 'Personalised re-engagement drafted', color: '#10B981', done: true },
    { tag: 'Judgement Engine', text: 'Risk: LOW — auto-approved', color: '#077CA5', done: true },
    { tag: 'Delivered', text: 'SMS sent to +44 7700 900 456', color: '#10B981', done: false, active: true },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Automation Run</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '2px 8px' }}>Running</span>
      </div>
      <div style={{ padding: '18px 18px 4px' }}>
        {steps.map((s, i) => (
          <div key={s.tag}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, animation: `hx-in 0.4s ${i * 0.1}s both` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${s.color}15`, border: `1.5px solid ${s.active ? s.color : s.done ? `${s.color}45` : D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.done && !s.active && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke={s.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  {s.active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, animation: 'hx-pulse 1s infinite' }} />}
                  {!s.done && !s.active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${s.color}35, rgba(255,255,255,0.05))`, position: 'relative', overflow: 'hidden', margin: '2px 0' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, height: 6, background: s.color, borderRadius: 1, animation: `hx-flow 1.4s ${i * 0.35}s ease-in-out infinite` }} />
                  </div>
                )}
              </div>
              <div style={{ paddingBottom: i < steps.length - 1 ? 0 : 6 }}>
                <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: s.color, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3 }}>{s.tag}</div>
                <div style={{ fontFamily: FB, fontSize: 12, color: s.active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{s.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '12px 16px 16px', padding: '10px 14px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.14)', borderRadius: 9, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Execution time: 0.31s</span>
        <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: '#10B981' }}>View full log</span>
      </div>
    </div>
  );
}

function KnowledgeBaseVisual() {
  const results = [
    { title: 'Physiotherapy Aftercare Protocol', type: 'Clinical', match: 97 },
    { title: 'Post-Treatment Recovery Guide', type: 'Clinical', match: 91 },
    { title: 'Dental Hygiene Standards v2.1', type: 'Policy', match: 85 },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '14px 18px 12px', borderBottom: `1px solid ${D.LINE}` }}>
        <div style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Knowledge Base</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: D.CARD, border: '1px solid rgba(7,124,165,0.3)', borderRadius: 9, padding: '9px 12px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#077CA5" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <span style={{ flex: 1, fontFamily: FB, fontSize: 11.5, color: 'rgba(255,255,255,0.55)' }}>physiotherapy aftercare protocol</span>
          <div style={{ width: 1.5, height: 14, background: '#077CA5', animation: 'hx-pulse 1s infinite' }} />
        </div>
      </div>
      <div style={{ padding: '6px 0 4px' }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', padding: '6px 18px 10px' }}>3 RESULTS FROM 12 DOCUMENTS · 0.18s</div>
        {results.map((r, i) => (
          <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderTop: `1px solid rgba(255,255,255,0.04)`, animation: `hx-in 0.4s ${i * 0.1}s both` }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(7,124,165,0.12)', border: '1px solid rgba(7,124,165,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#077CA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FH, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{r.title}</div>
              <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#077CA5', background: 'rgba(7,124,165,0.12)', border: '1px solid rgba(7,124,165,0.2)', borderRadius: 99, padding: '1px 7px' }}>{r.type}</span>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: FH, fontSize: 15, fontWeight: 800, color: '#077CA5' }}>{r.match}%</div>
              <div style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.22)' }}>match</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JudgementVisual() {
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(245,158,11,0.1), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Judgement Engine</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 99, padding: '2px 8px' }}>1 pending</span>
      </div>
      <div style={{ margin: '14px 16px 10px', padding: '12px 14px', background: D.CARD, border: '1px solid rgba(245,158,11,0.15)', borderRadius: 11, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(245,158,11,0.65)', letterSpacing: '0.08em', marginBottom: 6 }}>OUTBOUND DRAFT</div>
        <p style={{ fontFamily: FB, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>&ldquo;Hi Priya, as a thank you for your continued loyalty, we are offering you 15% off your next visit this month...&rdquo;</p>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 0%, rgba(245,158,11,0.06) 50%, transparent 100%)', width: '40%', animation: 'hx-spin 0s linear', left: 0, pointerEvents: 'none' }} />
      </div>
      <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[{ label: 'Promotional language', hit: true }, { label: 'Pricing / discount reference', hit: true }, { label: 'Do not contact flag', hit: false }].map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: r.hit ? 'rgba(245,158,11,0.14)' : 'rgba(16,185,129,0.12)', border: `1px solid ${r.hit ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {r.hit ? <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" /></svg>
                : <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ fontFamily: FB, fontSize: 11.5, color: r.hit ? 'rgba(245,158,11,0.7)' : 'rgba(255,255,255,0.32)', flex: 1 }}>{r.label}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 16px 16px', padding: '12px 16px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: 'rgba(245,158,11,0.7)', letterSpacing: '0.07em', marginBottom: 3 }}>RISK LEVEL</div>
          <div style={{ fontFamily: FH, fontSize: 20, fontWeight: 800, color: '#F59E0B', lineHeight: 1 }}>MEDIUM</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.07em', marginBottom: 3 }}>DECISION</div>
          <div style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Awaiting review</div>
        </div>
      </div>
    </div>
  );
}

function BridgeVisual() {
  const threads = [
    { name: 'Priya M.', channel: 'SMS', color: '#10B981', preview: 'Thank you, see you Thursday!', time: '2m', unread: false },
    { name: 'Dan K.', channel: 'WhatsApp', color: '#25D366', preview: 'Can I reschedule my appointment?', time: '14m', unread: true },
    { name: 'Sarah F.', channel: 'Email', color: '#0EA5E9', preview: 'Your aftercare guide has been sent.', time: '1h', unread: false },
    { name: 'Ali R.', channel: 'Web', color: '#8B5CF6', preview: 'Booking confirmed for 16 May at 10:00', time: '2h', unread: false },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Bridge</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 99, padding: '2px 8px' }}>1 needs reply</span>
      </div>
      <div style={{ display: 'flex', gap: 4, padding: '9px 14px', borderBottom: `1px solid ${D.LINE}` }}>
        {['All channels', 'SMS', 'WhatsApp', 'Email'].map((ch, i) => (
          <span key={ch} style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.3)', background: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 6, padding: '3px 9px', border: i === 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', cursor: 'default' }}>{ch}</span>
        ))}
      </div>
      {threads.map((t, i) => (
        <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < threads.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', background: t.unread ? 'rgba(255,255,255,0.02)' : 'transparent', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${t.color}18`, border: `1.5px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: t.color }}>{t.name[0]}</span>
            {t.unread && <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', border: '1.5px solid #060e1a' }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: t.unread ? '#fff' : 'rgba(255,255,255,0.6)' }}>{t.name}</span>
              <span style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)' }}>{t.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: FH, fontSize: 8, fontWeight: 700, color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}22`, borderRadius: 99, padding: '1px 6px', flexShrink: 0 }}>{t.channel}</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.preview}</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{ margin: '8px 16px 16px', padding: '9px 14px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.13)', borderRadius: 9, textAlign: 'center' }}>
        <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(16,185,129,0.7)' }}>Relationship Agent managing all channels</span>
      </div>
    </div>
  );
}

export function AIAgentsVisual({ activeFeature }: { activeFeature: string }) {
  return (
    <>
      <style>{KF}</style>
      {activeFeature === 'AI Receptionist'  && <ReceptionistVisual />}
      {activeFeature === 'Automations'       && <AutomationsVisual />}
      {activeFeature === 'Knowledge Base'    && <KnowledgeBaseVisual />}
      {activeFeature === 'Judgement Engine'  && <JudgementVisual />}
      {activeFeature === 'Bridge'            && <BridgeVisual />}
      {(activeFeature === 'Agent Chat Interfaces' || !activeFeature) && <ChatVisual />}
    </>
  );
}
