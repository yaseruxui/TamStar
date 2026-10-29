import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // RFQ attachments (BOQ, drawings): 5 files × 8 MB, capped at 20 MB per submission.
    serverActions: { bodySizeLimit: '21mb' },
    proxyClientMaxBodySize: '21mb',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/en/about', permanent: true },
      { source: '/contact-us', destination: '/en/contact', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
