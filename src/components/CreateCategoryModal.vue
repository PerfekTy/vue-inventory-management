<script setup>
import { PlusCircleIcon } from 'lucide-vue-next'

import Dialog from './ui/dialog/Dialog.vue'
import DialogTrigger from './ui/dialog/DialogTrigger.vue'
import DialogContent from './ui/dialog/DialogContent.vue'
import CardHeader from './ui/card/CardHeader.vue'
import CardTitle from './ui/card/CardTitle.vue'
import CardDescription from './ui/card/CardDescription.vue'
import CardFooter from './ui/card/CardFooter.vue'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import Label from './ui/label/Label.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="secondary">
        <PlusCircleIcon class="mr-2" size="20" />
        <p>Create Category</p>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Card class="p-4">
        <CardHeader class="p-0 pb-5">
          <CardTitle>Create new category</CardTitle>
          <CardDescription>Your new container of different products.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label htmlFor="category_name">Category name</Label>
            <Input id="category_name" placeholder="Vegetables" required type="text" />
          </div>
          <div class="space-y-2">
            <Label htmlFor="description">Short description</Label>
            <Input
              id="description"
              placeholder="This container is full of vegetables."
              required
              type="text"
            />
          </div>
        </CardContent>
        <CardFooter class="flex justify-between py-4 px-0">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
</template>
