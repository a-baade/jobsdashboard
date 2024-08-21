/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "22iihqwtndpi249i.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
