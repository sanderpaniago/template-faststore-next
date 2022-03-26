import React from 'react'

import Button from 'src/components/ui/Button'
import CartIcon from 'src/components/ui/Icons/Cart'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartToggle() {
  const btnProps = useCartToggleButton()
  const { totalUniqueItems } = useCart()

  return (
    <Button {...btnProps}>
      <CartIcon className="fill-secondary-700" />
      <div className="bg-secondary-700 text-white px-1 rounded-3xl absolute top-3 right-4 text-sm sm:right-24">
        {totalUniqueItems}
      </div>
    </Button>
  )
}

export default CartToggle
