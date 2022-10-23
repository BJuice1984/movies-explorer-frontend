import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css'

function SavedMovies({ localUserMovies }) {

  return(
    <main className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList
      movies={localUserMovies} />
      <Footer />
    </main>
  )
}

export default SavedMovies;