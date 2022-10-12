import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies({ isPathMovies }) {

  return(
    <main className="movies">
      <Header 
      isMainPage={false} />
      <SearchForm />
      <MoviesCardList onPathMovies={isPathMovies} />
      <Footer />
    </main>
  )
}

export default Movies;