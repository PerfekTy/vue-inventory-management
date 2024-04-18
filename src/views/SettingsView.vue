<script setup>
import { getCurrentUser } from '@/lib/data/user'
import { Image, Mail, Save, ShieldCheck, User } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useQuery } from 'vue-query'
import { useUpdateUserProfileMutation } from '../lib/data/user'
import placeholder from '../assets/images/profile-placeholder.png'
import Input from '@/components/ui/input/Input.vue'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form, FormField } from '@/components/ui/form'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import Button from '@/components/ui/button/Button.vue'

const { data } = useQuery('current-user', getCurrentUser)

const user = ref(null)
const previewImage = ref(null)
const image = ref('')

const toast = useToast()
const { mutate: updateUserProfileMutation } = useUpdateUserProfileMutation()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50).default(data._object.data?.name),
    email: z.string().email().default(data._object.data?.email),
    role: z.string().default(data._object.data?.role).optional()
  })
)

const createBase64Image = (fileObject) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    image.value = e.target.result
  }
  reader.readAsDataURL(fileObject)
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]

  if (file) {
    previewImage.value = URL.createObjectURL(file)
    createBase64Image(file)
    toast.success('Image added.')
  } else {
    toast.warning('Something went wrong uploading image.')
  }
}

const onSubmit = async (values) => {
  try {
    updateUserProfileMutation({
      userId: data._object.data?.id,
      name: values.name,
      email: values.email,
      image: image.value
    })

    toast.success('User informations updated.')
  } catch (error) {
    toast.error('Error while updating user.')
  }
}

watchEffect(async () => {
  const data = await getCurrentUser()
  user.value = data
})
</script>

<template>
  <Form
    :validation-schema="formSchema"
    @submit="onSubmit"
    class="space-y-2 container flex flex-col gap-4 items-center justify-center mt-20"
  >
    <div class="flex items-center gap-10">
      <FormField
        v-slot="{ componentField }"
        name="name"
        class="grid grid-cols-2 items-center gap-2"
      >
        <FormItem>
          <FormLabel class="flex items-center bg-white shadow p-2 rounded-lg select-none">
            Username <User class="ml-2" size="20" />
          </FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" :default-value="user?.name" disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="email"
        class="grid grid-cols-2 items-center gap-2"
      >
        <FormItem>
          <FormLabel class="flex items-center bg-white shadow p-2 rounded-lg select-none">
            Email <Mail class="ml-2" size="20" />
          </FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" :default-value="user?.email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="role"
        class="grid grid-cols-2 items-center gap-2"
      >
        <FormItem>
          <FormLabel class="flex items-center bg-white shadow p-2 rounded-lg select-none">
            Your system role <ShieldCheck class="ml-2" size="20" />
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              :default-value="data?.role"
              class="uppercase"
              disabled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div v-if="previewImage">
      <img
        :src="previewImage && previewImage"
        alt="preview image for upload"
        class="aspect-square w-[400px] md:w-[400px] mt-10 rounded-full"
      />
      <p class="text-center mt-5 text-orange-400 font-semibold tracking-wide">
        This is just a preview, not the actual profile image.
      </p>
    </div>

    <img
      v-else
      :src="user?.image ? user?.image : placeholder"
      alt="user image"
      class="aspect-square w-[300px] md:w-[450px] mt-10 rounded-full"
    />

    <div class="flex items-center gap-10">
      <label for="file-upload" class="custom-file-upload flex items-center hover:bg-primary">
        <Input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
        Change your image <Image class="ml-2" size="20" accept="image/png, image/jpeg" />
      </label>

      <Button type="submit"> Update profile <Save class="ml-2" size="20" /> </Button>
    </div>
  </Form>
</template>
