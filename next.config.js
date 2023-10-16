/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'jvrnp8kcvwvphqpm.public.blob.vercel-storage.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
