import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ftp.goit.study" },
      { protocol: "https", hostname: "readjourney.b.goit.study" },
      // { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
