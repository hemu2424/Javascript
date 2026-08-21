/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],},

  reactCompiler: true,
  
};

export default nextConfig;
