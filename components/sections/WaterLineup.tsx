'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/LiquidButton';

// Data structure updated: Only 500ml active
const ENERZIX_VARIANTS = [
  /* {
    id: '250',
    name: 'Enerzix 250ml',
    slug: 'enerzix_250ml',
    description: 'The "Pocket" edition. Engineered for high-end events and seamless portability without compromising the mineral profile.',
    specs: [
      { title: "Compact Engineering", content: "Designed with a low-profile silhouette to fit into luxury amenity kits and small travel bags." },
      { title: "Aviation Ready", content: "Perfectly portioned for executive travel and short-haul hydration requirements." },
      { title: "Event Specialist", content: "Our most popular choice for gala dinners and corporate boardrooms where space is at a premium." },
      { title: "Material", content: "Ultra-clear lightweight glass with a precision-seal aluminum cap." }
    ]
  }, */
  {
    id: '500',
    name: 'Enerzix Water is created for simple, reliable everyday hydration.',
    slug: 'enerzix_500ml',
    description: 'Our locally sourced water is purified through reverse osmosis and treated with ozone to deliver a clean, refreshing taste you can enjoy at work, at home, while travelling, or wherever your day takes you.',
    specs: [
      { title: "Pure", content: "Purified by reverse osmosis " },
      { title: "Clean", content: "No added minerals • No sugar • No calories " },
      { title: "Refreshing", content: "• Locally sourced and bottled in British Columbia " },
    ]
  },
  /* {
    id: '750',
    name: 'Enerzix 750ml',
    slug: 'enerzix_750ml',
    description: 'The Sommelier’s Choice. A statement piece designed specifically for table service and fine dining environments.',
    specs: [
      { title: "Table Presence", content: "Featuring an elongated neck and weighted base for a graceful pour and elegant tabletop aesthetic." },
      { title: "Thermal Retention", content: "Thicker pharmaceutical-grade glass helps maintain a crisp 7°C serving temperature for up to 45 minutes." },
      { title: "Palate Cleanser", content: "The 125mg/L TDS profile is optimized to refresh the palate between complex wine and food pairings." },
      { title: "Hospitality Grade", content: "Reinforced rim technology prevents chipping in high-volume professional environments." }
    ]
  },
  {
    id: '1l',
    name: 'Enerzix 1L',
    slug: 'enerzix_1l',
    description: 'The Archive Series. Our maximum volume format designed for the home, the office, or the wellness studio.',
    specs: [
      { title: "Maximum Reserve", content: "Our most efficient format, providing the highest volume of glacial water with the lowest packaging-to-liquid ratio." },
      { title: "Fridge Optimization", content: "Specially designed height to fit standard refrigerator shelving while maximizing internal volume." },
      { title: "The Office Anchor", content: "Designed to stay on your desk as a visual reminder of your daily hydration goals." },
      { title: "Sustainability Impact", content: "Choosing the 1L format reduces transport carbon emissions by 12% compared to smaller volumes." }
    ]
  } */
];

export default function WaterLineup() {
  const [activeTab] = useState(ENERZIX_VARIANTS[0]); 
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Clean stagger reveal for the 3 columns
      gsap.from(".lineup-col", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lineup" className="py-24 md:py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden">
      <Container>
        {/* 1. Header Section */}
        <div className="lineup-col flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#005FFF] mb-4 block">
              Clean Water You Can Trust
            </span>
          </div>
        </div>

        {/* 3. Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1.3fr] gap-16 items-center">
            
            {/* Column 1: Intro */}
            <div className="lineup-col space-y-8">
              <h3 className="text-4xl font-light leading-tight text-slate-900">
                {activeTab.name}
              </h3>
              <p className="text-[16px] leading-relaxed text-slate-500 font-light max-w-sm">
                {activeTab.description}
              </p>
              <Button 
                href="/products/500ml" 
                text={`Shop 500ml`} 
                scrolled={true} 
              />
            </div>

            {/* Column 2: Image Render */}
            <div className="lineup-col relative aspect-[4/5] flex items-center justify-center py-10">
                <div className="absolute inset-0 b opacity-40 -z-10" />
                
                <div className="relative w-full h-full flex justify-center rounded-xl items-center">
                    <Image
                        src={`/products/${activeTab.slug}.png`} 
                        alt={activeTab.name}
                        width={450}
                        height={600}
                        className="object-contain rounded-xl]"
                        priority
                    />
                </div>
            </div>

            {/* Column 3: UNIQUE Specs */}
            <div className="lineup-col divide-y divide-slate-100">
              {activeTab.specs.map((spec, index) => (
                <SpecAccordionItem 
                  key={spec.title}
                  title={spec.title} 
                  content={spec.content} 
                  defaultOpen={index === 0}
                />
              ))}
            </div>
        </div>
      </Container>
    </section>
  );
}

function SpecAccordionItem({ title, content, defaultOpen = false }: { title: string, content: string, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-[14px] font-bold tracking-tight transition-colors ${isOpen ? 'text-[#005FFF]' : 'text-slate-800 group-hover:text-[#005FFF]'}`}>
          {title}
        </span>

        {/* Animated Plus/Minus using Pure CSS */}
        <div className={`relative flex items-center justify-center w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
           <div className={`absolute w-3 h-[1.5px] transition-colors duration-500 ${isOpen ? 'bg-[#005FFF]' : 'bg-slate-300'}`} />
           <div className={`absolute w-3 h-[1.5px] transition-all duration-500 ${isOpen ? 'bg-[#005FFF] rotate-0 opacity-0' : 'bg-slate-300 rotate-90 opacity-100'}`} />
        </div>
      </button>

      {/* Optimized Height Animation using CSS Grid */}
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="pb-6 text-[14px] leading-relaxed text-slate-500 font-light">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}