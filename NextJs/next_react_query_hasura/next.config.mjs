/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/boilerplate",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/boilerplate',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boilerplate.riaz',
      },
    ],
  },
}

export default nextConfig