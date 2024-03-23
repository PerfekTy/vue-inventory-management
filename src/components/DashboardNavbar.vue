<script setup>
import { FolderKanban, Search, Settings, Target } from "lucide-vue-next";
import DashboardNavbarMobile from "./DashboardNavbarMobile.vue";
import Input from "./ui/input/Input.vue";
import { getToken } from "../lib/utils.ts";
import DashboardNavbarUser from "./DashboardNavbarUser.vue";

const token = getToken();
const { user } = token;

const routes = [
  {
    name: "Overview",
    path: "/",
    icon: Target,
    protected: true,
  },
  {
    name: "Products",
    path: "/products",
    icon: FolderKanban,
    protected: false,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    protected: true,
  },
];

const filteredRoutes = routes.filter(
  (route) => !route.protected || (route.protected && user.role !== "user")
);
</script>

<template>
  <nav class="lg:flex items-center gap-6 relative">
    <DashboardNavbarMobile :routes="filteredRoutes" />
    <div class="lg:flex items-center gap-6 hidden">
      <ul v-for="route in filteredRoutes" :key="route.name">
        <router-link
          v-if="!route.protected || (route.protected && user.role !== 'user')"
          :to="route.path"
          class="p-5 flex text-sm items-center gap-3 text-muted-foreground hover:dark:text-white hover:text-blue transition-all hover:scale-105"
        >
          <component :is="route.icon" class="w-5 aspect-square" />
          {{ route.name }}
        </router-link>
      </ul>
    </div>

    <div class="relative ml-auto px-2">
      <Search class="absolute top-2.5 left-5" :size="20" />
      <Input
        class="pl-10 lg:min-w-[200px] xl:max-w-[700px]"
        placeholder="Search..."
      />
    </div>

    <div class="hidden lg:block">
      <DashboardNavbarUser />
    </div>
  </nav>
</template>
