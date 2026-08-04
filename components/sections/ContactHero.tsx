'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context helps with cleanup and scoping selectors to this component
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 }
      });

      tl.fromTo(".hero-span", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, delay: 0.2 }
      )
      .fromTo(".hero-title", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0 }, 
        "-=0.6" // Starts 0.6s before previous animation ends
      )
      .fromTo(".hero-text", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0 }, 
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <section 
      ref={containerRef}
      className="pt-40 pb-20 bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC] overflow-hidden"
    >
      <Container>
        <div className="max-w-4xl">
          <span className="hero-span opacity-0 text-[11px] font-black uppercase tracking-[0.4em] text-[#005FFF] mb-6 block will-change-transform">
            Partnerships & Delivery
          </span>
          
          <h1 className="hero-title opacity-0 text-6xl md:text-[100px] font-black text-[#0A192F] tracking-tighter leading-[0.9] mb-8 uppercase will-change-transform">
            Connect With <br />
            <span className="text-[#005FFF] italic font-light">ENERZIX</span>
          </h1>
          
          <p className="hero-text opacity-0 text-slate-600 text-lg md:text-xl font-light max-w-xl leading-relaxed will-change-transform">
            Whether you are a boutique hotel, a national retailer, or a local shop, 
            we provide streamlined logistics for pure & premium water.
          </p>
        </div>
      </Container>
    </section>
  );
}