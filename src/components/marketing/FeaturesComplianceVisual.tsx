'use client';
import { poppins } from '@/lib/fonts';

const FH = poppins.style.fontFamily;
const FB = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const D = { BG: '#060e1a', CARD: '#0d1f33', LINE: '#1a3349' };
const AC = '#077CA5';

const KF = `
@keyframes hx-pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes hx-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
`;

function CQCAuditVisual() {
  const domains = [
    { label: 'Safe', pct: 94, color: '#10B981' },
    { label: 'Effective', pct: 88, color: '#077CA5' },
    { label: 'Caring', pct: 96, color: '#10B981' },
    { label: 'Responsive', pct: 82, color: '#F59E0B' },
    { label: 'Well-led', pct: 90, color: '#077CA5' },
  ];
  const avg = Math.round(domains.reduce((s, d) => s + d.pct, 0) / domains.length);
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>CQC Audit Tracker</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'hx-pulse 2s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: '#10B981' }}>Audit-ready</span>
        </div>
      </div>
      <div style={{ padding: '16px 16px 4px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: FH, fontSize: 36, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>{avg}%</div>
          <div style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>Overall readiness</div>
        </div>
        <div style={{ flex: 1 }}>
          {domains.map((dm, i) => (
            <div key={dm.label} style={{ marginBottom: 9, animation: `hx-in 0.4s ${i * 0.07}s both` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{dm.label}</span>
                <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: dm.color }}>{dm.pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${dm.pct}%`, background: `linear-gradient(to right, ${dm.color}70, ${dm.color})`, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: '6px 14px 12px', padding: '8px 12px', background: `${AC}08`, border: `1px solid ${AC}20`, borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.35)' }}>Evidence auto-captured · Primary Agent monitoring continuously</span>
      </div>
    </div>
  );
}

function HRRecordsVisual() {
  const docs = [
    { label: 'DBS Certificate', status: 'Valid', expires: 'Mar 2027', color: '#10B981' },
    { label: 'Employment Contract', status: 'Signed', expires: null, color: '#10B981' },
    { label: 'Professional Indemnity', status: 'Valid', expires: 'Jan 2027', color: '#10B981' },
    { label: 'NMC Registration', status: 'Expiring soon', expires: 'Jun 2026', color: '#F59E0B' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>HR Records · Dr. Chen</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>1 action needed</span>
      </div>
      <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${D.LINE}` }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${AC}18`, border: `1.5px solid ${AC}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: AC }}>DC</span>
        </div>
        <div>
          <div style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Dr. Chen</div>
          <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>Lead Practitioner · Joined Jan 2023</div>
        </div>
      </div>
      {docs.map((doc, i) => (
        <div key={doc.label} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 16px', borderBottom: i < docs.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: `${doc.color}14`, border: `1px solid ${doc.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={doc.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ flex: 1, fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{doc.label}</span>
          {doc.expires && <span style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)' }}>Exp. {doc.expires}</span>}
          <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: doc.color, background: `${doc.color}12`, borderRadius: 99, padding: '2px 8px' }}>{doc.status}</span>
        </div>
      ))}
    </div>
  );
}

function EvidencePackVisual() {
  const cats = [
    { label: 'Safe', docs: 14, color: '#10B981' },
    { label: 'Effective', docs: 9, color: '#077CA5' },
    { label: 'Caring', docs: 11, color: '#10B981' },
    { label: 'Responsive', docs: 7, color: '#F59E0B' },
    { label: 'Well-led', docs: 12, color: '#077CA5' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Evidence Pack Builder</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '2px 8px' }}>53 documents</span>
      </div>
      <div style={{ padding: '12px 14px' }}>
        {cats.map((cat, i) => (
          <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 8, background: D.CARD, marginBottom: 6, border: `1px solid rgba(255,255,255,0.04)`, animation: `hx-in 0.4s ${i * 0.07}s both` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{cat.label}</span>
            <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.28)' }}>{cat.docs} docs</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px 12px', padding: '10px 14px', background: `${AC}08`, border: `1px solid ${AC}20`, borderRadius: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Inspection-ready pack</span>
        <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: AC }}>Export PDF</span>
      </div>
    </div>
  );
}

