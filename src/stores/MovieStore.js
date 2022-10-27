import { defineStore } from "pinia";

export const useMovieStore = defineStore("MovieStore", {
  state() {
    return {
      savedMovies: [],
    };
  },
  actions: {
    addMovie(movie) {
      // check if movie is already saved
      const isSaved = this.savedMovies.some((object) => {
        if (object.id === movie.id) {
          return true;
        }
        return false;
      });
      // if NOT saved, push movie
      if (!isSaved) {
        this.savedMovies.push(movie);
      }
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
