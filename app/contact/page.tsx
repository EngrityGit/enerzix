import type { Metadata } from 'next';
import CTABand from '@/components/sections/CTABand';
import ContactHero from '@/components/sections/ContactHero';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ServiceMap from '@/components/sections/ServiceMap';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Contact — Enerzix Wholesale & Delivery',
  description: 'Inquire about retail distribution or direct pallet delivery across Canada.',
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactFormSection />
      <ServiceMap />
      <FAQSection page='contact'/>
      <CTABand 
        title={<>Ready to <span className="italic text-[#005FFF]">Transform</span> Your Shelf?</>}
        subtitle="Wholesale Partners"
        description="Join our network of premium retailers. We provide marketing support and reliable logistics."
        buttonText="Partner With Us"      />
    </main>
  );
}