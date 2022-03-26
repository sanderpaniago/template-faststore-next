import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import { DefaultSeo, SiteLinksSearchBoxJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import NProgress from 'nextjs-progressbar'
import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import Layout from 'src/components/Layout'
import AnalyticsHandler from 'src/sdk/analytics'
import { validateCart } from 'src/sdk/cart/validate'
import ErrorBoundary from 'src/sdk/error/ErrorBoundary'
import TestProvider from 'src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from 'src/sdk/ui'
import { useSiteUrl } from 'src/sdk/useSiteUrl'
import type { CartItem } from 'src/sdk/cart/validate'

import storeConfig from '../../store.config'

const {
  site: { title, description, titleTemplate },
  channel,
} = storeConfig

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  const siteUrl = useSiteUrl()

  return (
    <ErrorBoundary>
      <AnalyticsHandler />
      <TestProvider>
        <UIProvider
          initialState={uiInitialState}
          actions={uiActions}
          effects={uiEffects}
        >
          <SessionProvider initialState={{ channel, locale }}>
            <CartProvider<CartItem>
              mode="optimistic"
              onValidateCart={validateCart}
            >
              <NProgress color="#0052C7" />
              <DefaultSeo
                defaultTitle={title}
                description={description}
                titleTemplate={titleTemplate}
                openGraph={{
                  type: 'website',
                  url: siteUrl,
                  title,
                  description,
                }}
              />
              <SiteLinksSearchBoxJsonLd
                url={siteUrl}
                potentialActions={[
                  {
                    target: `${siteUrl}/s/?q={search_term_string}`,
                    queryInput: 'required name=search_term_string',
                  },
                ]}
              />
              <ChakraProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ChakraProvider>
            </CartProvider>
          </SessionProvider>
        </UIProvider>
      </TestProvider>
    </ErrorBoundary>
  )
}

export default App
