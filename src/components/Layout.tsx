import type { PropsWithChildren } from 'react'

import Footer from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'

function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  )
}

export default Layout
