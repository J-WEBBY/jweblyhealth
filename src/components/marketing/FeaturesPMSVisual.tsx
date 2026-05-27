'use client';
import { poppins } from '@/lib/fonts';

const FH = poppins.style.fontFamily;
const FB = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const D = { BG: '#060e1a', CARD: '#0d1f33', LINE: '#1a3349' };
const AC = '#0EA5E9';

const KF = `
@keyframes hx-pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes hx-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes hx-spin{to{transform:rotate(360deg)}}
`;

function ClientPipelineVisual() {
  const stages = [
    { label: 'Lead', count: 12, color: '#8B5CF6' },
    { label: 'New', count: 8, color: '#0EA5E9' },
    { label: 'Active', count: 45, color: '#10B981' },
    { label: 'Loyal', count: 18, color: '#077CA5' },
    { label: 'At Risk', count: 6, color: '#F59E0B' },
    { label: 'Lapsed', count: 3, color: '#ef4444' },
  ];
  const clients = [
    { name: 'Priya M.', stage: 'Loyal', score: 88, color: '#077CA5' },
    { name: 'James T.', stage: 'At Risk', score: 34, color: '#F59E0B' },
    { name: 'Ali R.', stage: 'Active', score: 72, color: '#10B981' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Client Pipeline · 92 clients</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>6 at risk</span>
      </div>
      <div style={{ display: 'flex', gap: 4, padding: '10px 12px', borderBottom: `1px solid ${D.LINE}`, overflowX: 'auto' }}>
        {stages.map(s => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: `${s.color}0D`, border: `1px solid ${s.color}20`, borderRadius: 8, padding: '6px 10px', flexShrink: 0 }}>
            <span style={{ fontFamily: FH, fontSize: 15, fontWeight: 800, color: s.color }}>{s.count}</span>
            <span style={{ fontFamily: FH, fontSize: 7, fontWeight: 700, color: `${s.color}80`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</span>
          </div>
        ))}
      </div>
      {clients.map((c, i) => (
        <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 16px', borderBottom: i < clients.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${c.color}15`, border: `1.5px solid ${c.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: c.color }}>{c.name[0]}</span>
          </div>
          <span style={{ flex: 1, fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{c.name}</span>
          <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: c.color, background: `${c.color}12`, border: `1px solid ${c.color}22`, borderRadius: 99, padding: '2px 8px' }}>{c.stage}</span>
          <span style={{ fontFamily: FH, fontSize: 14, fontWeight: 800, color: c.color, width: 28, textAlign: 'right' }}>{c.score}</span>
        </div>
      ))}
      <div style={{ margin: '6px 14px 12px', padding: '8px 12px', background: `${AC}06`, border: `1px solid ${AC}15`, borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>Engagement scores updated daily · Predicted next visits tracked</span>
      </div>
    </div>
  );
}

function EHRHubVisual() {
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>EHR · Marcus H.</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: AC, background: `${AC}12`, border: `1px solid ${AC}22`, borderRadius: 99, padding: '2px 8px' }}>Draft ready</span>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {[
          { label: 'S — Subjective', text: 'Client reports lower back stiffness. Pain level 4/10 post-exercise. Improvement noted since last session.', color: '#077CA5' },
          { label: 'O — Objective', text: 'Lumbar mobility assessed at 65% range. Soft tissue mobilisation applied bilaterally.', color: AC },
          { label: 'A — Assessment', text: 'Moderate lumbar strain. Responding well to treatment. Continue 4-week physio plan.', color: '#10B981' },
          { label: 'P — Plan', text: 'Next session in 7 days. Home exercise programme prescribed. Aftercare sent via portal.', color: '#8B5CF6' },
        ].map((s, i) => (
          <div key={s.label} style={{ marginBottom: 10, animation: `hx-in 0.4s ${i * 0.08}s both` }}>
            <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: s.color, letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, background: D.CARD, borderLeft: `2px solid ${s.color}50`, borderRadius: '0 6px 6px 0', padding: '6px 9px' }}>{s.text}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px 12px', padding: '8px 12px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'hx-pulse 2s infinite', flexShrink: 0 }} />
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.35)' }}>Clinical Agent drafted · Awaiting practitioner sign-off</span>
      </div>
    </div>
  );
}

