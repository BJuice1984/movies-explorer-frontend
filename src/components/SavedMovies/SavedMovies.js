import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css'
import { CurrentUserContext } from "../../context/CurrnetUserContext";

function SavedMovies({ localUserMovies, handleGetUserMovies }) {

  const currentUser = useContext(CurrentUserContext);
  // console.log('SavedMovies', currentUser);

  React.useEffect(() => {
    if (localUserMovies.length === 0) {
      handleGetUserMovies(currentUser)
    }
  }, [currentUser, handleGetUserMovies, localUserMovies.length])

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