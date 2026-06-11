/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/get-a-mockup',
        destination: '/#contact',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
