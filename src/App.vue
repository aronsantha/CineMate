<template>
  <header
    class="bg-stone-900 text-sm px-6 py-3 min-h-[4rem] w-full flex justify-between items-center flex-wrap gap-4"
  >
    <RouterLink :to="{ name: 'discover' }" class="flex">
      <img
        src="./assets/images/cinemate_logo.svg"
        class="mr-3 h-8"
        alt="CineMate Logo"
      />

      <span class="self-center text-lg font-semibold whitespace-nowrap"
        >CineMate</span
      >
    </RouterLink>

    <nav class="flex items-center gap-2">
      <RouterLink
        :to="{ name: 'discover' }"
        class="text-center hover:bg-stone-500 rounded-md px-4 py-2"
        exact-active-class="bg-stone-600 bg-stone-600 font-medium"
        ><span
          class="fa-solid fa-magnifying-glass"
          aria-label="Discover"
        ></span>
        <span class="ml-2 md:hidden">Discover</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'collection' }"
        class="text-center hover:bg-stone-500 rounded-md px-4 py-2"
        exact-active-class="bg-stone-600 bg-stone-600 font-medium"
        ><span class="fa-regular fa-star" aria-label="My Collection"></span
        ><span class="ml-2 md:hidden">My Collection</span>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
