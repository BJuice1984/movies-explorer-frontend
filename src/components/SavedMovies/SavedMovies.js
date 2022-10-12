import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css'

function SavedMovies() {

  return(
    <main className="movies">
      <Header isMainPage={false}/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  )
}

export default SavedMovies;