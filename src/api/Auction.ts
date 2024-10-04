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
      headers,
    },
  )
  return response.data
}

export const updateAuction = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `${apiRoutes.AUCTION_PREFIX}/${id}`,
    data,
  )

export const deleteAuction = async (id: string, token: string) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<string, void>(
    'delete',
    `${apiRoutes.AUCTION_PREFIX}/${id}`,
    undefined,
    {
      headers,
    },
  )
  return response.data
}

export const fetchAuctions = async () =>
  apiRequest<undefined, AuctionType[]>('get', apiRoutes.FETCH_AUCTIONS)

export const fetchUserAuctions = async (token: string) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<void, AuctionType[]>(
    'get',
    apiRoutes.FETCH_USER_AUCTIONS,
    undefined,
    {
      headers: headers,
    },
  )
  return response
}

export const bidAuction = async (formData: FormData) =>
  apiRequest<FormData, void>('post', apiRoutes.BID_AUCTION)
