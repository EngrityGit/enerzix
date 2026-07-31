'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';

export default function ProductSpecs500ml() {
  const bottleRef = useRef(null);

  useEffect(() => {
    // Floating animation for bottle
    gsap.to(bottleRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, []);

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A5C1E1]/30 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#005FFF]">
            Product Information
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#0A192F] tracking-tighter uppercase mt-2">
            Enerzix Purified <span className="italic font-light text-[#005FFF] lowercase underline decoration-1 underline-offset-8">Water 500 mL</span>
          </h2>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 max-w-6xl mx-auto">
          
          {/* Left Column Callouts */}
          <div className="space-y-24 order-2 lg:order-1">
            {/* Treatment */}
            <div className="callout-item flex flex-col items-end text-right group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Process</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">Reverse Osmosis & Ozonation</h4>
              <div className="h-[2px] w-12 bg-gradient-to-l from-[#005FFF] to-transparent rounded-full transition-all group-hover:w-20" />
            </div>

            {/* Eco-Friendly */}
            <div className="callout-item flex flex-col items-end text-right group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Eco-Friendly</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">100% Recyclable Bottle</h4>
              <div className="h-[2px] w-12 bg-gradient-to-l from-[#005FFF] to-transparent rounded-full transition-all group-hover:w-20" />
            </div>
          </div>

          {/* Center Column: Bottle */}
          <div className="flex justify-center order-1 lg:order-2">
            <div ref={bottleRef} className="relative w-[280px] h-[450px] md:w-[380px] md:h-[580px]">
              <Image
                src="/products/enerzix_hero.png"
                alt="Enerzix 500ml Bottle"
                fill
                priority
                className="object-contain drop-shadow-[0_40px_60px_rgba(165,193,225,0.5)]"
              />
            </div>
          </div>

          {/* Right Column Callouts */}
          <div className="space-y-24 order-3">
            {/* Ingredients */}
            <div className="callout-item flex flex-col items-start text-left group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Ingredients</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">Pure Purified Water</h4>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#005FFF] to-transparent rounded-full transition-all group-hover:w-20" />
            </div>

            {/* Source - Fixed overlapping here */}
            <div className="callout-item flex flex-col items-start text-left group">
              <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest mb-1">Source</p>
              <h4 className="text-xl font-bold text-[#0A192F] leading-tight mb-3">British Columbia, Canada</h4>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#005FFF] to-transparent rounded-full transition-all group-hover:w-20" />
            </div>
          </div>
        </div>

        {/* Bottom Info Card: Improved Glass Light Blue Style */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative">
            {/* The Glass Panel - Refined Colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#DDE7F2]/60 via-[#E8EDF2]/40 to-[#FFFFFF]/50 backdrop-blur-2xl rounded-[40px] border border-white/80 shadow-[0_25px_50px_-12px_rgba(165,193,225,0.4)]" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 p-10 md:p-12 items-center">
              <div className="text-center px-4">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Calories</p>
                <p className="text-4xl font-black text-[#0A192F]">0</p>
              </div>
              
              <div className="text-center px-4 border-l border-white/40">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Sugar</p>
                <p className="text-4xl font-black text-[#0A192F]">0<span className="text-sm ml-0.5">g</span></p>
              </div>

              <div className="text-center px-4 border-l border-white/40">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Added Minerals</p>
                <p className="text-2xl md:text-3xl font-black text-[#0A192F] leading-none">None</p>
              </div>

              <div className="text-center px-4 border-l border-white/40">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-[0.2em] mb-2">Standard Size</p>
                <p className="text-2xl md:text-3xl font-black text-[#0A192F] leading-none">16.9 <span className="text-xs font-bold opacity-60">oz</span></p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center mt-10">
            <div className="h-[1px] w-20 bg-slate-200 mb-4" />
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Marketed By Engrity Group Inc.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}