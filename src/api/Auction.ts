import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { AuctionType } from 'models/auction'
import { UpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'
import { NewAuctionFields } from 'hooks/react-hook-form/useNewAuction'
import { AxiosHeaders, AxiosRequestHeaders } from 'axios'

export const uploadAuction = async (data: NewAuctionFields, token: string) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<NewAuctionFields, void>(
    'post',
    apiRoutes.UPLOAD_AUCTION,
    data,
    {
      headers: headers,
    },
  )
  return response.data
}

export const updateAuction = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `/me/${apiRoutes.AUCTION_PREFIX}/${id}`,
    data,
  )

export const fetchAuctions = async () =>
  apiRequest<undefined, AuctionType[]>('get', apiRoutes.FETCH_AUCTIONS)

export const bidAuction = async (formData: FormData) =>
  apiRequest<FormData, void>('post', apiRoutes.BID_AUCTION)
