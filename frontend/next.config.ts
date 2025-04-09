import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
