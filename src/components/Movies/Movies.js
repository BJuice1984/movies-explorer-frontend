import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'
import { CurrentUserContext } from "../../context/CurrnetUserContext";

function Movies({
  getSavedMovies,
  handleSearchFilm,
  localMovies,
  localSearchedMovies,
  searchedFilmName,
  localUserMovies,
  handleLoadMore,
  numberOfFilms,
  handleChangeCheckboxStatusPathMovies,
  checkboxStatusPathMovies,
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

  console.log('localUserMoviesMOVIES',localUserMovies)

  return(
    <main className="movies">
      <Header />
      <SearchForm
        getSavedMovies={getSavedMovies}
        handleSearchFilm={handleSearchFilm}
        searchedFilmName={searchedFilmName}
        handleChangeCheckboxStatus={handleChangeCheckboxStatusPathMovies}
        checkboxStatus={checkboxStatusPathMovies} />
      <MoviesCardList
        handleAddUserMovie={handleAddUserMovie}
        handleDeleteUserMovie={handleDeleteUserMovie}
        localUserMovies={localUserMovies}
        handleLoadMore={handleLoadMore}
        numberOfFilms={numberOfFilms}
        movies={localSearchedMovies} />
      <Footer />
    </main>
  )
}

export default Movies;