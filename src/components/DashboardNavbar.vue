<script setup lang="ts">
import { ref } from "vue";
import DashboardNavbarCategorySelector from "./DashboardNavbarCategorySelector.vue";
import HamburgerMenu from "./HamburgerMenu.vue";
import { X } from "lucide-vue-next";

const routes = [
  {
    name: "Overview",
    path: "/overview",
    protected: false,
  },
  {
    name: "Products",
    path: "/products",
    protected: true,
  },
  {
    name: "Settings",
    path: "/settings",
    protected: true,
  },
];

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav class="md:flex p-5 items-center gap-6 relative">
    <div class="flex items-center justify-between">
      <HamburgerMenu :toggleMenu="toggleMenu" />
      <DashboardNavbarCategorySelector />
    </div>
    <div class="md:flex items-center gap-6 hidden">
      <ul v-for="route in routes">
        <router-link
          :to="route.path"
          class="text-sm text-muted-foreground hover:text-white cursor-pointer"
        >
          {{ route.name }}
        </router-link>
      </ul>
    </div>

    <div
      class="flex flex-col gap-6 dark:bg-slate-800 bg-slate-100 p-5 h-screen w-1/2 top-0 left-0 z-50"
      :class="isOpen ? 'fixed' : 'hidden'"
    >
      <div class="pt-20 flex flex-col gap-6 text-left relative">
        <router-link
          v-for="route in routes"
          :to="route.path"
          class="text-sm text-muted-foreground hover:text-white cursor-pointer"
        >
          {{ route.name }}
        </router-link>
        <X class="absolute top-0 right-0 cursor-pointer" @click="toggleMenu" />
      </div>
    </div>

    <div></div>
  </nav>
</template>
