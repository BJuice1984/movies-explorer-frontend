import React from "react";
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import {BEAT_FILMS_API } from '../../constants/constatnts';
import { HOURS, MINUTES, SAVE } from '../../constants/constatnts';

function MoviesCard({ movie, localUserMovies, handleAddUserMovie, isLoading, handleDeleteUserMovie }) {
  const [isMoviesPage, setIsMoviesPage] = React.useState(false);
  const [savedMovie, setSavedMovie] = React.useState(false);
  const [filmDuration, setFilmDuration] = React.useState({});
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      setIsMoviesPage(true);
    } else {
      setIsMoviesPage(false);
    }
  }, [location]);

  React.useEffect(() => {
    if (localUserMovies) {
      localUserMovies.find(film => film.movieId === movie.id) ? setSavedMovie(true) : setSavedMovie(false);
    }
  }, [localUserMovies, movie.id]);

  React.useEffect(() => {
    setFilmDuration({
      hours: Math.floor(movie.duration / 60),
      minutes: movie.duration % 60
    })
  }, [movie.duration])

  async function saveMovie() {
    if (savedMovie || !isMoviesPage) {
      await handleDeleteUserMovie(movie._id ? movie : localUserMovies.find(film => film.movieId === movie.id));
      setSavedMovie(false);
    } else {
      await handleAddUserMovie(movie);
      setSavedMovie(true);
    }
  }

  return(
    <article className="element">
      <h2 className="element__title">{movie.nameRU}</h2>
      <p className="element__duration">
        {`${filmDuration.hours !== 0 ? filmDuration.hours + HOURS : ''}${filmDuration.minutes !== 0 ? filmDuration.minutes + MINUTES : ''}`}
      </p>
      <a className="element__link" href={movie.trailerLink}>
        <img
          className="element__pic"
          src={movie.image.url ? BEAT_FILMS_API + movie.image.url : movie.image} alt="Картинка постер фильма">
        </img> 
      </a>
      <button 
        className={`element__like-button 
          ${!isMoviesPage ? 'element__like-button_type_delete' : ''} 
          ${savedMovie ? 'element__like-button_type_save' : ''} 
          ${isLoading ? 'element__like-button_type_disabled' : ''}`} 
        type="button" 
        onClick={saveMovie}
        disabled={isLoading}
        aria-label="Сохранить">{!isMoviesPage || savedMovie || isLoading ? '' : SAVE}
      </button>
    </article>
  )
}

export default MoviesCard;