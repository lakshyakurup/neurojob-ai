/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdf-parse uses Node APIs — keep it out of the edge/bundler
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
