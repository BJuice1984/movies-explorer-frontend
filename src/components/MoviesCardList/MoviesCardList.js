import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, handleAddUserMovie }) {

  return(
    <section className="movie-card-list">
      <ul className="movie-card-list__items">
        {movies.map(movie => <MoviesCard movie={movie} key={movie.id ? movie.id : movie.movieId} handleAddUserMovie={handleAddUserMovie}/>)}
      </ul>
      <button className="movie-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;