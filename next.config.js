const apiHost = new URL(process.env.NEXT_PUBLIC_API_HOST);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: apiHost.protocol.split(':')[0],
        hostname: apiHost.hostname,
      }
    ],
  },
}

module.exports = nextConfig
