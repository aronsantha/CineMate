<template>
  <div class="bg-red-200 p-5 outline">
    <div>
      {{ movie.original_title }} |
      <span class="text-pink-700 font-bold" @click="onSave(movie)">Save</span>
    </div>
    Rating: {{ movie.vote_average }}
    <div class="flex">
      <img
        :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
        v-if="movie.poster_path"
        class="w-40"
      />
      <img v-else class="w-40 h-60" />

      <div>{{ movie.overview }}</div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import { useMovieStore } from "../stores/MovieStore";
const MovieStore = useMovieStore();
const props = defineProps(["movie"]);

function onSave(movie) {
  MovieStore.addMovie(movie);
}
</script>
