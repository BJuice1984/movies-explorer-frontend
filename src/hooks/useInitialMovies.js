import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState([]);

  async function getSavedMovies() {
    await getInitialMovies()
    .then((movies) => {
      console.log(movies)
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalMovies(JSON.parse(localStorage.getItem("initial-movies")))
  };

  return {
    getSavedMovies,
    localMovies
  }
}

export default useInitialMovies;