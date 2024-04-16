import { api } from '../axios.interceptors'
import { useQuery, useMutation, useQueryClient } from 'vue-query'

export async function fetchProducts(container_id) {
  console.log('fetchProducts', container_id)
  return await api.get(`/api/all-products/${container_id}`)
}

export const useProducts = (containerId) => {
  const { data } = useQuery(['products', containerId], () => fetchProducts(containerId))
  return data
}

const addProduct = async (product) => {
  return await api.post('/api/new-product', product)
}

const editProduct = async (product) => {
  return await api.patch(`/api/edit-product/${product.id}`, product)
}

const deleteProduct = async (productId) => {
  return await api.delete(`/api/delete-product/${productId}`)
}

export const useAddProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
}

export const useEditProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
}
