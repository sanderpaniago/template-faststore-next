import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Container } from '@chakra-ui/react'

import { SliderLayout } from 'src/components/common/SliderLayout'
import { useSiteUrl } from 'src/sdk/useSiteUrl'

import storeConfig from '../../store.config'

const {
  site: { title },
} = storeConfig

const sliders = [
  {
    image: 'https://source.unsplash.com/1600x900/?moda',
  },
  {
    image: 'https://source.unsplash.com/1600x900/?moda',
  },
  {
    image: 'https://source.unsplash.com/1600x900/?moda',
  },
]

function Page() {
  const siteUrl = useSiteUrl()

  return (
    <Container maxW={1240}>
      {/* SEO */}
      <NextSeo title={title} canonical={siteUrl} />

      <SliderLayout slidesPerView={1} spaceBetween={0} navigation>
        {sliders.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            alt="modelo estilosa"
            width={1240}
            height={600}
          />
        ))}
      </SliderLayout>
    </Container>
  )
}

export default Page
