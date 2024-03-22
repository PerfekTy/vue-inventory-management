<script setup lang="ts">
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import ModeToggle from "@/components/ui/mode-toggle/ModeToggle.vue";
import * as jwt from "jose";
import cookies from "vue-cookies";

console.log(jwt.decodeJwt(cookies.get("token")));
</script>

<template>
  <div>
    <DashboardNavbar />
  </div>
  <ModeToggle />
</template>