function PrescriptionVisual() {
  const checks = [
    { label: 'Contraindication check', ok: true },
    { label: 'Drug interaction screen', ok: true },
    { label: 'Allergy flag', ok: false, note: 'Penicillin — unrelated to treatment' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Prescription · Sarah F.</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '2px 8px' }}>Cleared</span>
      </div>
      <div style={{ margin: '12px 14px 10px', padding: '12px 14px', background: D.CARD, borderRadius: 10, border: `1px solid rgba(14,165,233,0.12)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['Medication', 'Amoxicillin 500mg'], ['Dose', '3x daily, 7 days'], ['Route', 'Oral'], ['Prescriber', 'Dr. Patel']].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</div>
              <div style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 14px 6px' }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 8 }}>AI SAFETY CHECKS</div>
        {checks.map((c, i) => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8, animation: `hx-in 0.4s ${i * 0.09}s both` }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: c.ok ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', border: `1px solid ${c.ok ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {c.ok ? <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <svg width="7" height="7" viewBox="0 0 10 10"><path d="M5 2v4M5 7.5v.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            </div>
            <div>
              <span style={{ fontFamily: FB, fontSize: 11, color: c.ok ? 'rgba(255,255,255,0.45)' : 'rgba(245,158,11,0.75)' }}>{c.label}</span>
              {c.note && <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{c.note}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryVisual() {
  const items = [
    { name: 'Disposable Gloves (M)', stock: 180, min: 100, unit: 'boxes', color: '#077CA5' },
    { name: 'Amoxicillin 500mg', stock: 4, min: 8, unit: 'packs', color: '#ef4444', low: true },
    { name: 'Examination Couch Roll', stock: 22, min: 10, unit: 'rolls', color: '#10B981' },
    { name: 'Lidocaine 2% 1.8ml', stock: 9, min: 12, unit: 'cartridges', color: '#F59E0B', low: true },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Product Inventory</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 99, padding: '2px 8px' }}>2 low stock</span>
      </div>
      {items.map((item, i) => (
        <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: i < items.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.07}s both` }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (item.stock / (item.min * 2)) * 100)}%`, background: item.color, borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={{ fontFamily: FH, fontSize: 13, fontWeight: 800, color: item.color }}>{item.stock}</span>
            <span style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.2)', marginLeft: 3 }}>{item.unit}</span>
          </div>
          {item.low && <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', borderRadius: 5, padding: '2px 6px', flexShrink: 0 }}>Reorder</span>}
        </div>
      ))}
    </div>
  );
}

function BillingVisual() {
  const invoices = [
    { name: 'Priya M.', amount: '£120', status: 'Paid', date: '08 May', color: '#10B981' },
    { name: 'Dan K.', amount: '£380', status: 'Overdue', date: '01 May', color: '#ef4444' },
    { name: 'Marcus H.', amount: '£95', status: 'Sent', date: '10 May', color: '#F59E0B' },
    { name: 'Sarah F.', amount: '£150', status: 'Paid', date: '09 May', color: '#10B981' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Billing & Payments</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 99, padding: '2px 8px' }}>£350 overdue</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 16px', borderBottom: `1px solid ${D.LINE}`, gap: 4 }}>
        {[{ label: 'This month', val: '£4,820', color: '#10B981' }, { label: 'Outstanding', val: '£350', color: '#ef4444' }, { label: 'Invoices', val: '18', color: AC }].map(s => (
          <div key={s.label} style={{ background: D.CARD, borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontFamily: FH, fontSize: 14, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {invoices.map((inv, i) => (
        <div key={inv.name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 16px', borderBottom: i < invoices.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.07}s both` }}>
          <span style={{ flex: 1, fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{inv.name}</span>
          <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>{inv.date}</span>
          <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{inv.amount}</span>
          <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: inv.color, background: `${inv.color}12`, border: `1px solid ${inv.color}22`, borderRadius: 99, padding: '2px 8px' }}>{inv.status}</span>
        </div>
      ))}
    </div>
  );
}

function ConsentFormsVisual() {
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: `0 32px 80px ${AC}12, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Consent Forms · Marcus H.</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#10B981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '2px 8px' }}>Signed</span>
      </div>
      <div style={{ margin: '12px 14px 10px', padding: '12px 14px', background: D.CARD, borderRadius: 10, border: `1px solid rgba(14,165,233,0.1)` }}>
        <div style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Physiotherapy Treatment Consent</div>
        {['Risks and complications explained', 'Medical history reviewed', 'Contraindications checked', 'Aftercare instructions provided'].map((item, i) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, animation: `hx-in 0.4s ${i * 0.08}s both` }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.45)' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px 12px', padding: '10px 14px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 9 }}>
        <div style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.07em', marginBottom: 5 }}>E-SIGNATURE</div>
        <div style={{ fontFamily: FB, fontSize: 12, color: 'rgba(16,185,129,0.65)', fontStyle: 'italic' }}>Marcus H. · 11 May 2026 · 09:42</div>
      </div>
    </div>
  );
}

export function PMSVisual({ activeFeature }: { activeFeature: string }) {
  return (
    <>
      <style>{KF}</style>
      {activeFeature === 'EHR Hub'                 && <EHRHubVisual />}
      {activeFeature === 'Prescription Management' && <PrescriptionVisual />}
      {activeFeature === 'Product Inventory'       && <InventoryVisual />}
      {activeFeature === 'Billing & Payments'      && <BillingVisual />}
      {activeFeature === 'Consent Forms'           && <ConsentFormsVisual />}
      {(activeFeature === 'Client Pipeline' || !activeFeature) && <ClientPipelineVisual />}
    </>
  );
}
