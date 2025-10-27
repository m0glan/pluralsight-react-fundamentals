export interface HouseSummary {
  id: number
  address: string
  country: string
  price?: number
}

export interface HouseDetail extends HouseSummary {
  description?: string
  photo?: string | null
}

export interface Bid {
  id: number
  bidder: string
  amount: number
}