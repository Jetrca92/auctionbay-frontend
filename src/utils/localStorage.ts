import { UserType } from 'models/auth'

const user_prefix = 'user'
const token_prefix = 'token'

const userStorage = {
  getUser: (): UserType => {
    if (typeof window === 'undefined') return {} as UserType
    return JSON.parse(
      window.localStorage.getItem(`${user_prefix}`) as string,
    ) as UserType
  },
  setUser: (user: UserType): void => {
    window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user))
  },
  clearUser: (): void => {
    window.localStorage.removeItem(`${user_prefix}`)
  },
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(`${token_prefix}`)
  },
  setToken: (token: string): void => {
    window.localStorage.setItem(`${token_prefix}`, token)
  },
  clearToken: (): void => {
    window.localStorage.removeItem(`${token_prefix}`)
  },
}

export { userStorage }
