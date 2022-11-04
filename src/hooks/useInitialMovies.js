import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState(JSON.parse(localStorage.getItem("initial-movies")) ?? []);
  const [localSearchedMovies, setLocalSearchedMovies] = React.useState(JSON.parse(localStorage.getItem("user-searched-movies")) ?? []);
  const [searchedFilmName, setSearchedFilmName] = React.useState('');

async function getSavedMovies() {
  await getInitialMovies()
    .then((movies) => {
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
  return JSON.parse(localStorage.getItem("initial-movies"))
};

const searchFilm = React.useCallback(async (searchedFilmName) => {
  console.log('film', searchedFilmName) 
  console.log('localMovies', localMovies)
  const searchedMovies = localMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchedFilmName.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchedFilmName.toLowerCase()));
  console.log('searchedMovies', searchedMovies)
  localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies))
  return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")))
}, [localMovies])

React.useEffect(() => {
  searchFilm(searchedFilmName)
}, [searchFilm, searchedFilmName])

console.log('localSearchedMovies', localSearchedMovies)


// async function searchFilm(film) {
//   await (localMovies.length !== 0)
//   .then(() => {
//     const searchedMovies = localMovies.filter((movie) => movie.nameRU.toLowerCase().includes(film.toLowerCase()) || movie.nameEN.toLowerCase().includes(film.toLowerCase()));
//     console.log('searchedMovies', searchedMovies)
//     return localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies))
//   })
// }

// const searchFilm = (film) => {
//   const searchedMovies = localMovies.filter((movie) => movie.nameRU.toLowerCase().includes(film.toLowerCase()) || movie.nameEN.toLowerCase().includes(film.toLowerCase()));
//     console.log('searchedMovies', searchedMovies)
//     return localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies))
// }

async function handleSearchFilm(filmName) {
  if (!JSON.parse(localStorage.getItem("initial-movies"))) {
    getSavedMovies()
    .then((res) => {
      setLocalMovies(res)
      setSearchedFilmName(filmName)
    })

  } else {
    searchFilm(filmName);
  }
}

// React.useEffect(() => {
//   if (localMovies) {
//     searchFilm(filmName)
//   }
// }, [localMovies, filmName])

  // async function handleSearchFilm(filmName) {
  //   if (!JSON.parse(localStorage.getItem("initial-movies"))) {
  //     getSavedMovies()
  //     .then((res) => {
  //       setLocalMovies(res)
  //       return res
  //     })
  //     .then(() => searchFilm(filmName))
  
  // //     let promise = getSavedMovies()
  // //     let result = await promise;
      
  // // setLocalMovies(result);
  // // searchFilm(filmName);
  //   } else {
  //     searchFilm(filmName);
  //   }
  
  //   }

  // console.log('localMovies', localMovies.length)

// async function handleSearchFilm(filmeName) {
//   await getInitialMovies()
//     .then((movies) => {
//     const searchedMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(filmeName.toLowerCase()) || movie.nameEN.toLowerCase().includes(filmeName.toLowerCase()));
//     // console.log('searchedMovies', searchedMovies)
//     return searchedMovies
//     })
//     .then((searchedMovies) => {
//       localStorage.setItem("user-searched-movies", JSON.stringify(searchedMovies));
//     })
//     .catch(err => {
//       console.log(err)
//     })
//     return setLocalSearchedMovies(JSON.parse(localStorage.getItem("user-searched-movies")))
// }

  // console.log('localMovies === 0', JSON.parse(localStorage.getItem("initial-movies")))
  // console.log('localMovies', localMovies)

  const clearLocalState = React.useCallback(() => {
      setLocalMovies([]);
      setLocalSearchedMovies([]);
  }, []);

  return {
    getSavedMovies,
    handleSearchFilm,
    localMovies,
    localSearchedMovies,
    clearLocalState
  }
}

export default useInitialMovies;