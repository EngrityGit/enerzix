'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Floating Animation
      gsap.to(bottleRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. 3D Parallax Scroll Effect
      gsap.to(textRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // UNIFIED 3D WHITE GLASS STYLE
  const whiteGlass3D: React.CSSProperties = {
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: '0.8',
    color: 'rgba(255, 255, 255, 0.05)',
    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 50%, rgba(165, 193, 225, 0.3) 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)', // Sharp edges for A and R
    paintOrder: 'stroke fill',
    filter: `
      drop-shadow(-1px -1px 0px rgba(255, 255, 255, 0.5)) 
      drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.05))
      drop-shadow(0px 20px 40px rgba(165, 193, 225, 0.4))
    `,
    willChange: 'transform',
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC] overflow-hidden"
    >
      
      {/* 1. Large Background Text - Arranged to avoid bottle overlap */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none pointer-events-none px-6"
      >
        <div className="w-full max-w-[1400px] flex flex-col items-center gap-[8vh] md:gap-[12vh]">
          
          {/* Top Row: Pure & Hydration Split to the sides */}
          <div className="flex justify-between w-full items-center">
            <span style={whiteGlass3D} className="text-[10vw] lg:text-[10rem]">Pure</span>
            <span style={whiteGlass3D} className="text-[10vw] lg:text-[10rem]">Hydration</span>
          </div>

          {/* Bottom Row: Everyday Centered */}
          <div className="flex justify-center w-full">
            <span style={whiteGlass3D} className="text-[10vw] lg:text-[11rem] tracking-[-0.04em]">Everyday</span>
          </div>

        </div>
      </div>

      {/* 2. Central Floating Bottle */}
      <div 
        ref={bottleRef}
        className="relative z-20 w-full max-w-[420px] h-[55vh] md:h-[65vh] lg:h-[75vh] flex items-center justify-center mt-10 will-change-transform"
      >
        <Image
          src="/products/enerzix_hero.webp" 
          alt="Enerzix Pure & Clean Water"
          fill
          priority
          className="object-contain drop-shadow-[0_40px_80px_rgba(0,95,255,0.15)]"
        />
      </div>

      {/* 3. Bottom UI Layer */}
      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-30 flex justify-between items-end">
        
        {/* Brand Info */}
        <div className="max-w-[280px] md:max-w-[350px] border-l-[2px] border-[#005FFF]/20 pl-5">
          <span className="block text-[10px] font-black tracking-[0.3em] text-[#005FFF] uppercase mb-2">
            Shop Enerzix Water
          </span>
          <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
            Clean, refreshing purified water, locally sourced and bottled in British Columbia.
            <span className="block font-bold text-slate-900 mt-1 uppercase tracking-wide">Discover Our Water</span>
          </p>
        </div>

        {/* Specs */}
        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            No Minerals| No Sugar | No Calories 
          </p>
          <p className="text-slate-700 font-medium text-sm">
            NOW IN 500ML 
          </p>
        </div>

      </div>

      {/* Transition gradient to next section */}
      <div className="absolute bottom-0 w-full h-[20vh] bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
      
    </section>
  );
}