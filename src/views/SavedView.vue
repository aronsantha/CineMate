<template>
  <h1 class="text-neutral-100">My Collection</h1>
  <div
    v-if="MovieStore.savedMovies.length"
    class="flex flex-wrap gap-8 max-w-3xl mx-auto my-20 md:my-6"
  >
    <SavedItem
      v-for="savedMovie in MovieStore.savedMovies"
      :key="savedMovie.id"
      :savedMovie="savedMovie"
      class="text-neutral-100"
    >
    </SavedItem>
  </div>
  <div v-else class="bg-lime-300">
    You don't have movies in your collection.
    <RouterLink to="/" class="bg-cyan-200">Search and add movies!</RouterLink>
  </div>
</template>

<script setup>
// TODO remove unnecessery imports
import { ref, computed, reactive } from "vue";
import SavedItem from "../components/SavedItem.vue";
import { useMovieStore } from "../stores/MovieStore";

const MovieStore = useMovieStore();
</script>
