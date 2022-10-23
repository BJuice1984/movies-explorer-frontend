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

  const handleGetUserMovies = React.useCallback(async() => {
    await getUserMovies()
        .then((movies) => {
          localStorage.setItem("user-movies", JSON.stringify(movies));
        })
        .catch(err => {
          console.log(err)
        })
      return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  }, []);



  // async function handleGetUserMovies() {
  //     await getUserMovies()
  //       .then((movies) => {
  //         localStorage.setItem("user-movies", JSON.stringify(movies));
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  // }

  return {
    localUserMovies,
    handleAddUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;