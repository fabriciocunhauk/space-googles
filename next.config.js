/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,
  // Remove the X-Powered-By: Next.js header (minor security + performance)
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.spacexdata.com",
      },
      {
        protocol: "https",
        hostname: "*.flickr.com",
      },
      {
        protocol: "https",
        hostname: "*.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "epic.gsfc.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "*.thespacedevs.com",
      },
      {
        protocol: "https",
        hostname: "*.spaceflightnewsapi.net",
      },
      {
        protocol: "https",
        hostname: "spaceflightnow.com",
      },
    ],
  },
};

module.exports = nextConfig;
