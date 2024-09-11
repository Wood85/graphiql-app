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

export default nextConfig;
