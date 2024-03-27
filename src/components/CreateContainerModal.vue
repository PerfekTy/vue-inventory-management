<script setup>
import * as z from 'zod'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { PackagePlus } from 'lucide-vue-next'

import Dialog from './ui/dialog/Dialog.vue'
import DialogTrigger from './ui/dialog/DialogTrigger.vue'
import DialogContent from './ui/dialog/DialogContent.vue'
import CardHeader from './ui/card/CardHeader.vue'
import CardTitle from './ui/card/CardTitle.vue'
import CardDescription from './ui/card/CardDescription.vue'
import CardFooter from './ui/card/CardFooter.vue'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import DialogClose from './ui/dialog/DialogClose.vue'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../components/ui/form'
import { api } from '@/lib/axios.interceptors'

const error = ref(null)
const ifSuccess = ref(false)

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100)
  })
)

const onSubmit = async (values) => {
  try {
    await api.post('/api/new-container', { name: values.name, description: values.description })
    ifSuccess.value = true
  } catch ({ response }) {
    error.value = response.data.error
  }
}
</script>

<template>
  <Dialog v-if="!ifSuccess">
    <DialogTrigger as-child class="my-3">
      <Button>
        <PackagePlus class="mr-2" size="20" />
        <p>Create container</p>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Form :validation-schema="formSchema" @submit="onSubmit" class="space-y-2">
        <Card>
          <CardHeader class="p-0 pb-5">
            <CardTitle class="text-lg">Create new container</CardTitle>
            <CardDescription>Your new container of different products.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Container name</FormLabel>
                <FormControl>
                  <Input placeholder="Vegetables" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="This container is full of vegetables."
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </CardContent>
          <p v-if="error" class="text-red-500 my-2">{{ error }}</p>
          <CardFooter class="flex justify-between py-4 px-0">
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </Form>
    </DialogContent>
  </Dialog>
</template>
