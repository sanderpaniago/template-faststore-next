// @ts-check
const withBundleStats = require('next-plugin-bundle-stats')

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
    domains: [
      'storeframework.vtexassets.com',
      'storecomponents.vtexassets.com',
      'source.unsplash.com',
    ],
    minimumCacheTTL: 3600 * 24 * 365, // 1 year in seconds
  },
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
}

const getConfig = withBundleStats({
  outDir: '../public',
})

module.exports = getConfig(nextConfig)
