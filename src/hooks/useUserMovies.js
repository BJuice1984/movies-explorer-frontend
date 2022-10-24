import React from "react";
import { addUserMovie, getUserMovies } from '../utils/MainApi';

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

  const handleGetUserMovies = React.useCallback(async (currentUser) => {
    await getUserMovies()
        .then((movies) => {
          // movies.forEach(function (arrItem) {
          //   var x = arrItem.owner + 2;
          //   console.log(x)
          // })
          // console.log('currentUser.userID', currentUser.userID)

          const filtredMovies = movies.filter((movie) => movie.owner === currentUser.userID)
          // console.log('filtredMovies', filtredMovies)
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



  // async function handleGetUserMovies() {
  //     await getUserMovies()
  //       .then((movies) => {
  //         localStorage.setItem("user-movies", JSON.stringify(movies));
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  // }

  return {
    localUserMovies,
    handleAddUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;