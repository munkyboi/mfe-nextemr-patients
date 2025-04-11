import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        destination: 'http://my.api.mockaroo.com/:path*'
      }
    ];
  }
};

export default nextConfig;
