import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  return(
    <section className="movie-card-list">
      <ul className="movie-card-list__items">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movie-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;