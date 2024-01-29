/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "film-grab.com",
      },
    ],
  },
};

export default nextConfig;
