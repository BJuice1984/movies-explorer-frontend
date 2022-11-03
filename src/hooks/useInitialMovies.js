import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState([]);
  const [localSearchedMovies, setLocalSearchedMovies] = React.useState([]);

function getSavedMovies() {
  getInitialMovies()
    .then((movies) => {
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalMovies(JSON.parse(localStorage.getItem("initial-movies")))
  };

async function handleSearchFilm(filmeName) {
  await getInitialMovies()
    .then((movies) => {
    const searchedMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(filmeName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmeName.toLowerCase()));
    // console.log('searchedMovies', searchedMovies)
    return searchedMovies
    })
    .then((searchedMovies) => {
      localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies));
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")))
}

  // console.log('localMovies === 0', localMovies.length === 0)
  // console.log('localMovies', localMovies)

  const clearLocalState = React.useCallback(() => {
      setLocalMovies([]);
      setLocalSearchedMovies([]);
  }, []);

  return {
    getSavedMovies,
    handleSearchFilm,
    localMovies,
    localSearchedMovies,
    clearLocalState
  }
}

export default useInitialMovies;