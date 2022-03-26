import { Icon } from '@faststore/ui'
import type { SVGProps } from 'react'

function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon
      component={
        <svg
          {...props}
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.25 8.10001C4.25 7.68579 4.58579 7.35001 5 7.35001H27C27.4142 7.35001 27.75 7.68579 27.75 8.10001C27.75 8.51422 27.4142 8.85001 27 8.85001H5C4.58579 8.85001 4.25 8.51422 4.25 8.10001ZM4.25 16.1C4.25 15.6858 4.58579 15.35 5 15.35H27C27.4142 15.35 27.75 15.6858 27.75 16.1C27.75 16.5142 27.4142 16.85 27 16.85H5C4.58579 16.85 4.25 16.5142 4.25 16.1ZM5 23.35C4.58579 23.35 4.25 23.6858 4.25 24.1C4.25 24.5142 4.58579 24.85 5 24.85H27C27.4142 24.85 27.75 24.5142 27.75 24.1C27.75 23.6858 27.4142 23.35 27 23.35H5Z"
          />
        </svg>
      }
    />
  )
}

export default HamburgerIcon
