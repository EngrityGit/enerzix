'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';

export default function Origins() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      

      // 2. Parallax Image Effect
      // This creates a smooth parallax on the image inside its container
      gsap.to(imageRef.current, {
        yPercent: 15, // Moves the image slightly within its clipped container
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="origins" 
      ref={sectionRef}
      className="py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 items-start">
          
          {/* Label */}
          <div className="reveal md:col-span-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#005FFF]">
              Pure Hydration
            </span>
          </div>

          {/* Big Statement */}
          <div className="reveal md:col-start-6 md:col-span-7">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight">
              Enerzix provides clean and refreshing hydration to help you stay refreshed throughout the day.
            </h2>
            <div className="mt-10">
              <LiquidButton href='/about' text="Learn About Us" iconType="arrow" scrolled={true} />
            </div>
          </div>

          {/* Body Copy */}
          <div className="reveal md:col-span-4 md:pt-12">
            <p className="text-[17px] leading-relaxed text-slate-600 font-light max-w-sm">
              Whether you are working, exercising, travelling, attending an event, or spending time outdoors, Enerzix is a convenient hydration choice for everyday life.
            </p>
          </div>

          {/* Image Component with GSAP Parallax */}
          <div className="reveal md:col-start-6 md:col-span-7 w-full">
            <div 
              ref={containerRef}
              className="relative aspect-[16/9] rounded-[30px] overflow-hidden shadow-2xl"
            >
              <div ref={imageRef} className="absolute inset-0 -top-[20%] h-[140%] w-full">
                <Image 
                  src="/products/enerzix_lifestyle.webp" 
                  alt="The Pristine Canadian Wilderness"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              
              {/* Glass Info Badge */}
              <div className="absolute bottom-8 left-8 px-5 py-2.5 rounded-[12px] bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold tracking-[0.15em] uppercase z-10 pointer-events-none">
                Pure Hydration - Every Day
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}