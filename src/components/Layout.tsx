import React, { lazy, Suspense } from 'react'
import type { PropsWithChildren } from 'react'

import { useUI } from 'src/sdk/ui'
import Footer from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Toast = lazy(() => import('src/components/ui/Toast'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart, toasts } = useUI()

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}

      {toasts.length > 0 && (
        <Suspense fallback={null}>
          <Toast />
        </Suspense>
      )}
    </>
  )
}

export default Layout
