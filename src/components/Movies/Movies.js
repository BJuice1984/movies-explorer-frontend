import React from "react";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import './Movies.css'

function Movies() {

  return(
    <main className="movies">
      <Header isMainPage={false}/>
      <BurgerMenu />
      <SearchForm />
      <Footer />
    </main>
  )
}

export default Movies;