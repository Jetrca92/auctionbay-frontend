import { UserType } from './auth'
import { BidType } from './bid'

export type AuctionType = {
  id: string
  title: string
  image?: string
  description: string
  starting_price: string
  auction_duration_hrs: string
  is_active: boolean
  owner: UserType
  bids: BidType[]
}
