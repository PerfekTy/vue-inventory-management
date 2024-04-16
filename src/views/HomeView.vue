<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <span class="text-center mb-10">
      <h1 class="text-3xl">Welcome to</h1>
      <h2 class="text-4xl tracking-wider text-primary">Inventory Managment System</h2>
    </span>
    <Carousel
      :opts="{
        align: 'start',
        loop: true
      }"
      :plugins="[
        Autoplay({
          delay: 3000
        })
      ]"
      class="container w-full rounded-lg"
    >
      <CarouselContent class="relative rounded-lg">
        <CarouselItem>
          <img
            src="../assets/images/slide1.jpg"
            alt=""
            class="w-full h-[550px] object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="../assets/images/slide2.png"
            alt=""
            class="w-full h-[550px] object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="../assets/images/slide3.png"
            alt=""
            class="w-full h-[550px] object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="../assets/images/slide4.jpg"
            alt=""
            class="w-full h-[550px] object-cover rounded-lg"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="../assets/images/slide5.png"
            alt=""
            class="w-full h-[550px] object-cover rounded-lg"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="absolute top-0 bottom-0 my-auto left-20" />
      <CarouselNext class="absolute top-0 bottom-0 my-auto right-20" />
    </Carousel>
  </div>
</template>
