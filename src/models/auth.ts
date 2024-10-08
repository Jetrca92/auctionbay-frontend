import * as API from 'api/Api'
import { userStorage } from 'utils/localStorage'

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

export const getPostedAuctions = async () => {
  const token = userStorage.getToken()
  if (!token) return 0
  try {
    const response = await API.fetchUserAuctions(token)
    return response?.data.length || 0
  } catch (error) {
    console.error('Error fetching auctions:', error)
    return 0
  }
}
