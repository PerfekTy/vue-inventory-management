<script setup>
import { getCurrentUser } from '@/lib/data/user'
import { Image, Mail, Save, ShieldCheck, User } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useQuery } from 'vue-query'
import placeholder from '../assets/images/profile-placeholder.png'
import Input from '@/components/ui/input/Input.vue'

const { data } = useQuery('current-user', getCurrentUser)
const user = ref(null)

const changeUserImage = () => {}

watchEffect(async () => {
  user.value = data._object.data?.user
})
</script>

<template>
  <div class="container flex flex-col gap-4 items-center justify-center">
    <div class="grid grid-cols-2 items-center gap-2">
      <div
        class="flex items-center cursor-pointer hover:bg-primary bg-white shadow p-2 rounded-lg select-none"
      >
        Username <User class="ml-2" size="20" />
      </div>
      <p>{{ user?.name }}</p>
    </div>
    <div class="grid grid-cols-2 items-center gap-2">
      <div
        class="flex items-center cursor-pointer hover:bg-primary bg-white shadow p-2 rounded-lg select-none"
      >
        Address email <Mail class="ml-2" size="20" />
      </div>
      <p>{{ user?.email }}</p>
    </div>
    <div class="grid grid-cols-2 items-center gap-2">
      <div
        class="flex items-center cursor-pointer hover:bg-primary bg-white shadow p-2 rounded-lg select-none"
      >
        Your system role <ShieldCheck class="ml-2" size="20" />
      </div>
      <p class="uppercase">{{ user?.role }}</p>
    </div>
    <img
      :src="user?.image ? user?.image : placeholder"
      alt="user image"
      class="aspect-square w-[300px] md:w-[450px] mt-10 rounded-full"
    />

    <label for="file-upload" class="custom-file-upload flex items-center hover:bg-primary">
      <Input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
      Change your image <Image class="ml-2" size="20" />
    </label>

    <div class="flex items-center cursor-pointer bg-primary shadow p-2 rounded-lg select-none">
      Update profile<Save class="ml-2" size="20" />
    </div>
  </div>
</template>
