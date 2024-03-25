import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import cookies from 'vue-cookies'
import axios from 'axios'

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
  const { data } = await axios.get(`${serverString}/api/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export function deleteToken() {
  return cookies.remove('token')
}
