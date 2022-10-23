import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies({ isLoggedin, getSavedMovies, localMovies, handleAddUserMovie }) {

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
        movies={localMovies} />
      <Footer />
    </main>
  )
}

export default Movies;