import React from "react";
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, localUserMovies, handleAddUserMovie, handleDeleteUserMovie }) {
  const [isMoviesPage, setIsMoviesPage] = React.useState(false);
  const [savedMovie, setSavedMovie] = React.useState(false);
  const [handledMovie, setHandledMovie] = React.useState({})
  const location = useLocation();

  // console.log('savedMovie', savedMovie)
  // console.log('!isMoviesPage', !isMoviesPage)
  // console.log('localUserMovies', localUserMovies)
  // console.log('handledMovie', handledMovie)

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      setIsMoviesPage(true);
    } else {
      setIsMoviesPage(false);
    }
  }, [location]);
  
  React.useEffect(() => {
    if (localUserMovies) {
      localUserMovies.forEach(localUserMovie => {
        // console.log('localUserMovie.nameRU', localUserMovie)
        // console.log('movie.nameRU', movie.id)
        if (localUserMovie.nameRU === movie.nameRU && localUserMovie.movieId === movie.id) {
          setSavedMovie(true);
          setHandledMovie(localUserMovie)
        }
      })
    }
  }, [movie, localUserMovies])

  function saveMovie() {
    if (savedMovie || !isMoviesPage) {
      setSavedMovie(false);
      // console.log('tap', movie)
      // console.log('handledMovie === 0', Object.keys(handledMovie).length === 0)
      // console.log('handledMovie', handledMovie)
      handleDeleteUserMovie(Object.keys(handledMovie).length === 0 ? movie : handledMovie);
    } else {
      setSavedMovie(true);
      handleAddUserMovie(movie);
                                            console.log('убрать запрос на сервер из MainApi')
    }
  }

                                            // movie.image.url???

  return(
    <article className="element">
      <h2 className="element__title">{movie.nameRU}</h2>
      <p className="element__duration">{movie.duration}</p>
      <img className="element__pic" src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt="Картинка постер фильма"></img> 
      <button 
        className={`element__like-button ${!isMoviesPage ? 'element__like-button_type_delete' : ''} ${savedMovie ? 'element__like-button_type_save' : ''}`} 
        type="button" 
        onClick={saveMovie}
        aria-label="Сохранить">{!isMoviesPage || savedMovie ? '' : 'Сохранить'}
      </button>
    </article>
  )
}

export default MoviesCard;