'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const RETAILERS = [
  {
    name: "Chevron",
    logo: "https://giantoil.com/wp-content/uploads/4938f79f8d27413593e918b4f80d65ac.png",
    width: 140,
  },
  {
    name: "Panorama Indian Lounge",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKWJXx9Vmij1hofUBJG6M6tLV36QJDXBQz5KyGq0YUlvGo0UfeFxOMdugd&s=10",
    width: 160,
  },
  {
    name: "7-Eleven",
    logo: "https://1000logos.net/wp-content/uploads/2020/09/7-Eleven-Logo.png",
    width: 90,
  },
  {
    name: "Petro Canada",
    logo: "https://www.liblogo.com/img-logo/pe4227pbec-petro-canada-logo-petro-canada-logo-png-transparent-amp-svg-vector-freebie-supply.png",
    width: 160,
  },
  {
    name: "Shell",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Shell-Logo-1971-1995.png",
    width: 100,
  },
];

// Double the items for a seamless loop
const MARQUEE_ITEMS = [...RETAILERS, ...RETAILERS];

export default function RetailerMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Minimal GSAP for entrance only
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8FAFC] py-12 md:py-20 overflow-hidden border-t border-slate-100">
      

      <div className="flex flex-col lg:flex-row items-center w-full px-6 md:px-12 gap-10">
        
        {/* Left Side: Header */}
        <div className="flex-shrink-0">
          <h2 className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase whitespace-nowrap">
            Available <span className="text-[#005FFF]">At</span>
          </h2>
        </div>

        {/* Right Side: Marquee Area */}
        <div className="relative flex-1 w-full overflow-hidden">
          
          {/* Edge Blurs */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex items-center w-max animate-marquee">
            {MARQUEE_ITEMS.map((retailer, i) => (
              <div 
                key={i} 
                className="relative h-10 md:h-12 mx-8 md:mx-14 flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 ease-in-out cursor-default"
                style={{ width: retailer.width }}
              >
                <Image
                  src={retailer.logo}
                  alt={retailer.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}