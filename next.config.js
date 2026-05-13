/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ],
    domains: [
      'spaceflightnow.com',
      'mars.nasa.gov',
      'www.nasa.gov',
      'images-assets.nasa.gov',
      'api.spaceflightnewsapi.net'
    ]
  },
}

module.exports = nextConfig
