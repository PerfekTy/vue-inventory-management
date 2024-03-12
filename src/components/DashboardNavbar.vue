<script setup lang="ts">
import { FolderKanban, Search, Settings, Target } from "lucide-vue-next";
import DashboardNavbarMobile from "./DashboardNavbarMobile.vue";
import Input from "./ui/input/Input.vue";

const routes = [
  {
    name: "Overview",
    path: "/",
    icon: Target,
    protected: false,
  },
  {
    name: "Products",
    path: "/products",
    icon: FolderKanban,
    protected: true,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    protected: true,
  },
];
</script>

<template>
  <nav class="lg:flex items-center gap-6 relative p-3 lg:py-3 lg:px-0 lg:pr-3">
    <DashboardNavbarMobile :routes="routes" />
    <div class="lg:flex items-center gap-6 hidden">
      <ul v-for="route in routes">
        <router-link
          :to="route.path"
          class="p-5 flex text-sm items-center gap-3 text-muted-foreground hover:dark:text-white hover:text-blue transition-all hover:scale-105"
        >
          <component :is="route.icon" class="w-5 aspect-square" />
          {{ route.name }}
        </router-link>
      </ul>
    </div>

    <div class="xl:block hidden w-full"></div>

    <div class="relative ml-auto w-full">
      <Search class="absolute left-2.5 top-2.5" :size="20" />
      <Input class="pl-10 xl:max-w-[700px]" placeholder="Search..." />
    </div>

    <!-- Profile avatar dropdown with some options -->
  </nav>
</template>
