'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MapPin, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const HUBS = [
  {
    id: 'vancouver',
    name: 'Western Distribution',
    city: 'Vancouver, BC',
    coverage: 'BC, Yukon, Vancouver Island',
    delivery: '24-48 Hours',
    details: 'Our primary coastal hub, facilitating glacial water distribution across the Pacific Northwest.',
  },
  {
    id: 'edmonton',
    name: 'Alberta Hub',
    city: 'Edmonton, AB',
    coverage: 'AB, SK, Rocky Mountains',
    delivery: 'Next Day',
    details: 'Strategic center for the Prairies and the Rockies, ensuring high-altitude replenishment.',
  },
  {
    id: 'toronto',
    name: 'Eastern Operations',
    city: 'Toronto, ON',
    coverage: 'Ontario & GTA Network',
    delivery: '24-48 Hours',
    details: 'Serving the central Canadian corridor with high-frequency retail and hospitality logistics.',
  }
];

export default function ServiceMap() {
  const [activeHub, setActiveHub] = useState(HUBS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // 1. Initial Entrance Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".service-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 2. High-Performance Swap Animation
  useLayoutEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(detailRef.current, 
        { opacity: 0, x: 10 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeHub]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F8FAFC] overflow-hidden">
      <Container>
        {/* Header */}
        <div className="service-reveal mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#005FFF] mb-4 block">
            Logistics Network
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tightest leading-tight">
            Strategic hubs <br /> 
            <span className="italic text-[#005FFF]">across Canada.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* HUB SELECTION */}
          <div className="lg:col-span-5 space-y-2 service-reveal">
            {HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setActiveHub(hub)}
                className={`group w-full text-left py-6 border-b transition-all duration-500 ${
                  activeHub.id === hub.id 
                  ? 'border-[#005FFF]' 
                  : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-[9px] font-black uppercase tracking-widest mb-2 transition-colors ${activeHub.id === hub.id ? 'text-[#005FFF]' : 'text-slate-400'}`}>
                      {hub.name}
                    </h4>
                    <p className={`text-2xl font-light tracking-tight transition-colors ${activeHub.id === hub.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {hub.city}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-500 ${activeHub.id === hub.id ? 'text-[#005FFF] translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                </div>
              </button>
            ))}

            <div className="mt-12 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 italic">
                  || Territory Expansion
                </p>
                <p className="text-xs leading-relaxed text-slate-500 max-w-xs font-light">
                    Custom logistics available for Maritimes and Northern Territories upon request.
                </p>
            </div>
          </div>

          {/* DETAIL PANEL */}
          <div className="lg:col-span-7 service-reveal">
            <div 
              ref={detailRef}
              className="relative bg-white p-10 md:p-16 rounded-[32px] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-col h-full">
                <div className="mb-12">
                   <div className="w-12 h-12 rounded-xl bg-[#005FFF]/5 flex items-center justify-center mb-8">
                      <MapPin className="text-[#005FFF] w-6 h-6" strokeWidth={1.5} />
                   </div>
                   <h3 className="text-3xl font-light text-slate-900 mb-6">{activeHub.city}</h3>
                   <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md">
                     {activeHub.details}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#005FFF]">
                      <Globe size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Coverage Area</span>
                    </div>
                    <p className="text-base font-medium text-slate-900">{activeHub.coverage}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#005FFF]">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Delivery Guarantee</span>
                    </div>
                    <p className="text-base font-medium text-slate-900">{activeHub.delivery}</p>
                  </div>
                </div>

                <div className="mt-16 flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100" />
                        ))}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Logistics Hub</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}