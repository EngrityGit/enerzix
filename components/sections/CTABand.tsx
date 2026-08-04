'use client';

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
  description = "Locally sourced and bottled in British Columbia, Enerzix Water is purified through reverse osmosis and treated with ozone to deliver clean, refreshing hydration.",
  buttonText = "Shop Enerzix Water",
  secondaryButtonText = "Contact Us"
}: CTABandProps) {
  
  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="relative">
          {/* Main CTA Card */}
          <div
            className="relative rounded-[24px] md:rounded-[30px] bg-white border border-slate-100 p-8 md:p-24 overflow-hidden shadow-xl"
          >
            {/* Optimization: Static Background instead of complex radial repeating pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            {/* Optimized Glow: Lower blur radius for mobile performance */}
            <div className="absolute -top-1/4 -right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#005FFF]/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

              {/* Left Content */}
              <div className="md:col-span-7">
                <div className="inline-flex px-3 py-1 rounded-full bg-[#005FFF]/5 border border-[#005FFF]/10 mb-6">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#005FFF] uppercase">
                    {subtitle}
                  </span>
                </div>

                <h2 className="text-3xl md:text-6xl font-light leading-[1.1] text-slate-900 tracking-tight mb-8">
                  {title}
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
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

              {/* Right Content - Visible only on Desktop for speed */}
              <div className="md:col-start-9 md:col-span-4 hidden md:flex flex-col gap-8">
                <div className="space-y-2">
                  <div className="w-12 h-[1px] bg-[#005FFF]" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Sourced & Bottled in BC
                  </span>
                </div>

                <p className="text-[14px] leading-relaxed text-slate-500 font-light">
                  {description}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#005FFF]" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                    RO // Ozonated // 0 Sugar
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Label - Static position for mobile */}
          <div className="mt-8 text-center md:absolute md:-bottom-16 md:left-1/2 md:-translate-x-1/2 w-full">
            <span className="text-[8px] md:text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
              Enerzix Purified Water // Proudly Canadian
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}