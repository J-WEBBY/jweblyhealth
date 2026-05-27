'use client';
import { useEffect, useState } from 'react';

const PATIENTS = [
  { name: 'Sarah M.',   stage: 'Loyal',    score: 94, color: '#10B981', bar: '#10B98120' },
  { name: 'James K.',   stage: 'At Risk',  score: 38, color: '#F59E0B', bar: '#F59E0B20' },
  { name: 'Emma L.',    stage: 'Active',   score: 87, color: '#2ABFBF', bar: '#2ABFBF20' },
  { name: 'Mark T.',    stage: 'Lapsed',   score: 22, color: '#EF4444', bar: '#EF444420' },
  { name: 'Priya S.',   stage: 'New',      score: 61, color: '#8B5CF6', bar: '#8B5CF620' },
];

const LIVE_EVENTS = [
  'Sarah M. rebooked — Botox top-up in 3 days',
  'James K. reclassified → At Risk',
  'Automation triggered: Re-engagement sweep',
  'Emma L. engagement score ↑ to 87',
  'New enquiry received — Priya S.',
];

export function ProductPreview() {
  const [scores,    setScores]    = useState(PATIENTS.map(() => 0));
  const [eventIdx,  setEventIdx]  = useState(0);
  const [pulseRow,  setPulseRow]  = useState<number | null>(null);
  const [agentTyping, setAgentTyping] = useState(false);
  const [agentText, setAgentText] = useState('');
  const fullText = 'Analysing patient pipeline…';

  // Animate bars on mount
  useEffect(() => {
    const timers = PATIENTS.map((p, i) =>
      setTimeout(() => {
        setScores(prev => {
          const next = [...prev];
          next[i] = p.score;
          return next;
        });
      }, i * 160 + 200),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cycle live events
  useEffect(() => {
    const t = setInterval(() => {
      setEventIdx(i => (i + 1) % LIVE_EVENTS.length);
      const row = Math.floor(Math.random() * PATIENTS.length);
      setPulseRow(row);
      setTimeout(() => setPulseRow(null), 1200);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  // Agent typing effect
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setAgentTyping(true);
      setAgentText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) { clearInterval(t); }
    }, 45);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 20,
      backdropFilter: 'blur(24px)',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(42,191,191,0.08)',
      width: '100%', maxWidth: 520,
    }}>
      {/* Window chrome */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '3px 12px', fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
            healthos · patient pipeline
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
          <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Live event ticker */}
      <div style={{ padding: '8px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 8, minHeight: 36 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2ABFBF', flexShrink: 0, boxShadow: '0 0 5px #2ABFBF' }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {LIVE_EVENTS[eventIdx]}
        </span>
      </div>

      {/* Column headers */}
      <div style={{ padding: '10px 18px 4px', display: 'grid', gridTemplateColumns: '90px 1fr 70px 44px', gap: 8, alignItems: 'center' }}>
        {['PATIENT', 'ENGAGEMENT', 'STAGE', 'SCORE'].map(h => (
          <div key={h} style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>{h}</div>
        ))}
      </div>

      {/* Patient rows */}
      <div style={{ padding: '4px 0 8px' }}>
        {PATIENTS.map((p, i) => (
          <div key={p.name} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 70px 44px',
            gap: 8, alignItems: 'center',
            padding: '9px 18px',
            background: pulseRow === i ? 'rgba(42,191,191,0.06)' : 'transparent',
            transition: 'background 0.4s',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.name}
            </span>
            {/* Score bar */}
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                background: `linear-gradient(90deg, ${p.color}, ${p.color}aa)`,
                width: `${scores[i]}%`,
                transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: `0 0 6px ${p.color}60`,
              }} />
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: p.color,
              background: p.bar, border: `1px solid ${p.color}30`,
              borderRadius: 99, padding: '2px 7px', whiteSpace: 'nowrap',
            }}>
              {p.stage}
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: p.color, textAlign: 'right' }}>
              {scores[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Agent footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6, flexShrink: 0,
          background: 'linear-gradient(135deg, #2ABFBF22, #2ABFBF44)',
          border: '1px solid #2ABFBF40',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, fontWeight: 800, color: '#2ABFBF',
        }}>
          PA
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
          {agentText}{agentTyping && agentText.length < fullText.length ? <span style={{ borderRight: '1px solid #2ABFBF', marginLeft: 1 }}>&nbsp;</span> : ''}
        </span>
      </div>
    </div>
  );
}
