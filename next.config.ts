import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lilluna.com",
      },
    ],
  },
};

export default nextConfig;
