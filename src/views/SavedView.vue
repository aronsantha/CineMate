<template>
  <div v-if="MovieStore.savedMovies.length">
    <SavedItem
      v-for="savedMovie in MovieStore.savedMovies"
      :key="savedMovie.id"
      :savedMovie="savedMovie"
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
