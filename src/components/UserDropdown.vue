<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import { LogOut, Pencil } from 'lucide-vue-next'
import cookies from 'vue-cookies'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import placeholder from '../assets/profile-placeholder.png'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

const logout = () => {
  cookies.remove('token')
  window.location.reload()
}
</script>

<template>
  <div class="ml-auto">
    <DropdownMenu class="flex items-center">
      <DropdownMenuTrigger as-child="">
        <Button variant="ghost" class="flex items-center gap-2">
          <img
            :src="user?.image ? user.image : placeholder"
            alt="Profile image"
            class="rounded-full object-cover aspect-square w-6"
          />
          <p class="font-semibold">{{ user?.name }}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem as-child>
          <RouterLink :to="`${user.id}/settings`">
            <Pencil class="mr-2" size="17" />
            Settings
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem @click="logout">
          <LogOut class="mr-2" size="17" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
