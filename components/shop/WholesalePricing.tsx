'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import Container from '@/components/ui/Container';
import { Package, Truck, Droplets } from 'lucide-react';

export default function WholesalePricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const tiers = [
    {
      name: "Starter Case",
      quantity: "24 Bottles",
      price: "$2.10",
      total: "$50.40",
      description: "Perfect for boutique cafes and small fitness studios.",
      icon: <Droplets className="w-6 h-6 text-[#005FFF]" />
    },
    {
      name: "Retail Pallet",
      quantity: "48 Cases",
      price: "$1.75",
      total: "$2,016.00",
      description: "Best value for regional grocery or high-volume gyms.",
      icon: <Package className="w-6 h-6 text-[#005FFF]" />,
      popular: true
    },
    {
      name: "Custom Fleet",
      quantity: "2,000+ Units",
      price: "Custom",
      total: "Inquire",
      description: "Full-scale distribution and white-label opportunities.",
      icon: <Truck className="w-6 h-6 text-[#005FFF]" />
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the header text first
      gsap.from(".pricing-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="pricing-header mb-16 text-center opacity-100">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A192F] uppercase tracking-tighter mb-4">
            The 500ml <span className="text-[#005FFF] italic font-light lowercase">Standard.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-light">
            Our signature 500ml vessel, engineered for glacial purity and retail presence. 
            Available in flexible tiers for Canadian partners.
          </p>
        </div>

        <div className="pricing-grid grid md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`
                pricing-card p-8 rounded-3xl border will-change-transform
                ${tier.popular 
                  ? 'border-[#005FFF] bg-white shadow-[0_20px_50px_rgba(0,95,255,0.1)] scale-105 z-10' 
                  : 'border-slate-200 bg-white/50'}
              `}
            >
              <div className="mb-6">{tier.icon}</div>
              <h3 className="text-2xl font-black text-[#0A192F] uppercase mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-500 mb-6 font-light leading-snug">{tier.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-[#0A192F]">{tier.price}</span>
                <span className="text-slate-400 text-sm font-medium ml-2">/ bottle</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Unit Count</span>
                  <span className="font-bold text-[#0A192F]">{tier.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total MSRP Value</span>
                  <span className="font-bold text-[#005FFF]">{tier.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}