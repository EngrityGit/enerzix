import Hero from '@/components/sections/Hero';
import WaterLineup from '@/components/sections/WaterLineup';
import Origins from '@/components/sections/Origins';
import WhyEnerzix from '@/components/sections/WhyEnerzix';
import LeadGenForm from '@/components/sections/LeadGenForm';
import FAQSection from '@/components/sections/FAQSection';
import CTABand from '@/components/sections/CTABand';
import ProductSpecs500ml from '@/components/product/ProductInformation';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WaterLineup />
      <Origins />
      <WhyEnerzix />
      <LeadGenForm />
      <FAQSection page='home'/>
      <CTABand />
    </>
  );
}
