import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/restapi/([A-Z]+)/:path*',
        destination: '/restapi',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
