import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const reactPath = path.dirname(require.resolve('react/package.json'))
const reactDomPath = path.dirname(require.resolve('react-dom/package.json'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  transpilePackages: ['next-sanity', 'sanity', '@sanity/ui', '@sanity/icons'],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: reactPath,
      'react-dom': reactDomPath,
    }
    return config
  },
}

export default nextConfig
