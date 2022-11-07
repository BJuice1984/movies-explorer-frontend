import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
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
      {isLoading ? <Preloader/> : <MoviesCardList
        handleAddUserMovie={handleAddUserMovie}
        handleDeleteUserMovie={handleDeleteUserMovie}
        localUserMovies={localUserMovies}
        handleLoadMore={handleLoadMore}
        numberOfFilms={numberOfFilms}
        movies={localSearchedMovies} />}
      <Footer />
    </main>
  )
}

export default Movies;