import { startTokenRefresh } from './token'
import cookies from 'vue-cookies'
import { api } from '../axios.interceptors'
import { useMutation, useQueryClient } from 'vue-query'

export async function getCurrentUser() {
  try {
    const { data } = await api.get(`/api/get-user`)
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

export async function updateUserProfile(user) {
  const { userId } = user
  return await api.patch(`/api/edit-user/${userId}`, user)
}

export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('current-user')
    }
  })
}

setInterval(() => {
  const refreshToken = cookies.get('refreshToken')

  if (refreshToken) {
    startTokenRefresh()
    console.log('token refreshed')
  }
}, 300_000)
