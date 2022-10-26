<template>
  <div class="bg-red-200 p-5 outline">
    <div>{{ movie.original_title }}</div>
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
const props = defineProps(["movie"]);
</script>
