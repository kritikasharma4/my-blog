import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)
const reactDir = path.dirname(require.resolve('react/package.json'))
const reactDomDir = path.dirname(require.resolve('react-dom/package.json'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  transpilePackages: ['next-sanity', 'sanity', '@sanity/ui', '@sanity/icons'],
  webpack(config, { isServer }) {
    // Force client bundle to use same React instance — fixes useEffectEvent in Sanity v5
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: reactDir,
        'react-dom': reactDomDir,
      }
    }
    return config
  },
}

export default nextConfig
