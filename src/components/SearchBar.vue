<template>
  <div class="bg-blue-200 p-2 flex gap-5">
    <input
      v-model="search"
      type="string"
      placeholder="Search for movies"
      class="text-3xl p-2"
      aria-label="Movie title"
    />
    <button @click="getMovies">Search</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const emit = defineEmits(["toParent"]);
const search = ref(null);

function getMovies() {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&query=${search.value}&page=1&include_adult=false`
    )
    .then((response) => {
      emit("toParent", response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
