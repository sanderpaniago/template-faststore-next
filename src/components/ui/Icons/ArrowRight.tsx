import { Icon } from '@faststore/ui'
import React from 'react'
import type { SVGProps } from 'react'

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon
      component={
        <svg
          {...props}
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5928 4.93842C14.2999 4.64553 13.8251 4.64553 13.5322 4.93842C13.2393 5.23131 13.2393 5.70619 13.5322 5.99908L19.2831 11.75H3.90625C3.49204 11.75 3.15625 12.0858 3.15625 12.5C3.15625 12.9142 3.49204 13.25 3.90625 13.25H19.2831L13.5322 19.0009C13.2393 19.2938 13.2393 19.7687 13.5322 20.0616C13.8251 20.3545 14.2999 20.3545 14.5928 20.0616L21.6241 13.0303C21.7705 12.8839 21.8438 12.6919 21.8438 12.5C21.8438 12.3983 21.8235 12.3013 21.7868 12.2129C21.7502 12.1245 21.696 12.0416 21.6241 11.9697L14.5928 4.93842Z"
          />
        </svg>
      }
    />
  )
}

export default ArrowRightIcon
