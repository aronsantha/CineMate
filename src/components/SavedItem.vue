<template>
  <div class="bg-red-200 p-5 outline">
    <div>
      {{ savedMovie.original_title }} |
      <span @click="onRemove(savedMovie.id)"
        ><i class="fa-solid fa-star"></i
      ></span>
    </div>
    Rating: {{ savedMovie.vote_average }}
    <div class="flex">
      <img
        :src="'https://image.tmdb.org/t/p/original' + savedMovie.poster_path"
        v-if="savedMovie.poster_path"
        class="w-40"
      />
      <img v-else class="w-40 h-60" />

      <div>{{ savedMovie.overview }}</div>
    </div>
  </div>
</template>

<script setup>
// TODO remove unnecessery imports
import { ref, computed, reactive } from "vue";
import { useMovieStore } from "../stores/MovieStore";
const MovieStore = useMovieStore();
const props = defineProps(["savedMovie"]);

function onRemove(removeId) {
  MovieStore.removeMovie(removeId);
}
</script>
