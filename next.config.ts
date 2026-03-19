import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 50, 25, 10],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
        port: "",
      }
    ]
  }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')();

module.exports = withBundleAnalyzer(nextConfig)
