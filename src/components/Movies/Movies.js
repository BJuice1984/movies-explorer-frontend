import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies({ isLoggedin, getSavedMovies, localMovies, localUserMovies, handleAddUserMovie, handleDeleteUserMovie }) {

  React.useEffect(() => {
    if (localMovies.length === 0) {
      getSavedMovies()
    }
  }, [])

  return(
    <main className="movies">
      <Header />
      <SearchForm
        isLoggedin={isLoggedin}
        getSavedMovies={getSavedMovies} />
      <MoviesCardList
        handleAddUserMovie={handleAddUserMovie}
        handleDeleteUserMovie={handleDeleteUserMovie}
        localUserMovies={localUserMovies}
        movies={localMovies} />
      <Footer />
    </main>
  )
}

export default Movies;