import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'
import { useCallback } from 'react'

import { sendEvent as sendVTEXEvent } from './platform/vtex'
import {
  sendEvent as sendISEvent,
  useSearchIdentifiers,
  useSearchPing,
} from './platform/intelligentSearch'
import type { SearchEvent } from './types'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

export const AnalyticsHandler = () => {
  const { getSearchIdentifiers } = useSearchIdentifiers()

  useSearchPing(getSearchIdentifiers)

  const analyticsEventHandler = useCallback(
    (event: AnalyticsEvent | SearchEvent) => {
      window.dataLayer.push({ event: event.name, ecommerce: event.params })

      sendVTEXEvent(event)
      sendISEvent(event, getSearchIdentifiers)
    },
    [getSearchIdentifiers]
  )

  useAnalyticsEvent(analyticsEventHandler)

  return null
}

export default AnalyticsHandler
