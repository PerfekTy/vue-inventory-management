<script setup lang="ts">
import { Route, SquareChevronRight } from "lucide-vue-next";
import DashboardNavbarCategorySelector from "./DashboardNavbarCategorySelector.vue";
import DashboardNavbarUser from "./DashboardNavbarUser.vue";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Route = {
  name: string;
  path: string;
  protected: boolean;
  icon: any;
};

defineProps<{
  routes: Route[];
}>();
</script>

<template>
  <div class="flex items-center justify-between lg:gap-6 py-3 px-2">
    <Sheet>
      <div class="flex items-center gap-5 lg:gap-16">
        <SheetTrigger>
          <SquareChevronRight class="ml-1.5 lg:hidden" />
        </SheetTrigger>
        <DashboardNavbarCategorySelector />
      </div>
      <SheetContent side="left" class="w-[300px] p-0">
        <SheetHeader>
          <SheetTitle class="pt-10 text-center">Inventory Managment</SheetTitle>
          <div class="pt-20 flex flex-col gap-6 text-left relative">
            <router-link
              v-for="route in routes"
              :to="route.path"
              class="p-5 flex items-center gap-3 text-muted-foreground hover:dark:text-white hover:text-blue transition-all border-b"
            >
              <component :is="route.icon" class="w-6 aspect-square" />
              {{ route.name }}
            </router-link>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    <div class="lg:hidden mr-2">
      <DashboardNavbarUser />
    </div>
  </div>
</template>
