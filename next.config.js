/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', "*","www.googleusercontent.com", "localhost"],
  },
}

module.exports = nextConfig
