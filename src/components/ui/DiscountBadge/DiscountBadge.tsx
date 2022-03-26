import { Badge } from '@faststore/ui'
import React from 'react'

import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

type Props = {
  listPrice: number
  spotPrice: number
}

const DiscountBadge = ({ listPrice, spotPrice }: Props) => {
  const discountPercent = useDiscountPercent(listPrice, spotPrice)

  if (!Number(discountPercent)) {
    return <></>
  }

  return (
    <Badge className="bg-green-100 rounded-full text-center max-w-fit p-2 text-xs font-bold">
      {discountPercent}% OFF
    </Badge>
  )
}

export default DiscountBadge
