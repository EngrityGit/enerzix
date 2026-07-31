'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  // Reset scroll position on page change.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  // Keep GSAP/ScrollTrigger in lockstep with Lenis's own render loop instead
  // of letting them read two different scroll positions. Without this,
  // scroll-linked (scrub) animations and native scroll drift apart — the
  // classic symptom is content stuck mid-transition on mobile.
  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        // syncTouch is an experimental Lenis feature that intercepts native
        // touch scrolling to "virtualize" it. On mobile Safari/Chrome this is
        // a well-documented cause of the page becoming unscrollable or
        // freezing mid-section, which matches the reported mobile bug.
        // Disabling it restores native touch scrolling on phones/tablets
        // while keeping the smooth-scroll feel on desktop wheel/trackpad.
        syncTouch: false,
        touchMultiplier: 2,
        autoRaf: false,
        prevent: (node: Element) => node.nodeName === 'SELECT',
        ...(prefersReducedMotion() ? { lerp: 1, duration: 0, smoothWheel: false } : {}),
      }}
    >
      {children}
    </ReactLenis>
  );
}
