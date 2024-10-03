import { UserType } from './auth'
import { BidType } from './bid'

export type AuctionType = {
  id: string
  created_at: Date
  title: string
  image?: string
  description: string
  starting_price: string
  end_date: string
  is_active: boolean
  owner: UserType
  bids: BidType[]
}

export const calculateHoursLeft = (auction: AuctionType) => {
  const endDate = new Date(auction.end_date)
  const currentTime = new Date()
  const timeDifference = endDate.getTime() - currentTime.getTime()
  const remainingHours = Math.max(0, timeDifference / (1000 * 60 * 60))
  return Math.round(remainingHours)
}
