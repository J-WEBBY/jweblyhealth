'use client';
import { poppins } from '@/lib/fonts';

const FH = poppins.style.fontFamily;
const FB = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const D = { BG: '#060e1a', CARD: '#0d1f33', LINE: '#1a3349' };

const KF = `
@keyframes hx-pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes hx-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
`;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = ['09', '10', '11', '12', '13', '14'];
const APPTS: Record<string, { name: string; type: string; color: string }> = {
  'Mon-09': { name: 'Emma L.', type: 'Aesthetics', color: '#077CA5' },
  'Mon-11': { name: 'Dan K.', type: 'Root Canal', color: '#0EA5E9' },
  'Tue-10': { name: 'Priya M.', type: 'Physio', color: '#10B981' },
  'Wed-09': { name: 'Sarah F.', type: 'GP Consult', color: '#077CA5' },
  'Wed-14': { name: 'Ali R.', type: 'CBT Session', color: '#8B5CF6' },
  'Thu-11': { name: 'Tom H.', type: 'Hygiene', color: '#10B981' },
  'Fri-09': { name: '2 conflicts', type: 'Resolving...', color: '#F59E0B' },
};

function AppointmentCalendarVisual() {
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Appointment Calendar · This week</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', animation: 'hx-pulse 1.2s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B' }}>AI resolving conflict</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '30px repeat(5, 1fr)', borderBottom: `1px solid ${D.LINE}` }}>
        <div />
        {DAYS.map(d => <div key={d} style={{ padding: '7px 0', textAlign: 'center', fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>{d}</div>)}
      </div>
      {HOURS.map((h, hi) => (
        <div key={h} style={{ display: 'grid', gridTemplateColumns: '30px repeat(5, 1fr)', borderBottom: hi < HOURS.length - 1 ? `1px solid rgba(255,255,255,0.03)` : 'none', minHeight: 30 }}>
          <div style={{ padding: '7px 3px 0', fontFamily: FB, fontSize: 8, color: 'rgba(255,255,255,0.18)', textAlign: 'right' }}>{h}</div>
          {DAYS.map(d => {
            const a = APPTS[`${d}-${h}`];
            return (
              <div key={d} style={{ borderLeft: `1px solid rgba(255,255,255,0.03)`, padding: '2px 3px' }}>
                {a && <div style={{ background: `${a.color}14`, border: `1px solid ${a.color}28`, borderRadius: 4, padding: '2px 4px', animation: 'hx-in 0.4s both' }}>
                  <div style={{ fontFamily: FH, fontSize: 7.5, fontWeight: 700, color: a.color, lineHeight: 1.3 }}>{a.name}</div>
                  <div style={{ fontFamily: FB, fontSize: 7, color: 'rgba(255,255,255,0.28)' }}>{a.type}</div>
                </div>}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ margin: '8px 14px 12px', padding: '8px 12px', background: 'rgba(7,124,165,0.08)', border: '1px solid rgba(7,124,165,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#077CA5', animation: 'hx-pulse 2s infinite', flexShrink: 0 }} />
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.4)' }}>Primary Agent resolved 2 scheduling conflicts automatically</span>
      </div>
    </div>
  );
}

function TaskManagerVisual() {
  const cols = [
    { label: 'To Do', color: '#7B98A6', tasks: ['Update consent forms', 'DBS renewal check'] },
    { label: 'In Progress', color: '#077CA5', tasks: ['Compliance audit doc', 'Staff rota May'] },
    { label: 'Complete', color: '#10B981', tasks: ['Inventory check', 'HR review: Chen'] },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Task Board</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>3 due today</span>
      </div>
      <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {cols.map((col, ci) => (
          <div key={col.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.color }} />
              <span style={{ fontFamily: FH, fontSize: 8.5, fontWeight: 700, color: col.color }}>{col.label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {col.tasks.map((t, ti) => (
                <div key={t} style={{ background: D.CARD, border: `1px solid rgba(255,255,255,0.05)`, borderLeft: `2px solid ${col.color}55`, borderRadius: 6, padding: '7px 8px', animation: `hx-in 0.4s ${(ci * 2 + ti) * 0.07}s both` }}>
                  <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 12px 12px', padding: '8px 12px', background: 'rgba(7,124,165,0.06)', border: '1px solid rgba(7,124,165,0.15)', borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>Shared across 4 staff · Updated 2 min ago</span>
      </div>
    </div>
  );
}

function VideoAppointmentVisual() {
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(14,165,233,0.2)', boxShadow: '0 32px 80px rgba(14,165,233,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', animation: 'hx-pulse 1s infinite' }} />
          <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: '#fff' }}>Live Consultation · Marcus H.</span>
        </div>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>14:23</span>
      </div>
      <div style={{ margin: '12px 12px 8px', borderRadius: 12, background: 'linear-gradient(135deg, #0a1929 0%, #060e1a 100%)', border: '1px solid rgba(14,165,233,0.12)', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 10, left: 10, fontFamily: FH, fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.25)', borderRadius: 5, padding: '2px 7px' }}>Patient view</div>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(14,165,233,0.12)', border: '1.5px solid rgba(14,165,233,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(14,165,233,0.55)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, width: 56, height: 40, borderRadius: 7, background: 'rgba(7,124,165,0.18)', border: '1.5px solid rgba(7,124,165,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(7,124,165,0.6)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '6px 16px' }}>
        {[{ label: 'Mic on', color: '#10B981' }, { label: 'Cam on', color: '#077CA5' }, { label: 'End call', color: '#ef4444' }].map(btn => (
          <div key={btn.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${btn.color}15`, border: `1.5px solid ${btn.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: btn.label === 'End call' ? 2 : '50%', background: btn.color, opacity: 0.85 }} />
            </div>
            <span style={{ fontFamily: FH, fontSize: 7.5, color: 'rgba(255,255,255,0.22)' }}>{btn.label}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '6px 12px 12px', padding: '8px 12px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: 8, textAlign: 'center' }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.3)' }}>HD · End-to-end encrypted · No third-party software</span>
      </div>
    </div>
  );
}

function TeamHubVisual() {
  const items = [
    { name: 'Dr. Chen', action: 'completed consent review for James T.', time: '3m', color: '#077CA5', agent: false },
    { name: 'Nurse Amy', action: 'uploaded 2 training certificates', time: '12m', color: '#10B981', agent: false },
    { name: 'Primary Agent', action: 'flagged 3 at-risk clients for review', time: '28m', color: '#077CA5', agent: true },
    { name: 'Sophie R.', action: 'rescheduled 2 appointments', time: '1h', color: '#8B5CF6', agent: false },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Team Hub</span>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>4 updates today</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '11px 16px', borderBottom: i < items.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 28, height: 28, borderRadius: item.agent ? 7 : '50%', background: `${item.color}18`, border: `1.5px solid ${item.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {item.agent ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} /> : <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: item.color }}>{item.name[0]}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>{item.name} </span>
            <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{item.action}</span>
            <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.18)', marginTop: 2 }}>{item.time} ago</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LearningWorkspaceVisual() {
  const modules = [
    { name: 'CQC Awareness', pct: 100, due: null, color: '#10B981' },
    { name: 'Infection Control', pct: 75, due: '14 May', color: '#077CA5' },
    { name: 'Safeguarding L2', pct: 40, due: '28 May', color: '#F59E0B' },
    { name: 'Fire Safety', pct: 0, due: '30 Jun', color: '#7B98A6' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Learning Workspace</span>
        <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 99, padding: '2px 8px' }}>1 overdue</span>
      </div>
      <div style={{ padding: '12px 16px 8px' }}>
        {modules.map((m, i) => (
          <div key={m.name} style={{ marginBottom: 14, animation: `hx-in 0.4s ${i * 0.08}s both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <span style={{ fontFamily: FH, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{m.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {m.due && <span style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>Due {m.due}</span>}
                <span style={{ fontFamily: FH, fontSize: 10, fontWeight: 700, color: m.color }}>{m.pct}%</span>
              </div>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${m.pct}%`, background: `linear-gradient(to right, ${m.color}80, ${m.color})`, borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px 12px', padding: '8px 12px', background: 'rgba(7,124,165,0.06)', border: '1px solid rgba(7,124,165,0.15)', borderRadius: 8 }}>
        <span style={{ fontFamily: FB, fontSize: 10.5, color: 'rgba(255,255,255,0.32)' }}>4 staff · 3 certificates due this month</span>
      </div>
    </div>
  );
}

function TeamManagementVisual() {
  const staff = [
    { initials: 'DC', name: 'Dr. Chen', role: 'Lead Practitioner', status: 'Active', color: '#077CA5' },
    { initials: 'AB', name: 'Nurse Amy B.', role: 'Clinical Nurse', status: 'Active', color: '#10B981' },
    { initials: 'SR', name: 'Sophie R.', role: 'Receptionist', status: 'On leave', color: '#F59E0B' },
    { initials: 'MT', name: 'Mark T.', role: 'Clinic Manager', status: 'Active', color: '#8B5CF6' },
  ];
  return (
    <div style={{ background: D.BG, borderRadius: 20, overflow: 'hidden', border: `1px solid ${D.LINE}`, boxShadow: '0 32px 80px rgba(7,124,165,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ padding: '13px 16px', borderBottom: `1px solid ${D.LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, color: '#fff' }}>Team Management</span>
        <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>4 staff · 3 active</span>
      </div>
      {staff.map((s, i) => (
        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 16px', borderBottom: i < staff.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none', animation: `hx-in 0.4s ${i * 0.08}s both` }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${s.color}18`, border: `1.5px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: FH, fontSize: 9.5, fontWeight: 700, color: s.color }}>{s.initials}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FH, fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{s.name}</div>
            <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>{s.role}</div>
          </div>
          <span style={{ fontFamily: FH, fontSize: 9, fontWeight: 700, color: s.status === 'Active' ? '#10B981' : '#F59E0B', background: s.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${s.status === 'Active' ? 'rgba(16,185,129,0.22)' : 'rgba(245,158,11,0.22)'}`, borderRadius: 99, padding: '3px 9px' }}>{s.status}</span>
        </div>
      ))}
    </div>
  );
}

export function WorkspaceVisual({ activeFeature }: { activeFeature: string }) {
  return (
    <>
      <style>{KF}</style>
      {activeFeature === 'Task Manager'              && <TaskManagerVisual />}
      {activeFeature === 'Video Appointments'        && <VideoAppointmentVisual />}
      {activeFeature === 'Team Hub'                  && <TeamHubVisual />}
      {activeFeature === 'Learning Workspace'        && <LearningWorkspaceVisual />}
      {activeFeature === 'Team Management'           && <TeamManagementVisual />}
      {(activeFeature === 'Smart Appointment Calendar' || !activeFeature) && <AppointmentCalendarVisual />}
    </>
  );
}
