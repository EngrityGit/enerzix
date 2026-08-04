import type { Metadata } from 'next';
import Hero500ml from '@/components/sections/Hero500ml';
import RetailerMarquee from '@/components/sections/RetailerMarquee';
import WaterLineup from '@/components/sections/WaterLineup';
import WhyEnerzix from '@/components/sections/WhyEnerzix';
import ProductPromos from '@/components/sections/ProductPromos';
import CTABand from '@/components/sections/CTABand';
import ProductInformation from '@/components/product/ProductInformation';

export const metadata: Metadata = {
  title: 'Enerzix Purified Water — 500ml',
  description:
    'Enerzix Purified Water, 500ml. Treated by reverse osmosis and ozonation, no added sugar or minerals, in a 100% recyclable bottle. Available for retail and wholesale across Canada.',
  alternates: { canonical: 'https://www.enerzix.ca/products/500ml' },
  openGraph: {
    title: 'Enerzix Purified Water — 500ml',
    description:
      'Reverse osmosis and ozone-treated purified water in a 100% recyclable 500ml bottle.',
    url: 'https://www.enerzix.ca/products/500ml',
    images: [{ url: '/products/enerzix_500ml.png', width: 768, height: 1024, alt: 'Enerzix Purified Water 500ml bottle' }],
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Enerzix Purified Water 500ml',
  description:
    'Purified water treated through reverse osmosis and ozonation, with no added sugar or minerals, in a 100% recyclable 500ml bottle.',
  brand: { '@type': 'Brand', name: 'Enerzix' },
  image: 'https://www.enerzix.ca/products/enerzix_500ml.png',
};

export default function Product500mlPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* The Specific 500ml Hero */}
      <Hero500ml />

      {/* Proof of where it is sold */}
      <RetailerMarquee />
      <ProductInformation />

      {/* Delivery / Retailer Cards */}
      <ProductPromos />

      {/* Final Wholesale CTA */}
      <CTABand 
        title={<>Direct <span className="italic text-[#005FFF]">Pallet Delivery</span> to your Retail Location.</>}
        subtitle="Wholesale 500ml"
        description="We offer seamless logistics across Canada. Inquire today for bulk 500ml pricing and delivery schedules for your shop or hotel."
        buttonText="Get Wholesale Quote"
      />
    </main>
  );
}