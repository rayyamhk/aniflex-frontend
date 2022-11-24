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
    deviceSizes: [600, 900, 1200],
  },
  i18n: {
    locales: ['en-US', 'zh-HK'],
    defaultLocale: 'en-US',
  },
}

module.exports = nextConfig
