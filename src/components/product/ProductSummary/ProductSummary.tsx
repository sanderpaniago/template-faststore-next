import { Card, CardActions, CardContent, CardImage, Price } from '@faststore/ui'
import { gql } from '@vtex/graphql-utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import Button from 'src/components/ui/Button'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import CartIcon from 'src/components/ui/Icons/Cart'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  className?: string
}

function ProductSummary({ product, index, className }: Props) {
  const {
    id,
    sku,
    gtin: referenceId,
    name: variantName,
    brand: { name: brandName },
    isVariantOf: { name, productGroupID: productId },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const { listPrice, seller } = useMemo(() => {
    const lowestPriceOffer = offers.find((x) => x.price === spotPrice)

    if (!lowestPriceOffer) {
      console.error(
        'Could not find the lowest price product offer. Showing the first offer provided.'
      )

      return offers[0]
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const linkProps = useProductLink({ product, index })
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price: spotPrice,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      name: variantName,
      image: [img],
      sku,
    },
  })

  return (
    <Card className="p-4 max-w-[290px] shadow-md hover:shadow-lg">
      <Link href={linkProps.href}>
        <a className={className} {...linkProps}>
          <CardImage>
            <Image
              className="w-full object-cover"
              width={258}
              height={258}
              src={img.url}
              alt={img.alternateName}
            />
          </CardImage>
          <CardContent>
            <div className="overflow-hidden whitespace-nowrap text-clip">
              {name}
            </div>

            <div className="flex items-center justify-start gap-2">
              <Price
                formatter={useFormattedPrice}
                value={listPrice}
                variant="listing"
                data-testid="list-price"
                data-value={listPrice}
              />

              <Price
                formatter={useFormattedPrice}
                value={spotPrice}
                variant="spot"
                data-testid="price"
                data-value={spotPrice}
              />
            </div>

            <div className="my-2">
              <DiscountBadge listPrice={listPrice} spotPrice={spotPrice} />
            </div>
          </CardContent>
        </a>
      </Link>
      <CardActions className="mt-4">
        <Button
          {...buyProps}
          className="bg-secondary-700 text-white flex gap-1 text-base font-bold rounded"
        >
          <CartIcon className="fill-white p-1" /> Add
        </Button>
      </CardActions>
    </Card>
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

export default ProductSummary
