<script setup>
import * as z from 'zod'
import { useQuery } from 'vue-query'
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
import { toTypedSchema } from '@vee-validate/zod'
import { NotebookPen } from 'lucide-vue-next'
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
import { useEditProductMutation } from '@/lib/data/product'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { data } = useQuery('current-user', getCurrentUser)
const { mutate: editProductMutation } = useEditProductMutation()

const router = useRouter()
const error = ref(null)
const containerId = ref(null)
const userName = ref(null)
const toast = useToast()

watchEffect(async () => {
  containerId.value = router.currentRoute.value.query?.containerId
  userName.value = data._object.data?.user.name
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50).default(props.product.name),
    amount: z.number().int().default(props.product.amount),
    expire_date: z.date().default(new Date(props.product.expire_date))
  })
)

const onSubmit = async (values) => {
  editProductMutation({
    id: props.product.id,
    name: values.name,
    amount: values.amount,
    expire_date: values.expire_date
  })
  toast.success('Product editted.')
}
</script>

<template>
  <Dialog>
    <DialogTrigger class="flex items-center hover:bg-[#f5f5f4] w-full py-1 px-2 rounded-md text-sm">
      <NotebookPen size="17" class="mr-2" />
      Edit
    </DialogTrigger>
    <DialogContent>
      <Form :validation-schema="formSchema" @submit="onSubmit" class="space-y-2">
        <Card>
          <CardHeader class="p-0 pb-5">
            <CardTitle class="text-lg"> You are editing {{ product.name }}</CardTitle>
            <CardDescription>Feel free to edit a current product.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Peach"
                    type="text"
                    v-bind="componentField"
                    :default-value="props.product.name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5"
                    type="number"
                    v-bind="componentField"
                    :default-value="props.product.amount"
                  />
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
                        <span>{{
                          value
                            ? format(value, 'PPP')
                            : format(new Date(props.product.expire_date), 'PPP')
                        }}</span>
                        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Calendar v-bind="componentField" :default-value="props.product.expire_date" />
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
