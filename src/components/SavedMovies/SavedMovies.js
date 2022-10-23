import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css'

function SavedMovies({ localUserMovies, handleGetUserMovies }) {

  React.useEffect(() => {
    console.log('savedmovies')
    handleGetUserMovies()
  }, [])

  // React.useEffect(() => {
  //   if (localUserMovies) {
  //     handleGetUserMovies()
  //   }
    
  // }, [])

  return(
    <main className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList
      movies={localUserMovies}
      handleGetUserMovies={handleGetUserMovies} />
      <Footer />
    </main>
  )
}

export default SavedMovies;