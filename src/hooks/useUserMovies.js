import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState([]);
  // console.log(localUserMovies)

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

  function handleDeleteUserMovie(movie) {    // Добавить ли проверку movie.owner === currentUser.userID?
    deleteUserMovie(movie.image.id)            //Не приходит movie.id
    .then(() => {
      setLocalUserMovies((prevMovies) => {
        return prevMovies.filter(m => m.movieId !== movie.movie.image.id)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleGetUserMovies = React.useCallback(async (currentUser) => {
    await getUserMovies()
        .then((movies) => {
          const filtredMovies = movies.filter((movie) => movie.owner === currentUser.userID)
          return filtredMovies
        })
        .then((filtredMovies) => {
          localStorage.setItem("user-movies", JSON.stringify(filtredMovies));
        })
        .catch(err => {
          console.log(err)
        })
      return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  }, []);

  return {
    localUserMovies,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;