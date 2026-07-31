'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  rounded?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  aspectRatio = "aspect-[16/9]", 
  rounded = "rounded-[20px]",
  className = "",
  children 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Vertical Scroll Parallax
      // We use yPercent for hardware acceleration
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Mouse Follow Parallax (Liquid Feel)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate distance from center (-0.5 to 0.5)
    const xPos = (clientX - left) / width - 0.5;
    const yPos = (clientY - top) / height - 0.5;

    // Move image in opposite direction of mouse
    gsap.to(imageRef.current, {
      x: xPos * -40, // 40px total range
      y: yPos * -40,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto" // Prevents conflict with ScrollTrigger
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    // Reset image to center smoothly
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group shadow-2xl ${aspectRatio} ${rounded} ${className} isolation-auto`}
    >
      <div 
        ref={imageRef}
        className="relative w-full h-[120%] -top-[10%] scale-110 will-change-transform"
      >
        <Image 
          src={src} 
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>

      {/* Overlay content (Badges, etc) */}
      <div className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}