<template>
  <div class="bg-red-200 p-5 outline">
    <div>
      {{ movie.original_title }} |
      <span v-if="!isSaved" @click="onSave(movie)">🤍</span>
      <span v-else @click="onRemove(movie)">❤️</span>
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
// TODO remove unnecessery imports
import { ref, computed, reactive } from "vue";
import { useMovieStore } from "../stores/MovieStore";
const MovieStore = useMovieStore();
const props = defineProps(["movie"]);

function onSave(movie) {
  MovieStore.addMovie(movie);
}

function onRemove(movie) {
  MovieStore.removeMovie(movie);
}

const isSaved = computed(() => {
  return MovieStore.savedMovies.some(
    (savedMovie) => savedMovie.id === props.movie.id
  );
});
</script>
