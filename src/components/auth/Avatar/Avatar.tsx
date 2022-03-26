import Link from 'next/link'
import React from 'react'

import PersonIcon from 'src/components/ui/Icons/Person'

function Avatar() {
  return (
    <>
      <Link href="/login">
        <a className="flex items-center gap-1 p-3 cursor-pointer text-decoration-none">
          <PersonIcon className="fill-secondary-700 w-6 h-6" />
          Sign In
        </a>
      </Link>
    </>
  )
}

export default Avatar
