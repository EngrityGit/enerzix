'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function AboutHero() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const leftImgRef = useRef(null);
  const centerImgRef = useRef(null);
  const rightImgRef = useRef(null);

  useLayoutEffect(() => {
    // gsap.context helps with cleanup and scoping in React
    let ctx = gsap.context(() => {
      
      // 1. Entrance Animations (Fade in and Slide up)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from(".hero-badge", { opacity: 0, y: 10, delay: 0.2 })
        .from(".hero-title", { opacity: 0, y: 20 }, "-=0.8")
        .from(".hero-text", { opacity: 0, y: 15 }, "-=0.8")
        .from(".hero-button", { opacity: 0, y: 10 }, "-=0.8");

      // 2. Scroll-driven Parallax Animations
      // Header fades out as we scroll
      gsap.to(headerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        }
      });

      // Left Image Parallax (-100px)
      gsap.to(leftImgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // '1' adds a slight smooth catch-up effect for better performance
        }
      });

      // Center Image Parallax (-40px)
      gsap.to(centerImgRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      });

      // Right Image Parallax (-160px)
      gsap.to(rightImgRef.current, {
        y: -160,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        }
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] md:min-h-screen w-full flex items-start justify-center pt-32 md:pt-48 overflow-hidden bg-gradient-to-b from-[#A5C1E1] via-[#E8EDF2] to-[#F8FAFC]"
    >
      <Container className="relative z-20">
        {/* Centered Header Area */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <div className="hero-badge px-4 py-1.5 rounded-full bg-[#005FFF]/10 border border-[#005FFF]/10 mb-6 backdrop-blur-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#005FFF]">
              About Enerzix Water
            </span>
          </div>

          <h1 className="hero-title text-5xl md:text-8xl font-black text-[#0A192F] tracking-tighter max-w-4xl leading-[0.95]">
            Hydration Made<br /> 
            <span className="italic font-light text-[#005FFF]">Simple</span> 
          </h1>

          <p className="hero-text mt-8 text-slate-700 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Enerzix was created with a straightforward purpose: to provide clean, refreshing and convenient hydration for everyday life
          </p>

          <div className="hero-button mt-10">
            <LiquidButton text="Shop the Collection" scrolled={true} />
          </div>
        </div>

        {/* Parallax Collage */}
        <div className="relative mt-12 h-[350px] md:h-[600px] max-w-5xl mx-auto flex items-center justify-center">
          
          {/* Left Lifestyle Image */}
          <div 
            ref={leftImgRef}
            className="absolute left-0 md:left-[2%] w-[33%] aspect-[3/4] rounded-[20px] md:rounded-[30px] overflow-hidden border-4 md:border-[10px] border-white shadow-2xl z-10 -rotate-6"
          >
            <Image 
              src="/products/enerzix_lifestyle2.png" 
              alt="Lifestyle 2" 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>

          {/* Right Lifestyle Image */}
          <div 
            ref={rightImgRef}
            className="absolute right-0 md:right-[2%] w-[33%] aspect-[3/4] rounded-[20px] md:rounded-[30px] overflow-hidden border-4 md:border-[10px] border-white shadow-2xl z-10 rotate-6"
          >
            <Image 
              src="/products/enerzix_lifestyle3.png" 
              alt="Lifestyle 3" 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>

          {/* Center Main Focused Image */}
          <div 
            ref={centerImgRef}
            className="relative w-[52%] md:w-[48%] aspect-[4/5] rounded-[25px] md:rounded-[40px] overflow-hidden border-[6px] md:border-[14px] border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] z-20"
          >
            <Image 
              src="/products/enerzix_lifestyle1.png" 
              alt="Main Lifestyle" 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 60vw, 40vw"
            />
            
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-3 md:p-6 bg-white/10 backdrop-blur-xl rounded-[15px] md:rounded-[24px] border border-white/20 text-left">
               <p className="text-white text-[9px] md:text-sm font-medium italic leading-relaxed">
                 &quot;Clean, refreshing purified water, locally sourced and bottled in British Columbia.&quot;
               </p>
               <p className="text-white/60 text-[7px] md:text-[9px] mt-2 md:mt-4 font-black uppercase tracking-[0.2em]">Pure Hydration. Every Day.</p>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 w-full h-[20vh] bg-gradient-to-t from-[#F8FAFC] via-white/40 to-transparent pointer-events-none z-30" />
    </section>
  );
}