import { AxiosHeaders, AxiosRequestHeaders } from 'axios'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import { NewBidFields } from 'hooks/react-hook-form/useCreateNewBid'

export const uploadBid = async (
  data: NewBidFields,
  auctionId: string,
  token: string,
) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<NewBidFields, void>(
    'post',
    apiRoutes.BID_AUCTION,
    data,
    {
      headers,
    },
  )
  return response.data
}
