<script setup>
import { ref, watchEffect } from 'vue'
import { Archive } from 'lucide-vue-next'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser, getToken } from './lib/utils'
import Button from './components/ui/button/Button.vue'
import UserDropdown from './components/UserDropdown.vue'

const token = getToken()
const user = ref(null)

watchEffect(async () => {
  const response = await getCurrentUser()
  user.value = response.user
})
</script>

<template>
  <main class="container">
    <header v-if="token" class="mt-5 mb-10">
      <nav class="flex gap-2">
        <Button as-child variant="outline">
          <RouterLink v-if="token" to="/products">
            <Archive class="mr-2" size="20" />
            Products
          </RouterLink>
        </Button>
        <UserDropdown :user="user" />
      </nav>
    </header>

    <RouterView />
  </main>
</template>
