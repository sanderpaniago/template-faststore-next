import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  Hero as UIHero,
  HeroContent as UIHeroContent,
  HeroImage as UIHeroImage,
  HeroLink as UIHeroLink,
} from 'src/components/ui/Hero'
import ArrowRightIcon from 'src/components/ui/Icons/ArrowRight'

interface HeroProps {
  title: string
  subtitle: string
  linkText: string
  link: string
  imageSrc: string
  imageAlt: string
}

const Hero = ({
  title,
  subtitle,
  linkText,
  link,
  imageAlt,
  imageSrc,
}: HeroProps) => {
  return (
    <UIHero className="flex flex-col-reverse bg-secondary-700 sm:flex-row gap sm:items-center ">
      <UIHeroContent
        aria-labelledby="hero-heading"
        className="mx-8 py-6 text-white sm:my-14"
      >
        <div>
          <h1 id="hero-heading" className="text-3xl sm:text-6xl">
            {title}
          </h1>
          <p className="text-base mt-2 sm:text-xl sm:mt-4">{subtitle}</p>
        </div>
        <UIHeroLink className="bg-white max-w-fit py-4 mt-6 rounded-md backdrop-blur-sm sm:mt-8 sm:mb-0">
          <Link href={link}>
            <a>
              <span className="px-6 text-base flex nowrap text-secondary-700">
                {linkText}
                <ArrowRightIcon className="fill-secondary-700 ml-9" />
              </span>
            </a>
          </Link>
        </UIHeroLink>
      </UIHeroContent>
      <UIHeroImage className="relative aspect-[881/504] w-full sm:h-full">
        <Image
          layout="fill"
          className="object-cover"
          src={imageSrc}
          alt={imageAlt}
        />
      </UIHeroImage>
    </UIHero>
  )
}

export default Hero
