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

  handleDeleteUserMovie
}) {
  const [isMoviesPage, setIsMoviesPage] = React.useState(true);
  const location = useLocation();

  // console.log('movies', movies)
  // console.log('visibleData', visibleData)


  const slice = movies.slice(0, numberOfFilms)

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
        {slice.map(movie =>
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
        onClick={handleLoadMore}
        aria-label="Показать ещё">Ещё</button>
    </section>
  )
}

export default MoviesCardList;