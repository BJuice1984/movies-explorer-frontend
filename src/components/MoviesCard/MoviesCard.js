import React from "react";
import './MoviesCard.css';
import moviePic from '../../images/student-photo.jpg'

function MoviesCard({ onPathMovies }) {

  const [savedMovie, setSavedMovie] = React.useState(false);

  function saveMovie() {
    if (savedMovie || !onPathMovies) {
      setSavedMovie(false);
    } else {
      setSavedMovie(true);
    }
  }

  return(
    <article className="element">
      <h2 className="element__title">В погоне за Бенкси</h2>
      <p className="element__duration">27 минут</p>
      <img className="element__pic" src={moviePic} alt="Картинка постер фильма"></img>
      <button 
        className={`element__like-button ${!onPathMovies ? 'element__like-button_type_delete' : ''} ${savedMovie ? 'element__like-button_type_save' : ''}`} 
        type="button" 
        onClick={saveMovie}
        aria-label="Сохранить">{!onPathMovies || savedMovie ? '' : 'Сохранить'}
      </button>
    </article>
  )
}

export default MoviesCard;