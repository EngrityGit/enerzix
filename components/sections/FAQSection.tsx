'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import { FAQ_DATA } from '@/data/faqs';
import { buildFaqJsonLd } from '@/lib/seo';

type PageType = keyof typeof FAQ_DATA;

export default function FAQSection({ page = 'home' }: { page?: PageType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Get the 6+ questions for the specific page
  const currentFaqs = useMemo(() => FAQ_DATA[page], [page]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [page]);

  return (
    <section id="faq" ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] scroll-mt-24 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(currentFaqs)) }}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 items-start">
          
          <div className="faq-reveal md:col-span-4">
            <div className="inline-flex px-4 py-1.5 rounded-lg bg-blue-50 border border-blue-100 mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#005FFF] uppercase">
                {page} FAQ
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-slate-900 tracking-tight mb-6">
              Frequently <br />
              <span className="italic text-[#005FFF]">Asked </span> Questions
            </h2>
            <p className="text-base leading-relaxed text-slate-500 font-light max-w-sm">
              Answers tailored to your {page} experience. Still need help? Contact us.
            </p>
          </div>

          <div className="faq-reveal md:col-start-6 md:col-span-7">
            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {currentFaqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={page + i} className="group overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-8 py-7 text-left transition-colors"
                    >
                      <span className={`text-[15px] md:text-[16px] font-medium transition-colors duration-300 ${isOpen ? 'text-[#005FFF]' : 'text-slate-800 group-hover:text-[#005FFF]'}`}>
                        {faq.question}
                      </span>
                      <div className={`relative flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#005FFF] rotate-180' : 'bg-slate-100'}`}>
                        <div className={`absolute w-3 h-[2px] rounded-full ${isOpen ? 'bg-white' : 'bg-slate-400'}`} />
                        <div className={`absolute w-[2px] h-3 rounded-full transition-transform duration-300 ${isOpen ? 'bg-white rotate-90 scale-0' : 'bg-slate-400'}`} />
                      </div>
                    </button>

                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                      <div className="overflow-hidden">
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