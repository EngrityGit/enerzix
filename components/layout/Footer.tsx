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
    href: 'https://www.instagram.com/enerzixwater?utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1LW8CA7fYr/?mibextid=wwXIfr',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@enerzix.water?_r=1&_t=ZS-98dKounCSQe',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
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
    <footer className="pb-8 md:pb-12 pt-10 px-4 md:px-6 bg-[#F8FAFC]">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#deedff] rounded-[32px] md:rounded-[40px] px-6 md:px-20 py-16 md:py-32 border border-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Brand Section */}
            <div className="lg:col-span-6 space-y-8 md:space-y-12">
              <Link href="/" className="inline-block transition-opacity hover:opacity-70">
                <Image
                  src="/logo.svg"
                  alt="Enerzix Logo"
                  width={180}
                  height={45}
                  priority
                  className="h-auto w-auto"
                />
              </Link>

              <div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#0A192F] uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
                  Pure <span className="text-[#005FFF] italic font-light normal-case">Hydration</span>
                  <br className="hidden sm:block" />
                  for every day.
                </h2>
                <p className="mt-6 text-slate-600 font-medium text-base md:text-xl max-w-xl leading-relaxed">
                  Clean, refreshing purified water locally sourced and
                  bottled in BC. 100% recyclable bottles.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#005FFF] animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#0A192F]">
                  Proudly Canadian • Marketed by Engrity Group Inc.
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF] mb-6 md:mb-10">
                Menu
              </h4>
              <ul className="space-y-4 md:space-y-5">
                {LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xl md:text-3xl font-black text-[#0A192F] hover:text-[#005FFF] transition-colors duration-200 uppercase tracking-tighter block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Socials */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#005FFF] mb-6 md:mb-10">
                Get in Touch
              </h4>

              <div className="space-y-8 md:space-y-10">
                {/* Email Section */}
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Email Inquiry</p>
                  <a href="mailto:info@engrity.com" className="text-lg md:text-xl font-black text-[#0A192F] hover:text-[#005FFF] transition-colors">
                    info@engrity.com
                  </a>
                </div>

                {/* Logistics & Phone Section */}
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Retail Logistics</p>
                  <p className="text-xs text-slate-700 font-bold leading-tight max-w-[220px]">
                    Operating across BC, AB, and ON with weekly replenishments.
                  </p>
                  <a href="tel:+16043556905" className="text-lg md:text-xl font-black text-[#0A192F] hover:text-[#005FFF] transition-colors block pt-1">
                    +1 (604) 355-6905
                  </a>
                </div>

                <div className="pt-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">Follow us</p>
                  <div className="flex gap-3 md:gap-4">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white border border-[#E2EDFB] flex items-center justify-center text-[#005FFF] transition-all hover:bg-[#005FFF] hover:text-white active:scale-90"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 md:mt-32 pt-8 border-t border-white/40 flex flex-col xl:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <Link href="/privacy" className="text-[9px] font-bold text-slate-500 hover:text-[#0A192F] uppercase tracking-widest">
                Privacy
              </Link>
              <Link href="/terms" className="text-[9px] font-bold text-slate-500 hover:text-[#0A192F] uppercase tracking-widest">
                Terms
              </Link>
              <button onClick={openCookieManager} className="text-[9px] font-bold text-slate-500 hover:text-[#005FFF] uppercase tracking-widest">
                Cookies
              </button>
            </div>

            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} ENERZIX. BC, CANADA.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}