const x: {
  platform: 'vtex'

  api: {
    storeId: string
    environment: 'vtexcommercestable' | 'vtexcommercebeta'
  }

  // Default channel
  channel: string

  // Production URLs
  storeUrl: string
  checkoutUrl: string

  site: {
    title: string
    description: string
    titleTemplate: string
  }

  // Lighthouse CI
  lighthouse: {
    server: strin
    pages: Recrod<string, string>
  }

  // E2E CI
  cypress: {
    pages: Record<string, string>
  }
}

export default x
