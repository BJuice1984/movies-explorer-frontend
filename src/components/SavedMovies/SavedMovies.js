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
  checkboxStatusPathSavedMovies
}) {

  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    if (localUserMovies.length === 0 && !checkboxStatusPathSavedMovies) {
      handleGetUserMovies(currentUser)
    }
  }, [checkboxStatusPathSavedMovies, currentUser, handleGetUserMovies, localUserMovies.length]);

  return(
    <main className="movies">
      <Header />
      <SearchForm
        handleChangeCheckboxStatus={handleChangeCheckboxStatusPathSavedMovies}
        checkboxStatus={checkboxStatusPathSavedMovies}
        handleSearchFilm={handleSearchSavedFilm}
        searchedFilmName={searchedSavedFilmName}
        handleGetUserMovies={handleGetUserMovies} />
      <MoviesCardList
        movies={localUserMovies}
        handleDeleteUserMovie={handleDeleteUserMovie} />
      <Footer />
    </main>
  )
}

export default SavedMovies;