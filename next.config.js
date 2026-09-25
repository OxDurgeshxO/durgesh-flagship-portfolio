/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
  serverExternalPackages: ['three'],
  // NOTE: the previous `eslint: { ignoreDuringBuilds: true }` has been removed.
  // It silently swallowed lint failures during `next build`, so a production build
  // could succeed while `npm run lint` would have failed. Verified clean before removal.
}
module.exports = nextConfig
