<script setup>
import { defineProps } from 'vue'
import { LogOut } from 'lucide-vue-next'
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
          {{ user?.name }}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem @click="logout">
          <LogOut class="mr-2" size="20" /> Logout</DropdownMenuItem
        >
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
