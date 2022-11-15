import React from "react";
import { addUserMovie, deleteUserMovie, getUserMovies } from '../utils/MainApi';
import { SHORT_MOVIE_DURATION, MAIN_API_ERROR_MESSAGE, NO_MATCHED_FILMS, TYPE_FILM_NAME, NOT_USER_MOVIE } from '../constants/constatnts';

function useUserMovies() {

  const [localUserMovies, setLocalUserMovies] = React.useState(JSON.parse(localStorage.getItem("user-movies")) ?? []);
  const [localSearchedUserMovies, setLocalSearchedUserMovies] = React.useState(JSON.parse(localStorage.getItem("user-searched-saved-movies")) ?? []);
  const [checkboxStatusPathSavedMovies, setCheckboxStatusPathSavedMovies] = React.useState(JSON.parse(localStorage.getItem("checkbox-path-savedMovies-status")) ?? false);
  const [searchedSavedFilmName, setSearchedSavedFilmName] = React.useState(JSON.parse(localStorage.getItem("user-searched-saved-film-name")) ?? '');
  const [isUserMoviesLoading, setIsUserMoviesLoading] = React.useState(false);
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const [isSavedMoviesError, setIsSavedMoviesError] = React.useState(TYPE_FILM_NAME);

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
    setIsUserMoviesLoading(true);
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
      setTimeout(() => setIsUserMoviesLoading(false), 200);
    })
    .catch(err => {
      console.log(err);
      setIsSavedMoviesError(MAIN_API_ERROR_MESSAGE);
      setTimeout(() => setIsUserMoviesLoading(false), 200);
    })
    return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  };

  async function handleDeleteUserMovie(movie) {
    setIsUserMoviesLoading(true);
    await deleteUserMovie(movie)
    .then((movie) => {
      const filtredMovies = localUserMovies.filter((film) => film._id !== movie._id);
      return filtredMovies
    })
    .then((filtredMovies) => {
      localStorage.setItem("user-movies", JSON.stringify(filtredMovies));
      setTimeout(() => setIsUserMoviesLoading(false), 200);
    })
    .catch(err => {
      console.log(err);
      setIsSavedMoviesError(NOT_USER_MOVIE);
      setTimeout(() => setIsUserMoviesLoading(false), 200);
    })
    return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  }

  const handleGetUserMovies = React.useCallback(async (currentUser) => {
    setIsUserMoviesLoading(true);
    await getUserMovies()
      .then((movies) => {
        const filtredMovies = movies.filter((movie) => movie.owner === currentUser.userID);
        return filtredMovies
      })
      .then((filtredMovies) => {
        localStorage.setItem("user-movies", JSON.stringify(filtredMovies));
      })
      .catch(err => {
        console.log(err);
        setIsSavedMoviesError(MAIN_API_ERROR_MESSAGE);
      })
      .finally(setTimeout(() => setIsUserMoviesLoading(false), 300));
    return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  }, []);
  
  const updateLocalStorageFilmeName = (name) => {
    localStorage.setItem("user-searched-saved-film-name", JSON.stringify(name));
    return setSearchedSavedFilmName(JSON.parse(localStorage.getItem("user-searched-saved-film-name")))
  }

  function handleSearchSavedFilm(filmName) {
    setIsSavedMoviesError('')
    updateLocalStorageFilmeName(filmName);
    setIsFirstLoading(false);
    setIsUserMoviesLoading(true);
    setTimeout(() => setIsUserMoviesLoading(false), 300);
    const searchedMovies = JSON.parse(localStorage.getItem("user-movies"))
      .filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmName.toLowerCase()));
      localStorage.setItem("user-searched-saved-movies", JSON.stringify(searchedMovies));
      if (searchedMovies.length === 0) {
        setTimeout(() => setIsSavedMoviesError(NO_MATCHED_FILMS), 300);
      };
    return setLocalSearchedUserMovies(JSON.parse(localStorage.getItem("user-searched-saved-movies")));
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
      setLocalSearchedUserMovies((prevMovies) => {
        return prevMovies.filter(m => m.duration < SHORT_MOVIE_DURATION)
      })
    } else {
      setLocalSearchedUserMovies(JSON.parse(localStorage.getItem("user-searched-saved-movies")) ?? [])
    }
  }, [checkboxStatusPathSavedMovies])

  const clearLocalUserState = React.useCallback(() => {
    setLocalUserMovies([]);
    setLocalSearchedUserMovies([]);
    setCheckboxStatusPathSavedMovies(false);
    setSearchedSavedFilmName('');
    setIsSavedMoviesError(TYPE_FILM_NAME);
    setIsFirstLoading(true);
  }, []);

  return {
    localUserMovies,
    localSearchedUserMovies,
    handleSearchSavedFilm,
    searchedSavedFilmName,
    handleChangeCheckboxStatusPathSavedMovies,
    checkboxStatusPathSavedMovies,
    isUserMoviesLoading,
    isFirstLoading,
    isSavedMoviesError,
    clearLocalUserState,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;