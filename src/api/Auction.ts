import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { AuctionType } from 'models/auction'
import { UpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'

export const uploadAuction = async (formData: FormData) =>
  apiRequest<FormData, void>('post', '/me/auction', formData)

export const updateAuction = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `/me/${apiRoutes.AUCTION_PREFIX}/${id}`,
    data,
  )

export const fetchAuctions = async () =>
  apiRequest<undefined, AuctionType[]>('get', '/auctions')

export const bidAuction = async (formData: FormData) =>
  apiRequest<FormData, void>('post', apiRoutes.BID_AUCTION)
