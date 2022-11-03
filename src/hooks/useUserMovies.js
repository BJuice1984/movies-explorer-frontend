import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';

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

  const handleDeleteUserMovie = (movie) => {
    deleteUserMovie(movie._id)
    .then(() => {
      setLocalUserMovies((prevMovies) => {
        return prevMovies.filter(m => m._id !== movie._id)
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

  const clearLocalUserState = React.useCallback(() => {
    setLocalUserMovies([]);
  }, []);

  return {
    localUserMovies,
    clearLocalUserState,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;