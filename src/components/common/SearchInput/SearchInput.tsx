import { formatSearchState, initSearchState } from '@faststore/sdk'
import { SearchInput as UISearchInput } from '@faststore/ui'
import React, { useCallback } from 'react'
import type { SearchInputProps as UISearchInputProps } from '@faststore/ui'
import { useRouter } from 'next/router'

declare type SearchInputProps = Partial<UISearchInputProps>

const useDoSearch = (onSubmit?: UISearchInputProps['onSubmit']) => {
  const router = useRouter()

  return useCallback(
    (term: string) => {
      const { pathname, search } = formatSearchState(
        initSearchState({
          term,
          base: '/s',
        })
      )

      router.push(`${pathname}${search}`)
      onSubmit?.(term)
    },
    [onSubmit, router]
  )
}

function SearchInput(props: SearchInputProps) {
  const doSearch = useDoSearch(props.onSubmit)

  return (
    <UISearchInput
      {...props}
      placeholder="What are you looking for?"
      onSubmit={doSearch}
    />
  )
}

export default SearchInput
