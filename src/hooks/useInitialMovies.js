import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState(JSON.parse(localStorage.getItem("initial-movies")) ?? []);
  const [localSearchedMovies, setLocalSearchedMovies] = React.useState(JSON.parse(localStorage.getItem("user-searched-movies")) ?? []);
  const [searchedFilmName, setSearchedFilmName] = React.useState(JSON.parse(localStorage.getItem("user-searched-film-name")) ?? '');
  const [checkboxStatus, setCheckboxStatus] = React.useState(false);

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
      if (checkboxStatus) {
        return (movie.nameRU.toLowerCase().includes(searchedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedFilmName.toLowerCase())) && movie.duration < 40
      } else {
        return movie.nameRU.toLowerCase().includes(searchedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedFilmName.toLowerCase())
      } 
    });
    localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies));
    return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")))
  }, [checkboxStatus, localMovies]);

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

  const handleChangeCheckboxStatus = (e) => {
    if (e.target.checked) {
      setCheckboxStatus(true)
      console.log('✅ Checkbox is checked');
    } else {
      setCheckboxStatus(false)
      console.log('⛔️ Checkbox is NOT checked');
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
    handleChangeCheckboxStatus,
    clearLocalState
  }
}

export default useInitialMovies;