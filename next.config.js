/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    domains: [ 'esea-app.s3.eu-west-2.amazonaws.com'],
  },
  // publicRuntimeConfig: {
  //   version,
  // },
}

module.exports = nextConfig
