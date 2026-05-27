import type { Metadata } from 'next';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/marketing/Hero';
import { AgentsSection } from '@/components/marketing/AgentsSection';
import { Features } from '@/components/marketing/Features';
import {
  StatsStrip,
  ComplianceBadges,
  FoundingProgramme,
  Industries,
  Integrations,
  AboutJwebly,
  DiscoveryPresentation,
} from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'HealthOS — AI operating system for UK private clinics',
  description:
    'HealthOS handles your clinic\'s calls, bookings, patient pipeline, and CQC compliance admin — all in one place. Built exclusively for UK private healthcare.',
};

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {/* Phase 2: Hero replaces the existing placeholder below */}
        <Hero />

        {/* Existing sections — rebuilt one by one in Phase 3 */}
        <StatsStrip />
        <AgentsSection />
        <Features />
        <Industries />
        <ComplianceBadges />
        <FoundingProgramme />
        <Integrations />
        <AboutJwebly />
        <DiscoveryPresentation />
      </main>
      <Footer />
    </>
  );
}
