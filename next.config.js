const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  // Disable caching for config files in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules/**', '**/.next/**'],
      };
    }
    // Handle Three.js and React Three Fiber
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-three/fiber': require.resolve('@react-three/fiber'),
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);

