import { AuctionType } from './auction'
import { UserType } from './auth'

export type NotificationType = {
  id: string
  created_at: string
  recipient: UserType
  message: string
  auction: AuctionType
  is_read: boolean
}
