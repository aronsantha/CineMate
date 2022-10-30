<!-- TODO either remove hover:scale and hover:cursor-pointer, or add extra detail functionality -->
<template>
  <div
    class="w-52 h-80 bg-stone-900 rounded-xl overflow-hidden shadow-md shadow-rose-900/75 sm:w-full sm:h-96 hover:scale-105 hover:cursor-pointer ease-in-out"
  >
    <img
      v-if="savedMovie.poster_path"
      :src="'https://image.tmdb.org/t/p/original' + savedMovie.poster_path"
      class="object-cover object-center w-full h-44 sm:h-60"
      alt="Movie poster"
    />

    <img
      v-else
      src="../assets/images/img_placeholder.png"
      class="object-cover object-center w-full h-44 sm:h-60"
      alt="Movie poster"
    />

    <div class="flex flex-wrap justify-between p-3">
      <div class="text-sm font-medium basis-9/12">
        {{ savedMovie.title }}
        <span class="text-neutral-400">
          ({{ savedMovie.release_date.slice(0, 4) }})
        </span>

        <div class="text-xs text-neutral-400 pt-1">
          {{ savedMovie.vote_average }}<span class="text-neutral-500">/10</span>
        </div>
      </div>
      <span @click="onRemove(savedMovie.id)" class="cursor-pointer"
        ><i
          class="fa-solid fa-star fa-md px-2 leading-8 text-rose-900 hover:scale-125 ease-in-out"
        ></i
      ></span>
      <div class="text-xs mt-4 line-clamp-2">{{ savedMovie.overview }}</div>
    </div>

    <!-- <span @click="onRemove(savedMovie.id)" -->
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
