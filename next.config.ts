import type { NextConfig } from 'next';

const allowedDevOrigins = process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
} satisfies NextConfig;

export default nextConfig;
