import { User } from "src/types/user.type"

export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

export const clearLocal = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const getUser = () => {
  const res = localStorage.getItem('profile')

  return res ? JSON.parse(res) : null
}

export const setUser = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

