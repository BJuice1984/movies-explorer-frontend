import React from "react";
import { getInitialMovies } from "../utils/MoviesApi";

function useInitialMovies() {

  const [localMovies, setLocalMovies] = React.useState([]);

  async function getSavedMovies() {
    await getInitialMovies()
    .then((movies) => {
      // console.log(movies)
      localStorage.setItem("initial-movies", JSON.stringify(movies));
      // setLocalMovies(movies);
    })
    .catch(err => {
      console.log(err)
    })
    return setLocalMovies(JSON.parse(localStorage.getItem("initial-movies")))
  };
 
  // console.log('useInit', localMovies)

  // const [localMovies, setLocalMovies] = React.useState(() => getSavedMovies)

  // const getAllMoviesToLocal = () => {
  //   getInitialMovies()
  //   .then((movies) => {
  //     // console.log(movies)
  //     localStorage.setItem("initial-movies", JSON.stringify(movies));
  //     setLocalMovies(movies);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
  // React.useEffect(() => {
  //   getInitialMovies()
  //   .then((movies) => {
  //     // console.log(movies)
  //     localStorage.setItem("initial-movies", JSON.stringify(movies));
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, []);

  return {
    getSavedMovies,
    localMovies
  }
}

export default useInitialMovies;