<script setup>
import Input from './ui/input/Input.vue'
import Label from './ui/label/Label.vue'
</script>

<template>
  <div class="space-y-4">
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
  </div>
</template>
