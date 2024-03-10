<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  toggleMenu: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 cursor-pointer md:hidden" @click="toggleMenu">
    <div class="w-5 h-[2px] dark:bg-white bg-dark"></div>
    <div class="w-5 h-[2px] dark:bg-white bg-dark"></div>
    <div class="w-5 h-[2px] dark:bg-white bg-dark"></div>
  </div>
</template>
