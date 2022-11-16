import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import './SavedMovies.css'

function SavedMovies({
  localUserMovies,
  handleSearchSavedFilm,
  searchedSavedFilmName,
  handleGetUserMovies,
  handleDeleteUserMovie,
  handleChangeCheckboxStatusPathSavedMovies,
  isUserMoviesLoading,
  isFirstLoading,
  isSavedMoviesError,
  checkboxStatusPathSavedMovies
}) {

  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    if ((localUserMovies.length === 0 && isFirstLoading) && !checkboxStatusPathSavedMovies) {
      handleGetUserMovies(currentUser)
    }
  }, [checkboxStatusPathSavedMovies, currentUser, handleGetUserMovies, isFirstLoading, localUserMovies.length]);

  return(
    <>
    <Header />
    <main className="movies">
      <SearchForm
        userMovies={localUserMovies}
        handleChangeCheckboxStatus={handleChangeCheckboxStatusPathSavedMovies}
        checkboxStatus={checkboxStatusPathSavedMovies}
        handleSearchFilm={handleSearchSavedFilm}
        searchedFilmName={searchedSavedFilmName}
        isLoading={isUserMoviesLoading}
        handleGetUserMovies={handleGetUserMovies} />
      <MoviesCardList
        movies={localUserMovies}
        isLoading={isUserMoviesLoading}
        isError={isSavedMoviesError}
        handleDeleteUserMovie={handleDeleteUserMovie} />
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;