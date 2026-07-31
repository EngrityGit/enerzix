'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger);

  // iOS Safari resizes the viewport (address bar show/hide) on every scroll
  // tick. Without this, ScrollTrigger recalculates on those resize events and
  // sections appear to jump, freeze, or fail to render mid-scroll on mobile.
  ScrollTrigger.config({ ignoreMobileResize: true });

  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
export default gsap;
