'use client';

import {useRef } from 'react';
import Container from '@/components/ui/Container';

export default function PhilosophySection() {
  const sectionRef = useRef(null);


  return (
    <section ref={sectionRef} className="py-32 bg-[#F8FAFC]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Left Side: Content */}
          <div className="space-y-6">
            <h3 className="phi-text text-3xl font-light text-slate-900 tracking-tighter">
              Hydration Made <span className="italic text-[#005FFF]">Simple</span>
            </h3>

            <p className="phi-text text-slate-500 font-light leading-relaxed text-lg">
              Enerzix Water is created to provide clean, refreshing hydration for
              everyday life. Our water is locally sourced and bottled in British
              Columbia, purified through reverse osmosis, and treated with ozone
              to deliver a clean taste you can enjoy wherever your day takes you.
            </p>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="phi-card bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <span className="text-[#005FFF] text-2xl font-light">
                Reverse Osmosis
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                Purified Water
              </p>
            </div>

            <div className="phi-card bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
              <span className="text-[#005FFF] text-2xl font-light">
                Ozonated
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                Clean & Refreshing Taste
              </p>
            </div>

            <div className="phi-card bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm col-span-2">
              <span className="text-[#005FFF] text-2xl font-light">
                100%
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                Recyclable Bottle
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}