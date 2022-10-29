<template>
  <div class="w-full max-w-3xl px-6 my-20 md:my-6 mx-auto">
    <SearchBar
      @emitResponseData="handleResponseData"
      @emitErrorMsg="handleErrorMsg"
      @emitLoader="handleLoader"
    ></SearchBar>
    <div
      class="w-full rounded-md mt-3 bg-rose-900 bg-opacity-50 border border-stone-900 p-1 text-neutral-100"
    >
      <div v-if="error.length > 0" class="p-3">{{ error }}</div>
      <div v-else-if="sortedMovies.length">
        <ResultItem
          v-for="movie in sortedMovies"
          :movie="movie"
          :key="movie.id"
        >
        </ResultItem>
      </div>
      <div v-else-if="!loader" class="p-3">
        Start typing above.
        <i class="fa-solid fa-arrow-turn-up ml-2" aria-hidden="true"></i>
      </div>

      <SpinnerComp v-show="loader && !sortedMovies.length" />
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
