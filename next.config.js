const apiHost = new URL(process.env.NEXT_PUBLIC_API_HOST);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
    defaultLocale: 'zh-HK',
    localeDetection: false,
  },
}

module.exports = nextConfig
