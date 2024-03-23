<script setup lang="ts">
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import ModeToggle from "@/components/ui/mode-toggle/ModeToggle.vue";
import { getToken } from "@/lib/utils";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(() => {
  const token = getToken();
  if (!token) {
    router.push("/sign-in");
  }
});
</script>

<template>
  <div>
    <DashboardNavbar />
  </div>
  <ModeToggle />
</template>
