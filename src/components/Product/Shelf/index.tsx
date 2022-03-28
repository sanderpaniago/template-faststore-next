import { Box, Text, useBreakpointValue } from '@chakra-ui/react'

import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { SliderLayout } from 'src/components/common/SliderLayout'

import { ProductSummary } from '../Summary'

type ProductShelfProps = {
  products: ProductSummary_ProductFragment[]
  title: string | JSX.Element
}
export function ProductShelf({ products, title }: ProductShelfProps) {
  const slidesPerView = useBreakpointValue({ base: 2, md: 4 })

  return (
    <Box my={6}>
      <Text as="h2" textAlign="center" fontWeight={500} fontSize="2xl" my={4}>
        {title}
      </Text>
      <Box>
        <SliderLayout
          slidesPerView={slidesPerView}
          spaceBetween={24}
          navigation
        >
          {products.map((product) => (
            <ProductSummary key={product.id} product={product} />
          ))}
        </SliderLayout>
      </Box>
    </Box>
  )
}
