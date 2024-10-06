export type UserType = {
  id: string
  first_name?: string
  last_name?: string
  email: string
  token?: string
  auctions?: {
    id: string
    title: string
  }
  bids?: {
    id: string
  }
}
