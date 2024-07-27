/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Cấu hình cho các yêu cầu API tới "/api/*"
          destination: 'http://localhost:3002/api/:path*', // URL tới server Node.js
        },
      ];
    },
  };
  
  module.exports = nextConfig;