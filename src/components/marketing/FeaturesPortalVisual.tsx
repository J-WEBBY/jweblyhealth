'use client';
import { poppins } from '@/lib/fonts';

const FH = poppins.style.fontFamily;
const FB = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const D = { BG: '#060e1a', CARD: '#0d1f33', LINE: '#1a3349' };
const AC = '#10B981';

const KF = `
@keyframes hx-pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes hx-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes hx-blink{0%,80%,100%{opacity:0;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
`;

function AppointmentBookingVisual() {
  const slots = [
    { time: '09:00', avail: true }, { time: '10:00', avail: false },
    { time: '11:00', avail: true }, { time: '12:00', avail: false },
    { time: '14:00', avail: true }, { time: '15:00', avail: true },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Book an Appointment</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: AC, background: `${AC}12`, border: `1px solid ${AC}22`, borderRadius: 99, padding: '2px 8px' }}>Live availability</span>
      </div>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${D.LINE}` }}>
        <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 6 }}>SELECT DATE · MAY 2026</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['12', '13', '14', '15', '16', '17', '18'].map((d, i) => (
            <div key={d} style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 7, background: d === '14' ? `${AC}20` : 'transparent', border: d === '14' ? `1px solid ${AC}35` : '1px solid transparent', cursor: 'default' }}>
              <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: d === '14' ? AC : 'rgba(255,255,255,0.3)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
              <div style={{ fontFamily: FH, fontSize: 13, fontWeight: 800, color: d === '14' ? AC : 'rgba(255,255,255,0.45)', marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 8 }}>AVAILABLE TIMES · 14 MAY</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {slots.map((s, i) => (
            <div key={s.time} style={{ textAlign: 'center', padding: '8px 0', borderRadius: 8, background: s.avail ? (i === 2 ? `${AC}20` : D.CARD) : 'rgba(255,255,255,0.03)', border: `1px solid ${s.avail ? (i === 2 ? `${AC}40` : 'rgba(255,255,255,0.08)') : 'rgba(255,255,255,0.03)'}`, animation: `hx-in 0.4s ${i * 0.07}s both` }}>
              <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: s.avail ? (i === 2 ? AC : 'rgba(255,255,255,0.6)') : 'rgba(255,255,255,0.18)' }}>{s.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: '4px 14px 12px', padding: '9px 13px', background: `${AC}08`, border: `1px solid ${AC}20`, borderRadius: 9, textAlign: 'center' }}>
        <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: AC }}>Confirm booking for 11:00</span>
      </div>
    </div>
  );
}

function TreatmentHistoryVisual() {
  const treatments = [
    { date: '08 May 2026', type: 'Physiotherapy', provider: 'James O.', note: 'Lumbar mobilisation, session 3 of 6', color: '#10B981' },
    { date: '14 Mar 2026', type: 'GP Consultation', provider: 'Dr. Patel', note: 'Annual health review, bloods requested', color: '#077CA5' },
    { date: '10 Jan 2026', type: 'Dental Hygiene', provider: 'K. Moss', note: 'Scale and polish, X-rays taken', color: '#0EA5E9' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Treatment History · Marcus H.</span>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>3 sessions</span>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {treatments.map((t, i) => (
          <div key={t.date} style={{ display: 'flex', gap: 12, marginBottom: i < treatments.length - 1 ? 14 : 0, animation: `hx-in 0.4s ${i * 0.09}s both` }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: `${t.color}25`, border: `2px solid ${t.color}` }} />
              {i < treatments.length - 1 && <div style={{ width: 1.5, flex: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < treatments.length - 1 ? 4 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: t.color }}>{t.type}</span>
                <span style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)' }}>{t.date}</span>
              </div>
              <div style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{t.note}</div>
              <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.2)' }}>{t.provider}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '6px 14px 12px', padding: '8px 12px', background: `${AC}06`, border: `1px solid ${AC}15`, borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>Full clinical notes and before/after photos available</span>
      </div>
    </div>
  );
}

function AftercareVisual() {
  const items = [
    { text: 'Apply ice for 10 minutes if swelling occurs', done: true },
    { text: 'Avoid heavy lifting for 48 hours', done: true },
    { text: 'Complete home exercise programme daily', done: false },
    { text: 'Contact the clinic if pain worsens significantly', done: false },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Aftercare · Physiotherapy Session</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>2 of 4 done</span>
      </div>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${D.LINE}` }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 5 }}>RECOVERY PROGRESS</div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '50%', background: `linear-gradient(to right, ${AC}70, ${AC})`, borderRadius: 99 }} />
        </div>
      </div>
      <div style={{ padding: '10px 14px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < items.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
            <div style={{ width: 16, height: 16, borderRadius: 5, background: item.done ? `${AC}15` : D.CARD, border: `1px solid ${item.done ? `${AC}30` : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {item.done && <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={AC} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ fontFamily: FB, fontSize: 11, color: item.done ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.62)', lineHeight: 1.4 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '6px 14px 12px', padding: '8px 12px', background: `${AC}06`, border: `1px solid ${AC}15`, borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.35)' }}>Next session booked 15 May · Sent by Relationship Agent</span>
      </div>
    </div>
  );
}

function InvoicesPortalVisual() {
  const invoices = [
    { ref: 'INV-0082', type: 'Physiotherapy Session', amount: '£95', status: 'Pay now', date: '08 May', color: '#F59E0B' },
    { ref: 'INV-0067', type: 'GP Consultation', amount: '£120', status: 'Paid', date: '14 Mar', color: '#10B981' },
    { ref: 'INV-0054', type: 'Dental Hygiene', amount: '£75', status: 'Paid', date: '10 Jan', color: '#10B981' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Invoices & Payments</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>£280 outstanding</span>
      </div>
      {invoices.map((inv, i) => (
        <div key={inv.ref} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', borderBottom: i < invoices.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: D.CARD, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{inv.type}</div>
            <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)' }}>{inv.ref} · {inv.date}</div>
          </div>
          <span style={{ fontFamily: FH, fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>{inv.amount}</span>
          <div style={{ padding: '5px 12px', borderRadius: 7, background: inv.status === 'Pay now' ? `${AC}18` : 'rgba(255,255,255,0.05)', border: `1px solid ${inv.status === 'Pay now' ? `${AC}35` : 'rgba(255,255,255,0.08)'}` }}>
            <span style={{ fontFamily: FH, fontSize: 9.5, fontWeight: 700, color: inv.status === 'Pay now' ? AC : 'rgba(255,255,255,0.3)' }}>{inv.status}</span>
          </div>
        </div>
      ))}
      <div style={{ margin: '8px 14px 12px', padding: '9px 13px', background: `${AC}06`, border: `1px solid ${AC}15`, borderRadius: 9, textAlign: 'center' }}>
        <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: AC }}>Pay £95.00 securely via Stripe</span>
      </div>
    </div>
  );
}

function SecureMessagingVisual() {
  const msgs = [
    { u: false, t: 'Hi Emma, just a reminder that your review appointment is tomorrow at 2pm. Let us know if anything has changed.' },
    { u: true,  t: 'Thanks! Could I also ask about adding lip filler to the appointment?' },
    { u: false, t: 'Of course. I have flagged your request and the team will confirm availability before your visit.' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${AC}18`, border: `1px solid ${AC}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: AC }} />
        </div>
        <div>
          <div style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: '#fff' }}>Jwebly Clinic</div>
          <div style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Managed by Relationship Agent</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: AC, animation: 'hx-pulse 2s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: AC }}>Online</span>
        </div>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.u ? 'flex-end' : 'flex-start', animation: `hx-in 0.35s ${i * 0.1}s both` }}>
            <div style={{ maxWidth: '82%', padding: '8px 11px', fontSize: 11, fontFamily: FB, lineHeight: 1.5, color: m.u ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.75)', background: m.u ? 'rgba(255,255,255,0.07)' : `${AC}18`, border: `1px solid ${m.u ? 'rgba(255,255,255,0.07)' : `${AC}28`}`, borderRadius: m.u ? '12px 12px 3px 12px' : '3px 12px 12px 12px' }}>{m.t}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 3, padding: '8px 12px', background: `${AC}12`, border: `1px solid ${AC}22`, borderRadius: '3px 12px 12px 12px' }}>
            {[0, 0.18, 0.36].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: AC, animation: `hx-blink 1.2s ${d}s infinite` }} />)}
          </div>
        </div>
      </div>
      <div style={{ margin: '0 12px 12px', padding: '8px 12px', background: D.CARD, border: `1px solid ${D.LINE}`, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1, fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>Message the clinic...</span>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: AC, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 5 2 2v2.3L6 5l-4 .7V8z" fill="#fff" /></svg>
        </div>
      </div>
    </div>
  );
}

function DocumentAccessVisual() {
  const docs = [
    { name: 'Botox Consent Form — 8 May 2026', type: 'Consent', color: '#077CA5' },
    { name: 'Aftercare Guide — Botulinum Toxin', type: 'Aftercare', color: AC },
    { name: 'Treatment Summary — Feb 2026', type: 'Clinical', color: '#0EA5E9' },
    { name: 'GP Referral Letter — Nov 2025', type: 'Referral', color: '#8B5CF6' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>My Documents</span>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>4 documents</span>
      </div>
      {docs.map((doc, i) => (
        <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: i < docs.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `${doc.color}12`, border: `1px solid ${doc.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={doc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>{doc.name}</div>
            <span style={{ fontFamily: FH, fontSize: 8, fontWeight: 700, color: doc.color, background: `${doc.color}12`, border: `1px solid ${doc.color}20`, borderRadius: 99, padding: '1px 7px' }}>{doc.type}</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      ))}
    </div>
  );
}

export function PortalVisual({ activeFeature }: { activeFeature: string }) {
  return (
    <>
      <style>{KF}</style>
      {activeFeature === 'Treatment History'    && <TreatmentHistoryVisual />}
      {activeFeature === 'Aftercare & Follow-up' && <AftercareVisual />}
      {activeFeature === 'Invoices & Payments'  && <InvoicesPortalVisual />}
      {activeFeature === 'Secure Messaging'     && <SecureMessagingVisual />}
      {activeFeature === 'Document Access'      && <DocumentAccessVisual />}
      {(activeFeature === 'Appointment Booking' || !activeFeature) && <AppointmentBookingVisual />}
    </>
  );
}
