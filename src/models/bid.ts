import { AuctionType } from './auction'
import { UserType } from './auth'

export type BidType = {
  id: string
  owner: UserType
  amount: number
  auction: AuctionType
}
