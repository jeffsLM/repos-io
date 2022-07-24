/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  images: {
    domains: ['assets.vercel.com','raw.githubusercontent.com','avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
