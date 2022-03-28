import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Container } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import { gql } from '@vtex/graphql-utils'

import type {
  HomePageQueryQuery,
  HomePageQueryQueryVariables,
} from '@generated/graphql'
import { SliderLayout } from 'src/components/common/SliderLayout'
import { useSiteUrl } from 'src/sdk/useSiteUrl'
import { execute } from 'src/server'
import { ProductShelf } from 'src/components/Product/Shelf'
import { BannerText } from 'src/components/common/BannerText'

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

function Page({ allProducts }: HomePageQueryQuery) {
  const siteUrl = useSiteUrl()

  const products = allProducts.edges.map((item) => item.node)

  return (
    <>
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

        <ProductShelf products={products} title="Nossos produtos" />
      </Container>
      <BannerText
        title="Receive our news and promotions in advance."
        caption="Enjoy and get 10% off on your first purchase."
        actionPath="/"
        actionLabel="Call to action"
      />
    </>
  )
}

export default Page

export const querySSG = gql`
  query HomePageQuery {
    allProducts(first: 10, after: "") {
      edges {
        node {
          ...ProductSummary_product
        }
      }
    }
  }
`

export const getStaticProps: GetStaticProps<HomePageQueryQuery> = async () => {
  const response = await execute<
    HomePageQueryQuery,
    HomePageQueryQueryVariables
  >({
    operationName: querySSG,
    variables: {},
  })

  if (response.errors != null || response.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: response.data,
  }
}
