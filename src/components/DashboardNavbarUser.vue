<script setup lang="ts">
import { deleteToken } from "@/lib/utils";
import placeholder from "../assets/user-placeholder.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../components/ui/dropdown-menu";
import { LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { getToken } from "../lib/utils.ts";
import ModeToggle from "@/components/ui/mode-toggle/ModeToggle.vue";

const router = useRouter();

const token = getToken();
const { user } = token;

function logout() {
  if (token) {
    deleteToken();
    router.push("/sign-in");
  }
}
</script>

<template>
  <DropdownMenu class="">
    <DropdownMenuTrigger as-child class="flex items-center gap-2">
      <Button variant="outline">
        <img
          class="object-cover rounded-full aspect-square w-6"
          :src="user?.image ? user.image : placeholder"
          alt="user profile image"
        />
        <p class="text-sm">{{ user?.name }}</p>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        @click="logout"
        class="flex items-center justify-center gap-2"
      >
        <component :is="LogOut" class="w-5 aspect-square" />
        Logout
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel class="text-center">Theme</DropdownMenuLabel>
      <DropdownMenuItem as-child>
        <ModeToggle />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
