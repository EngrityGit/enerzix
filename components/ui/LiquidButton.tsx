'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const iconPaths = {
  arrow: "M7 7h10v10 M7 17L17 7",
  plus: "M12 5v14M5 12h14",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  cart: "M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 015.01 3h3a2 2 0 012 1.72 12.06 12.06 0 00.8 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.06 12.06 0 002.81.8A2 2 0 0122 16.92z"
};

interface ButtonProps {
  text: string;
  iconType?: keyof typeof iconPaths;
  scrolled?: boolean;
  href?: string; 
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function LiquidButton({ 
  text, 
  iconType = 'arrow', 
  scrolled = false, 
  href, 
  type = "button", 
  disabled = false, 
  onClick 
}: ButtonProps) {
  
  const pathRef = useRef<SVGPathElement>(null);
  const path = iconPaths[iconType] || iconPaths.arrow;

  // GSAP Icon Drawing Animation (High Performance)
  const handleMouseEnter = () => {
    if (disabled || !pathRef.current) return;
    
    gsap.fromTo(pathRef.current, 
      { strokeDasharray: 100, strokeDashoffset: 100 }, 
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }
    );
  };

  const handleMouseLeave = () => {
    if (disabled || !pathRef.current) return;
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 0.3 });
  };

  const ButtonInner = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-stretch gap-1.5 group h-11 transition-all duration-300 ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'
      }`}
    >
      {/* 1. Icon Square */}
      <div 
        style={{ backgroundColor: '#DBEAFE' }}
        className="flex items-center justify-center w-11 h-11 rounded-[10px] shadow-sm border border-blue-200/50 flex-shrink-0 transition-colors duration-500 group-hover:!bg-[#005FFF]"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path
            ref={pathRef}
            d={path}
            style={{ stroke: scrolled ? '#005FFF' : '#1a1a1a' }}
            className="transition-colors duration-500 group-hover:!stroke-white"
          />
        </svg>
      </div>

      {/* 2. Text Rectangle */}
      <div
        style={{ 
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
          color: '#1a1a1a'
        }}
        className="flex items-center px-6 h-11 rounded-[10px] border border-white/20 backdrop-blur-md shadow-sm transition-colors duration-500 group-hover:!bg-[#005FFF] group-hover:!text-white"
      >
        <span className="text-[13px] font-bold tracking-widest uppercase whitespace-nowrap">
          {text}
        </span>
      </div>

      {/* Subtle Liquid Shadow */}
      {!disabled && (
        <div className="absolute inset-0 -z-10 bg-[#005FFF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
    </div>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block outline-none">
        {ButtonInner}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick} 
      className="outline-none bg-transparent border-none p-0 m-0 block w-full md:w-auto"
    >
      {ButtonInner}
    </button>
  );
}