<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav
      class="bg-stone-900 text-neutral-100 text-sm px-6 py-3 min-h-[4rem] w-full flex justify-between items-center flex-wrap gap-4"
    >
      <RouterLink to="/" class="flex">
        <img
          src="./assets/images/cinemate_logo.svg"
          class="mr-3 h-8"
          alt="CineMate Logo"
        />

        <span class="self-center text-lg font-semibold whitespace-nowrap"
          >CineMate</span
        >
      </RouterLink>

      <span class="flex items-center gap-2">
        <RouterLink
          to="/"
          class="text-center hover:bg-stone-500 rounded-md px-4 py-2"
          exact-active-class="bg-stone-600 bg-stone-600 font-medium"
          ><span class="fa-solid fa-magnifying-glass" aria-label="Home"></span>
          <span class="ml-2 md:hidden">Home</span>
        </RouterLink>
        <RouterLink
          to="/saved"
          class="text-center hover:bg-stone-500 rounded-md px-4 py-2"
          exact-active-class="bg-stone-600 bg-stone-600 font-medium"
          ><i class="fa-regular fa-star" aria-label="Saved Movies"></i
          ><span class="ml-2 md:hidden">Saved</span>
        </RouterLink>
      </span>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
