import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import cookies from 'vue-cookies'
import axios from 'axios'
import * as jwt from 'jose'
import { api } from './axios.interceptors'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const serverString = 'http://localhost:8080'

export function getToken() {
  const token = cookies.get('token')
  if (!token) {
    return null
  }

  return token
}

export async function getCurrentUser() {
  const token = cookies.get('token')
  const { data } = await api.get(`/api/current-user`)

  if (jwt.decodeJwt(token).exp === 0) {
    cookies.remove('token')
  }

  startTokenRefresh()

  return data
}

async function startTokenRefresh() {
  const token = cookies.get('token')
  if (!token) {
    return
  }

  const currentTime = Math.floor(Date.now() / 1000)
  const expirationTime = jwt.decodeJwt(token).exp

  if (expirationTime - currentTime < 60) {
    const newToken = await getNewRefreshedToken()
    cookies.set('token', newToken.token)
  }
}

async function getNewRefreshedToken() {
  const refreshToken = cookies.get('refreshToken')
  if (!refreshToken) {
    return
  }

  const { data } = await axios.post(
    `${serverString}/api/refresh-token`,
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  )

  return data
}
