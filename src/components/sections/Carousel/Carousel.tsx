import { Carousel as UICarousel } from '@faststore/ui'
import Image from 'next/image'
import React from 'react'

interface Item {
  alt: string
  src: string
}

interface Props {
  allItems: Item[]
}

function Carousel({ allItems }: Props) {
  return (
    <UICarousel>
      {allItems.map((item, index) => (
        <Image
          key={item.src}
          layout="fill"
          className="object-cover"
          alt={item.alt}
          src={item.src}
          priority={index === 0}
        />
      ))}
    </UICarousel>
  )
}

export default Carousel
