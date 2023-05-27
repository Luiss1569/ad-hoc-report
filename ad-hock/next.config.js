/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URI: process.env.DATABASE_URI,
  },
};

module.exports = nextConfig;
