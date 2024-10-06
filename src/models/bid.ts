import { userStorage } from 'utils/localStorage'
import { AuctionType } from './auction'
import { UserType } from './auth'

export type BidType = {
  id: string
  created_at: string
  owner: UserType
  amount: number
  auction: AuctionType
}

export const isBidderOwner = (auction: AuctionType) => {
  if (auction.owner.id === userStorage.getUser().id) return true
  return false
}
