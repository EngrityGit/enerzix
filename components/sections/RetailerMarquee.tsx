'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

// 1. MOVE THESE TO /public/logos/ AND CONVERT TO WEBP
const RETAILERS = [
  { name: "Chevron", logo: "/customers/chevron.svg", width: 120 },
  { name: "Panorama", logo: "/customers/panarama.png", width: 140 },
  { name: "7-Eleven", logo: "/customers/7eleven.svg", width: 80 },
  { name: "Petro Canada", logo: "/customers/petro.svg", width: 140 },
  { name: "Shell", logo: "/customers/shell.svg", width: 90 },
];

const MARQUEE_ITEMS = [...RETAILERS, ...RETAILERS, ...RETAILERS]; // Triple for smoother loop

export default function RetailerMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#F8FAFC] py-10 md:py-16 overflow-hidden border-y border-slate-100"
    >
      <div className="flex flex-col lg:flex-row items-center w-full px-6 md:px-12 gap-8">
        
        <div className="flex-shrink-0 z-20 bg-[#F8FAFC] pr-4">
          <h2 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase whitespace-nowrap">
            Available <span className="text-[#005FFF]">At</span>
          </h2>
        </div>

        <div className="relative flex-1 w-full overflow-hidden mask-fade">
          {/* Edge Blurs - Fixed using CSS Mask for better performance than many divs */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          {/* 
            ANIMATION OPTIMIZATION: 
            - Use will-change-transform to trigger GPU
            - Use animate-marquee (defined in tailwind.config)
          */}
          <div className="flex items-center w-max animate-marquee will-change-transform">
            {MARQUEE_ITEMS.map((retailer, i) => (
              <div 
                key={i} 
                className="relative h-8 md:h-10 mx-8 md:mx-12 flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default"
                style={{ width: retailer.width }}
              >
                <Image
                  src={retailer.logo}
                  alt={retailer.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 150px"
                  priority // Ensures logos are ready immediately
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}