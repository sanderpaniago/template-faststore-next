export type IGetRatingVariables = {
  sort: string
  direction: string
  page: number
  nb: number
  site: string
  locales: string
  keep_locales_order: string
  productCode: number
}

export type INoteApi = {
  [key: number]: {
    count: number
    count_recommended: number
  }
}

export type IReview = {
  author: { id: number; firstname: string }
  author_type: string[]
  body: string
  count_up_vote: number
  count_vote: number
  country: string
  country_label: { [key: string]: string }
  created_at: string
  firstname: string
  gender: { [key: string]: string }
  id: string
  is_regional_prestation: boolean
  language: string
  negative: string
  note: number
  offer: string
  positive: string
  published_at: string
  purchase_checked: boolean
  range_age: { [key: number]: string }
  range_used_since: { [key: number]: string }
  recommended: boolean
  tester_review: boolean
  title: string
}

export type IGetTranslatedVariables = {
  reviewId: string
}

export type IPostReviewVariables = {
  reviewId: string
  vote: 0 | 1
}
