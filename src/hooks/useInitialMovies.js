import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";
import { SHORT_MOVIE_DURATION, MAIN_API_ERROR_MESSAGE, NO_MATCHED_FILMS, TYPE_FILM_NAME } from '../constants/constatnts';

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState(JSON.parse(localStorage.getItem("initial-movies")) ?? []);
  const [localSearchedMovies, setLocalSearchedMovies] = React.useState(JSON.parse(localStorage.getItem("user-searched-movies")) ?? []);
  const [searchedFilmName, setSearchedFilmName] = React.useState(JSON.parse(localStorage.getItem("user-searched-film-name")) ?? '');
  const [checkboxStatusPathMovies, setCheckboxStatusPathMovies] = React.useState(JSON.parse(localStorage.getItem("checkbox-path-movies-status")) ?? false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(TYPE_FILM_NAME);

  async function getSavedMovies() {
    setIsLoading(true);
    await getInitialMovies()
      .then((movies) => {
        localStorage.setItem("initial-movies", JSON.stringify(movies));
      })
      .catch(err => {
        console.log({err})
        setIsError(MAIN_API_ERROR_MESSAGE);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 300));
    return JSON.parse(localStorage.getItem("initial-movies"))
  };

  const searchFilm = React.useCallback(async (filmName) => {
    const searchedMovies = localMovies.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmName.toLowerCase()));
    if (localMovies.length !== 0 && searchedMovies.length === 0) {
      setTimeout(() => setIsError(NO_MATCHED_FILMS), 300);
    };
    localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies));
    return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")));
  }, [localMovies]);

  React.useEffect(() => {
    searchFilm(searchedFilmName);
  }, [searchFilm, searchedFilmName]);

  async function handleSearchFilm(filmName) {
    setIsLoading(true);
    if (!JSON.parse(localStorage.getItem("initial-movies"))) {
      await getSavedMovies()
      .then((res) => {
        setLocalMovies(res);
        localStorage.setItem("user-searched-film-name", JSON.stringify(filmName));
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setTimeout(() => setIsLoading(false), 300));
      return setSearchedFilmName(JSON.parse(localStorage.getItem("user-searched-film-name")))
    } else {
      localStorage.setItem("user-searched-film-name", JSON.stringify(filmName));
      setTimeout(() => setIsLoading(false), 300);
      return setSearchedFilmName(JSON.parse(localStorage.getItem("user-searched-film-name")))
    }
  }

  const handleChangeCheckboxStatusPathMovies = (e) => {
    if (e.target.checked) {
      localStorage.setItem("checkbox-path-movies-status", JSON.stringify(true))
      return setCheckboxStatusPathMovies(true)
    } else {
      localStorage.setItem("checkbox-path-movies-status", JSON.stringify(false))
      return setCheckboxStatusPathMovies(false)
    }
  };

  React.useEffect(() => {
    if (checkboxStatusPathMovies) {
      setLocalSearchedMovies((prevMovies) => {
        return prevMovies.filter(m => m.duration < SHORT_MOVIE_DURATION)
      })
    } else {
      setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")) ?? [])
    }
  }, [checkboxStatusPathMovies])

  const clearLocalState = React.useCallback(() => {
      setLocalMovies([]);
      setLocalSearchedMovies([]);
      setSearchedFilmName('');
      setCheckboxStatusPathMovies(false);
      setIsError(TYPE_FILM_NAME);
      setIsLoading(false);
  }, []);

  return {
    getSavedMovies,
    handleSearchFilm,
    localSearchedMovies,
    searchedFilmName,
    handleChangeCheckboxStatusPathMovies,
    checkboxStatusPathMovies,
    isLoading,
    isError,
    clearLocalState
  }
}

export default useInitialMovies;