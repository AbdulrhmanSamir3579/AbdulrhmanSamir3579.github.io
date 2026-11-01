import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (user site → served from the domain root, no basePath).
 * `trailingSlash` emits `/en/index.html`, which Pages serves natively.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;
