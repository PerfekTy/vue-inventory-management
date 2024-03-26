<script setup>
import { CornerLeftDown } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Button from './ui/button/Button.vue'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <CornerLeftDown class="mr-2" size="20" />
        My Containers
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Containers</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>1</DropdownMenuItem>
      <DropdownMenuItem>2</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
