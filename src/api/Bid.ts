import { AxiosHeaders, AxiosRequestHeaders } from 'axios'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import { NewBidFields } from 'hooks/react-hook-form/useCreateNewBid'
import { BidType } from 'models/bid'

export const uploadBid = async (
  data: NewBidFields,
  id: string,
  token: string,
) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<NewBidFields, BidType>(
    'post',
    `${apiRoutes.BID_AUCTION_PREFIX}/${id}/bid`,
    data,
    {
      headers,
    },
  )
  return response.data
}
