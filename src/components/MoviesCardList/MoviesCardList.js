import React from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, handleGetUserMovies, handleAddUserMovie }) {
  const [isMoviesPage, setIsMoviesPage] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsMoviesPage(false);
    } else {
      setIsMoviesPage(true);
    }
  }, [location]);

  return(
    <section className="movie-card-list">
      <ul className="movie-card-list__items">
        {movies.map(movie => <MoviesCard movie={movie} key={movie.id ? movie.id : movie.movieId} handleAddUserMovie={handleAddUserMovie}/>)}
      </ul>
      <button
        className={`movie-card-list__btn ${isMoviesPage ? '' : 'movie-card-list__btn_type_disable'}`}
        type="button" 
        aria-label="Показать ещё">Ещё</button>
    </section>
  )
}

export default MoviesCardList;