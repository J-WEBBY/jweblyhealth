'use client';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { poppins } from '@/lib/fonts';
import { AIAgentsVisual } from './FeaturesAIVisual';
import { WorkspaceVisual } from './FeaturesWorkspaceVisual';
import { PMSVisual } from './FeaturesPMSVisual';
import { ComplianceVisual } from './FeaturesComplianceVisual';
import { PortalVisual } from './FeaturesPortalVisual';

const FONT_HEAD = poppins.style.fontFamily;
const FONT_BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const C = { TEXT: '#172430', TEXT2: '#426D84', MUTED: '#7B98A6', BORDER: '#C5D8E8', BG: '#E2F3F8' };

type CategoryDef = {
  key: string; label: string; color: string;
  agents: { name: string; color: string }[];
  headline: string; desc: string;
  features: { name: string; desc: string }[];
};

const CATEGORIES: CategoryDef[] = [
  {
    key: 'ai', label: 'AI & Agents', color: '#077CA5',
    agents: [{ name: 'All Agents', color: '#077CA5' }],
    headline: "Your AI team, your way.\nConfigured for your practice.",
    desc: "Every agent is fully configurable: custom personas, tone, knowledge, and instructions. Manage how they communicate, what they know, and how they make decisions before anything reaches a client.",
    features: [
      { name: 'Agent Chat Interfaces', desc: 'Dedicated workspace for each agent with full tool access, history, and live streaming' },
      { name: 'AI Receptionist', desc: 'Live call monitoring, booking queue review, and voice agent configuration via Vapi' },
      { name: 'Automations', desc: 'Agent-driven workflow management with trigger configuration and execution logs' },
      { name: 'Knowledge Base', desc: 'Upload practice documents and agents search and reference them in every conversation' },
      { name: 'Judgement Engine', desc: 'Risk assessment layer that reviews every outbound agent action before it sends' },
      { name: 'Bridge', desc: 'One inbox for all AI conversations with your clients across SMS, WhatsApp, email, and web chat' },
    ],
  },
  {
    key: 'workspace', label: 'Workspace', color: '#077CA5',
    agents: [{ name: 'Primary Agent', color: '#077CA5' }],
    headline: "Command your practice\nfrom one intelligent hub.",
    desc: "Everything your team needs to run the day: calendars, tasks, video, team collaboration, and staff learning. All in one central workspace powered by the Primary Agent.",
    features: [
      { name: 'Smart Appointment Calendar', desc: 'AI-assisted scheduling with conflict resolution and real-time availability across your appointment book' },
      { name: 'Task Manager', desc: 'Assign, track, and complete tasks across your entire practice team' },
      { name: 'Video Appointments', desc: 'Built-in HD consultations with no third-party tools or subscriptions needed' },
      { name: 'Team Hub', desc: 'Central operations board for team communication and shared task visibility' },
      { name: 'Learning Workspace', desc: 'Staff onboarding, CPD tracking, and competency management in one place' },
      { name: 'Team Management', desc: 'Staff roles, permissions, schedules, and practitioner profiles in one place' },
    ],
  },
  {
    key: 'pms', label: 'PMS & EHR', color: '#0EA5E9',
    agents: [{ name: 'Clinical Agent', color: '#0EA5E9' }, { name: 'Primary Agent', color: '#077CA5' }],
    headline: "Clinical records built for\nprivate practice intelligence.",
    desc: "A complete patient management and EHR system from first enquiry to full treatment history, with the Clinical Agent working alongside every practitioner in real time.",
    features: [
      { name: 'Client Pipeline', desc: '7-stage lifecycle tracking with engagement scores and predicted next visits' },
      { name: 'EHR Hub', desc: 'SOAP notes, treatment history, before/after photos, and full clinical record' },
      { name: 'Prescription Management', desc: 'AI-assisted prescriptions with contraindication checks and safety review' },
      { name: 'Product Inventory', desc: 'Stock management linked to treatments, reorder alerts, and usage tracking' },
      { name: 'Billing & Payments', desc: 'Stripe-integrated invoicing, payment tracking, and outstanding balance alerts' },
      { name: 'Consent Forms', desc: 'Digital consent workflows with e-signature capture and full audit trail' },
    ],
  },
  {
    key: 'compliance', label: 'Compliance', color: '#077CA5',
    agents: [{ name: 'Primary Agent', color: '#077CA5' }],
    headline: "Stay CQC-ready without\nthe administrative burden.",
    desc: "Continuous compliance monitoring across all five CQC domains, with evidence automatically tracked, staff records managed, and audit packs ready to export on demand.",
    features: [
      { name: 'CQC Audit Tracker', desc: 'Real-time readiness score across all five CQC inspection domains' },
      { name: 'HR & Staff Records', desc: 'Staff files, DBS checks, contracts, and employment records centralised' },
      { name: 'Evidence Pack Builder', desc: 'Auto-generate and export inspection-ready evidence packs instantly' },
      { name: 'Governance Meetings', desc: 'Record decisions, track actions, and log committee meeting minutes' },
      { name: 'Equipment Log', desc: 'Maintenance schedules, calibration records, and service alert tracking' },
      { name: 'Training Records', desc: 'CPD, mandatory training compliance, and certificate expiry alerts' },
    ],
  },
  {
    key: 'portal', label: 'Client Portal', color: '#10B981',
    agents: [{ name: 'Relationship Agent', color: '#10B981' }],
    headline: "A personalised digital front door\nfor every one of your clients.",
    desc: "A fully branded client portal giving patients self-service control over their care journey, while the Relationship Agent stays connected and personalised in the background.",
    features: [
      { name: 'Appointment Booking', desc: '24/7 self-service booking with live availability and instant confirmation' },
      { name: 'Treatment History', desc: 'Full personal record of past treatments, clinical notes, and progress photos' },
      { name: 'Aftercare & Follow-up', desc: 'Post-treatment guidance, recovery tracking, and check-in messages' },
      { name: 'Invoices & Payments', desc: 'View, download, and pay invoices directly through the portal' },
      { name: 'Secure Messaging', desc: 'Direct channel to the practice, managed by the Relationship Agent' },
      { name: 'Document Access', desc: 'Consent forms, referral letters, and clinical documents on demand' },
    ],
  },
];

