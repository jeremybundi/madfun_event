/** @type {import('next').NextConfig} */
module.exports = {
    // Enable the App Router
    experimental: {
      appDir: true,
    },
    
    // Image domains for external image sources
    images: {
      domains: ['madfun-dev-bucket.s3.eu-west-2.amazonaws.com'],
    },
  };
  