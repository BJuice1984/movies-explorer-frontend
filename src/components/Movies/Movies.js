import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies({
  handleSearchFilm,
  localSearchedMovies,
  searchedFilmName,
  localUserMovies,
  handleLoadMore,
  numberOfFilms,
  handleChangeCheckboxStatusPathMovies,
  checkboxStatusPathMovies,
  isLoading,
  isError,
  isUserMoviesLoading,
  handleGetUserMovies,
  handleAddUserMovie,
  handleDeleteUserMovie
}) {

  return(
    <>
    <Header />
    <main className="movies">
      <SearchForm
        handleSearchFilm={handleSearchFilm}
        searchedFilmName={searchedFilmName}
        handleChangeCheckboxStatus={handleChangeCheckboxStatusPathMovies}
        checkboxStatus={checkboxStatusPathMovies}
        isLoading={isLoading}
        userMovies={localSearchedMovies}
        handleGetUserMovies={handleGetUserMovies} />
      <MoviesCardList
        handleAddUserMovie={handleAddUserMovie}
        handleDeleteUserMovie={handleDeleteUserMovie}
        localUserMovies={localUserMovies}
        handleLoadMore={handleLoadMore}
        numberOfFilms={numberOfFilms}
        isLoading={isUserMoviesLoading}
        isError={isError}
        movies={localSearchedMovies} />
    </main>
    <Footer />
    </>
  )
}

export default Movies;