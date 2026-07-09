import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // local images in /public — no external image CDN needed
  },
};

export default nextConfig;
