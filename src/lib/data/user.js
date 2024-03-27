import { startTokenRefresh } from './token'
import cookies from 'vue-cookies'
import { api } from '../axios.interceptors'

export async function getCurrentUser() {
  try {
    const { data } = await api.get(`/api/current-user`)

    return data
  } catch (error) {
    if (
      error.response.data.error === 'Token is not valid.' ||
      error.response.data.error === 'Session not found.'
    ) {
      cookies.remove('token')
    }
  }
}

setInterval(() => {
  const refreshToken = cookies.get('refreshToken')

  if (refreshToken) {
    startTokenRefresh()
    console.log('token refreshed')
  }
}, 300_000)
