export type UserType = {
  id: string
  username: string
  email?: string
  auctions?: {
    id: string
    title: string
  }
  bids?: {
    id: string
  }
}
