import type { Metadata } from 'next';
import ProductHero from '@/components/sections/ProductHero';
import RetailerMarquee from '@/components/sections/RetailerMarquee';
import ProductPromos from '@/components/sections/ProductPromos';
import WhyEnerzix from '@/components/sections/WhyEnerzix';
import WaterLineup from '@/components/sections/WaterLineup';
import CTABand from '@/components/sections/CTABand';
import ProductSpecs500ml from '@/components/product/ProductInformation';

export const metadata: Metadata = {
  title: 'Enerzix — The Collection',
  description: 'Explore the full range of Enerzix premium glacial water. Naturally alkaline, sourced from the Canadian Shield.',
};

export default function ProductsPage() {
  return (
    <main className="bg-white">
      {/* 1. Architectural Expanding Hero */}
      <ProductHero />
      <RetailerMarquee />
      <ProductSpecs500ml/>
      {/* 4. Glass-morphism Promos & Become a Retailer CTA */}
      <ProductPromos />
      <WhyEnerzix />  

      {/* 6. Final Call to Action */}
      <CTABand 
        title={<>Naturally Pure, <br /> <span className="italic text-[#005FFF]">Conveniently</span> Found.</>}
        subtitle="Stock Enerzix"
        description="Available across leading Canadian retailers and boutique hotels. Direct shipping also available for bulk orders."
        buttonText="Wholesale Inquiry"
      />
    </main>
  );
}