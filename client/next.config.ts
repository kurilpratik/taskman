import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'browsing-topics=()', // Disable browsing-topics feature
          },
        ],
      },
    ];
  },
};

export default nextConfig;
