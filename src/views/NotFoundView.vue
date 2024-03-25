<script setup>
import Button from '../components/ui/button/Button.vue'
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-10 h-screen lg:mx-[40%] m-5">
    <h1 class="text-3xl font-bold tracking-wide">404</h1>
    <p class="text-muted-foreground text-center">
      The page you were looking for doesn't exist. You may have mistyped the address or the page may
      have moved.
    </p>

    <Button as-child>
      <RouterLink to="/products">Return Home</RouterLink>
    </Button>
  </div>
</template>
