<template>
  <div class="max-w-3xl mx-auto px-6 mt-16 md:mt-8">
    <h1 class="text-lg font-medium md:text-base mb-5">Discover</h1>
    <div class="text-sm">Let's find some movies for your collection!</div>
  </div>
  <div class="w-full max-w-3xl mx-auto mt-16 md:mt-10 mb-20 px-6">
    <SearchBar
      @emitResponseData="handleResponseData"
      @emitErrorMsg="handleErrorMsg"
      @emitLoader="handleLoader"
    ></SearchBar>
    <div class="w-full rounded-md mt-8">
      <div
        v-if="error.length > 0"
        class="w-full rounded-md mt-8 bg-rose-900 bg-opacity-50 p-4 text-sm"
      >
        {{ error }}
      </div>
      <div v-else-if="sortedMovies.length">
        <ResultItem
          v-for="movie in sortedMovies"
          :movie="movie"
          :key="movie.id"
        >
        </ResultItem>
      </div>
      <div
        v-else-if="!loader"
        class="w-full rounded-md mt-8 bg-stone-900 p-4 text-sm"
      >
        Start typing a movie title above.
        <i class="fa-solid fa-arrow-turn-up ml-2" aria-hidden="true"></i>
      </div>

      <ResultLoader v-show="loader && !sortedMovies.length" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SearchBar from "../components/SearchBar.vue";
import ResultItem from "../components/ResultItem.vue";
import ResultLoader from "../components/ResultLoader.vue";

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
