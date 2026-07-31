'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function ProductHero() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const expandBoxRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Entrance Animations (Header)
      const tlHeader = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
      tlHeader
        .from(".header-meta", { opacity: 0, x: -20, delay: 0.2 })
        .from(".header-title", { opacity: 0, y: 40 }, "-=0.8")
        .from(".header-desc", { opacity: 0, y: 20 }, "-=0.8")
        .from(".header-btn", { opacity: 0, scale: 0.9 }, "-=0.8");

      // 2. Scroll-Driven Expansion & Parallax
      // We use a timeline with scrub for synchronized transitions
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when the top of section hits bottom of screen
          end: "bottom top",    // End when bottom hits top
          scrub: 1,            // Smooth catch-up
        }
      });

      tlScroll
        // Width expansion and border radius
        .to(expandBoxRef.current, {
          width: "100%",
          borderRadius: "0px",
          ease: "none"
        }, 0.3) // Starts at 30% through the scroll zone
        
        // Image Parallax and Scale
        .to(imgRef.current, {
          yPercent: 10,  // Parallax effect
          scale: 1,      // Scale down from initial 1.2
          ease: "none"
        }, 0)
        
        // Badge Opacity
        .to(badgeRef.current, {
          opacity: 1,
          ease: "power2.inOut"
        }, 0.1);

      // 3. pH Progress Bar Animation (Triggered when badge becomes visible)
      gsap.to(progressRef.current, {
        width: "75%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#F8FAFC] overflow-x-hidden">
      
      {/* 1. Header Area */}
      <div className="pt-24 pb-16 md:pt-48 md:pb-32 bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC]">
        <Container>
          <div ref={headerRef} className="max-w-5xl">
            <div className="header-meta flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#005FFF]" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[#005FFF]">
                Premium Collection
              </span>
            </div>
            
            <h1 className="header-title text-5xl md:text-[95px] font-black text-[#0A192F] tracking-tighter leading-[0.9] mb-8 uppercase">
              Enerzix Purified <br />
              <span className="text-[#005FFF] italic font-light">Water</span>
            </h1>
            
            <p className="header-desc text-slate-600 text-base md:text-xl font-light max-w-xl leading-relaxed mb-10 px-1 md:px-0">
              Enerzix 500 mL purified water offers clean, convenient hydration wherever your day takes you.
            </p>

            <div className="header-btn px-1 md:px-0">
              <LiquidButton text="Learn More" scrolled={true} />
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Expanding Image Container */}
      <div className="relative flex justify-center w-full h-[50vh] md:h-[85vh] bg-[#F8FAFC]">
        <div 
          ref={expandBoxRef}
          className="relative h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[94%] md:w-[90%] rounded-[30px]"
        >
          <div 
            ref={imgRef}
            className="absolute inset-0 h-[120%] -top-[10%] scale-[1.2]" 
          >
            <Image 
              src="/products/enerzix_about3.webp" 
              alt="Premium Hydration"
              fill
              priority
              className="object-cover brightness-[0.97]"
              sizes="100vw"
            />
          </div>

          {/* Floating Glass Badge */}
          <div 
            ref={badgeRef}
            className="opacity-0 absolute bottom-6 right-6 md:top-12 md:right-12 z-20 scale-75 md:scale-100 origin-bottom-right"
          >
             <div className="bg-white/60 backdrop-blur-2xl p-5 md:p-7 rounded-[24px] shadow-2xl border border-white/80 flex flex-col gap-4 w-56 md:w-64">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#005FFF] flex items-center justify-center text-white shadow-lg shadow-[#005FFF]/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-sm font-black text-[#0A192F] uppercase tracking-tighter">Source Verified</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alkalinity Index</span>
                    <span className="text-xs font-bold text-[#005FFF]">7.4 pH</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <div 
                        ref={progressRef}
                        className="h-full bg-gradient-to-r from-[#005FFF] to-[#A5C1E1] w-0" 
                      />
                  </div>
                </div>
                
                <p className="text-[9px] font-medium text-slate-500 leading-tight">
                  Regularly tested for purity and mineral balance in British Columbia.
                </p>
             </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="h-20 bg-[#F8FAFC]" />
    </section>
  );
}