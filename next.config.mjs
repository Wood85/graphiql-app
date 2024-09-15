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
        source: '/en/restapi/([A-Z]+)/:path*',
        destination: '/en/restapi',
        permanent: true,
      },
      {
        source: '/ru/restapi/([A-Z]+)/:path*',
        destination: '/ru/restapi',
        permanent: true,
      },
      {
        source: '/en/graphiql/([A-Z]+)/:path*',
        destination: '/en/graphiql',
        permanent: true,
      },
      {
        source: '/ru/graphiql/([A-Z]+)/:path*',
        destination: '/ru/graphiql',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
