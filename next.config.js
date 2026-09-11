/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
  experimental: { serverComponentsExternalPackages: ['three'] },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
