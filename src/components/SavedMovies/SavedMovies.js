import React from "react";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css'

function SavedMovies() {

  return(
    <main className="movies">
      <Header isMainPage={false}/>
      <BurgerMenu />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  )
}

export default SavedMovies;