import { useAnalyticsEvent } from '@faststore/sdk'
import React from 'react'
import type { PropsWithChildren } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = ({ children }: PropsWithChildren<unknown>) => {
  useAnalyticsEvent((event) => {
    window.dataLayer.push(event)
  })

  return <>{children}</>
}

export default AnalyticsHandler
