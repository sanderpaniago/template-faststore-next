import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gql } from '@vtex/graphql-utils'

import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

type ProductSummaryProps = {
  product: ProductSummary_ProductFragment
}

export function ProductSummary({ product }: ProductSummaryProps) {
  const price = useFormattedPrice(product.offers.offers[0].price)

  const listPrice = useFormattedPrice(product.offers.offers[0].listPrice)

  const discountPercent = useDiscountPercent(
    product.offers.offers[0].listPrice,
    product.offers.lowPrice
  )

  return (
    <Box as={Link} href={`/${product.slug}/p`}>
      <Box
        as="a"
        d="block"
        cursor="pointer"
        borderColor="gray.200"
        borderWidth={1}
        borderRadius={5}
        padding={2}
      >
        <Image
          src={product.image[0].url}
          alt={product.image[0].alternateName}
          height={300}
          width={300}
          layout="responsive"
          objectFit="cover"
          style={{
            borderRadius: '5px',
          }}
        />
        <Text as="p" mt="2">
          {product.isVariantOf.name}
        </Text>
        <Flex justify="space-between" align="center" my={1}>
          <Text color="gray.300" textDecor="line-through" fontSize={12}>
            {listPrice}
          </Text>
          <Text
            as="span"
            fontSize={12}
            px="10px"
            borderRadius={15}
            background="green.200"
          >
            {discountPercent}%
          </Text>
        </Flex>
        <Text>{price}</Text>
      </Box>
    </Box>
  )
}

export const fragment = gql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    brand {
      brandName: name
    }
    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
  }
`
