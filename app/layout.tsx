import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/provider/SmoothScroll';
import PromoModal from '@/components/provider/PromoModal';
import CookieManager from '@/components/provider/CookieManager';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://www.enerzix.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Enerzix — Premium Canadian Spring Water',
    template: '%s | Enerzix',
  },
  description:
    'Enerzix is Canadian premium water, sourced from protected spring sources and bottled without compromise. Naturally filtered, independently tested, priced for every table.',
  keywords: [
    'Enerzix',
    'Canadian water brand',
    'premium spring water',
    'natural mineral water Canada',
    'sparkling water Canada',
    'wholesale water supplier',
  ],
  authors: [{ name: 'Enerzix' }],
  creator: 'Enerzix',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: 'Enerzix',
    title: 'Enerzix — Premium Canadian Spring Water',
    description:
      'Naturally filtered Canadian water, bottled at the source. Uncompromising quality, honest pricing.',
    images: [{ url: '/products/enerzix_hero.png', width: 1080, height: 1350, alt: 'Enerzix Water' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enerzix — Premium Canadian Spring Water',
    description: 'Naturally filtered Canadian water, bottled at the source.',
    images: ['/products/enerzix_hero.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#005FFF',
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Enerzix',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description:
    'Enerzix supplies premium, naturally filtered Canadian spring and sparkling water to households and businesses across Canada.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
  },
  sameAs: [],
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <PromoModal/>
        <CookieManager/>
        <SmoothScroll> 
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
          >
            Skip to content
          </a>
          
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
