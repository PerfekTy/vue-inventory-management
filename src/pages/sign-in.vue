<script setup>
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Separator from "@/components/ui/separator/Separator.vue";
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="mx-auto max-w-[350px] space-y-6">
      <div class="text-center flex flex-col items-center gap-2">
        <img
          src="../assets/logo.png"
          alt="Inventory Managment System logo"
          width="200"
        />
        <h1 class="text-3xl font-bold">Inventory Managment System</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Join our inventory management service and enjoy the best efficiency,
          and accuracy.
        </p>
      </div>
      <div>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div class="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <Button class="w-full" type="submit">Sign In</Button>
        </div>
        <div class="mt-4 text-center text-sm flex gap-1 justify-center">
          Don't have an account yet?
          <router-link to="/sign-up" class="underline"> Register </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
