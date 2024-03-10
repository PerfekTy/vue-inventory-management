<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
import CategoryForm from "./CategoryForm.vue";
</script>

<template>
  <Dialog>
    <DialogTrigger class="flex items-center justify-center gap-1">
      <PlusCircleIcon width="20" />
      <p>Create Category</p>
    </DialogTrigger>
    <DialogContent>
      <Card class="border-none shadow-none">
        <CardHeader>
          <CardTitle>Create new category</CardTitle>
          <CardDescription
            >Your new container of different products.</CardDescription
          >
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
