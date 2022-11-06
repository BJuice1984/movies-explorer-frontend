import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies({
  getSavedMovies,
  handleSearchFilm,
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

  return(
    <main className="movies">
      <Header />
      <SearchForm
        handleSearchFilm={handleSearchFilm}
        searchedFilmName={searchedFilmName}
        handleChangeCheckboxStatus={handleChangeCheckboxStatusPathMovies}
        checkboxStatus={checkboxStatusPathMovies}
        handleGetUserMovies={handleGetUserMovies} />
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