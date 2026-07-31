'use client';

import { useState, useEffect, useRef } from 'react'; // Switched to useEffect
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import { faqs } from '@/data/faqs';
import { buildFaqJsonLd } from '@/lib/seo';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // OPTIMIZATION: Reduced stagger and simplified easing
      gsap.from(".faq-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05, 
        clearProps: "all", // Removes GSAP styles after animation finishes
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 items-start">
          
          <div className="faq-reveal md:col-span-4">
            <div className="inline-flex px-4 py-1.5 rounded-lg bg-blue-50 border border-blue-100 mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#005FFF] uppercase">
                Support
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-slate-900 tracking-tight mb-6">
              Frequently <br />
              <span className="italic text-[#005FFF]">Asked </span> Questions
            </h2>
            <p className="text-base leading-relaxed text-slate-500 font-light max-w-sm">
              Can&apos;t find what you&apos;re looking for? Reach out to our support team.
            </p>
          </div>

          <div className="faq-reveal md:col-start-6 md:col-span-7">
            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="group overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-8 py-7 text-left transition-colors"
                    >
                      <span className={`text-[15px] md:text-[16px] font-medium transition-colors duration-300 ${isOpen ? 'text-[#005FFF]' : 'text-slate-800 group-hover:text-[#005FFF]'}`}>
                        {faq.question}
                      </span>
                      
                      {/* OPTIMIZED ICON: No complex transforms, just simple rotation */}
                      <div className={`relative flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#005FFF] rotate-180' : 'bg-slate-100'}`}>
                        <div className={`absolute w-3 h-[2px] rounded-full ${isOpen ? 'bg-white' : 'bg-slate-400'}`} />
                        <div className={`absolute w-[2px] h-3 rounded-full transition-transform duration-300 ${isOpen ? 'bg-white rotate-90 scale-0' : 'bg-slate-400'}`} />
                      </div>
                    </button>

                    {/* 
                        OPTIMIZATION: Removed backdrop-blur-sm. 
                        Added will-change-grid-template-rows to assist browser.
                    */}
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                      <div className="overflow-hidden px-1">
                        <div className="pb-7 pr-6">
                            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
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