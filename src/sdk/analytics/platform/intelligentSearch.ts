import type { AnalyticsEvent } from '@faststore/sdk'
import { useStorage } from '@faststore/sdk'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import type { SearchEvent } from '../types'
import storeConfig from '../../../../store.config'

export function sendEvent(
  event: AnalyticsEvent | SearchEvent,
  getSearchIdentifiers: GetSearchIdentifiers
) {
  if (
    event.name !== 'search_page_view' &&
    event.name !== 'search_autocomplete'
  ) {
    return
  }

  const { session, anonymous } = getSearchIdentifiers()

  fetch(`https://sp.vtex.com/event-api/v1/${storeConfig.api.storeId}/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'search.query',
      text: event.params.term,
      misspelled: event.params.results === 0,
      match: event.params.results,
      operator: event.params.operator,
      url: window.location.href,
      agent: navigator.userAgent,
      session,
      anonymous,
    }),
  })
}

interface SessionIdentifier {
  session: string
  session_expiration_date: number
}

interface AnonymousIdentifier {
  anonymous: string
  anonymous_expiration_date: number
}

type SearchIdentifiers = SessionIdentifier & AnonymousIdentifier

const SEARCH_IDENTIFIERS_STORAGE_KEY = 'search::identifiers'

type GetSearchIdentifiers = () => SearchIdentifiers

function generateSessionIdentifier(): SessionIdentifier {
  return {
    session: nanoid(),
    session_expiration_date: sessionExpirationDate(),
  }
}

function generateAnonymousIdentifier(): AnonymousIdentifier {
  return {
    anonymous: nanoid(),
    anonymous_expiration_date: anonymousExpirationDate(),
  }
}

function generateSearchIdentifiers(): SearchIdentifiers {
  return { ...generateSessionIdentifier(), ...generateAnonymousIdentifier() }
}

export function useSearchIdentifiers() {
  const [identifiers, setIdentifiers] = useStorage(
    SEARCH_IDENTIFIERS_STORAGE_KEY,
    generateSearchIdentifiers
  )

  const getSearchIdentifiers = useCallback(() => {
    let newIdentifiers = { ...identifiers }

    if (
      areIdentifierExpired(
        identifiers.session_expiration_date,
        currentDateInSeconds()
      )
    ) {
      newIdentifiers = { ...newIdentifiers, ...generateSessionIdentifier() }
    }

    if (
      areIdentifierExpired(
        identifiers.anonymous_expiration_date,
        currentDateInSeconds()
      )
    ) {
      newIdentifiers = { ...newIdentifiers, ...generateAnonymousIdentifier() }
    }

    newIdentifiers = {
      ...newIdentifiers,
      session_expiration_date: sessionExpirationDate(),
      anonymous_expiration_date: anonymousExpirationDate(),
    }

    setIdentifiers(newIdentifiers)

    return newIdentifiers
  }, [identifiers, setIdentifiers])

  return useMemo(
    () => ({
      getSearchIdentifiers,
    }),
    [getSearchIdentifiers]
  )
}

/**
 * Code inspired by Dan Abramov's implementation of a useInterval hook
 * <https://overreacted.io/making-setinterval-declarative-with-react-hooks/>
 */
export function useSearchPing(getSearchIdentifiers: GetSearchIdentifiers) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = () => {
      const { session, anonymous } = getSearchIdentifiers()

      fetch(
        `https://sp.vtex.com/event-api/v1/${storeConfig.api.storeId}/event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'session.ping',
            url: window.location.href,
            agent: navigator.userAgent,
            session,
            anonymous,
          }),
        }
      )
    }
  }, [getSearchIdentifiers])

  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    const id = setInterval(tick, ONE_MIN_IN_MILLISECONDS)

    return () => clearInterval(id)
  }, [])
}

export const ONE_MIN_IN_MILLISECONDS = 60 * 1000

export const THIRTY_MIN_IN_SECONDS = 60 * 30

export const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60

export function currentDateInSeconds() {
  return Math.floor(Date.now() / 1000)
}

export function sessionExpirationDate() {
  return currentDateInSeconds() + THIRTY_MIN_IN_SECONDS
}

export function anonymousExpirationDate() {
  return currentDateInSeconds() + ONE_YEAR_IN_SECONDS
}

export function areIdentifierExpired(expiresIn: number, now: number) {
  return now - expiresIn > 0
}
