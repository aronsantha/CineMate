<template>
  <div
    v-show="isImgLoaded || !movie.poster_path"
    class="rounded-md p-5 mb-2 last:mb-0 bg-stone-900"
  >
    <div class="flex flex-wrap gap-5 justify-between">
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
        @load="onImgLoad()"
        class="w-[100px] h-2/3 sm:w-full rounded-sm basis-3/12"
      />

      <img
        v-else
        src="../assets/images/img_placeholder.png"
        class="w-[100px] h-2/3 sm:w-full rounded-sm basis-3/12"
      />

      <div class="basis-8/12 sm:basis-full">
        <div class="flex flex-wrap justify-between mb-5">
          <div class="text-base font-medium">
            {{ movie.title }}
            <span class="text-neutral-300 pl-1">
              ({{ movie.release_date.slice(0, 4) }})
            </span>
            <div class="text-sm text-neutral-400 pt-1">
              {{ movie.vote_average }}<span class="text-neutral-500"> /10</span>
            </div>
          </div>
          <div
            v-if="!isSaved"
            @click="onSave(movie)"
            class="cursor-pointer hover:fa-beat"
          >
            <i
              class="fa-regular fa-star fa-lg px-2 leading-8 text-rose-900 hover:scale-125"
            ></i>
          </div>
          <span v-else @click="onRemove(movie)" class="cursor-pointer"
            ><i
              class="fa-solid fa-star fa-lg px-2 leading-8 text-rose-900 hover:scale-125"
            ></i
          ></span>
        </div>

        <div class="text-sm leading-6">{{ movie.overview }}</div>
      </div>
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

const isImgLoaded = ref(false);

function onImgLoad() {
  isImgLoaded.value = true;
}

const isSaved = computed(() => {
  return MovieStore.savedMovies.some(
    (savedMovie) => savedMovie.id === props.movie.id
  );
});
</script>
