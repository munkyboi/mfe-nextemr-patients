import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ];
  }
};

export default nextConfig;
