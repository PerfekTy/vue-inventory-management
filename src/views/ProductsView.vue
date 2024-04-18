<script setup>
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useDeleteProductMutation, useProducts } from '../lib/data/product'
import { useDeleteContainerMutation, useContainers } from '../lib/data/container'
import { ref, watchEffect } from 'vue'
import { Ellipsis, RefreshCcw, X } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import CreateContainerModal from '../components/CreateContainerModal.vue'
import ContainerDropdown from '@/components/ContainerDropdown.vue'
import CreateProductModal from '@/components/CreateProductModal.vue'
import Button from '@/components/ui/button/Button.vue'
import EditProductModal from '@/components/EditProductModal.vue'
import { getCurrentUser } from '@/lib/data/user'
import { useQuery } from 'vue-query'

const router = useRouter()
const toast = useToast()

useQuery('current-user', getCurrentUser)

const user = ref(null)
const containerId = ref(router.currentRoute.value.query?.containerId)
const containers = ref(useContainers())
const containerDescription = ref(null)
const products = ref(useProducts(containerId.value))
const sortedProducts = ref(null)
const sortColumn = ref(null)
const sortDirection = ref('asc')

const sortProducts = (columnName) => {
  if (sortColumn.value === columnName) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = columnName
    sortDirection.value = 'asc'
  }

  sortedProducts.value = [...products.value.data]
  sortedProducts.value.sort((a, b) => {
    const aValue = a[columnName]
    const bValue = b[columnName]

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

const { mutate: deleteProductMutation } = useDeleteProductMutation()
const { mutate: deleteContainerMutation } = useDeleteContainerMutation()

const deleteProduct = (id) => {
  deleteProductMutation(id)
  toast.success('Product deleted.')
}

const deleteContainer = (id) => {
  const decision = confirm('Are you sure you want to delete this container?')
  if (decision) {
    deleteContainerMutation(id)
    toast.success('Container deleted.')
  }
}

const refreshProducts = () => {
  window.location.reload()
}

watchEffect(async () => {
  containerId.value = router.currentRoute.value.query?.containerId
  products.value = containerDescription.value = containers.value?.data
    .map((item) => item)
    .filter((container) => container.id === parseInt(containerId.value))[0]?.description
  const data = await getCurrentUser()
  user.value = data
})
</script>

<template>
  <div class="flex items-center justify-between gap-5 container mb-5">
    <div class="flex items-center gap-5">
      <ContainerDropdown />
      <Button size="icon" @click="refreshProducts">
        <RefreshCcw size="20" />
      </Button>
    </div>
    <div class="flex items-center gap-5" v-if="user?.role === 'admin'">
      <CreateProductModal />
      <CreateContainerModal />
      <Button variant="destructive" size="icon" @click="deleteContainer(containerId)">
        <X />
      </Button>
    </div>
  </div>
  <Table class="container p-5">
    <TableCaption>{{ containerDescription }}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead
          class="cursor-pointer hover:text-primary select-none"
          @click="sortProducts('name')"
          :class="{ 'text-primary': sortColumn === 'name' }"
        >
          Name
          <template v-if="sortColumn === 'name'">
            <span v-if="sortDirection === 'asc'">&#9650;</span>
            <span v-else-if="sortDirection === 'desc'">&#9660;</span>
          </template>
        </TableHead>
        <TableHead
          class="cursor-pointer hover:text-primary select-none"
          @click="sortProducts('amount')"
          :class="{ 'text-primary': sortColumn === 'amount' }"
        >
          Amount
          <template v-if="sortColumn === 'amount'">
            <span v-if="sortDirection === 'asc'">&#9650;</span>
            <span v-else-if="sortDirection === 'desc'">&#9660;</span>
          </template>
        </TableHead>
        <TableHead
          class="cursor-pointer hover:text-primary select-none"
          @click="sortProducts('expire_date')"
          :class="{ 'text-primary': sortColumn === 'expire_date' }"
        >
          Expire Date
          <template v-if="sortColumn === 'expire_date'">
            <span v-if="sortDirection === 'asc'">&#9650;</span>
            <span v-else-if="sortDirection === 'desc'">&#9660;</span>
          </template>
        </TableHead>
        <TableHead
          class="cursor-pointer hover:text-primary text-center select-none"
          @click="sortProducts('added_by')"
          :class="{ 'text-primary': sortColumn === 'added_by' }"
        >
          Added By
          <template v-if="sortColumn === 'added_by'">
            <span v-if="sortDirection === 'asc'">&#9650;</span>
            <span v-else-if="sortDirection === 'desc'">&#9660;</span>
          </template>
        </TableHead>

        <TableHead v-if="user?.role === 'admin'" class="text-center">Options</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="product in sortedProducts ?? products?.data" :key="product.id">
        <TableCell>{{ product.name }}</TableCell>
        <TableCell>{{ product.amount }}</TableCell>
        <TableCell class="flex items-center gap-1 w-[100px] pt-3.5"
          >{{ format(new Date(product.expire_date), 'dd.MM.yyyy') }},
          <p>{{ format(new Date(product.expire_date), 'cccc') }}</p>
        </TableCell>
        <TableCell class="text-center">{{ product.added_by }}</TableCell>
        <TableCell class="text-center">
          <DropdownMenu v-if="user?.role === 'admin'">
            <DropdownMenuTrigger as-child>
              <Button size="sm" variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ product.name }} options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem as-child>
                <EditProductModal :product="product" />
              </DropdownMenuItem>
              <DropdownMenuItem @click="deleteProduct(product.id)">
                <X size="17" class="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
