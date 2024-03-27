import { startTokenRefresh } from './token'
import cookies from 'vue-cookies'
import { api } from '../axios.interceptors'

export async function getCurrentUser() {
  try {
    const refreshToken = cookies.get('refreshToken')
    const { data } = await api.get(`/api/current-user`)

    if (refreshToken) {
      startTokenRefresh()
    }

    return data
  } catch (error) {
    const refreshToken = cookies.get('refreshToken')
    if (
      (error.response.data.error === 'Token is not valid.' ||
        error.response.data.error === 'Session not found.') &&
      refreshToken
    ) {
      startTokenRefresh()
    }
  }
}
