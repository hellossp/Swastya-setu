/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverActions: {
    bodySizeLimit: '10mb',
  },
};

export default nextConfig;
