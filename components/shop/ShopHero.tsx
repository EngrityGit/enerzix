'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';

export default function ShopHero() {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 }
      });

      tl.fromTo(".hero-badge", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, delay: 0.1 }
      )
      .fromTo(".hero-title", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        "-=0.7" // Overlap with badge animation
      )
      .fromTo(".hero-desc", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0 }, 
        "-=0.6"
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={scope}
      className="pt-40 pb-20 bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC] overflow-hidden"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="hero-badge opacity-0 px-4 py-1.5 rounded-full bg-[#005FFF]/10 border border-[#005FFF]/10 mb-6 backdrop-blur-sm will-change-transform">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#005FFF]">
              Enerzix Wholesale
            </span>
          </div>
          
          {/* Title */}
          <h1 className="hero-title opacity-0 text-6xl md:text-[100px] font-black text-[#0A192F] tracking-tighter leading-[0.9] mb-8 uppercase will-change-transform">
            Pure <span className="text-[#005FFF] italic font-light">Hydration</span> <br />
            Delivered
          </h1>
          
          {/* Description */}
          <p className="hero-desc opacity-0 text-slate-600 text-lg md:text-xl font-light max-w-xl leading-relaxed will-change-transform">
            Sourced from the deep glacial aquifers of the North. 
            Select your vessel and experience the vitality of raw water.
          </p>

        </div>
      </Container>
    </section>
  );
}