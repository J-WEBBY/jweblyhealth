'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { poppins } from '@/lib/fonts';

const FONT_HEAD = poppins.style.fontFamily;
const FONT_BODY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BLUE = '#077CA5';

const NAMES = ['Mysha', 'Trisha', 'Sophie', 'Malcolm'];

const DOMAINS = [
  { label: 'Reception & Bookings',   act: 'Call handled — next slot confirmed',  color: BLUE      },
  { label: 'Patient Pipeline',       act: '3 at-risk clients flagged today',      color: '#2e7d5a' },
  { label: '24/7 Care & Follow-up',  act: 'Post-treatment check-in sent',         color: '#6b5ccc' },
  { label: 'Compliance & CQC',       act: 'Governance record updated',            color: '#1a4a8a' },
  { label: 'Digital & Workspace',    act: 'Team briefing note drafted',           color: '#b85000' },
];

function MyshaVisual() {
  const [nameIdx,   setNameIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase,     setPhase]     = useState<'typing' | 'pause' | 'deleting'>('typing');
  const [activeD,   setActiveD]   = useState(0);

  useEffect(() => {
    const target = NAMES[nameIdx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (displayed.length < target.length) {
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 90);
      } else {
        t = setTimeout(() => setPhase('pause'), 1800);
      }
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('deleting'), 600);
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 55);
      } else {
        setNameIdx(i => (i + 1) % NAMES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, nameIdx]);

  useEffect(() => {
    const id = setInterval(() => setActiveD(i => (i + 1) % DOMAINS.length), 2000);
    return () => clearInterval(id);
  }, []);

  const W = 520, H = 340;
  const PCx = 12, PCy = 20, PCw = 192, PCh = 232;
  const JX = 224;
  const AX = 244, AW = 260, AH = 48, AGAP = 10;
  const cardY  = (i: number) => PCy + i * (AH + AGAP);
  const cardCY = (i: number) => cardY(i) + AH / 2;

  return (
    <div style={{ width: W, height: H, position: 'relative', flexShrink: 0 }}>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
        {/* Horizontal stub from persona to junction */}
        <line x1={PCx + PCw} y1={PCy + PCh / 2} x2={JX} y2={PCy + PCh / 2}
          stroke={`${BLUE}28`} strokeWidth="1" />
        {/* Vertical trunk */}
        <line x1={JX} y1={cardCY(0)} x2={JX} y2={cardCY(4)}
          stroke={`${BLUE}20`} strokeWidth="1" />
        {/* Branch lines to each domain card */}
        {DOMAINS.map((d, i) => (
          <line key={i}
            x1={JX} y1={cardCY(i)} x2={AX} y2={cardCY(i)}
            stroke={activeD === i ? d.color : `${BLUE}18`}
            strokeWidth={activeD === i ? 1.5 : 1}
            style={{ transition: 'stroke 400ms ease, stroke-width 400ms ease' }}
          />
        ))}
      </svg>

      {/* Persona card */}
      <div style={{
        position: 'absolute', left: PCx, top: PCy, width: PCw, height: PCh,
        background: '#ffffff', borderRadius: 18,
        border: `1.5px solid ${BLUE}28`,
        boxShadow: `0 8px 32px ${BLUE}12, 0 1px 4px rgba(0,0,0,0.04)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '24px 18px', textAlign: 'center',
      }}>
        {/* Avatar with initial */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: `linear-gradient(135deg, ${BLUE}, #054668)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 14, flexShrink: 0,
          boxShadow: `0 0 24px ${BLUE}45`,
          animation: 'orbPulse 2.5s ease-in-out infinite',
        }}>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {NAMES[nameIdx][0]}
          </span>
        </div>

        {/* Meet + typewriter name */}
        <p style={{ fontFamily: FONT_BODY, fontSize: 9, fontWeight: 700, color: '#7B98A6', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 3px' }}>
          meet
        </p>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 28, fontWeight: 800, color: '#172430', letterSpacing: '-0.035em', lineHeight: 1, minHeight: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <span>{displayed}</span>
          <span style={{
            opacity: phase === 'pause' ? 0 : 1,
            transition: 'opacity 120ms',
            color: BLUE,
            fontWeight: 300,
          }}>|</span>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 10, color: '#7B98A6', margin: '7px 0 0', letterSpacing: '-0.01em' }}>
          AI Practice Manager
        </p>

        {/* Status chips */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 0 2.5px rgba(34,197,94,0.2)',
              animation: 'orbPulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: '#22c55e', fontWeight: 600 }}>Active</span>
          </div>
          <span style={{
            fontFamily: FONT_BODY, fontSize: 8.5,
            color: `${BLUE}80`, background: `${BLUE}0c`,
            border: `1px solid ${BLUE}22`, borderRadius: 99,
            padding: '2px 9px', letterSpacing: '0.02em',
          }}>
            Customisable persona
          </span>
        </div>
      </div>

      {/* Domain activity cards */}
      {DOMAINS.map((d, i) => {
        const on = activeD === i;
        return (
          <div key={i} style={{
            position: 'absolute', left: AX, top: cardY(i), width: AW, height: AH,
            background: on ? `${d.color}07` : '#ffffff',
            border: `1px solid ${on ? d.color + '38' : `${BLUE}12`}`,
            borderLeft: `3px solid ${on ? d.color : `${BLUE}12`}`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 14px 0 13px',
            transition: 'all 350ms ease',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: FONT_HEAD, fontSize: 10.5, fontWeight: 600,
                color: on ? '#172430' : '#7B98A6',
                margin: 0, letterSpacing: '-0.01em',
                transition: 'color 350ms ease',
              }}>{d.label}</p>
              <p style={{
                fontFamily: FONT_BODY, fontSize: 9, color: d.color,
                margin: '2px 0 0',
                opacity: on ? 1 : 0,
                transition: 'opacity 350ms ease',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{d.act}</p>
            </div>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: on ? d.color : `${BLUE}18`,
              flexShrink: 0,
              transition: 'background 350ms ease',
              animation: on ? 'orbPulse 1.5s ease-in-out infinite' : 'none',
            }} />
          </div>
        );
      })}
    </div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: '#ffffff',
      paddingTop:    isMobile ? 96  : 120,
      paddingBottom: isMobile ? 64  : 96,
      paddingLeft:   isMobile ? 24  : 48,
      paddingRight:  isMobile ? 24  : 48,
      borderBottom: '1px solid #eaf2f8',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 52 : 80,
          alignItems: 'center',
        }}>
          <div>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600,
              color: BLUE, letterSpacing: '0.07em', textTransform: 'uppercase',
              margin: '0 0 20px',
            }}>
              Operational Intelligence for Private Healthcare
            </p>
            <h1 style={{
              fontFamily: FONT_HEAD,
              fontSize: isMobile ? 'clamp(36px, 9vw, 50px)' : 'clamp(40px, 4.2vw, 58px)',
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: '-0.03em', color: '#172430',
              margin: '0 0 20px',
            }}>
              Super Intelligent<br />Practice Manager.
            </h1>
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: isMobile ? 16 : 17,
              color: '#426D84', lineHeight: 1.72,
              margin: '0 0 36px', maxWidth: 480,
            }}>
              Your super agent employee handles your clinic&apos;s calls, bookings, appointments, patient pipeline, clinical documentation, compliance, and digital presence — your clinic&apos;s custom AI, powered by five specialist intelligence engines, always on.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/book" style={{
                height: 48, padding: '0 28px', borderRadius: 9,
                background: BLUE, color: '#fff',
                fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700,
                letterSpacing: '-0.01em', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center',
                boxShadow: '0 4px 18px rgba(7,124,165,0.38)',
              }}>
                Book a Demo
              </Link>
              <Link href="/lookup" style={{
                height: 48, padding: '0 24px', borderRadius: 9,
                border: '1.5px solid #C5D8E8',
                color: '#426D84',
                fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 600,
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', background: '#fff',
              }}>
                Sign In
              </Link>
            </div>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MyshaVisual />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
