// HealthOS logo mark — hub-and-spoke neural network design
// Extracted from src/app/icon.tsx

interface LogoMarkProps {
  size?: number;
  /** 'dark' = dark bg (for use over dark surfaces), 'light' = no bg (for use over white) */
  variant?: 'dark' | 'light' | 'transparent';
}

export function LogoMark({ size = 32, variant = 'dark' }: LogoMarkProps) {
  const S  = '#0891B2';
  const HS = '#22D3EE';
  const HE = '#0891B2';
  const bg = variant === 'dark' ? '#0D1420' : variant === 'light' ? '#E6F9FB' : 'transparent';
  const r  = size * 0.25; // border radius

  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: r,
      background: bg,
    }}>
      <svg width={size * 0.82} height={size * 0.82} viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="78" fill={S} fillOpacity="0.12" />
        <circle cx="100" cy="100" r="44" stroke={S} strokeWidth="2" strokeOpacity="0.3" fill="none" />

        {/* Primary spokes */}
        <line x1="100" y1="100" x2="100" y2="28"  stroke={S} strokeWidth="3.5" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="172" y2="100" stroke={S} strokeWidth="3.5" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="100" y2="172" stroke={S} strokeWidth="3.5" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="28"  y2="100" stroke={S} strokeWidth="3.5" strokeOpacity="0.6" />

        {/* Secondary spokes */}
        <line x1="100" y1="100" x2="151" y2="49"  stroke={S} strokeWidth="2" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="151" y2="151" stroke={S} strokeWidth="2" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="49"  y2="151" stroke={S} strokeWidth="2" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="49"  y2="49"  stroke={S} strokeWidth="2" strokeOpacity="0.35" />

        {/* Secondary nodes */}
        <circle cx="151" cy="49"  r="9" fill={HS} fillOpacity="0.7" />
        <circle cx="151" cy="151" r="9" fill={HS} fillOpacity="0.7" />
        <circle cx="49"  cy="151" r="9" fill={HS} fillOpacity="0.7" />
        <circle cx="49"  cy="49"  r="9" fill={HS} fillOpacity="0.7" />

        {/* Primary nodes */}
        <circle cx="100" cy="28"  r="14" fill={HS} />
        <circle cx="172" cy="100" r="14" fill={HS} />
        <circle cx="100" cy="172" r="14" fill={HS} />
        <circle cx="28"  cy="100" r="14" fill={HS} />

        {/* Hub */}
        <circle cx="100" cy="100" r="32" fill={HE} />

        {/* Glint */}
        <circle cx="88" cy="88" r="12" fill="white" fillOpacity="0.22" />
      </svg>
    </div>
  );
}

interface LogoProps {
  size?: number;
  variant?: 'dark' | 'light' | 'transparent';
  /** text color override */
  textColor?: string;
  showTag?: boolean;
}

export function Logo({ size = 32, variant = 'dark', textColor, showTag = true }: LogoProps) {
  const defaultTextColor = variant === 'dark' ? '#ffffff' : '#0A0F1E';
  const color = textColor ?? defaultTextColor;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={size} variant={variant} />
      <span style={{ fontSize: size * 0.53, fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1 }}>
        HealthOS
      </span>
      {showTag && (
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: '0.06em',
          color: '#0891B2',
          background: variant === 'dark' ? 'rgba(8,145,178,0.15)' : '#E6F9FB',
          border: '1px solid rgba(8,145,178,0.25)',
          padding: '2px 8px', borderRadius: 99,
        }}>
          BY JWEBLY
        </span>
      )}
    </div>
  );
}
