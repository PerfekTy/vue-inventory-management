<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-vue-next";
import Command from "./ui/command/Command.vue";
import CommandInput from "./ui/command/CommandInput.vue";
import CreateCategoryModal from "./CreateCategoryModal.vue";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="flex items-center justify-between p-1.5 rounded-md border font-semibold text-sm w-72 md:w-52"
    >
      <div class="flex items-center gap-1">
        <img src="../assets/category-placeholder.png" width="30" />
        <p>Vegetables</p>
      </div>
      <ChevronsUpDown :size="15" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-72 md:w-52">
      <DropdownMenuLabel class="p-0">
        <Command>
          <CommandInput placeholder="Search category..." class="max-h-8" />
        </Command>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <!-- Account page/settings -->
      <DropdownMenuLabel class="text-muted-foreground text-xs">
        Personal Account
      </DropdownMenuLabel>
      <DropdownMenuItem class="flex items-center gap-2 px-2">
        <img src="../assets/user-placeholder.png" width="20" />
        <p>Sebastian Feleńczak</p>
      </DropdownMenuItem>

      <!-- Categories -->
      <DropdownMenuLabel class="text-muted-foreground text-xs">
        Categories
      </DropdownMenuLabel>
      <DropdownMenuItem class="flex items-center gap-1 px-1"
        ><img src="../assets/category-placeholder.png" width="30" />
        <p>Vegetables</p></DropdownMenuItem
      >
      <DropdownMenuSeparator />
      <!-- Work around with modal in dropdowns -->
      <DropdownMenuItem class="px-2">
        <CreateCategoryModal />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
