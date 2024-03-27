<script setup>
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { getProducts } from '../lib/data/product'
import { ref, watchEffect } from 'vue'
import { Ellipsis, NotebookPen, X } from 'lucide-vue-next'
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
import { getContainers } from '@/lib/data/container'
import { api } from '@/lib/axios.interceptors'

const router = useRouter()
const products = ref(null)
const containerId = ref(null)
const containerDescription = ref(null)
const toast = useToast()

const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/api/delete-product/${id}`)
    toast.success(data.message)
  } catch (error) {
    console.log(error)
  }
}

const deleteContainer = async (id) => {
  try {
    const decision = confirm('Are you sure you want to delete this container?')
    if (decision) {
      const { data } = await api.delete(`/api/delete-container/${id}`)
      toast.success(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

watchEffect(async () => {
  containerId.value = router.currentRoute.value.query?.containerId
  const response = await getProducts(containerId.value)
  const containers = await getContainers()
  products.value = response
  containerDescription.value = containers.find((container) => {
    if (container.id === parseInt(containerId.value)) {
      return container.description
    }
  })
})
</script>

<template>
  <div class="flex items-center justify-between gap-5">
    <ContainerDropdown />
    <div class="flex items-center gap-5">
      <CreateProductModal />
      <CreateContainerModal />
      <Button variant="destructive" size="icon" @click="deleteContainer(containerId)">
        <X />
      </Button>
    </div>
  </div>
  <Table v-if="products">
    <TableCaption>{{ containerDescription.description }}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Expire Date</TableHead>
        <TableHead class="text-center">Added By</TableHead>
        <!-- ADMIN ONLY -->
        <TableHead class="text-center">Options</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="product in products" :key="product.id">
        <TableCell>{{ product.name }}</TableCell>
        <TableCell>{{ product.amount }}</TableCell>
        <TableCell class="flex items-center gap-1 w-[100px] pt-3.5"
          >{{ format(new Date(product.expire_date), 'dd.MM.yyyy') }},
          <p>{{ format(new Date(product.expire_date), 'cccc') }}</p>
        </TableCell>
        <TableCell class="text-center">{{ product.added_by }}</TableCell>
        <TableCell class="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm" variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ product.name }} options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NotebookPen size="17" class="mr-2" />
                Edit
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
