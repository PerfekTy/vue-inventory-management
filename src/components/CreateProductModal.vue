<script setup>
import * as z from 'zod'
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
import { toTypedSchema } from '@vee-validate/zod'
import { CirclePlus } from 'lucide-vue-next'
import { api } from '@/lib/axios.interceptors'
import { cn } from '@/lib/utils'

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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getCurrentUser } from '@/lib/data/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const error = ref(null)
const containerId = ref(null)
const userName = ref(null)
const toast = useToast()

watchEffect(async () => {
  containerId.value = router.currentRoute.value.query?.containerId
  const response = await getCurrentUser()
  userName.value = response?.user.name
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    amount: z.number().int(),
    expire_date: z.date()
  })
)

const onSubmit = async (values) => {
  try {
    const { data } = await api.post('/api/new-product', {
      name: values.name,
      amount: values.amount,
      expire_date: values.expire_date,
      added_by: userName,
      container_id: containerId.value
    })
    toast.success(data.message)
  } catch ({ response }) {
    error.value = response.data.error
    toast.error(response.data.error)
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child class="my-3">
      <Button variant="outline">
        <CirclePlus class="mr-2" size="20" />
        <p>Add new product</p>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Form :validation-schema="formSchema" @submit="onSubmit" class="space-y-2">
        <Card>
          <CardHeader class="p-0 pb-5">
            <CardTitle class="text-lg">Add new record to current container</CardTitle>
            <CardDescription
              >Feel free to add a new product to your selected container.</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="Peach" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="5" type="number" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField, value }" name="expire_date">
              <FormItem class="flex flex-col">
                <FormLabel>Expiration date</FormLabel>
                <Popover>
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button
                        variant="outline"
                        :class="
                          cn(
                            'w-[240px] ps-3 text-start font-normal',
                            !value && 'text-muted-foreground'
                          )
                        "
                      >
                        <span>{{ value ? format(value, 'PPP') : 'Pick a date' }}</span>
                        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Calendar v-bind="componentField" />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            </FormField>
          </CardContent>
          <p v-if="error" class="text-red-500 my-2">{{ error }}</p>
          <CardFooter class="flex justify-between py-4 px-0">
            <DialogClose as-child>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <div class="flex items-center gap-3">
              <Button variant="outline" type="reset">Clear</Button>
              <Button>Create</Button>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </DialogContent>
  </Dialog>
</template>
