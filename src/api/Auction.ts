import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { AuctionType } from 'models/auction'
import { UpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'
import { NewAuctionFields } from 'hooks/react-hook-form/useNewAuction'

export const uploadAuction = async (data: NewAuctionFields) =>
  apiRequest<NewAuctionFields, void>('post', '/me/auction', data)

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
