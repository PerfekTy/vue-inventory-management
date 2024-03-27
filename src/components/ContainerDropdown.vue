<script setup>
import { watchEffect, ref, onBeforeMount } from 'vue'
import { getContainers } from '@/lib/data/container'
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
import { useRouter } from 'vue-router'

const router = useRouter()
const containers = ref(null)
const currentContainer = ref(null)

const handleContainerSelect = (containerId, containerName) => {
  router.push({ query: { containerId } })
  currentContainer.value = containerName
}

watchEffect(async () => {
  const response = await getContainers()
  containers.value = response

  const { containerId } = router.currentRoute.value.query

  if (containerId && response?.length > 0) {
    const firstContainer = response[0]
    router.push({ query: { containerId: firstContainer?.id } })
    currentContainer.value = firstContainer?.name
  } else {
    currentContainer.value = response[0]?.name
    router.push({ query: { containerId: response[0]?.id } })
  }
})

onBeforeMount(() => {
  router.beforeEach((to, from, next) => {
    const { containerId } = to.query
    if (containerId && containers.value) {
      const selectedContainer = containers.value.find((container) => container.id === containerId)
      if (selectedContainer) {
        currentContainer.value = selectedContainer.name
      }
    }
    next()
  })
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
        v-for="container in containers"
        :key="container?.id"
        @click="handleContainerSelect(container.id, container.name)"
        >{{ container?.name }}</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
