import { useQuery, useMutation, useQueryClient } from 'vue-query'
import { api } from '../axios.interceptors'

export async function fetchContainers() {
  return await api.get(`/api/all-containers`)
}

export const useContainers = () => {
  const { data } = useQuery('containers', fetchContainers)
  return data
}

const addContainer = async (container) => {
  return await api.post('/api/new-container', container)
}

const deleteContainer = async (containerId) => {
  return await api.delete(`/api/delete-container/${containerId}`)
}

export const useAddContainerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(addContainer, {
    onSuccess: () => {
      queryClient.invalidateQueries('containers')
    }
  })
}

export const useDeleteContainerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteContainer, {
    onSuccess: () => {
      queryClient.invalidateQueries('containers')
    }
  })
}
