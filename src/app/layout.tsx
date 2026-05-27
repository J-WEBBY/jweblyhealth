import type { Metadata } from 'next';
import { fraunces, dmSans } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HealthOS — AI operating system for UK private clinics',
    template: '%s | HealthOS by Jwebly Health',
  },
  description:
    'HealthOS handles your clinic\'s calls, bookings, patient pipeline, and CQC compliance admin — all in one place. Built exclusively for UK private healthcare.',
  keywords: [
    'healthcare AI', 'AI receptionist', 'private clinic software',
    'CQC compliance software', 'patient management', 'HealthOS', 'Jwebly Health',
    'private GP software', 'aesthetic clinic software', 'UK healthcare technology',
  ],
  authors: [{ name: 'Jwebly Health' }],
  creator: 'Jwebly Health',
  publisher: 'Jwebly Health',
  metadataBase: new URL('https://jweblyhealth.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://jweblyhealth.com',
    siteName: 'Jwebly Health',
    title: 'HealthOS — AI operating system for UK private clinics',
    description:
      'Calls answered, bookings confirmed, compliance tracked — HealthOS is the AI operating system built for UK private healthcare.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'HealthOS by Jwebly Health' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthOS — AI operating system for UK private clinics',
    description: 'AI-powered operations for UK private clinics. Built for CQC-registered practices.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${dmSans.variable} antialiased`}
    >
      <body className="bg-canvas text-ink font-sans">{children}</body>
    </html>
  );
}
