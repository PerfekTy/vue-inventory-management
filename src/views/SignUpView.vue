<script setup>
import { ref } from 'vue'
import * as z from 'zod'
import cookies from 'vue-cookies'
import { toTypedSchema } from '@vee-validate/zod'
import axios from 'axios'
import { serverString } from '../lib/utils'

import Button from '../components/ui/button/Button.vue'
import Input from '../components/ui/input/Input.vue'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../components/ui/form'
import SignLogo from '../components/SignLogo.vue'

const error = ref(null)

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(3).max(10),
    password_confirmation: z.string().min(3).max(10)
  })
)

const onSubmit = async (values) => {
  if (values.password !== values.password_confirmation) {
    error.value = 'Passwords must match'
    return
  }

  try {
    const { data } = await axios.post(`${serverString}/api/sign-up`, {
      name: values.name,
      email: values.email,
      password: values.password
    })

    if (data.token) {
      cookies.set('token', data.token)
      window.location.reload()
    }
  } catch ({ response }) {
    error.value = response.data.error
  }
}
</script>

<template>
  <Form
    :validation-schema="formSchema"
    @submit="onSubmit"
    class="flex flex-col justify-center max-w-[500px] h-screen container gap-5"
  >
    <SignLogo />
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Jane Doe" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="m@example.com" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your email.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormDescription>Password sholud be at least 3 characters long.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password_confirmation">
      <FormItem>
        <FormLabel>Password Confirmation</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-between items-center gap-5">
      <Button class="w-full" type="submit"> Sign Up </Button>
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p class="text-sm text-muted-foreground'">
      Already have an account?
      <router-link class="underline" to="/sign-in">Login</router-link>
    </p>
  </Form>
</template>
