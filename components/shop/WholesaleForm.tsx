'use client';

import { useRef, useState, useEffect } from 'react'; // Switched to useEffect for better hydration
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';
import Image from 'next/image';
import { CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import confetti from 'canvas-confetti';

export default function WholesaleForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const successOverlayRef = useRef<HTMLDivElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [requestSamples, setRequestSamples] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // OPTIMIZATION: yPercent is much smoother than Y strings
      // scrub: true is lighter than scrub: 1.2 (removes laggy smoothing)
      gsap.to(imageRef.current, {
        yPercent: 15, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true, 
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    
    // Simulating API call
    setTimeout(() => { 
        setStatus('success'); 
        confetti({ 
          particleCount: 100, 
          spread: 70, 
          origin: { y: 0.6 },
          zIndex: 999 
        });
    }, 1500);
  };

  return (
    <section ref={containerRef} className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      <Toaster position="top-center" richColors />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Optimized Parallax Image */}
          <div className="relative h-[600px] md:h-[800px] rounded-[40px] overflow-hidden bg-slate-200 shadow-xl border border-slate-100">
            <div 
              ref={imageRef} 
              className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform"
            >
              <Image
                src="/products/enerzix_lifestyle2.webp" 
                alt="Enerzix Glacial Source"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-105" 
              />
            </div>
            
            {/* OPTIMIZATION: Replaced backdrop-blur-md with bg-white/20 + border. 
                This saves the GPU from calculating blurs over a moving image. */}
            <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/20 border border-white/30 rounded-2xl z-10 text-center">
              <p className="text-white font-black uppercase tracking-widest text-[10px]">Verified Canadian Source</p>
            </div>
          </div>

          {/* Right Column: Optimized Form Container */}
          <div className="bg-[#F8FBFF] rounded-[50px] p-8 md:p-14 border border-[#E2EDFB] relative shadow-sm will-change-contents">
            
            <div className="mb-10">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#005FFF]">Wholesale Terminal</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] uppercase mt-3 tracking-tighter leading-none">
                SECURE <span className="text-[#005FFF] italic font-light lowercase">partnership.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">First Name</label>
                <input required name="firstName" placeholder="EX. JOHN" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold text-[#0A192F]" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">Last Name</label>
                <input required name="lastName" placeholder="EX. DOE" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold text-[#0A192F]" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">Company Name</label>
                <input required name="company" placeholder="ENTER REGISTERED BUSINESS NAME" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold text-[#0A192F]" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">Inventory Package</label>
                <div className="relative">
                  <select required name="package" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold appearance-none text-[#0A192F]">
                    <option value="">Select a package</option>
                    <option value="Starter">Starter Case (24 Units)</option>
                    <option value="Pallet">Retail Pallet (48 Cases)</option>
                    <option value="Custom">Custom Bulk Order</option>
                  </select>
                  <ChevronDown className="absolute right-7 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
              </div>

              {/* Sample Kit Toggle */}
              <div className="md:col-span-2 py-1">
                <div 
                  onClick={() => setRequestSamples(!requestSamples)}
                  className={`
                    cursor-pointer rounded-3xl p-4 flex items-center gap-5 transition-all duration-300 border-2
                    ${requestSamples ? 'bg-white border-[#005FFF] shadow-md' : 'bg-white/50 border-transparent'}
                  `}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${requestSamples ? 'bg-[#005FFF] text-white' : 'bg-white border border-slate-200 text-slate-300'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0A192F]">Request Sample Kit</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">Email Address</label>
                <input required name="email" type="email" placeholder="PARTNERS@COMPANY.COM" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold text-[#0A192F]" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase ml-4 text-slate-400">Phone</label>
                <input required name="phone" type="tel" placeholder="+1 (000) 000-0000" className="w-full px-7 py-4 rounded-full bg-white border border-slate-100 focus:border-[#005FFF] transition-all outline-none text-sm font-bold text-[#0A192F]" />
              </div>

              <div className="md:col-span-2 pt-6">
                <LiquidButton 
                  type="submit"
                  text={status === 'submitting' ? "Sending..." : "Submit Application"} 
                  scrolled={true} 
                  disabled={status === 'submitting'}
                />
              </div>
            </form>

            {/* Success Overlay - High Performance */}
            {status === 'success' && (
              <div ref={successOverlayRef} className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#005FFF] to-[#0A192F] rounded-[50px] p-12 text-center text-white">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 animate-pulse">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Application Sent</h3>
                  <p className="text-white/60 text-xs font-medium mb-8 max-w-xs">We will contact you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/30 pb-1">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}