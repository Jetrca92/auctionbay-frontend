import { yupResolver } from '@hookform/resolvers/yup'
import { AuctionType, getMinBidAmount } from 'models/auction'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface NewBidFields {
  amount: number
}

interface Props {
  auction: AuctionType
}

export const useCreateNewBid = ({ auction }: Props) => {
  const minBidAmount = getMinBidAmount(auction)

  const NewBidSchema = Yup.object().shape({
    amount: Yup.number()
      .min(minBidAmount, `Price must be greater than ${minBidAmount}`)
      .required('Please enter bid amount'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<NewBidFields>({
    defaultValues: {
      amount: minBidAmount,
    },
    mode: 'onSubmit',
    resolver: yupResolver(NewBidSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type NewBidForm = ReturnType<typeof useCreateNewBid>
