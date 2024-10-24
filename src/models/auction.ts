import { UserType } from './auth'
import { BidType } from './bid'

export type AuctionType = {
  id: string
  created_at: Date
  title: string
  image?: string
  description: string
  starting_price: number
  end_date: string
  is_active: boolean
  owner: UserType
  bids: BidType[]
}

export const calculateHoursLeft = (auction: AuctionType) => {
  const endDate = new Date(auction.end_date)
  const currentDate = new Date()

  const createdAtTime = new Date(auction.created_at)
  const hours = createdAtTime.getHours()
  const minutes = createdAtTime.getMinutes()
  const seconds = createdAtTime.getSeconds()
  endDate.setHours(hours, minutes, seconds)

  const timeDifference = endDate.getTime() - currentDate.getTime()
  const remainingHours = Math.max(0, timeDifference / (1000 * 60 * 60))
  return Math.round(remainingHours)
}

export const getMinBidAmount = (auction: AuctionType) => {
  if (auction.bids.length === 0) return auction.starting_price
  const highestBid = auction.bids.reduce((maxBid, currentBid) => {
    return Number(currentBid.amount) > Number(maxBid.amount)
      ? currentBid
      : maxBid
  })
  return Number(highestBid.amount) + 1
}

export const getHighestBidder = (auction: AuctionType) => {
  if (auction.bids.length === 0) return null
  const highestBid = auction.bids.reduce((maxBid, currentBid) => {
    return Number(currentBid.amount) > Number(maxBid.amount)
      ? currentBid
      : maxBid
  })
  return highestBid.owner
}

export const isUserBidding = (auction: AuctionType, user: UserType) => {
  if (auction.owner.id === user.id) return false
  if (auction.bids.length === 0) return false
  return auction.bids.some((bid) => bid.owner.id === user.id)
}

export const totalAuctionsPosted = (
  auctions: AuctionType[],
  user: UserType,
) => {
  const userAuctions: AuctionType[] = []
  if (auctions.length > 0) {
    auctions.forEach((auction: AuctionType) => {
      if (auction.owner.id === user.id) {
        userAuctions.push(auction)
      }
    })
  }
  return userAuctions.length
}

export const calculateTotalEarnings = (
  auctions: AuctionType[],
  user: UserType,
) => {
  if (auctions.length === 0) return 0
  let total = 0
  auctions.forEach((auction: AuctionType) => {
    if (!auction.is_active && auction.owner.id === user.id) {
      const minBidAmount = getMinBidAmount(auction)
      if (auction.starting_price !== minBidAmount - 1) {
        total += minBidAmount - 1
      }
    }
  })
  return total
}
