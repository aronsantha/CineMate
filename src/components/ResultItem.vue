<template>
  <!-- If poster image exists, only show component when poster image has loaded -->
  <div
    v-show="isImgLoaded || !movie.poster_path"
    class="rounded-md overflow-hidden mb-5 last:mb-0 bg-stone-900 flex flex-wrap gap-x-8 justify-start h-40 sm:h-auto shadow-md shadow-rose-900/75"
  >
    <img
      v-if="movie.poster_path"
      :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
      @load="onImgLoad()"
      class="h-full w-auto sm:w-full basis-2/12"
    />

    <img
      v-else
      src="../assets/images/placeholder.png"
      class="w-3/2 h-full sm:w-full basis-2/12"
    />

    <div class="basis-9/12 sm:basis-full py-5 sm:px-5">
      <div class="flex flex-wrap justify-between mb-3">
        <div class="text-base sm:text-sm font-medium sm:basis-9/12">
          {{ movie.title }}
          <span class="text-neutral-400 pl-1">
            ({{ movie.release_date.slice(0, 4) }})
          </span>
          <div class="text-sm sm:text-xs text-neutral-400">
            {{ movie.vote_average }}<span class="text-neutral-500"> /10</span>
          </div>
        </div>
        <div v-if="!isSaved" @click="onSave(movie)" class="cursor-pointer">
          <i
            class="fa-regular fa-star fa-lg leading-8 text-rose-900 hover:scale-125 ease-in-out"
          ></i>
        </div>
        <span v-else @click="onRemove(movie)" class="cursor-pointer"
          ><i
            class="fa-solid fa-star fa-lg leading-8 text-rose-900 hover:scale-125 ease-in-out"
          ></i
        ></span>
      </div>

      <div class="text-xs pr-12 sm:p-0 line-clamp-3">{{ movie.overview }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMovieStore } from "../stores/MovieStore";

const MovieStore = useMovieStore();
const props = defineProps(["movie"]);

function onSave(movie) {
  MovieStore.addMovie(movie);
}

function onRemove(movie) {
  MovieStore.removeMovie(movie);
}

const isImgLoaded = ref(false);
function onImgLoad() {
  isImgLoaded.value = true;
}

// Check if movie is among savedMovies
const isSaved = computed(() => {
  return MovieStore.savedMovies.some(
    (savedMovie) => savedMovie.id === props.movie.id
  );
});
</script>
