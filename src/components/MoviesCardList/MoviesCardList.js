import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ localMovies }) {

  return(
    <section className="movie-card-list">
      <ul className="movie-card-list__items">
        {localMovies.map(movie => <MoviesCard movie={movie} key={movie.id ? movie.id : movie.movieId}/>)}
      </ul>
      <button className="movie-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;