function FeatureChip({ f, color, selected, onClick }: { f: { name: string; desc: string }; color: string; selected?: boolean; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  const active = selected || hov;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: selected ? `${color}0C` : hov ? '#F0F8FC' : '#F8FAFC',
        border: `1px solid ${active ? `${color}35` : '#E8F0F5'}`,
        borderLeft: `3px solid ${active ? color : `${color}60`}`,
        borderRadius: 10,
        padding: '13px 15px',
        transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: selected ? `0 4px 16px ${color}14` : 'none',
      }}
    >
      <div style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: selected ? color : C.TEXT, marginBottom: 4, transition: 'color 0.15s' }}>{f.name}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.TEXT2, lineHeight: 1.5 }}>{f.desc}</div>
    </div>
  );
}

function RightPanel({ active, cat, activeFeature }: { active: number; cat: CategoryDef; activeFeature: string }) {
  if (active === 0) return <AIAgentsVisual activeFeature={activeFeature} />;
  if (active === 1) return <WorkspaceVisual activeFeature={activeFeature} />;
  if (active === 2) return <PMSVisual activeFeature={activeFeature} />;
  if (active === 3) return <ComplianceVisual activeFeature={activeFeature} />;
  return <PortalVisual activeFeature={activeFeature} />;
}

export function Features() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const [activeFeature, setActiveFeature] = useState('');
  const cat = CATEGORIES[active];

  function switchTab(i: number) {
    setActive(i);
    setActiveFeature('');
  }

  function toggleFeature(name: string) {
    setActiveFeature(prev => prev === name ? '' : name);
  }

  return (
    <section id="features" style={{ background: '#fff', borderTop: `1px solid ${C.BORDER}` }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '72px 24px' : '100px 48px' }}>

        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: '#077CA5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>The Complete Platform</div>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(30px, 3.2vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: C.TEXT, margin: '0 0 18px', lineHeight: 1.07 }}>
            Everything your practice needs,<br />in one intelligent system.
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 15 : 17, color: C.TEXT2, lineHeight: 1.7, margin: 0 }}>
            Five interconnected modules: AI infrastructure, workspace, clinical records, compliance, and patient engagement. Each with agents working behind the scenes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.7)', border: `1px solid ${C.BORDER}`, borderRadius: 16, padding: 5, marginBottom: isMobile ? 40 : 56, overflowX: 'auto' }}>
          {CATEGORIES.map((c, i) => (
            <button key={c.key} onClick={() => switchTab(i)} style={{ flex: 1, minWidth: 130, padding: isMobile ? '10px 12px' : '13px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', background: active === i ? '#fff' : 'transparent', boxShadow: active === i ? '0 2px 12px rgba(23,36,48,0.09)' : 'none', transition: 'all 0.2s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: active === i ? c.color : '#C5D8E8', flexShrink: 0, transition: 'background 0.2s' }} />
                <span style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 12 : 13, fontWeight: active === i ? 700 : 500, color: active === i ? c.color : C.MUTED, whiteSpace: 'nowrap', transition: 'color 0.2s' }}>{c.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 44 : 80, alignItems: isMobile ? 'stretch' : 'flex-start' }}>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {cat.agents.map(a => (
                <div key={a.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${a.color}0F`, border: `1px solid ${a.color}28`, borderRadius: 99, padding: '5px 13px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color }} />
                  <span style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, color: a.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{a.name}</span>
                </div>
              ))}
            </div>
            <h3 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 24 : 34, fontWeight: 800, color: C.TEXT, letterSpacing: '-0.03em', lineHeight: 1.09, margin: '0 0 16px', whiteSpace: 'pre-line' }}>{cat.headline}</h3>
            <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 15.5, color: C.TEXT2, lineHeight: 1.75, margin: '0 0 32px', maxWidth: 520 }}>{cat.desc}</p>

            {!isMobile && (
              <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.MUTED, margin: '0 0 16px', fontStyle: 'italic' }}>
                Click a feature to see it in action
              </p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
              {cat.features.map(f => (
                <FeatureChip
                  key={f.name}
                  f={f}
                  color={cat.color}
                  selected={activeFeature === f.name}
                  onClick={() => toggleFeature(f.name)}
                />
              ))}
            </div>
          </div>

          {!isMobile && (
            <div style={{ width: 380, flexShrink: 0, position: 'sticky', top: 100 }}>
              <RightPanel active={active} cat={cat} activeFeature={activeFeature} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
