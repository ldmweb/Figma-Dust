import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  env: {
    DUST_API_KEY: process.env.DUST_API_KEY,
    DUST_WORKSPACE_ID: process.env.DUST_WORKSPACE_ID,
  },
  reactStrictMode: true,
  transpilePackages: ["geist"],
  images: {
    domains: ['dust.tt', 'storage.googleapis.com'],
  },
};

export default nextConfig;