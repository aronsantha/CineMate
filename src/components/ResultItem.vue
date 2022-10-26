<template>
  <div class="bg-red-200 p-5 outline outline-1">
    <div>{{ movie.original_title }}</div>
    Rating: {{ movie.vote_average }}
    <div>{{ movie.overview }}</div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
const props = defineProps(["movie"]);
</script>
