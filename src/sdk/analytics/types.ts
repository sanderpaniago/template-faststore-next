import type { Item } from '@faststore/sdk'

type AdditionalItemProperties = {
  product_reference_id: string | null
  item_variant_name: string | null
}

export type AnalyticsItem = Item & AdditionalItemProperties

export type SearchEvent = SearchPageView | SearchAutocomplete

export interface SearchPageView {
  name: 'search_page_view'
  params: {
    /**
     * Term being searched
     */
    term: string
    /**
     * Amount of results returned by the search.
     */
    results: number
    /**
     * Indicates how two or more filters should be combined
     */
    operator: 'and' | 'or'
    /**
     * Set of properties used to correct user input
     */
    correction?: {
      /**
       * Indicates if user misspelled term
       */
      misspelled: boolean
    }
  }
}

export interface SearchAutocomplete {
  name: 'search_autocomplete'
  params: {
    /**
     * Term being searched
     */
    term: string
    /**
     * Amount of results returned by the search.
     */
    results: number
    /**
     * Indicates how two or more filters should be combined
     */
    operator: 'and' | 'or'
    /**
     * Set of properties used to correct user input
     */
    correction?: {
      /**
       * Indicates if user misspelled term
       */
      misspelled: boolean
    }
  }
}
