'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';
import { CheckCircle2 } from 'lucide-react';

export default function ContactFormSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const successOverlayRef = useRef<HTMLDivElement>(null);

  // 1. Initial Reveal
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 2. Success Animation
  useLayoutEffect(() => {
    if (status === 'success' && successOverlayRef.current) {
      gsap.fromTo(successOverlayRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API Call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* 1. Form Column */}
          <div className="lg:col-span-7 contact-reveal">
            <div className="relative p-8 md:p-14 rounded-[40px] bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Full Name" placeholder="John Doe" required />
                  <Input label="Company" placeholder="Retailer Name" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Business Email" type="email" placeholder="john@company.com" required />
                  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <Input label="Delivery Address" placeholder="Street, City, Province, Postal Code" required />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
                  <p className="text-[11px] text-slate-400 font-medium max-w-[240px] leading-relaxed">
                    By submitting, you agree to receive a custom wholesale quote via email.
                  </p>
                  <LiquidButton 
                    text={status === 'loading' ? "Processing..." : "Request Wholesale Quote"} 
                    scrolled={true} 
                  />
                </div>
              </form>

              {/* SUCCESS OVERLAY (GSAP Transition) */}
              {status === 'success' && (
                <div 
                  ref={successOverlayRef}
                  className="absolute inset-0 bg-[#005FFF] z-20 flex flex-col items-center justify-center text-center p-10"
                >
                  <CheckCircle2 className="w-16 h-16 text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-4xl font-light text-white mb-4 tracking-tight">Request Received.</h3>
                  <p className="text-white/70 font-light max-w-sm leading-relaxed">
                    One of our distribution managers will reach out within 24 hours with your custom pricing.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="mt-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. Content Column */}
          <div className="lg:col-span-5 contact-reveal">
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#005FFF] mb-4 block">
                Partner with us
              </span>
              <h2 className="text-5xl font-light text-slate-900 leading-[1.1] tracking-tightest mb-6">
                Streamlined <br /> 
                <span className="italic text-[#005FFF]">Distribution.</span>
              </h2>
            </div>

            <div className="space-y-12 mb-12">
              <ContactInfoItem 
                title="Wholesale Support" 
                content="Direct line for bulk orders and delivery scheduling."
                value="info@engrity.com"
              />
              <ContactInfoItem 
                title="Retail Logistics" 
                content="Operating across BC, AB, and ON with weekly replenishments."
                value="+1 (604) 355-6905"
              />
            </div>

            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="text-sm text-slate-500 italic leading-relaxed font-light">
                &quot;Enerzix has redefined our luxury beverage shelf. Their delivery is punctual, and the product quality is unmatched in the Canadian market.&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[#005FFF]" />
                <p className="text-[10px] font-black text-[#005FFF] uppercase tracking-widest">
                  Panorama Indian Lounge
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-3 group">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#005FFF] transition-colors">
        {label}
      </label>
      <input 
        {...props} 
        className="w-full bg-transparent border-b border-slate-200 py-2 text-base font-light focus:outline-none focus:border-[#005FFF] transition-all placeholder:text-slate-300"
      />
    </div>
  );
}

function ContactInfoItem({ title, content, value }: any) {
  return (
    <div className="group">
      <h4 className="text-[14px] font-black text-[#005FFF] uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-black   text-sm font-light mb-2">{content}</p>
      <p className="text-xl font-medium underline underline-offset-1 text-slate-900 tracking-tight">{value}</p>
    </div>
  );
}