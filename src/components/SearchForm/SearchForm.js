import React from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css'

function SearchForm({ getSavedMovies }) {

  const location = useLocation();

  const [filmInputValue, setFilmInputValue] = React.useState({});

  const handleFilmInput = (e) => {
    setFilmInputValue(e.target.value)
  };

  console.log('setFilmInputValue', filmInputValue)

  const handleSubmit = (e) => {
    e.preventDefault();
    location.pathname === '/saved-movies' ? console.log('savedmovies') : getSavedMovies()
  };

  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__input-form" onSubmit={handleSubmit}>
          <label className="search-form__input-form-label">
            <input
            onChange={handleFilmInput}
            placeholder="Фильм"
            className="search-form__input-text"
            type="search"
            name="search"
            id="search"
            required />
          </label>
          <button className="search-form__button" type="submit">Найти</button>
        </form>
        <div className="search-form__checkbox">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
          <p className="search-form__span">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;