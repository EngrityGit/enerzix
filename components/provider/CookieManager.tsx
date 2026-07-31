'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { X } from 'lucide-react';
import LiquidButton from '@/components/ui/LiquidButton';

export default function CookieManager() {
  const [isVisible, setIsVisible] = useState(false); // Controls DOM presence
  const [showSettings, setShowSettings] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('enerzix_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      try {
        setPrefs(JSON.parse(consent));
      } catch (e) {
        console.error("Error parsing cookie consent", e);
      }
    }

    const handleOpenFromFooter = () => {
      setShowSettings(true); 
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-manager', handleOpenFromFooter);
    return () => window.removeEventListener('open-cookie-manager', handleOpenFromFooter);
  }, []);

  // GSAP Entrance Animation
  useLayoutEffect(() => {
    if (isVisible && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isVisible]);

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setIsVisible(false);
          setShowSettings(false);
        }
      });
    }
  };

  const handleSave = (all = false) => {
    const finalPrefs = all 
      ? { essential: true, analytics: true, marketing: true } 
      : prefs;
    
    setPrefs(finalPrefs);
    localStorage.setItem('enerzix_cookie_consent', JSON.stringify(finalPrefs));
    
    if (finalPrefs.marketing) {
      console.log("🚀 Protocol: Marketing Pixels Activated");
    }
    
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed bottom-6 left-6 right-6 z-[999] md:left-auto md:right-10 md:w-[400px] opacity-0"
    >
      <div className="bg-white border border-[#E2EDFB] p-8 rounded-[24px] shadow-[0_20px_50px_rgba(0,95,255,0.12)] relative">
        
        {showSettings && (
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}

        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#005FFF] mb-4">
          Privacy Protocol
        </h4>
        
        {!showSettings ? (
          <div className="animate-in fade-in duration-500">
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
              We use cookies to optimize your hydration experience. Accept to enable retargeting features and personalized Canadian offers.
            </p>
            <div className="flex flex-col gap-3">
              <div onClick={() => handleSave(true)} className="w-full">
                <LiquidButton text="Accept All" scrolled={true} />
              </div>
              <button 
                onClick={() => setShowSettings(true)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#005FFF] transition-colors py-2"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-[11px] text-slate-400 font-medium mb-4">Adjust your data sharing levels:</p>
            
            {/* Essential */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black uppercase text-[#0A192F]">Essential</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold">System Required</p>
              </div>
              <div className="w-10 h-5 bg-[#005FFF]/20 rounded-full relative cursor-not-allowed">
                <div className="absolute right-1 top-1 w-3 h-3 bg-[#005FFF] rounded-full" />
              </div>
            </div>

            {/* Marketing Toggle - PURE CSS TRANSITION */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black uppercase text-[#0A192F]">Marketing</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold">Retargeting Ads</p>
              </div>
              <button 
                onClick={() => setPrefs({...prefs, marketing: !prefs.marketing})}
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${prefs.marketing ? 'bg-[#005FFF]' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${prefs.marketing ? 'translate-x-[22px]' : 'translate-x-[4px]'}`} />
              </button>
            </div>

            <div onClick={() => handleSave(false)} className="pt-4">
              <LiquidButton text="Save Protocol" scrolled={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}