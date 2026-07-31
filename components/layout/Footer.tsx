'use client';

import Link from 'next/link';
import Image from 'next/image';

const LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Bulk Orders', href: '/wholesale' },
  { name: 'Contact', href: '/contact' },
];

const SOCIALS = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];

export default function Footer() {
  const openCookieManager = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-cookie-manager'));
    }
  };

  return (
    <footer className="pb-12 pt-10 px-4 md:px-6 bg-[#F8FAFC]">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#deedff] rounded-[40px] px-8 md:px-20 py-24 md:py-32 shadow-sm border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">

            {/* Brand Section */}
            <div className="lg:col-span-6 space-y-12">
              <Link href="/" className="inline-block transition-transform hover:scale-95 duration-300">
                <Image
                  src="/logo.svg"
                  alt="Enerzix Logo"
                  width={200}
                  height={50}
                  className="h-auto"
                />
              </Link>

              <div>
                <h2 className="text-5xl md:text-8xl font-black text-[#0A192F] uppercase tracking-tighter leading-[0.85]">
                  Pure <span className="text-[#005FFF] italic font-light normal-case">Hydration</span>
                  <br />
                  for every day.
                </h2>

                <p className="mt-8 text-slate-600 font-medium text-lg md:text-xl max-w-xl leading-relaxed">
                  Clean, refreshing purified water locally sourced and
                  bottled in BC. Reverse-osmosis purified,
                  ozonated, and packaged in 100% recyclable bottles.
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* OPTIMIZATION: Removed shadow from pulse. Shadows + Pulse = High Lag */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#005FFF] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A192F]">
                  Proudly Canadian • Marketed by Engrity Group Inc.
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF] mb-10">
                Navigation
              </h4>

              <ul className="space-y-5">
                {LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-2xl md:text-3xl font-black text-[#0A192F] hover:text-[#005FFF] transition-[transform,color] duration-300 uppercase tracking-tighter block hover:translate-x-2 will-change-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Socials */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF] mb-10">
                Get in Touch
              </h4>

              <div className="space-y-10">
                <div className="space-y-1">
                  <p className="text-xl font-black text-[#0A192F] uppercase tracking-tight">British Columbia</p>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Locally sourced and bottled.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xl font-black text-[#0A192F] uppercase tracking-tight">Business & Bulk</p>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Contact for commercial pricing.</p>
                </div>

                <div className="pt-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-5">Follow our journey</p>
                    <div className="flex gap-4">
                    {SOCIALS.map((social) => (
                        <a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-[#E2EDFB] flex items-center justify-center text-[#005FFF] hover:bg-[#005FFF] hover:text-white hover:-rotate-6 transition-[transform,background-color,color] duration-300 shadow-sm will-change-transform"
                        >
                        {social.icon}
                        </a>
                    ))}
                    </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-32 pt-10 border-t border-white/40 flex flex-col xl:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <Link href="/privacy" className="text-[10px] font-bold text-slate-500 hover:text-[#0A192F] transition-colors uppercase tracking-widest">
                Privacy
              </Link>
              <Link href="/terms" className="text-[10px] font-bold text-slate-500 hover:text-[#0A192F] transition-colors uppercase tracking-widest">
                Terms
              </Link>
              <button onClick={openCookieManager} className="text-[10px] font-bold text-slate-500 hover:text-[#005FFF] transition-colors uppercase tracking-widest">
                Cookies
              </button>
            </div>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} ENERZIX. BOTTLED IN BC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}