<script setup>
import { Archive, LogOut } from 'lucide-vue-next'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getToken } from './lib/utils'
import cookies from 'vue-cookies'
import Button from './components/ui/button/Button.vue'

const token = getToken()
const router = useRouter()

const logout = () => {
  cookies.remove('token')
  router.push('/sign-in')
}
</script>

<template>
  <main class="container">
    <header>
      <nav class="flex gap-2 my-5">
        <Button as-child variant="outline">
          <RouterLink v-if="token" to="/products">
            <Archive class="mr-2" size="20" />
            Products
          </RouterLink>
        </Button>
        <Button class="ml-auto" v-if="token" @click="logout">
          <LogOut class="mr-2" size="20" />
          Logout
        </Button>
      </nav>
    </header>

    <RouterView />
  </main>
</template>
