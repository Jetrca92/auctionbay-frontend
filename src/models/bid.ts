import { userStorage } from 'utils/localStorage'
import { AuctionType, getHighestBidder } from './auction'
import { UserType } from './auth'

export type BidType = {
  id: string
  created_at: string
  owner: UserType
  amount: number
  auction: AuctionType
}

export const isBidderOwner = (auction: AuctionType) => {
  return auction.owner.id === userStorage.getUser().id
}

export const isUserWinning = (auction: AuctionType) => {
  const user = userStorage.getUser()
  const highestBidder = getHighestBidder(auction)
  return highestBidder ? highestBidder.id === user.id : false
}

export const hasUserWon = (auction: AuctionType) => {
  if (auction.is_active) return false
  const user = userStorage.getUser()
  const highestBidder = getHighestBidder(auction)
  if (!highestBidder) return false
  return highestBidder.id === user.id
}
