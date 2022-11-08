import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import './SearchForm.css';

function SearchForm({
  handleSearchFilm,
  searchedFilmName,
  handleChangeCheckboxStatus,
  checkboxStatus,
  isLoading,
  handleGetUserMovies }) {

  const currentUser = useContext(CurrentUserContext);

  const [filmInputValue, setFilmInputValue] = React.useState(searchedFilmName ?? '');

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchedFilmName) {
      handleSearchFilm(filmInputValue);
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
            disabled={isLoading}
            minLength="1"
            maxLength="50"
            required />
          </label>
          <button
            className="search-form__button"
            type="submit"
            disabled={isLoading}
            aria-label="Найти">{isLoading ? 'Ищем...' : 'Найти'}</button>
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