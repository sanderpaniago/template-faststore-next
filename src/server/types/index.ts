export type ExecuteOptions<VariablesType> = {
  operationName: string
  variables: VariablesType
  query?: string
}

export type OptionsVTEX = {
  platform: 'vtex'
  account: string
  environment: 'vtexcommercestable' | 'vtexcommercebeta'
  // Default sales channel to use for fetching products
  channel: string
}
