'use client';

import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactFormSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const successOverlayRef = useRef<HTMLDivElement>(null);

  // Initial Reveal Animation
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

  // SUCCESS ANIMATION TRIGGER
  // We use useEffect to watch 'status'. When it hits 'success', we animate.
  useEffect(() => {
    if (status === 'success' && successOverlayRef.current) {
      gsap.fromTo(successOverlayRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
      );
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage("");
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        console.error("Server Error:", result);
        setStatus('error');
        setErrorMessage(result.error || "Failed to send request.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus('error');
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-7 contact-reveal">
            <div className="relative p-8 md:p-14 rounded-[40px] bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden min-h-[500px] flex flex-col">
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                  <Input label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="Retailer Name" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Business Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required />
                  <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
                <Input label="Delivery Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, Province, Postal Code" required />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium max-w-[240px] leading-relaxed">
                      By submitting, you agree to receive a custom wholesale quote.
                    </p>
                    {/* ERROR FEEDBACK */}
                    {status === 'error' && (
                      <p className="text-red-500 text-[10px] mt-2 flex items-center gap-1 font-bold uppercase tracking-wider">
                        <AlertCircle size={12} /> {errorMessage}
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="group relative">
                    <LiquidButton 
                      text={status === 'loading' ? "Sending..." : "Request Wholesale Quote"} 
                      scrolled={true} 
                    />
                  </button>
                </div>
              </form>

              {/* SUCCESS OVERLAY */}
              {status === 'success' && (
                <div 
                  ref={successOverlayRef}
                  className="absolute inset-0 bg-[#005FFF] z-20 flex flex-col items-center justify-center text-center p-10"
                >
                  <CheckCircle2 className="w-16 h-16 text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-4xl font-light text-white mb-4 tracking-tight">Request Received.</h3>
                  <p className="text-white/70 font-light max-w-sm leading-relaxed">
                    One of our distribution managers will reach out within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', company: '', email: '', phone: '', address: '' });
                    }} 
                    className="mt-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 contact-reveal">
            {/* Content Sidebar - Keep as is */}
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#005FFF] mb-4 block">Partner with us</span>
              <h2 className="text-5xl font-light text-slate-900 leading-[1.1] tracking-tightest mb-6">
                Streamlined <br /> <span className="italic text-[#005FFF]">Distribution.</span>
              </h2>
            </div>
            <div className="space-y-12">
              <ContactInfoItem title="Wholesale Support" content="Direct line for bulk orders." value="info@engrity.com" />
              <ContactInfoItem title="Retail Logistics" content="Operating across BC, AB, and ON." value="+1 (604) 355-6905" />
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
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#005FFF] transition-colors italic">
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
      <p className="text-black text-sm font-light mb-2">{content}</p>
      <p className="text-xl font-medium underline underline-offset-1 text-slate-900 tracking-tight">{value}</p>
    </div>
  );
}