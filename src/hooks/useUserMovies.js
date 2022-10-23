import React from "react";
import { addUserMovie, getUserMovies } from '../utils/MainApi';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState([]);

  function handleAddUserMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,}) {
    addUserMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      setLocalUserMovies([movie, ...localUserMovies])
    })
  };

  function handleGetUserMovies() {
    getUserMovies()
    .then((movies) => {
      setLocalUserMovies(movies)
    })
  }

  return {
    localUserMovies,
    handleAddUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;