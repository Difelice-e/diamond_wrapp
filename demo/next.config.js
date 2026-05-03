const path = require('path');

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [256, 384, 512],
  },
};

module.exports = nextConfig;
