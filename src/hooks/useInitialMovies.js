import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState([]);

  async function getSavedMovies() {
    await getInitialMovies()
    .then((movies) => {
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalMovies(JSON.parse(localStorage.getItem("initial-movies")))
  };

  const clearLocalState = React.useCallback(() => {
    return setLocalMovies([]);
  }, []);

  return {
    getSavedMovies,
    localMovies,
    clearLocalState
  }
}

export default useInitialMovies;