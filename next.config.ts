import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors and warnings during builds
  },
};

export default nextConfig;
