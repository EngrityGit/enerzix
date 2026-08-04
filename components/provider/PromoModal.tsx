'use client';

import { useState, useEffect, FormEvent, useRef, useMemo } from 'react';
import { gsap } from '@/lib/gsap';
import { X, CheckCircle2 } from 'lucide-react';
import LiquidButton from '@/components/ui/LiquidButton';

export default function WholesalePromo() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  
  // Optimization 1: Use a Ref for form data to prevent re-renders on every keystroke
  const formRef = useRef({ firstName: '', lastName: '', email: '' });
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('enerzix_promo_seen')) return;
    
    const timer = setTimeout(() => setIsOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Optimization 2: Use gsap.context for clean memory management
  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(overlayRef.current, { 
        opacity: 1, 
        duration: 0.3 
      })
      .fromTo(modalRef.current, 
        { y: 20, scale: 0.98, opacity: 0 }, 
        { y: 0, scale: 1, opacity: 1, duration: 0.4 }, 
        "-=0.1"
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIsOpen(false);
        sessionStorage.setItem('enerzix_promo_seen', 'true');
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(formRef.current), // Use ref value here
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setStatus('done');
        setTimeout(close, 2500);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 bg-[#0A192F]/40 opacity-0"
      /* Removed backdrop-blur-md for performance. Use a solid/semi-trans background instead */
    >
      <div 
        ref={modalRef}
        className="bg-[#F4F9FF] rounded-[24px] p-6 md:p-10 max-w-lg w-full relative shadow-[0_20px_60px_rgba(0,0,0,0.2)] text-center opacity-0 translate-y-4"
        /* Optimization: Avoid scale animations on large text blocks if they jitter */
      >
        <button 
          onClick={close} 
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0A192F]"
        >
          <X size={20} />
        </button>

        {status === 'done' ? (
          <div className="py-10 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-[#005FFF] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0A192F]">Discount Activated</h3>
            <p className="text-slate-500 text-sm">Check your inbox for the code.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF]">Promotion</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] uppercase tracking-tighter mt-2 mb-3 leading-[0.9]">
              10% Off Your <br />
              <span className="text-[#005FFF] italic font-light lowercase">First Shipment.</span>
            </h2>
            <p className="text-slate-500 font-medium text-xs mb-6 max-w-[280px] mx-auto leading-relaxed">
              Wholesale discount for orders exceeding $2,000.00 CAD. 
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  placeholder="FIRST NAME"
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-[11px] font-bold outline-none focus:ring-1 focus:ring-[#005FFF]"
                  onChange={(e) => (formRef.current.firstName = e.target.value)}
                />
                <input
                  required
                  placeholder="LAST NAME"
                  className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-[11px] font-bold outline-none focus:ring-1 focus:ring-[#005FFF]"
                  onChange={(e) => (formRef.current.lastName = e.target.value)}
                />
              </div>
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-[11px] font-bold outline-none focus:ring-1 focus:ring-[#005FFF]"
                onChange={(e) => (formRef.current.email = e.target.value)}
              />

              <div className="pt-4 flex justify-center">
                <LiquidButton 
                  type="submit"
                  text={status === 'submitting' ? "..." : (status === 'error' ? "Retry" : "Claim Discount")} 
                  scrolled={true}
                  disabled={status === 'submitting'}
                />
              </div>
            </form>
          </div>
        )}
        
        <p className="mt-8 text-[8px] font-bold text-slate-300 uppercase tracking-widest">
          Enerzix Water // Marketed by Engrity Group
        </p>
      </div>
    </div>
  );
}