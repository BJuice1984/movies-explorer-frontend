import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'
import { CurrentUserContext } from "../../context/CurrnetUserContext";

function Movies({
  getSavedMovies,
  localMovies,
  localUserMovies,
  handleLoadMore,
  numberOfFilms,
  handleGetUserMovies,
  handleAddUserMovie,
  handleDeleteUserMovie
}) {

  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    if (localUserMovies.length === 0) {
      handleGetUserMovies(currentUser)
    }
  }, [currentUser, handleGetUserMovies, localUserMovies.length]);

  return(
    <main className="movies">
      <Header />
      <SearchForm
        getSavedMovies={getSavedMovies} />
      <MoviesCardList
        handleAddUserMovie={handleAddUserMovie}
        handleDeleteUserMovie={handleDeleteUserMovie}
        localUserMovies={localUserMovies}
        handleLoadMore={handleLoadMore}
        numberOfFilms={numberOfFilms}
        movies={localMovies} />
      <Footer />
    </main>
  )
}

export default Movies;