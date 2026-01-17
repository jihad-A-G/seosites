/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable to prevent double-mounting in development
  output: 'standalone', // Enable standalone build for Docker
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS hostnames for production
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
};

module.exports = nextConfig;
