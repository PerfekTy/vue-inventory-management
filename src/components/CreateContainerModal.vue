<script setup>
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
import Label from './ui/label/Label.vue'
import DialogClose from './ui/dialog/DialogClose.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child class="my-3">
      <Button>
        <PackagePlus class="mr-2" size="20" />
        <p>Create Container</p>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Card class="p-2">
        <CardHeader class="p-0 pb-5">
          <CardTitle class="text-lg">Create new container</CardTitle>
          <CardDescription>Your new container of different products.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label htmlFor="container_name">Container name</Label>
            <Input id="container_name" placeholder="Vegetables" required type="text" />
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
        <DialogClose as-child>
          <CardFooter class="flex justify-between py-4 px-0">
            <Button variant="outline">Cancel</Button>
            <Button>Create</Button>
          </CardFooter>
        </DialogClose>
      </Card>
    </DialogContent>
  </Dialog>
</template>
