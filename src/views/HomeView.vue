<template>
  <SearchBar
    @emitResponseData="handleResponseData"
    @emitErrorMsg="handleErrorMsg"
    @emitLoader="handleLoader"
  ></SearchBar>
  <div>
    <div v-if="error.length > 0">{{ error }}</div>
    <div v-else-if="sortedMovies.length">
      <ResultItem v-for="movie in sortedMovies" :movie="movie" :key="movie.id">
      </ResultItem>
    </div>
    <div v-else-if="!loader">Type in your search above.</div>

    <div v-show="loader && !sortedMovies.length" class="bg-emerald-500 h-50">
      <SpinnerComp />
      Loading some data, please wait...
    </div>
  </div>
</template>

<script setup>
// TODO remove unnecessery imports
import { ref, computed, reactive } from "vue";
import SearchBar from "../components/SearchBar.vue";
import ResultItem from "../components/ResultItem.vue";
import SpinnerComp from "../components/SpinnerComp.vue";

const movies = ref([]);
const error = ref("");
const loader = ref(false);

// HANDLERS

function handleResponseData(searchResults) {
  movies.value = searchResults;
}

function handleErrorMsg(errorMsg) {
  error.value = errorMsg;
}

function handleLoader(loaderStatus) {
  loader.value = loaderStatus;
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
