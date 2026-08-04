import type { Metadata } from 'next';
import AboutHero from '@/components/sections/AboutHero';
import Origins from '@/components/sections/Origins';
import FAQSection from '@/components/sections/FAQSection';
import CTABand from '@/components/sections/CTABand';
import Philosophy from '@/components/sections/Philosophy';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn how Enerzix sources, purifies, and bottles Canadian water — from reverse osmosis and ozonation to our commitment to 100% recyclable packaging.',
  alternates: { canonical: 'https://www.enerzix.ca/about' },
  openGraph: {
    title: 'About Enerzix',
    description:
      'How Enerzix sources, purifies, and bottles premium Canadian water, and why it is a convenient hydration choice for everyday life.',
    url: 'https://www.enerzix.ca/about',
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* 1. Hero with the 3 Lifestyle images and parallax */}
      <AboutHero />

      {/* 2. Origins (Section without overlap) */}
      <Origins />

      {/* 3. Philosophy Section */}
      <Philosophy />

        <FAQSection />

      {/* 5. CTA */}
      <CTABand 
        title={<>Experience the <br /> <span className="italic text-[#005FFF]">Uncompromising</span> Standard.</>}
        buttonText="Get Enerzix" 
      />
    </main>
  );
}