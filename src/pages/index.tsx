import { NextSeo } from 'next-seo'
import React from 'react'

import { useSiteUrl } from 'src/sdk/useSiteUrl'

import storeConfig from '../../store.config'

const {
  site: { title },
} = storeConfig

function Page() {
  const siteUrl = useSiteUrl()

  return (
    <>
      {/* SEO */}
      <NextSeo title={title} canonical={siteUrl} />

      <h1>Testando FastStore</h1>
    </>
  )
}

export default Page
