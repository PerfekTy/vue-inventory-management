<script setup>
import { ref, watchEffect } from 'vue'
import { Archive, Home } from 'lucide-vue-next'
import { RouterLink, RouterView } from 'vue-router'
import Button from './components/ui/button/Button.vue'
import UserDropdown from './components/UserDropdown.vue'
import { getToken } from './lib/data/token'
import { getCurrentUser } from './lib/data/user'
import { useQuery } from 'vue-query'

const token = getToken()
const user = ref(null)
const { data } = useQuery('current-user', getCurrentUser)

watchEffect(async () => {
  user.value = data._object.data?.user
})
</script>

<template>
  <main class="h-screen relative py-1">
    <header v-if="token" class="mt-5 mb-10 container">
      <nav class="flex items-center gap-5">
        <img
          src="./assets/images/logo.png"
          alt="Inventory Managment System Logo"
          class="aspect-square w-16 mr-5"
        />
        <RouterLink v-slot="{ isActive }" v-if="token" to="/" as-child>
          <Button variant="outline" :class="isActive && 'bg-active'">
            <Home class="mr-2" size="20" />
            Home
          </Button>
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
    <footer class="flex justify-between p-5 bg-primary absolute bottom-0 w-full">
      <p>&copy; 2024 Inventory Managment System</p>
      <p>Sebastian Feleńczak</p>
    </footer>
  </main>
</template>
