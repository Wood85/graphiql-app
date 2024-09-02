/** @type {import('next').NextConfig} */
const nextConfig = {
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
