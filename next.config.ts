import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 50, 25],
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

export default nextConfig;
