import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ChangePasswordFormFields {
  current_password?: string
  password: string
  confirm_password?: string
}

export const useChangePasswordForm = () => {
  const ChangePasswordSchema = Yup.object().shape({
    current_password: Yup.string().required('Please enter a valid password'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      )
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match.')
      .required('Passwords do not match.'),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      current_password: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(ChangePasswordSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type ChangePasswordForm = ReturnType<typeof useChangePasswordForm>
