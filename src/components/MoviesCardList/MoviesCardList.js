import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  return(
    <section className="movie-card-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  )
}

export default MoviesCardList;