'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import LiquidButton from '@/components/ui/LiquidButton';
import Link from 'next/link';

const PROMOS = [
  {
    title: "Clean & Refreshing",
    desc: "Purified through reverse osmosis and treated with ozone to deliver a clean, refreshing taste for everyday hydration.",
    img: "/products/enerzix_lifestyle1.webp",
    label: "Purified Water"
  },
  {
    title: "Proudly Canadian",
    desc: "Locally sourced and bottled in British Columbia, supporting dependable hydration for Canadian homes, workplaces, and communities.",
    img: "/products/enerzix_lifestyle2.webp",
    label: "Locally Bottled"
  }
];

export default function ProductPromos() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Feature Cards */}
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className="promo-card md:col-span-4 relative group h-[450px] rounded-[32px] overflow-hidden border border-slate-100 shadow-sm"
            >
              {/* Image with PURE CSS Hover (No JS needed) */}
              <Image
                src={promo.img}
                alt={promo.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-6 rounded-[24px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#005FFF] bg-white px-2 py-1 rounded-md mb-4 inline-block">
                  {promo.label}
                </span>

                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
                  {promo.title}
                </h3>

                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {promo.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Business & Bulk Orders CTA */}
          <div className="promo-card md:col-span-4 relative group h-[450px] rounded-[32px] overflow-hidden border border-[#005FFF]/20 bg-[#005FFF] shadow-2xl shadow-[#005FFF]/20">
            {/* CSS-only background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative h-full p-10 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-[#005FFF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                  Business &
                  <br />
                  Bulk Orders
                </h3>

                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Enerzix Water is available for workplaces, construction and
                  industrial projects, offices, schools, hospitality,
                  conferences, retail locations, and community events.
                </p>
              </div>

              <Link href="/contact" className="pt-6 border-t border-white/20">
                <LiquidButton
                  text="Request a Quote"
                  scrolled={false}
                />
              </Link>
            </div>

            {/* Visual Flare - CSS only */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
          </div>

        </div>
      </Container>
    </section>
  );
}