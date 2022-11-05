import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState(JSON.parse(localStorage.getItem("user-movies")) ?? []);
  const [checkboxStatusPathSavedMovies, setCheckboxStatusPathSavedMovies] = React.useState(JSON.parse(localStorage.getItem("checkbox-path-savedMovies-status")) ?? false);

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
    nameEN,}) {
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
    })
    .then((movie) => {
      localStorage.setItem("user-movies", JSON.stringify([movie, ...localUserMovies]));
    })
    .catch(err => {
      console.log(err);
    })
    return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
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

  const handleChangeCheckboxStatusPathSavedMovies = (e) => {
    if (e.target.checked) {
      localStorage.setItem("checkbox-path-savedMovies-status", JSON.stringify(true))
      return setCheckboxStatusPathSavedMovies(true)
    } else {
      localStorage.setItem("checkbox-path-savedMovies-status", JSON.stringify(false))
      return setCheckboxStatusPathSavedMovies(false)
    }
  };

  const clearLocalUserState = React.useCallback(() => {
    setLocalUserMovies([]);
    setCheckboxStatusPathSavedMovies(false)
  }, []);

  return {
    localUserMovies,
    handleChangeCheckboxStatusPathSavedMovies,
    checkboxStatusPathSavedMovies,
    clearLocalUserState,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;