import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/ds75izhfs/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ds75izhfs/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
