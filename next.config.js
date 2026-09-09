/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
  experimental: { serverComponentsExternalPackages: ['three'] },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
