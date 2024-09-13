/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Allow images from Firebase
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Configure API requests to "/api/*"
        destination: 'http://localhost:3003/api/:path*', // URL to the Node.js server
      },
    ];
  },
};

module.exports = nextConfig;