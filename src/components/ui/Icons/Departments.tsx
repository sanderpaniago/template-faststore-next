import { Icon } from '@faststore/ui'
import type { SVGProps } from 'react'

function DepartmentsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon
      component={
        <svg
          {...props}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.375 0.375H4.875V4.875H0.375V0.375ZM7.125 0.375H11.625V4.875H7.125V0.375ZM4.875 7.125H0.375V11.625H4.875V7.125ZM7.125 7.125H11.625V11.625H7.125V7.125Z"
          />
        </svg>
      }
    />
  )
}

export default DepartmentsIcon
