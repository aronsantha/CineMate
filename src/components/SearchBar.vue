<template>
  <input
    @keyup="debounceGetMovies"
    v-model="search"
    type="string"
    placeholder="Search for movies"
    class="w-full rounded-md p-3 text-md placeholder-neutral-400 bg-stone-900 border border-stone-700 focus:bg-stone-800 focus:border-2 focus:border-rose-800 focus:shadow-lg focus:shadow-rose-500/50"
    aria-label="Search for movies by title"
  />
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const emit = defineEmits(["emitResponseData", "emitErrorMsg", "emitLoader"]);

// Search function

const search = ref("");
const api = import.meta.env.VITE_MOVIE_API_KEY;

function getMovies() {
  if (search.value.length > 2) {
    // IF MORE THAN 2 CHARS: Clear previous emits, Start loader, Initiate axios call
    emit("emitErrorMsg", "");
    emit("emitResponseData", []);
    emit("emitLoader", true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&query=${search.value}&page=1&include_adult=false`
      )
      .then((response) => {
        // IF NO RESULT: emit custom message (because API does not send error message in that case)
        if (response.data.total_results < 1) {
          emit(
            "emitErrorMsg",
            "Sorry, no results for " + search.value + ". Let's try again!"
          );
        }

        // IF RESULT: emit result
        emit("emitResponseData", response.data.results);
      })
      .catch((error) => {
        // IF API ERROR: emit API's error
        if (error.response && error.response.data) {
          emit("emitErrorMsg", error.response.data.status_message);
        } else {
          emit(
            "emitErrorMsg",
            "Oh no, it looks like there has been an problem: " +
              error.message +
              "!"
          );
        }
      })
      .finally(() => {
        // WHEN ALL DONE: turn off loader
        emit("emitLoader", false);
      });
  } else {
    // IF EMPTY INPUT: empty ResponseData, ErrorMsg and Loader accordingly
    emit("emitErrorMsg", "");
    emit("emitResponseData", "");
    emit("emitLoader", false);
  }
}

// Debounce function

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const debounceGetMovies = debounce(() => getMovies());
</script>
