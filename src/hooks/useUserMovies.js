import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState([]);
  console.log('localUserMovies', localUserMovies)

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
      console.log('ответ', movie)
      setLocalUserMovies([movie, ...localUserMovies])   // При добавлении не приходит id, только после обновления страницы
    })
  };

  const handleDeleteUserMovie = (movie) => { 
    console.log(movie._id)   // Добавить ли проверку movie.owner === currentUser.userID?
    deleteUserMovie(movie._id)
    .then(() => {
      setLocalUserMovies((prevMovies) => {
        return prevMovies.filter(m => m._id !== movie._id)  // При добавлении не приходит id, только после обновления страницы
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleGetUserMovies = React.useCallback(async (currentUser) => {
    // console.log('currentUser.userID', currentUser.userID)

    await getUserMovies()
        .then((movies) => {
          // console.log('getUserMovies',movies)
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
    setLocalUserMovies,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;