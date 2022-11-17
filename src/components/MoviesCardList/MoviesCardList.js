import React from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  localUserMovies,
  handleAddUserMovie,
  handleLoadMore,
  numberOfFilms,
  isLoading,
  isError,
  handleDeleteUserMovie
}) {
  const [isMoviesPage, setIsMoviesPage] = React.useState(true);
  const location = useLocation();  
  const slice = movies.slice(0, numberOfFilms)


console.log('movies', movies)


  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsMoviesPage(false);
    } else {
      setIsMoviesPage(true);
    }
  }, [location]);

  return(
    <section className="movie-card-list">
      <p className={`movie-card-list__info ${slice.length === 0 ? '' : 'movie-card-list__info_type_disable'}`}>{isError}</p>
      <ul className="movie-card-list__items">
        {slice.map(movie =>
          <MoviesCard
            movie={movie}
            localUserMovies={localUserMovies}
            key={movie._id ? movie._id : movie.id}
            handleAddUserMovie={handleAddUserMovie}
            isLoading={isLoading}
            handleDeleteUserMovie={handleDeleteUserMovie}/>
        )}
      </ul>
      <button
        className={`movie-card-list__btn ${isMoviesPage && slice.length !== movies.length ? '' : 'movie-card-list__btn_type_disable'}`}
        type="button"
        onClick={handleLoadMore}
        aria-label="Показать ещё">Ещё</button>
    </section>
  )
}

export default MoviesCardList;