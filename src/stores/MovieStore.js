// Pinia store following "Setup" syntax
// Read more: https://pinia.vuejs.org/core-concepts/#setup-stores

import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useMovieStore = defineStore("MovieStore", () => {
  const savedMovies = ref([]);

  // If localMovies exists in localStorage, update store

  if (localStorage.getItem("localMovies")) {
    savedMovies.value = JSON.parse(localStorage.getItem("localMovies"));
  }

  // If store changes, update localMovies

  watch(savedMovies.value, setLocalMovies);

  function setLocalMovies() {
    localStorage.setItem("localMovies", JSON.stringify(savedMovies.value));
  }

  // ACTIONS

  function addMovie(movie) {
    // check if movie is already saved
    const isSaved = savedMovies.value.some((object) => {
      if (object.id === movie.id) {
        return true;
      }
      return false;
    });
    // if NOT saved, push movie
    if (!isSaved) {
      savedMovies.value.push(movie);
    }
  }

  function removeMovie(removeId) {
    // get index of object with id of removeId
    const removeIndex = savedMovies.value.findIndex((object) => {
      return object.id === removeId;
    });
    // remove object from savedMovies
    savedMovies.value.splice(removeIndex, 1);
  }

  return { savedMovies, addMovie, removeMovie, setLocalMovies };
});
