import React from "react";
import './SearchForm.css'

function SearchForm({ getSavedMovies }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    getSavedMovies()
  }

  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__input-form" onSubmit={handleSubmit}>
          <label className="search-form__input-form-label">
            <input
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