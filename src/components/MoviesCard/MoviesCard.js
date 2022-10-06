import React from "react";
import './MoviesCard.css';
import moviePic from '../../images/student-photo.jpg'

function MoviesCard() {

  return(
    <article className="element">
      <h2 className="element__title">В погоне за Бенкси</h2>
      <p className="element__duration">27 минут</p>
      <img className="element__pic" src={moviePic} alt="Картинка постер фильма"></img>
      <button className="element__like-button" type="button" aria-label="Сохранить">Сохранить</button>
    </article>
  )
}

export default MoviesCard;