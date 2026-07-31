'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';

export default function ProductSpecs500ml() {
  const bottleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hardware Accelerated floating animation
      gsap.to(bottleRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true, // Crucial for performance
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      
      {/* 
          OPTIMIZATION: Radial Gradient instead of Blur Filter.
          CSS Filters (blur) are "live" and expensive. 
          Gradients are pre-rendered by the GPU.
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(165,193,225,0.4) 0%, rgba(165,193,225,0) 70%)',
        }}
      />

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#005FFF]">
            Product Information
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A192F] tracking-tighter uppercase mt-2">
            Enerzix Purified <span className="italic font-light text-[#005FFF] lowercase underline decoration-1 underline-offset-8">Water 500 mL</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 max-w-6xl mx-auto">
          
          {/* Left Column */}
          <div className="space-y-20 order-2 lg:order-1">
            <div className="callout-item flex flex-col items-end text-right group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Process</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">Reverse Osmosis & Ozonation</h4>
              <div className="h-[2px] w-12 bg-[#005FFF]/20 transition-all group-hover:w-20 group-hover:bg-[#005FFF]" />
            </div>

            <div className="callout-item flex flex-col items-end text-right group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Eco-Friendly</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">100% Recyclable Bottle</h4>
              <div className="h-[2px] w-12 bg-[#005FFF]/20 transition-all group-hover:w-20 group-hover:bg-[#005FFF]" />
            </div>
          </div>

          {/* Center Column: Bottle */}
          <div className="flex justify-center order-1 lg:order-2">
            <div 
              ref={bottleRef} 
              className="relative w-[280px] h-[450px] md:w-[380px] md:h-[580px] will-change-transform"
            >
              {/* 
                  OPTIMIZATION: Standard shadow via a hidden div.
                  'drop-shadow' is extremely slow because it calculates the bottle's outline.
                  Using a simplified shadow div is much faster.
              */}
              <div className="absolute inset-x-10 bottom-10 top-20 bg-blue-900/10 blur-[50px] rounded-full -z-10" />
              
              <Image
                src="/products/enerzix_hero.webp"
                alt="Enerzix 500ml Bottle"
                fill
                priority
                sizes="(max-width: 768px) 280px, 380px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-20 order-3">
            <div className="callout-item flex flex-col items-start text-left group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Ingredients</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">Pure Purified Water</h4>
              <div className="h-[2px] w-12 bg-[#005FFF]/20 transition-all group-hover:w-20 group-hover:bg-[#005FFF]" />
            </div>

            <div className="callout-item flex flex-col items-start text-left group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Source</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">British Columbia, Canada</h4>
              <div className="h-[2px] w-12 bg-[#005FFF]/20 transition-all group-hover:w-20 group-hover:bg-[#005FFF]" />
            </div>
          </div>
        </div>

        {/* 
            OPTIMIZATION: backdrop-blur reduced to 'md'.
            'xl' or '2xl' blurs are extremely heavy on mobile and older laptops.
        */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[40px] border border-white shadow-xl" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 p-10 md:p-12 items-center">
              <div className="text-center px-4">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Calories</p>
                <p className="text-4xl font-black text-[#0A192F]">0</p>
              </div>
              
              <div className="text-center px-4 border-l border-slate-200">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Sugar</p>
                <p className="text-4xl font-black text-[#0A192F]">0<span className="text-sm ml-0.5">g</span></p>
              </div>

              <div className="text-center px-4 border-l border-slate-200">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Added Minerals</p>
                <p className="text-2xl md:text-3xl font-black text-[#0A192F] leading-none">None</p>
              </div>

              <div className="text-center px-4 border-l border-slate-200">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Standard Size</p>
                <p className="text-2xl md:text-3xl font-black text-[#0A192F] leading-none">16.9 <span className="text-xs font-bold opacity-60">oz</span></p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}