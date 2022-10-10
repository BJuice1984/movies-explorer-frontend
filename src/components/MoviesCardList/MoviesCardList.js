import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ onPathMovies }) {

  return(
    <section className="movie-card-list">
      <ul className="movie-card-list__items">
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
        <MoviesCard onPathMovies={onPathMovies} />
      </ul>
      <button className="movie-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;