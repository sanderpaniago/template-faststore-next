import { Button } from '@faststore/ui'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

import Avatar from 'src/components/auth/Avatar'
import CartToggle from 'src/components/cart/CartToggle'
import DepartmentsIcon from 'src/components/ui/Icons/Departments'
import HamburgerIcon from 'src/components/ui/Icons/Hamburger'
import SearchIcon from 'src/components/ui/Icons/Search'
import Logo from 'src/components/ui/Logo'

import SearchInput from '../SearchInput'

function Mobile() {
  const [displaySearchInput, setDisplaySearchInput] = useState(false)
  const toggleSearchInput = useCallback(
    () => setDisplaySearchInput(!displaySearchInput),
    [displaySearchInput]
  )

  return (
    <>
      <div className="flex justify-between items-center sm:hidden">
        <div className="flex items-center justify-start">
          <Button aria-label="menu">
            <HamburgerIcon className="fill-secondary-700" />
          </Button>
          <Button aria-label="search">
            <SearchIcon
              className="fill-secondary-700"
              onClick={toggleSearchInput}
            />
          </Button>
        </div>
        <Logo />
        <CartToggle />
      </div>
      {displaySearchInput && <SearchInput onSubmit={toggleSearchInput} />}
    </>
  )
}

const links = [
  {
    name: 'Office',
    href: '/office',
  },
  {
    name: 'Appliances',
    href: '/kitchen-and-home-appliances/appliances',
  },
  {
    name: 'Gadgets',
    href: '/computer-and-software/gadgets',
  },
  {
    name: 'Accessories',
    href: '/apparel-and-accessories/accessories',
  },
]

function Desktop() {
  return (
    <>
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <Logo />
        <div className="flex-grow max-w-prose">
          <SearchInput />
        </div>
        <div className="flex">
          <Avatar />
          <CartToggle />
        </div>
      </div>
      <div className="hidden sm:flex sm:items-center sm:justify-start gap-4 my-5">
        <div className="flex items-center gap-2 text-secondary-600 font-bold">
          <DepartmentsIcon className="fill-secondary-600" />
          Departments
        </div>

        <div className="h-[24px] mx-5 border-r border-solid border-r-gray-300 " />

        <div className="flex gap-6">
          {links.map(({ name, href }) => (
            <Link key={href} href={href}>
              <a className="text-secondary-600">{name}</a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function Navbar() {
  return (
    <header className="mx-4 my-3 sm:mx-24">
      <Mobile />
      <Desktop />
    </header>
  )
}

export default Navbar
