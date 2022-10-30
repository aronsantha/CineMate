<template>
  <div class="max-w-3xl mx-auto px-6 mt-16 md:mt-8">
    <h1 class="text-lg font-medium md:text-base">My Collection</h1>
    <div
      v-if="MovieStore.savedMovies.length"
      class="flex flex-wrap gap-10 mt-16 md:mt-10 mb-20"
    >
      <SavedItem
        v-for="savedMovie in MovieStore.savedMovies"
        :key="savedMovie.id"
        :savedMovie="savedMovie"
      >
      </SavedItem>
    </div>

    <div
      v-else
      class="w-full rounded-md mt-16 md:mt-10 bg-stone-900 p-4 text-sm"
    >
      <div class="mb-5">There are no movies in your collection.</div>
      <RouterLink
        :to="{ name: 'discover' }"
        class="font-medium hover:underline underline-offset-4 py-1"
        >Click here to search and add movies!</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import SavedItem from "../components/SavedItem.vue";
import { useMovieStore } from "../stores/MovieStore";

const MovieStore = useMovieStore();
</script>
