'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function BlogHero() {
  const visualRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Floating animation for the visual elements
    gsap.to(visualRef.current, {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Entrance animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  const glassTextStyle = {
    color: 'transparent',
    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.7)',
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(165,193,225,0.4) 50%, rgba(255,255,255,0.1) 100%)',
    WebkitBackgroundClip: 'text',
    filter: 'drop-shadow(0px 10px 15px rgba(165,193,225,0.3))',
  };

  return (
    <section className="relative min-h-[85vh] w-full flex items-center bg-gradient-to-b from-[#E2EDFB] via-[#F1F5F9] to-[#F8FAFC] overflow-hidden pt-20">
      
      {/* Large Glass Background Title */}
      <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none">
        <h2
          style={glassTextStyle}
          className="text-[22vw] font-black tracking-tighter uppercase opacity-30 leading-none"
        >
          Journal
        </h2>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div ref={textRef} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-[#005FFF]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#005FFF]">
                Insights & Education
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#0A192F] tracking-tighter leading-[0.95] mb-8 uppercase">
              The Pure
              <br />
              <span className="italic font-light text-[#005FFF] lowercase">
                Perspective
              </span>
            </h1>

            <p className="text-slate-600 text-lg font-light leading-relaxed mb-10 max-w-md">
              Exploring the science of hydration, the purity of British Columbia&apos;s 
              water sources, and the latest updates from the Enerzix facility.
            </p>

            <div className="flex flex-wrap gap-5">
              <LiquidButton
                href="#articles"
                text="Read Articles"
                scrolled={true}
              />
              
              <div className="flex flex-col justify-center border-l border-slate-200 pl-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Latest Entry
                </span>
                <span className="text-sm font-medium text-slate-900">
                  The Benefits of Ozonation
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative flex justify-center lg:justify-end">
            <div ref={visualRef} className="relative w-[320px] h-[400px] md:w-[480px] md:h-[520px]">
              
              {/* Main Featured Graphic */}
              <div className="absolute inset-0 rounded-[40px] overflow-hidden border border-white/50 shadow-2xl rotate-3">
                <Image
                  src="/products/enerzix_hero.png" // Use a lifestyle or high-quality product shot
                  alt="Enerzix Editorial"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent" />
              </div>

              {/* Floating Meta Cards */}
              <div className="absolute -top-6 -right-6 bg-white/70 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl z-20 hidden md:block max-w-[180px]">
                <div className="w-8 h-8 rounded-full bg-[#005FFF] flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[10px] font-black text-[#005FFF] uppercase mb-1">Industry News</p>
                <p className="text-sm font-bold text-[#0A192F] leading-tight">
                  Logistics across BC, AB & ON.
                </p>
              </div>

              <div className="absolute -bottom-8 -left-10 bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl z-20 hidden md:block">
                 <div className="flex -space-x-2 mb-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#005FFF] flex items-center justify-center text-[10px] text-white font-bold">+</div>
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Community</p>
                 <p className="text-md font-bold text-[#0A192F]">2.4k Weekly Readers</p>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Fade out bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}