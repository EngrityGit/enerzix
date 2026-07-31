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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];

export default function Footer() {
  const openCookieManager = () => {
    window.dispatchEvent(new Event('open-cookie-manager'));
  };

  return (
    <footer className="pb-12 pt-10 px-4 md:px-6 bg-[#F8FAFC]">
      {/* Increased max-width to 2xl for a wider "Gigantic" feel */}
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#deedff] border border-[#f8fbff] rounded-[40px] px-8 md:px-20 py-24 md:py-32 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Brand Section - Huge Typography */}
            <div className="lg:col-span-6 space-y-12">
              <Link href="/" className="inline-block transition-transform active:scale-95">
                <Image
                  src="/logo.svg"
                  alt="Enerzix Logo"
                  width={220}
                  height={60}
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
                  Clean, refreshing purified water that is locally sourced and
                  bottled in British Columbia. Reverse-osmosis purified,
                  ozonated, and packaged in 100% recyclable bottles.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#005FFF] animate-pulse shadow-[0_0_12px_#005FFF]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0A192F]">
                  Proudly Canadian • Marketed by Engrity Group Inc.
                </span>
              </div>
            </div>

            {/* Navigation - Wide Spacing */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#005FFF] mb-12">
                Navigation
              </h4>

              <ul className="space-y-6">
                {LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-2xl md:text-3xl font-black text-[#0A192F] hover:text-[#005FFF] transition-all uppercase tracking-tighter block hover:translate-x-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Socials */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#005FFF] mb-12">
                Get in Touch
              </h4>

              <div className="space-y-10">
                <div className="space-y-2">
                  <p className="text-xl font-black text-[#0A192F] uppercase tracking-tight">
                    British Columbia, Canada
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    Locally sourced and bottled at the source.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-black text-[#0A192F] uppercase tracking-tight">
                    Business & Bulk
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    Contact our team for commercial pricing and delivery options.
                  </p>
                </div>

                <div className="pt-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Follow our journey</p>
                    <div className="flex gap-4">
                    {SOCIALS.map((social) => (
                        <a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        className="w-14 h-14 rounded-2xl bg-white border border-[#E2EDFB] flex items-center justify-center text-[#005FFF] hover:bg-[#005FFF] hover:text-white hover:rotate-6 transition-all shadow-sm"
                        >
                        {social.icon}
                        </a>
                    ))}
                    </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar - Extra Wide */}
          <div className="mt-32 pt-10 border-t border-white/50 flex flex-col xl:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-10">
              <Link
                href="/privacy"
                className="text-xs font-bold text-slate-500 hover:text-[#0A192F] transition-colors uppercase tracking-widest"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-xs font-bold text-slate-500 hover:text-[#0A192F] transition-colors uppercase tracking-widest"
              >
                Terms of Service
              </Link>

              <button
                onClick={openCookieManager}
                className="text-xs font-bold text-slate-500 hover:text-[#005FFF] transition-colors uppercase tracking-widest"
              >
                Cookie Preferences
              </button>
            </div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} ENERZIX. PROUDLY BOTTLED IN BC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}