function GovernanceMeetingsVisual() {
  const actions = [
    { task: 'Update medicines policy', owner: 'Dr. Chen', due: '15 May', done: true },
    { task: 'Review safeguarding procedure', owner: 'Mark T.', due: '20 May', done: false },
    { task: 'Staff training audit', owner: 'Sophie R.', due: '28 May', done: false },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Governance Meetings</span>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Last meeting 8 May</span>
      </div>
      <div style={{ margin: '12px 14px 10px', padding: '10px 14px', background: D.CARD, borderRadius: 10 }}>
        <div style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 6 }}>CLINICAL GOVERNANCE COMMITTEE · 8 MAY 2026</div>
        <div style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>Reviewed Q1 clinical outcomes, incident reports, and training compliance. Agreed updated medicines management protocol effective 1 June.</div>
      </div>
      <div style={{ padding: '0 14px 6px' }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 8 }}>ACTION ITEMS</div>
        {actions.map((a, i) => (
          <div key={a.task} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9, animation: `hx-in 0.4s ${i * 0.09}s both` }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: a.done ? 'rgba(16,185,129,0.12)' : D.CARD, border: `1px solid ${a.done ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {a.done && <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FB, fontSize: 11, color: a.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.6)' }}>{a.task}</div>
              <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)', marginTop: 2 }}>{a.owner} · Due {a.due}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EquipmentLogVisual() {
  const items = [
    { name: 'IPL Device', model: 'Lumenis M22', next: '18 May 2026', status: 'Due soon', color: '#F59E0B' },
    { name: 'Laser Unit', model: 'Cynosure Elite', next: '12 Aug 2026', status: 'OK', color: '#10B981' },
    { name: 'Autoclave', model: 'Melag 40B', next: '01 Jun 2026', status: 'OK', color: '#10B981' },
    { name: 'Ultrasound', model: 'BTL Aesthetics', next: '30 May 2026', status: 'Due soon', color: '#F59E0B' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Equipment Log</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>2 services due</span>
      </div>
      {items.map((item, i) => (
        <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: i < items.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, animation: item.status === 'Due soon' ? 'hx-pulse 1.5s infinite' : 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 2 }}>{item.name}</div>
            <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.25)' }}>{item.model}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.22)', marginBottom: 3 }}>Next service</div>
            <div style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: item.color }}>{item.next}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainingRecordsVisual() {
  const staff = [
    { name: 'Dr. Chen', complete: 6, required: 6, color: '#10B981' },
    { name: 'Nurse Amy', complete: 5, required: 6, color: '#077CA5' },
    { name: 'Sophie R.', complete: 4, required: 6, color: '#F59E0B' },
    { name: 'Mark T.', complete: 6, required: 6, color: '#10B981' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Training Records</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>2 incomplete</span>
      </div>
      <div style={{ padding: '12px 16px 6px' }}>
        {staff.map((s, i) => (
          <div key={s.name} style={{ marginBottom: 14, animation: `hx-in 0.4s ${i * 0.08}s both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{s.name}</span>
              <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: s.color }}>{s.complete}/{s.required} modules</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(s.complete / s.required) * 100}%`, background: `linear-gradient(to right, ${s.color}70, ${s.color})`, borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px 12px', padding: '8px 12px', background: `${AC}06`, border: `1px solid ${AC}15`, borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>Certificate expiry alerts sent automatically</span>
      </div>
    </div>
  );
}

export function ComplianceVisual({ activeFeature }: { activeFeature: string }) {
  return (
    <>
      <style>{KF}</style>
      {activeFeature === 'HR & Staff Records'    && <HRRecordsVisual />}
      {activeFeature === 'Evidence Pack Builder' && <EvidencePackVisual />}
      {activeFeature === 'Governance Meetings'   && <GovernanceMeetingsVisual />}
      {activeFeature === 'Equipment Log'         && <EquipmentLogVisual />}
      {activeFeature === 'Training Records'      && <TrainingRecordsVisual />}
      {(activeFeature === 'CQC Audit Tracker' || !activeFeature) && <CQCAuditVisual />}
    </>
  );
}
