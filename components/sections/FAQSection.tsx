'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import { faqs } from '@/data/faqs';
import { buildFaqJsonLd } from '@/lib/seo';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 items-start">
          
          {/* LEFT SIDE */}
          <div className="faq-reveal md:col-span-4">
            <div className="inline-flex px-4 py-1.5 rounded-[8px] bg-blue-50/50 border border-blue-100 mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#005FFF] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1] text-slate-900 tracking-tightest mb-8">
              Frequently <br />
              <span className="italic text-[#005FFF]">Asked </span> Questions
    
            </h2>
            <p className="text-[16px] leading-relaxed text-slate-500 font-light max-w-sm">
              Can&apos;t find what you&apos;re looking for? Reach out directly.
            </p>
          </div>

          {/* RIGHT SIDE: Accordion */}
          <div className="faq-reveal md:col-start-6 md:col-span-7 relative">
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-8 py-8 text-left transition-all"
                    >
                      <span className={`text-[15.5px] font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#005FFF]' : 'text-slate-800 group-hover:text-[#005FFF]'}`}>
                        {faq.question}
                      </span>
                      
                      {/* ANIMATED ICON START */}
{/* ANIMATED ICON */}
<div className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-500 ${isOpen ? 'bg-[#005FFF]' : 'bg-[#005FFF]/10'}`}>
  
  {/* Horizontal Bar (Always visible) */}
  <div className={`absolute w-4 h-[2px] rounded-full transition-colors duration-500 ${isOpen ? 'bg-white' : 'bg-[#005FFF]'}`} />
  
  {/* Vertical Bar (Rotates to hide/show) */}
  <div className={`absolute w-4 h-[2px] rounded-full transition-all duration-500 ease-in-out ${
      isOpen 
        ? 'bg-white rotate-0 opacity-0' 
        : 'bg-[#005FFF] rotate-90 opacity-100'
    }`} 
  />
</div>
                      {/* ANIMATED ICON END */}

                    </button>

                    <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="pb-8 pr-12">
                            <div className="p-6 rounded-[12px] bg-slate-50/50 border border-slate-100/50 backdrop-blur-sm">
                                <p className="text-[14.5px] leading-relaxed text-slate-500 font-light">
                                  {faq.answer}
                                </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}