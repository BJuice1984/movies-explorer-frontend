import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import './SearchForm.css';

function SearchForm({ getSavedMovies, handleSearchFilm, searchedFilmName, handleChangeCheckboxStatus, checkboxStatus, handleGetUserMovies }) {

  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const [filmInputValue, setFilmInputValue] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchedFilmName) {
      handleSearchFilm(filmInputValue);
      console.log('Searc', searchedFilmName)
    } else {
      await handleGetUserMovies(currentUser);
      handleSearchFilm(filmInputValue)
    }
  };

  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__input-form" onSubmit={handleSubmit}>
          <label className="search-form__input-form-label">
            <input
            onInput={e => setFilmInputValue(e.target.value)}
            placeholder="Фильм"
            defaultValue={searchedFilmName}
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
            <input type="checkbox"
            onChange={handleChangeCheckboxStatus}
            defaultChecked={checkboxStatus} />
            <span className="slider"></span>
          </label>
          <p className="search-form__span">Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;