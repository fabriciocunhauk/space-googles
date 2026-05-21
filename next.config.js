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
        hostname: "thespacedevs-prod.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.spaceflightnewsapi.net",
      },
      {
        protocol: "https",
        hostname: "spaceflightnow.com",
      },
      // News article image CDNs (served by Spaceflight News API sources)
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "*.imgix.net",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
