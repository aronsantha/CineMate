<template>
  <input
    @keyup="debounceGetMovies"
    v-model="search"
    type="string"
    placeholder="Search for movies"
    class="w-full rounded-md p-3 text-md text-neutral-100 placeholder-neutral-400 bg-stone-900 border border-stone-700 focus:bg-stone-800 focus:border-teal-500 focus:shadow-md focus:shadow-teal-500"
    aria-label="Movie title"
  />
</template>

<script setup>
import axios from "axios";
// TODO remove unnecessery imports
import { ref, computed, reactive } from "vue";
const emit = defineEmits(["emitResponseData", "emitErrorMsg", "emitLoader"]);

// Search function

const search = ref("");
const api = "";

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
        // IF NO RESULT: emmitting custom message (because API does not send error message in that case)
        if (response.data.total_results < 1) {
          emit(
            "emitErrorMsg",
            "Sorry, no results for " + search.value + ". Let's try again!"
          );
        }

        // IF RESULT: emmitting result
        emit("emitResponseData", response.data.results);
      })
      .catch((error) => {
        // IF API ERROR: emmitting API's error
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
    // IF EMPTY INPUT: empty ResponseData accordingly
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
