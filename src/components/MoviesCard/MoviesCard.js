import React from "react";
import './MoviesCard.css';
import moviePic from '../../images/student-photo.jpg'

function MoviesCard( {onPathMovies} ) {

  return(
    <article className="element">
      <h2 className="element__title">В погоне за Бенкси</h2>
      <p className="element__duration">27 минут</p>
      <img className="element__pic" src={moviePic} alt="Картинка постер фильма"></img>
      <button className={`element__like-button ${!onPathMovies ? 'element__like-button_type_delete' : ''}`} type="button" aria-label="Сохранить">{!onPathMovies ? '' : 'Сохранить'}</button>
    </article>
  )
}

export default MoviesCard;