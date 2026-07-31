'use client';

import {useRef } from 'react';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

interface CTABandProps {
  title?: React.ReactNode;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  secondaryButtonText?: string;
}

export default function CTABand({
  title = (
    <>
      Pure Hydration.
      <br />
      <span className="italic text-[#005FFF]">Every Day.</span>
    </>
  ),
  subtitle = "Clean. Refreshing. Canadian.",
  description = "Locally sourced and bottled in British Columbia, Enerzix Water is purified through reverse osmosis and treated with ozone to deliver clean, refreshing hydration wherever your day takes you.",
  buttonText = "Shop Enerzix Water",
  secondaryButtonText = "Contact Us"
}: CTABandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="relative">
          {/* Main CTA Card */}
          <div
            ref={cardRef}
            className="relative rounded-[30px] bg-white/40 backdrop-blur-3xl border border-white p-12 md:p-24 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60 -z-10" />

            {/* Soft Blue Glow */}
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-[#005FFF]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

              {/* Left Content */}
              <div className="md:col-span-7">
                <div className="cta-content inline-flex px-4 py-1.5 rounded-[8px] bg-[#005FFF]/5 border border-[#005FFF]/10 mb-8">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#005FFF] uppercase">
                    {subtitle}
                  </span>
                </div>

                <h2 className="cta-content text-4xl md:text-6xl font-light leading-[1.05] text-slate-900 tracking-tightest mb-8">
                  {title}
                </h2>

                <div className="cta-content flex flex-wrap items-center gap-6">
                  <LiquidButton
                    href="/wholesale"
                    text={buttonText}
                    iconType="cart"
                    scrolled={true}
                  />
                  <LiquidButton
                    href="/contact"
                    text={secondaryButtonText}
                    iconType="mail"
                    scrolled={true}
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="md:col-start-9 md:col-span-4 hidden md:flex flex-col gap-8">
                <div className="cta-content space-y-2">
                  <div className="w-12 h-[1px] bg-[#005FFF]" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Locally Sourced // Bottled in British Columbia
                  </span>
                </div>

                <p className="cta-content text-[14px] leading-relaxed text-slate-500 font-light">
                  {description}
                </p>

                <div className="cta-content flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#005FFF] animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                    Reverse Osmosis // Ozonated // Zero Sugar // Zero Calories
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Label */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">
              Enerzix Purified Water // Proudly Canadian
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}