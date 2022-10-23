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

  function handleGetUserMovies() {
    getUserMovies()
    .then((movies) => {
      console.log('useUserMovies', localUserMovies)
      console.log(movies)
      setLocalUserMovies(movies);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // function handleGetUserMovies() {
  //   getUserMovies()
  //   .then((movies) => {
  //     console.log(movies)
  //     localStorage.setItem("user-movies", JSON.stringify(movies));
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // function handleGetUserMovies() {
  //   if (localUserMovies.length === 0) {
  //     getUserMovies()
  //       .then((movies) => {
  //         localStorage.setItem("user-movies", JSON.stringify(movies));
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))

  //   } else {
  //     setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  //   }
  // }

  //   React.useEffect(() => {
  //     if (localUserMovies.length === 0) {
  //           getUserMovies()
  //             .then((movies) => {
  //               localStorage.setItem("user-movies", JSON.stringify(movies));
  //             })
  //             .catch(err => {
  //               console.log(err)
  //             })
  //           return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
      
  //         } else {
  //           setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  //         }
  // }, [localUserMovies.length])

    // React.useEffect(() => {
    //   handleGetUserMovies()
    // },[])

    

  return {
    localUserMovies,
    handleAddUserMovie,
    handleGetUserMovies
  }
}

export default useUserMovies;