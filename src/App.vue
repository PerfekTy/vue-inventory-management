<script setup>
import { ref, watchEffect } from 'vue'
import { Archive } from 'lucide-vue-next'
import { RouterLink, RouterView } from 'vue-router'
import Button from './components/ui/button/Button.vue'
import UserDropdown from './components/UserDropdown.vue'
import { getToken } from './lib/data/token'
import { getCurrentUser } from './lib/data/user'

const token = getToken()
const user = ref(null)

watchEffect(async () => {
  const response = await getCurrentUser()
  user.value = response?.user
})
</script>

<template>
  <main class="container">
    <header v-if="token" class="mt-5 mb-10">
      <nav class="flex items-center gap-16">
        <RouterLink to="/products">
          <img
            src="./assets/logo.png"
            alt="Inventory Managment System Logo"
            class="aspect-square w-16"
          />
        </RouterLink>
        <RouterLink v-slot="{ isActive }" v-if="token" to="/products" as-child>
          <Button variant="outline" :class="isActive && 'bg-active'">
            <Archive class="mr-2" size="20" />
            Products
          </Button>
        </RouterLink>
        <UserDropdown :user="user" />
      </nav>
    </header>

    <RouterView />
  </main>
</template>
