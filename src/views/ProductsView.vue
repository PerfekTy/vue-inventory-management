<script setup>
import { Ellipsis, NotebookPen, X } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import CreateContainerModal from '../components/CreateContainerModal.vue'
import ContainerDropdown from '@/components/ContainerDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="flex items-center justify-between gap-5">
    <ContainerDropdown />
    <CreateContainerModal />
  </div>
  <Table>
    <TableCaption>A list of your recent container products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[200px]">Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Expire Date</TableHead>
        <TableHead>Added By</TableHead>
        <!-- ADMIN ONLY -->
        <TableHead>Options</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="w-[200px]">1</TableCell>
        <TableCell>Peach</TableCell>
        <TableCell>12</TableCell>
        <TableCell>12.03.2024r</TableCell>
        <TableCell>Kacperek</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm" variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Peach options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><NotebookPen size="17" class="mr-2" />Edit </DropdownMenuItem>
              <DropdownMenuItem><X size="17" class="mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
../components/CreateContainerModal.vue
