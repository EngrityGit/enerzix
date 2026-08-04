/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
  ],

  },
  poweredByHeader: false,
};

module.exports = nextConfig;
