import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/Sections';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Pricing — HealthOS',
  description: 'HealthOS pricing for private healthcare clinics.',
};

export default function PricingPage() {
  return (
    <div style={{ fontFamily: inter.style.fontFamily, background: '#E2F3F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MarketingNav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, color: '#077CA5', background: 'rgba(7,124,165,0.1)', border: '1px solid rgba(7,124,165,0.2)', borderRadius: 99, padding: '5px 14px', letterSpacing: '0.08em', marginBottom: 24 }}>PRICING</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#172430', letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.1 }}>Pricing</h1>
          <p style={{ fontSize: 16, color: '#426D84', lineHeight: 1.7, margin: '0 0 36px' }}>
            HealthOS pricing is discussed during your onboarding call and tailored to your clinic size and requirements.
          </p>
          <p style={{ fontSize: 14, color: '#7B98A6', lineHeight: 1.75, margin: '0 0 40px' }}>
            Detailed pricing information will be published here soon.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: 46, padding: '0 28px', borderRadius: 9, background: '#077CA5', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }}>
            Book a Demo
          </Link>
          <div>
            <Link href="/" style={{ fontSize: 13, color: '#7B98A6', textDecoration: 'none' }}>← Back to home</Link>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
