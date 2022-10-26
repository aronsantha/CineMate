<template>
  <SearchBar @toParent="handler"></SearchBar>
  <ResultItem v-for="movie in sortedMovies" :movie="movie" :key="movie.id">
  </ResultItem>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import SearchBar from "../components/SearchBar.vue";
import ResultItem from "../components/ResultItem.vue";

const movies = ref([]);

function handler(results) {
  movies.value = results;
  console.table(movies.value);
}

// COMPUTED;

const sortedMovies = computed(() => {
  // Order by rating (decreasing)
  const higherFirst = [...movies.value].sort(
    (a, b) => b.vote_average - a.vote_average
  );
  // Take first 3 results
  return higherFirst.slice(0, 3);
});
</script>
