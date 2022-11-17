import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import { FIND, FINDING, SHORT_MOVIES, NEED_A_KEY_WORD} from "../../constants/constatnts";
import './SearchForm.css';
import useValidation from "../../hooks/useValidation";

function SearchForm({
  handleSearchFilm,
  searchedFilmName,
  handleChangeCheckboxStatus,
  checkboxStatus,
  isLoading,
  userMovies,
  handleGetUserMovies }) {

  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [filmInputValue, setFilmInputValue] = React.useState(searchedFilmName ?? '');
  const [isFormValid, setIsFormValid] = React.useState(true);

  const currentUser = useContext(CurrentUserContext);

  const {
    isEmptyRowError,
    handleEmptyRow
  } = useValidation();

  React.useEffect(() => {
    if (isLoading) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [isLoading])

  async function handleSubmit(e) {
    setIsFormValid(true);
    e.preventDefault();
    if (isEmptyRowError) {
      setIsFormValid(false);
      return;
    }
    if (searchedFilmName) {
      handleSearchFilm(filmInputValue);
      setButtonDisable(false);
    } else {
      await handleGetUserMovies(currentUser);
      handleSearchFilm(filmInputValue);
      setButtonDisable(false);
    }
  };

  return(
    <section className="search-form">
      <div className="search-form__container">
        <form
          className="search-form__input-form"
          onChange={handleEmptyRow}
          onSubmit={handleSubmit}>
          <label className="search-form__input-form-label">
            <input
            onInput={e => setFilmInputValue(e.target.value)}
            placeholder="Фильм"
            defaultValue={searchedFilmName}
            className={`search-form__input-text ${isFormValid ? '' : 'search-form__input-text_type_not-valid'}`}
            type="search"
            name="search"
            id="search"
            disabled={isLoading}
            minLength="1"
            maxLength="50"
            required />
          </label>
          <button
            className={`search-form__button ${buttonDisable ? 'search-form__button_type_disable' : ''}`}
            type="submit"
            disabled={isLoading || buttonDisable}
            aria-label="Найти">{isLoading ? FINDING : FIND}</button>
        </form>
        {!isFormValid && <p className="search-form__input-error">{NEED_A_KEY_WORD}</p>}
        <div className="search-form__checkbox">
          <label className="switch">
            <input
              type="checkbox"
              disabled={isLoading ? true : false}
              onChange={handleChangeCheckboxStatus}
              defaultChecked={checkboxStatus} />
            <span className={`slider ${isLoading ? 'slider_type_disable' : ''}`}></span>
          </label>
          <p className="search-form__span">{SHORT_MOVIES}</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;