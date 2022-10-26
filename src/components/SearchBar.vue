<template>
  <div class="bg-blue-200 p-2 flex gap-5">
    <input
      @keyup="debounceGetMovies"
      v-model="search"
      type="string"
      placeholder="Search for movies"
      class="text-3xl p-2"
      aria-label="Movie title"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const emit = defineEmits(["emitResponseData", "emitErrorMsg", "emitLoader"]);

// Search function

const search = ref(null);
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
          emit("emitErrorMsg", "Sorry, no results for your search!");
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
            "Oh no, it looks like there has been an error: " +
              error.message +
              " !"
          );
        }
      })
      .finally(() => {
        // WHEN ALL DONE: turn off loader
        emit("emitLoader", false);
      });
  } else {
    // IF EMPTY INPUT: empty ResponseData accordingly
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
