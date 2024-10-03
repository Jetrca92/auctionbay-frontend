import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'
import { AxiosHeaders, AxiosRequestHeaders } from 'axios'

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, void>('post', apiRoutes.LOGIN, data)

export const signup = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const fetchUser = async (token: string) => {
  const headers: AxiosRequestHeaders = AxiosHeaders.from({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })
  const response = await apiRequest<void, UserType>(
    'get',
    apiRoutes.FETCH_USER,
    undefined,
    {
      headers: headers,
    },
  )
  return response.data // Adjust based on the expected response format
}

export const updatePassword = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>('patch', '/me/update-password', data)
