import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@supabase/supabase-js", "@supabase/ssr"],
  webpack: (config) => {
    config.node = { __dirname: true, __filename: true };
    return config;
  },
};

export default nextConfig;
