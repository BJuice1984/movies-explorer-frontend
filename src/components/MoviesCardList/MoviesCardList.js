import React from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, localUserMovies, handleAddUserMovie, handleDeleteUserMovie }) {
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
        {movies.map(movie =>
          <MoviesCard
            movie={movie}
            localUserMovies={localUserMovies}
            key={movie._id ? movie._id : movie.id}
            handleAddUserMovie={handleAddUserMovie}
            handleDeleteUserMovie={handleDeleteUserMovie}/>
        )}
      </ul>
      <button
        className={`movie-card-list__btn ${isMoviesPage ? '' : 'movie-card-list__btn_type_disable'}`}
        type="button" 
        aria-label="Показать ещё">Ещё</button>
    </section>
  )
}

export default MoviesCardList;