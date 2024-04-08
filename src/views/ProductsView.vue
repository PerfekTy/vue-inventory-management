<script setup>
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useDeleteProductMutation, useProducts } from '../lib/data/product'
import { useDeleteContainerMutation, useContainers } from '../lib/data/container'
import { ref, watchEffect } from 'vue'
import { Ellipsis, X } from 'lucide-vue-next'
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

const router = useRouter()
const toast = useToast()

const containerId = ref(router.currentRoute.value.query?.containerId)
const containers = ref(useContainers())
const containerDescription = ref(null)

const products = ref(useProducts(containerId.value))

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

watchEffect(() => {
  router.currentRoute.value.query?.containerId
  containerId.value = router.currentRoute.value.query?.containerId
  products.value = containerDescription.value = containers.value?.data
    .map((item) => item)
    .filter((container) => container.id === parseInt(containerId.value))[0]?.description
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
    <TableCaption>{{ containerDescription }}</TableCaption>
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
      <TableRow v-for="product in products.data" :key="product.id">
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
              <DropdownMenuLabel>{{ product.name }}options</DropdownMenuLabel>
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
