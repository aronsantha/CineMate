import { defineStore } from "pinia";

export const useMovieStore = defineStore("MovieStore", {
  state() {
    return {
      savedMovies: [],
    };
  },
  actions: {
    addMovie(movie) {
      this.savedMovies.push(movie);
    },
    removeMovie(removeId) {
      // get index of object with id of removeId
      const removeIndex = this.savedMovies.findIndex((object) => {
        return object.id === removeId;
      });
      // remove object from savedMovies
      this.savedMovies.splice(removeIndex, 1);
    },
  },
});
