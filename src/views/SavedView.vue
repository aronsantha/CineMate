<template>
  <SavedItem
    v-for="savedMovie in MovieStore.savedMovies"
    :key="savedMovie.id"
    :savedMovie="savedMovie"
  >
  </SavedItem>
</template>

<style></style>

<script setup>
import SavedItem from "../components/SavedItem.vue";
import { useMovieStore } from "../stores/MovieStore";

const MovieStore = useMovieStore();
</script>
