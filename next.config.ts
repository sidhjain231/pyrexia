import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>, so Pages builds need a static
// export, a base path, and an image loader that prefixes it (next/image
// ignores basePath for raw src strings). Vercel/local builds keep the
// default server with full image optimization.
const ghPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// React <ViewTransition> route transitions are client-side, so they work in
// the static export too.
const experimental = { viewTransition: true };

const nextConfig: NextConfig = ghPages
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: { loader: "custom", loaderFile: "./image-loader.ts" },
      experimental,
    }
  : { experimental };

export default nextConfig;
