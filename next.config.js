/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: { allowFutureImage: true },
    domains: ["reactnative-examples.com"],
  },
};

module.exports = nextConfig;
