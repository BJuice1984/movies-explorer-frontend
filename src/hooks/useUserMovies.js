import React from "react";
import { addUserMovie, getUserMovies } from '../utils/MainApi';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState([]);

  async function handleAddUserMovie({
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
  }) {
    await addUserMovie({
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
    });
    await getUserMovies()
    .then((movies) => {
      setLocalUserMovies(movies)
    })
    return
  };

  return {
    localUserMovies,
    handleAddUserMovie
  }
}

export default useUserMovies;