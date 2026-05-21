import type { NextConfig } from "next";

const isStandalone = process.env.STANDALONE === "true";
const baseHref = isStandalone ? "/mailer" : "";
const outputMode = process.env.STANDALONE === "true" ? "standalone" : undefined;

const nextConfig: NextConfig = {
  basePath: baseHref,
  assetPrefix: baseHref,
  output: outputMode,

  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;