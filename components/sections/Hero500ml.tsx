'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function Hero500ml() {
  const bottleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(bottleRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    );
  }, []);

  const glassTextStyle = {
    color: 'transparent',
    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.8)',
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(165,193,225,0.5) 50%, rgba(255,255,255,0.2) 100%)',
    WebkitBackgroundClip: 'text',
    filter: 'drop-shadow(0px 15px 20px rgba(165,193,225,0.4))',
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC] overflow-hidden pt-20">

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none">
        <h2
          style={glassTextStyle}
          className="text-[25vw] font-black tracking-tighter uppercase opacity-40 leading-none"
        >
          500ML
        </h2>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div ref={textRef} className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-[#005FFF]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#005FFF]">
                Enerzix Purified Water
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-[#0A192F] tracking-tighter leading-[0.9] mb-8 uppercase">
              Pure
              <br />
              <span className="italic font-light text-[#005FFF] lowercase">
                500 mL.
              </span>
            </h1>

            <p className="text-slate-600 text-lg font-light leading-relaxed mb-10 max-w-md">
              Enerzix 500 mL purified water offers clean, convenient hydration
              wherever your day takes you. Locally sourced and bottled in
              British Columbia, purified through reverse osmosis and treated
              with ozone for a clean and refreshing taste.
            </p>

            <div className="flex flex-wrap gap-5">
              <LiquidButton
                href="/contact"
                text="Request a Quote"
                scrolled={true}
              />

              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Ideal For
                </span>
                <span className="text-sm font-medium text-slate-900">
                  Workplaces, Events & Everyday Hydration
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={bottleRef}
              className="relative w-[300px] h-[500px] md:w-[450px] md:h-[650px]"
            >
              <Image
                src="/products/enerzix_500ml.webp"
                alt="Enerzix 500 mL Purified Water"
                fill
                priority
                className="object-contain drop-shadow-[0_60px_100px_rgba(0,95,255,0.15)]"
              />

              {/* Feature Tags */}
              <div className="absolute top-1/4 -left-10 bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl shadow-xl hidden md:block">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-tighter">
                  Purified
                </p>
                <p className="text-lg font-bold text-[#0A192F]">
                  Reverse Osmosis
                </p>
              </div>

              <div className="absolute bottom-1/4 -right-10 bg-white/40 backdrop-blur-md border border-white/50 p-4 rounded-2xl shadow-xl hidden md:block">
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-tighter">
                  Bottled
                </p>
                <p className="text-lg font-bold text-[#0A192F]">
                  British Columbia
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}