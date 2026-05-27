import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/Sections';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Products — HealthOS',
  description: 'Everything included in the HealthOS platform.',
};

export default function ProductsPage() {
  return (
    <div style={{ fontFamily: inter.style.fontFamily, background: '#E2F3F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MarketingNav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, color: '#077CA5', background: 'rgba(7,124,165,0.1)', border: '1px solid rgba(7,124,165,0.2)', borderRadius: 99, padding: '5px 14px', letterSpacing: '0.08em', marginBottom: 24 }}>PRODUCTS</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#172430', letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.1 }}>The HealthOS Platform</h1>
          <p style={{ fontSize: 16, color: '#426D84', lineHeight: 1.7, margin: '0 0 36px' }}>
            A detailed product overview covering the Agent Network, Client Pipeline, EHR, CQC Compliance, and all operational tools — coming soon.
          </p>
          <p style={{ fontSize: 14, color: '#7B98A6', lineHeight: 1.75, margin: '0 0 40px' }}>
            This page is under construction.
          </p>
          <Link href="/" style={{ fontSize: 13, color: '#7B98A6', textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
