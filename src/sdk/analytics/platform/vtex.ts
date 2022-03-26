import type { AnalyticsEvent } from '@faststore/sdk'

import type { SearchEvent } from '../types'

export function sendEvent(event: AnalyticsEvent | SearchEvent) {
  if (
    event.name === 'search_page_view' ||
    event.name === 'search_autocomplete'
  ) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window?.sendrc?.(event.name, event.params)
}
