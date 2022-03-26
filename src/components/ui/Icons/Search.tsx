import { Icon } from '@faststore/ui'
import React from 'react'
import type { SVGProps } from 'react'

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon
      component={
        <svg
          {...props}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.75 10.975C3.75 7.03998 6.93997 3.85001 10.875 3.85001C14.81 3.85001 18 7.03998 18 10.975C18 14.91 14.81 18.1 10.875 18.1C6.93997 18.1 3.75 14.91 3.75 10.975ZM10.875 2.35001C6.11154 2.35001 2.25 6.21155 2.25 10.975C2.25 15.7385 6.11154 19.6 10.875 19.6C12.9866 19.6 14.921 18.8412 16.4203 17.5814L20.4693 21.6304C20.7622 21.9233 21.2371 21.9233 21.53 21.6304C21.8229 21.3375 21.8229 20.8627 21.53 20.5698L17.481 16.5207C18.741 15.0214 19.5 13.0868 19.5 10.975C19.5 6.21155 15.6385 2.35001 10.875 2.35001Z"
          />
        </svg>
      }
    />
  )
}

export default SearchIcon
