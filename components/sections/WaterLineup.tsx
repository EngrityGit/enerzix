'use client';

import { useState, useEffect, useRef } from 'react'; // Switched to useEffect
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/LiquidButton';

const ENERZIX_VARIANTS = [
  {
    id: '500',
    name: 'Enerzix Purified Water',
    slug: 'enerzix_500ml',
    description: 'Our locally sourced water is purified through reverse osmosis and treated with ozone to deliver a clean, refreshing taste you can enjoy anywhere.',
    specs: [
      { title: "Pure", content: "Purified by reverse osmosis for maximum clarity." },
      { title: "Clean", content: "No added minerals • No sugar • No calories." },
      { title: "Refreshing", content: "Locally sourced and bottled in British Columbia." },
    ]
  },
];

export default function WaterLineup() {
  const [activeTab] = useState(ENERZIX_VARIANTS[0]); 
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // OPTIMIZATION: Used yPercent for GPU-based movement
      // Reduced duration for a "snappier" feel (better for perceived performance)
      gsap.from(".lineup-col", {
        yPercent: 10,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lineup" className="py-24 md:py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden">
      <Container>
        <div className="lineup-col mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#005FFF] block">
            Product Lineup
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1.3fr] gap-12 md:gap-16 items-center">
            
            {/* Column 1: Intro */}
            <div className="lineup-col space-y-8 will-change-contents">
              <h3 className="text-4xl md:text-5xl font-black leading-tight text-[#0A192F] tracking-tighter uppercase">
                {activeTab.name}
              </h3>
              <p className="text-base leading-relaxed text-slate-500 font-medium max-w-sm">
                {activeTab.description}
              </p>
              <Button 
                href="/products/500ml" 
                text={`Explore 500ml`} 
                scrolled={true} 
              />
            </div>

            {/* Column 2: Image Render */}
            <div className="lineup-col relative aspect-[4/5] flex items-center justify-center py-10 will-change-transform">
                <div className="relative w-full h-full flex justify-center items-center">
                    <Image
                        src={`/products/${activeTab.slug}.webp`} 
                        alt={activeTab.name}
                        width={450}
                        height={600}
                        className="object-contain drop-shadow-[0_20px_40px_rgba(0,95,255,0.15)]"
                        priority
                        sizes="(max-width: 1024px) 100vw, 33vw" // Critical for Next.js optimization
                    />
                </div>
            </div>

            {/* Column 3: Specs */}
            <div className="lineup-col divide-y divide-slate-100 border-t border-b border-slate-100">
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
    <div className="py-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group outline-none"
      >
        <span className={`text-[14px] font-black uppercase tracking-widest transition-colors ${isOpen ? 'text-[#005FFF]' : 'text-slate-800 group-hover:text-[#005FFF]'}`}>
          {title}
        </span>

        {/* OPTIMIZED ICON: Simple CSS transform */}
        <div className={`relative flex items-center justify-center w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <div className={`absolute w-3 h-[2px] transition-colors ${isOpen ? 'bg-[#005FFF]' : 'bg-slate-300'}`} />
           <div className={`absolute w-3 h-[2px] transition-all duration-300 origin-center ${isOpen ? 'bg-[#005FFF] rotate-0 scale-0' : 'bg-slate-300 rotate-90 scale-100'}`} />
        </div>
      </button>

      {/* OPTIMIZATION: transition-[grid-template-rows,opacity] instead of transition-all */}
      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="pb-6 text-[14px] leading-relaxed text-slate-500 font-medium">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}