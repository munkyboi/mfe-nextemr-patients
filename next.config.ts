import type { NextConfig } from 'next';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  async rewrites() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        destination: `${API_URL}/:path*`
      }
    ];
  }
};

export default nextConfig;
