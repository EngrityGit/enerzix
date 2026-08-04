'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import LiquidButton from '../ui/LiquidButton';

const LiquidGlassFilters = () => (
  <svg style={{ position: 'fixed', width: 0, height: 0 }}>
    <defs>
      <filter id="liquid-glass-refraction">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

const LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Journal', href: '/blog' }, // Added Journal Link
  { name: 'Wholesale', href: '/wholesale' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.fromTo(".mobile-link", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [mobileMenuOpen]);

  const primaryColor = scrolled || mobileMenuOpen ? 'text-[#0A192F]' : 'text-white';

  return (
    <>
      <LiquidGlassFilters />
      <header className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-6 lg:pt-8 px-4 lg:px-8 pointer-events-none">
        <nav className="relative flex items-center justify-between w-full max-w-[1600px] px-6 lg:px-12 py-4 lg:py-5 pointer-events-auto transition-all duration-700 ease-out">
          
          <div 
            className={`absolute inset-0 z-0 rounded-[24px] lg:rounded-[30px] transition-all duration-1000 ${scrolled || mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            style={{
              filter: 'url(#liquid-glass-refraction)',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
            }}
          />

          <Link href="/" className="relative z-[110] transition-transform active:scale-95 pointer-events-auto">
            <Image 
              src="/logo.svg" 
              alt="Enerzix Logo" 
              width={160} 
              height={45} 
              priority 
              className={`transition-all duration-700 h-auto ${scrolled || mobileMenuOpen ? 'brightness-100' : 'brightness-0 invert'}`} 
            />
          </Link>

          <div className="hidden lg:flex items-center gap-2 relative z-10">
            {LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.name === 'Products' && setIsProductsOpen(true)}
                  onMouseLeave={() => link.name === 'Products' && setIsProductsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`group relative px-5 py-2.5 text-[14px] font-black tracking-[0.2em] transition-all duration-500 uppercase flex flex-col items-center gap-1 pointer-events-auto
                      ${isActive ? 'text-[#005FFF]' : primaryColor} hover:!text-[#005FFF]
                    `}
                  >
                    <div className={`absolute inset-0 z-0 rounded-[10px] transition-all duration-300 
                      ${isActive 
                        ? 'opacity-100 scale-100 bg-[#005FFF]/5' 
                        : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 bg-white/20'}
                    `} />
                    
                    <div className="flex items-center gap-2 relative z-10">
                      <span>{link.name}</span>
                      {link.name === 'Products' && (
                        <svg 
                          className={`w-3 h-3 transition-transform duration-500 ${isProductsOpen ? 'rotate-180' : ''}`} 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </Link>

                  {link.name === 'Products' && (
                    <div className={`absolute top-full left-0 pt-4 w-[280px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isProductsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <div className="bg-white/95 backdrop-blur-3xl rounded-[24px] overflow-hidden shadow-2xl border border-white/50">
                        <Link 
                          href="/products/500ml"
                          className="group flex flex-col items-center p-6 hover:bg-black/[0.02] transition-colors"
                        >
                          <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-[18px] flex items-center justify-center border border-black/5">
                            <Image 
                              src="/products/enerzix_500ml_plain.webp" 
                              alt="500ml" 
                              width={120} height={120} 
                              className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-[#0A192F] font-black text-lg uppercase tracking-tighter">500ml Original</p>
                            <p className="text-[#005FFF] font-bold text-[9px] uppercase tracking-widest mt-1">Shop Collection</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative z-[110] pointer-events-auto">
            <div className="hidden sm:block">
              <LiquidButton href='/contact' text="Get in Touch" scrolled={scrolled || mobileMenuOpen} />
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center active:scale-90 transition-transform"
              aria-label="Toggle Menu"
            >
              <div className="absolute inset-0 bg-[#005FFF]/10 backdrop-blur-md rounded-full border border-[#005FFF]/20" />
              <div className="relative flex flex-col gap-1.5 items-center">
                <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px] bg-[#0A192F]' : 'bg-[#005FFF]'}`} />
                <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${mobileMenuOpen ? 'opacity-0 -translate-x-2' : 'bg-[#005FFF]'}`} />
                <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px] bg-[#0A192F]' : 'bg-[#005FFF]'}`} />
              </div>
            </button>
          </div>

          <div
            ref={mobileMenuRef}
            className="fixed inset-0 z-[105] bg-white lg:hidden flex flex-col pt-32 px-10 pb-10 opacity-0 pointer-events-none"
          >
            <div className="flex flex-col gap-4">
              {LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-link text-4xl font-black uppercase tracking-tighter transition-colors inline-block 
                      ${isActive ? 'text-[#005FFF]' : 'text-[#0A192F]'}
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto mobile-link">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4">Featured Selection</p>
              <Link 
                href="/products/500ml"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-[20px] bg-black/5 mb-8"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                   <Image src="/products/enerzix_500ml.png" alt="500ml" width={32} height={32} className="object-contain" />
                </div>
                <p className="font-black text-[#0A192F] uppercase tracking-tight">500ml Original</p>
              </Link>
              <LiquidButton href='/contact' text="Get in Touch" scrolled={true} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}