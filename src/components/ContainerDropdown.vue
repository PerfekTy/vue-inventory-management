<script setup>
import { useRouter } from 'vue-router'
import { watchEffect, ref } from 'vue'
import { useContainers } from '@/lib/data/container'
import { CornerLeftDown } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Button from './ui/button/Button.vue'

const router = useRouter()
const containers = ref(useContainers())
const currentContainer = ref(null)

const handleContainerSelect = (containerId, containerName) => {
  router.push({ query: { containerId } })
  currentContainer.value = containerName
}

watchEffect(async () => {
  const { containerId } = router.currentRoute.value.query

  if (containers.value) {
    currentContainer.value =
      containers.value.data
        .map((item) => item)
        .filter((container) => container.id === parseInt(containerId))[0]?.name ||
      containers.value?.data[0]?.name
  }

  if (!containerId) {
    const defaultContainerId = containers.value?.data[0]?.id
    router.push({ query: { containerId: defaultContainerId } })
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <CornerLeftDown class="mr-2" size="20" />
        <p v-if="currentContainer">{{ currentContainer }}</p>
        <p v-else>My Containers</p>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Containers</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="container in containers.data"
        :key="container?.id"
        @click="handleContainerSelect(container.id, container.name)"
      >
        {{ container?.name }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
