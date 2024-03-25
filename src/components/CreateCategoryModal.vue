<script setup>
import { PlusCircleIcon } from 'lucide-vue-next'

import CategoryForm from './CategoryForm.vue'
import Dialog from './ui/dialog/Dialog.vue'
import DialogTrigger from './ui/dialog/DialogTrigger.vue'
import DialogContent from './ui/dialog/DialogContent.vue'
import CardHeader from './ui/card/CardHeader.vue'
import CardTitle from './ui/card/CardTitle.vue'
import CardDescription from './ui/card/CardDescription.vue'
import CardFooter from './ui/card/CardFooter.vue'
import Button from './ui/button/Button.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger
      class="flex items-center justify-start gap-2 hover:bg-[#f1f5f9] hover:dark:bg-[#1e293b] w-full p-1.5 rounded-lg text-sm"
    >
      <PlusCircleIcon width="20" />
      <p>Create Category</p>
    </DialogTrigger>
    <DialogContent>
      <Card class="border-none shadow-none">
        <CardHeader>
          <CardTitle>Create new category</CardTitle>
          <CardDescription>Your new container of different products.</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
</template>
