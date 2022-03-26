import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import logo from '../../../../public/logo.png'

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src={logo} alt="Home link" />
      </a>
    </Link>
  )
}

export default Logo
