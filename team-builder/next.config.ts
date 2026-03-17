// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
// // //   /* config options here */
// // // };

// // // export default nextConfig;

// // import { NextConfig } from "next";
// // import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// // const nextConfig: NextConfig = {
// //   //
// // };

// // if (process.env.NODE_ENV === "development") {
// //   setupDevPlatform();
// // }

// // export default nextConfig;

// const nextConfig = {
//   eslint: {
//     // Build хийх үед ESLint-ийг алдаа заасан ч үргэлжлүүл гэж хэлж байна
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     // TypeScript-ийн алдаа байсан ч Build-ийг зогсоохгүй
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TypeScript алдааг үл тоомсорлох
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint алдааг үл тоомсорлох
  },
};

export default nextConfig;
