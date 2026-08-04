'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// This helper component handles the GSAP/Lenis synchronization
// It must be a child of ReactLenis to use the useLenis hook correctly.
function LenisSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Force ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Add Lenis to the GSAP ticker for frame-perfect sync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // 3. Fix mobile glitching/jumping on address bar resize
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // Optional: Only use this if mobile still feels jumpy
    // ScrollTrigger.normalizeScroll(true); 

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // syncTouch: false is the safest for mobile stability
        syncTouch: false, 
        touchMultiplier: 1.5,
        // We set autoRaf to false because we are driving it via GSAP ticker in LenisSync
        autoRaf: false, 
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}