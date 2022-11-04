import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";
import { SHORT_MOVIE_DURATION } from '../constants/constatnts';

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState(JSON.parse(localStorage.getItem("initial-movies")) ?? []);
  const [localSearchedMovies, setLocalSearchedMovies] = React.useState(JSON.parse(localStorage.getItem("user-searched-movies")) ?? []);
  const [searchedFilmName, setSearchedFilmName] = React.useState(JSON.parse(localStorage.getItem("user-searched-film-name")) ?? '');
  const [checkboxStatusPathMovies, setCheckboxStatusPathMovies] = React.useState(JSON.parse(localStorage.getItem("checkbox-path-movies-status")) ?? false);

  async function getSavedMovies() {
    await getInitialMovies()
      .then((movies) => {
        localStorage.setItem("initial-movies", JSON.stringify(movies));
      })
      .catch(err => {
        console.log(err);
      })
    return JSON.parse(localStorage.getItem("initial-movies"))
  };

  const searchFilm = React.useCallback(async (searchedFilmName) => {
    const searchedMovies = localMovies.filter((movie) => {
      if (checkboxStatusPathMovies) {
        return (movie.nameRU.toLowerCase().includes(searchedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedFilmName.toLowerCase())) && movie.duration < SHORT_MOVIE_DURATION
      } else {
        return movie.nameRU.toLowerCase().includes(searchedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedFilmName.toLowerCase())
      } 
    });
    localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies));
    return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")))
  }, [checkboxStatusPathMovies, localMovies]);

  React.useEffect(() => {
    searchFilm(searchedFilmName);
  }, [searchFilm, searchedFilmName]);

  async function handleSearchFilm(filmName) {
    if (!JSON.parse(localStorage.getItem("initial-movies"))) {
      await getSavedMovies()
      .then((res) => {
        setLocalMovies(res);
        localStorage.setItem("user-searched-film-name", JSON.stringify(filmName));
      })
      return setSearchedFilmName(JSON.parse(localStorage.getItem("user-searched-film-name")))
    } else {
      localStorage.setItem("user-searched-film-name", JSON.stringify(filmName));
      return setSearchedFilmName(JSON.parse(localStorage.getItem("user-searched-film-name")))
    }
  }

  const handleChangeCheckboxStatusPathMovies = (e) => {
    if (e.target.checked) {
      localStorage.setItem("checkbox-path-movies-status", JSON.stringify(true))
      // console.log('✅ Checkbox is checked');
      return setCheckboxStatusPathMovies(true)
    } else {
      localStorage.setItem("checkbox-path-movies-status", JSON.stringify(false))
      // console.log('⛔️ Checkbox is NOT checked');
      return setCheckboxStatusPathMovies(false)
    }
  };

  const clearLocalState = React.useCallback(() => {
      setLocalMovies([]);
      setLocalSearchedMovies([]);
      setSearchedFilmName('');
  }, []);

  return {
    getSavedMovies,
    handleSearchFilm,
    localMovies,
    localSearchedMovies,
    searchedFilmName,
    handleChangeCheckboxStatusPathMovies,
    checkboxStatusPathMovies,
    clearLocalState
  }
}

export default useInitialMovies;