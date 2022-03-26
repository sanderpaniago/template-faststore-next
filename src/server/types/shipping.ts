export type ShippingVariable = {
  country: string
  items: Array<{
    id: string
    quantity: string
    seller: string
  }>
  postalCode: string
}
