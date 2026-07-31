'use client';

import { FormEvent, useState, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';
import { CheckCircle2 } from 'lucide-react';

export default function LeadGenForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Initial Reveal Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".lead-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (status === 'done' && successRef.current) {
      gsap.fromTo(successRef.current, 
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setStatus('done');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="py-32 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 items-start">
          
          {/* LEFT SIDE */}
          <div className="lead-reveal md:col-span-5">
            <div className="inline-flex px-4 py-1.5 rounded-[8px] bg-white border border-slate-200 shadow-sm mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#005FFF] uppercase">
                Reserve Your Refreshment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1] text-slate-900 tracking-tightest mb-8">
              Secure your <br />
              <span className="italic text-[#005FFF]">first allocation</span> of <br />
              pure & Clean water.
            </h2>
            <p className="text-[16px] leading-relaxed text-slate-500 font-light max-w-sm">
              Join the inner circle for a complimentary introductory case and priority subscription slots.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="lead-reveal md:col-start-7 md:col-span-5 relative">
            <div className="relative p-8 md:p-12 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,95,255,0.04)]">
              
              {status === 'done' ? (
                <div ref={successRef} className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-[#005FFF] mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Purity Reserved</h3>
                  <p className="text-sm text-slate-500 font-light">
                    We have added <span className="font-bold text-slate-900">{formData.firstName}</span> to our priority list.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="FIRST NAME"
                      className="w-full h-14 px-6 rounded-[12px] bg-white/60 border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                    <input
                      required
                      placeholder="LAST NAME"
                      className="w-full h-14 px-6 rounded-[12px] bg-white/60 border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                  
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    className="w-full h-14 px-6 rounded-[12px] bg-white/60 border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />

                  <div className="pt-4">
                     <LiquidButton 
                        iconType='cart'
                        type="submit"
                        text={status === 'submitting' ? "Verifying..." : (status === 'error' ? "Try Again" : "Reserve My Case")} 
                        disabled={status === 'submitting'}
                     />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}