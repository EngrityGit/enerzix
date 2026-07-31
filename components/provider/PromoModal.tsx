'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { X, CheckCircle2 } from 'lucide-react';
import LiquidButton from '@/components/ui/LiquidButton';

export default function WholesalePromo() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  // Refs for GSAP targeting
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('enerzix_promo_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Animation: Modal Entrance
  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(modalRef.current, 
          { scale: 0.9, opacity: 0, y: 30 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, 
          "-=0.2"
        );
    }
  }, [isOpen]);

  // Animation: Success State Transition
  useEffect(() => {
    if (status === 'done') {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [status]);

  const close = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        sessionStorage.setItem('enerzix_promo_seen', 'true');
      }
    });

    tl.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

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
        // Animate the form out before showing success
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setStatus('done');
            setTimeout(close, 2500);
          }
        });
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
      className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-[#0A192F]/60 backdrop-blur-md opacity-0"
      style={{ willChange: 'opacity' }}
    >
      <div 
        ref={modalRef}
        className="bg-[#F4F9FF] border border-white rounded-[24px] p-8 md:p-12 max-w-lg w-full relative shadow-[0_30px_100px_rgba(0,0,0,0.3)] text-center opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Close Button */}
        <button 
          onClick={close} 
          className="absolute top-6 right-6 text-slate-400 hover:text-[#0A192F] transition-colors"
        >
          <X size={24} />
        </button>

        <div ref={contentRef}>
          {status === 'done' ? (
            <div className="py-10 flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-[#005FFF] mb-6" />
              <h3 className="text-2xl font-bold text-[#0A192F] mb-2">Discount Activated</h3>
              <p className="text-slate-500 font-medium">Check your inbox for the wholesale code.</p>
            </div>
          ) : (
            <>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF]">Wholesale Promotion</span>
              <h2 className="text-4xl font-black text-[#0A192F] uppercase tracking-tighter mt-4 mb-4 leading-none">
                10% Off Your <br />
                <span className="text-[#005FFF] italic font-light lowercase">First Shipment.</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
                Enter your details to receive a 10% discount on initial inventory orders exceeding $2,000.00 CAD. 
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="FIRST NAME"
                    className="w-full h-12 px-5 rounded-[10px] bg-white border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                  <input
                    required
                    placeholder="LAST NAME"
                    className="w-full h-12 px-5 rounded-[10px] bg-white border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                
                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  className="w-full h-12 px-5 rounded-[10px] bg-white border border-slate-200 text-[11px] font-bold outline-none focus:border-[#005FFF] transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />

                <div className="pt-4 flex justify-center">
                  <LiquidButton 
                    type="submit"
                    text={status === 'submitting' ? "Sending..." : (status === 'error' ? "Try Again" : "Claim Discount")} 
                    scrolled={true}
                    disabled={status === 'submitting'}
                  />
                </div>
              </form>
            </>
          )}
        </div>
        
        <p className="mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
          Enerzix Water // Marketed by Engrity Group
        </p>
      </div>
    </div>
  );
}