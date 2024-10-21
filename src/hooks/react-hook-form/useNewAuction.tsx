import { yupResolver } from '@hookform/resolvers/yup'
import { AuctionType } from 'models/auction'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface NewAuctionFields {
  title: string
  image?: string | null
  description: string
  starting_price: number
  end_date: string
}

export interface UpdateAuctionFields {
  title?: string
  image?: string | null
  description?: string
  starting_price?: number
  end_date?: string
}

interface Props {
  defaultValues?: AuctionType
}

export const useNewAuctionForm = ({ defaultValues }: Props) => {
  const NewAuctionSchema = Yup.object().shape({
    title: Yup.string().required('Please enter a title'),
    image: Yup.string().nullable().notRequired(),
    description: Yup.string().required('Please enter a description'),
    starting_price: Yup.number()
      .moreThan(0, 'Price must be greater than 0')
      .required('Please enter starting price'),
    end_date: Yup.string().required(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      image: null,
      description: '',
      starting_price: 0,
      end_date: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: yupResolver(NewAuctionSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type NewAuctionForm = ReturnType<typeof useNewAuctionForm>
