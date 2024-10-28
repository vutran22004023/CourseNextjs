/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Allow images from Firebase
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Configure API requests to "/api/*"
        destination: `${apiUrl}/api/:path*`, // URL to the Node.js server
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
