'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';

const STATS = [
  { label: 'PH BALANCE', value: '7.4 NEUTRAL' },
  { label: 'NO SUGAR ', value: '0%' },
  { label: 'NO CALORIES', value: '0 CALS' },
];

export default function WhyEnerzix() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal header and stats
      gsap.from(".why-header", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      // 2. Reveal feature blocks staggered
      gsap.from(".feature-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] overflow-hidden">

      <Container>
        {/* 1. TOP HEADER ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="why-header px-5 py-2 rounded-[10px] bg-white border border-slate-200 shadow-sm">
             <span className="text-[11px] font-bold tracking-[0.15em] text-[#005FFF] uppercase">
                Keeps You Refreshed
             </span>
          </div>

          <div className="why-header flex flex-col gap-3 text-right">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex justify-end gap-6 items-baseline">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{stat.label}</span>
                <span className="text-[11px] font-bold text-slate-600 uppercase w-24 text-left">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MAIN TECHNICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-center">
          
          {/* LEFT COLUMN */}
          <div className="space-y-24">
            <FeatureBlock 
              title="Natural Filtration"
              content="Our water undergoes a purification process that includes reverse osmosis and ozonation. Reverse osmosis reduces dissolved impurities, while ozonation supports water quality during bottling for a clean, refreshing taste."
            />
            <FeatureBlock 
              title="Single Source Quality"
              content="Sourced and purified with precision—ensuring every drop meets our standards for refreshing, everyday hydration."
            />
          </div>

          {/* CENTRAL PRODUCT - Uses CSS Animation for performance */}
          <div 
            ref={bottleRef}
            className="relative aspect-[4/5] w-full flex items-center justify-center z-10"
          >
            <div className="relative w-full h-full animate-float">
              <Image 
                src="/products/enerzix_hero.png" 
                alt="Enerzix Premium Water"
                fill
                className="object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.12)]"
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-24">
            <FeatureBlock 
              title="Proudly Canadian"
              content="Enerzix Water is locally sourced and bottled in British Columbia, supporting local production while providing dependable hydration for Canadian homes and businesses."
            />
            <FeatureBlock 
              title="Eco-Friendly Packaging"
              content="Packaged in 100% recyclable bottles. We encourage all customers to recycle responsibly. Drink. Refresh. Recycle."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureBlock({ title, content }: { title: string, content: string }) {
  return (
    <div className="feature-reveal group">
      <h3 className="text-[15px] font-bold text-[#005FFF] tracking-tight mb-4 transition-transform group-hover:translate-x-1 duration-300">
        {title}
      </h3>
      <div className="w-full h-[1px] bg-slate-200 mb-6 relative overflow-hidden">
         {/* Pure CSS hover line - much faster than motion.div */}
         <div className="absolute inset-0 bg-[#005FFF] -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
      </div>
      <p className="text-[14px] leading-relaxed text-slate-500 font-light">
        {content}
      </p>
    </div>
  );
}