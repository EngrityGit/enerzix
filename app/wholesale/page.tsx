import type { Metadata } from 'next';
import ShopHero from '@/components/shop/ShopHero';
import CTABand from '@/components/sections/CTABand';
import FAQSection from '@/components/sections/FAQSection';
import WholesalePricing from '@/components/shop/WholesalePricing';
import WholesaleForm from '@/components/shop/WholesaleForm';

export const metadata: Metadata = {
  title: 'Wholesale & Bulk Water Supply',
  description:
    'Partner with Enerzix for wholesale and bulk 500ml purified water. Reliable logistics, competitive case pricing, and delivery across Canada for retailers, offices, and events.',
  alternates: { canonical: 'https://www.enerzix.ca/wholesale' },
  openGraph: {
    title: 'Wholesale & Bulk Water Supply | Enerzix',
    description:
      'Partner with Enerzix for wholesale and bulk 500ml purified water, with reliable logistics and case pricing across Canada.',
    url: 'https://www.enerzix.ca/wholesale',
  },
};

export default function ShopPage() {
  return (
    <main className="bg-[#F8FAFC]">
      <ShopHero />
      <WholesalePricing/>
      <WholesaleForm/>
      <FAQSection page='wholesale'/>
      <CTABand
        title={<>Ready to <span className="italic text-[#005FFF]">Transform</span> Your Shelf?</>}
        subtitle="Wholesale Partners"
        description="Join our network of premium retailers. We provide marketing support and reliable logistics."
        buttonText="Partner With Us"
      />
    </main>
  );
}
