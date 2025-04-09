import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors during `next build`
  },
};

export default nextConfig;
