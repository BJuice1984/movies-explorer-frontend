import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';
import { SHORT_MOVIE_DURATION } from '../constants/constatnts';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState(JSON.parse(localStorage.getItem("user-movies")) ?? []);
  const [checkboxStatusPathSavedMovies, setCheckboxStatusPathSavedMovies] = React.useState(JSON.parse(localStorage.getItem("checkbox-path-savedMovies-status")) ?? false);
  const [searchedSavedFilmName, setSearchedSavedFilmName] = React.useState(JSON.parse(localStorage.getItem("user-searched-saved-film-name")) ?? '');

  async function handleAddUserMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
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
      id,
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

  async function handleDeleteUserMovie(movie) {
    await deleteUserMovie(movie)
    .then((movie) => {
      const filtredMovies = localUserMovies.filter((film) => film._id !== movie._id);
      return filtredMovies
    })
    .then((filtredMovies) => {
      localStorage.setItem("user-movies", JSON.stringify(filtredMovies));
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  }

  const handleGetUserMovies = React.useCallback(async (currentUser) => {
    await getUserMovies()
      .then((movies) => {
        const filtredMovies = movies.filter((movie) => movie.owner === currentUser.userID);
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

  // console.log('searchedSavedFilmName', searchedSavedFilmName)
  // console.log('localUserMovies', localUserMovies)

  // React.useEffect(() => {
  //   setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")));
  //   const searchedMovies = localUserMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchedSavedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedSavedFilmName.toLowerCase()));
  //   return setLocalUserMovies(searchedMovies)
  // }, [localUserMovies, searchedSavedFilmName]);

  // const searchSavedFilm = React.useCallback(async (filmName) => {
  //   const searchedMovies = localUserMovies.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmName.toLowerCase()));
  //   localStorage.setItem("user-movies", JSON.stringify(searchedMovies));
  //   return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  // }, []);

  //   React.useEffect(() => {
  //     searchSavedFilm(searchedSavedFilmName);
  // }, []);

  // React.useEffect(() => {
  //   setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")) ?? []);
  //   console.log('useEffff')
  // }, [searchedSavedFilmName]);
  
  const updateLocalStorageFilmeName = (name) => {
    localStorage.setItem("user-searched-saved-film-name", JSON.stringify(name));
    return setSearchedSavedFilmName(JSON.parse(localStorage.getItem("user-searched-saved-film-name")))
  }

    function handleSearchSavedFilm(filmName) {
      updateLocalStorageFilmeName(filmName)
    const searchedMovies = JSON.parse(localStorage.getItem("user-movies")).filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmName.toLowerCase()));
    return setLocalUserMovies(searchedMovies)
  }

  const handleChangeCheckboxStatusPathSavedMovies = (e) => {
    if (e.target.checked) {
      localStorage.setItem("checkbox-path-savedMovies-status", JSON.stringify(true))
      return setCheckboxStatusPathSavedMovies(true)
    } else {
      localStorage.setItem("checkbox-path-savedMovies-status", JSON.stringify(false))
      return setCheckboxStatusPathSavedMovies(false)
    }
  };

  React.useEffect(() => {
    if (checkboxStatusPathSavedMovies) {
      setLocalUserMovies((prevMovies) => {
        return prevMovies.filter(m => m.duration < SHORT_MOVIE_DURATION)
      })
    } else {
      setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")) ?? [])
    }
  }, [checkboxStatusPathSavedMovies])

  const clearLocalUserState = React.useCallback(() => {
    setLocalUserMovies([]);
    setCheckboxStatusPathSavedMovies(false);
    setSearchedSavedFilmName('');
  }, []);

  return {
    localUserMovies,
    handleSearchSavedFilm,
    searchedSavedFilmName,
    handleChangeCheckboxStatusPathSavedMovies,
    checkboxStatusPathSavedMovies,
    clearLocalUserState,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;