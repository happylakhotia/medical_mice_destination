import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing configurations
  reactStrictMode: false,
  // Add the images configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kanteentest.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
