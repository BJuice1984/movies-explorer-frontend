import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import { FIND, FINDING, SHORT_MOVIES} from "../../constants/constatnts";
import './SearchForm.css';
import useValidation from "../../hooks/useValidation";

function SearchForm({
  handleSearchFilm,
  searchedFilmName,
  handleChangeCheckboxStatus,
  checkboxStatus,
  isLoading,
  handleGetUserMovies }) {

    const [buttonDisable, setButtonDisable] = React.useState(true);

    const {
      validations,
      inputTypeNameErrors,
    } = useValidation();

  const currentUser = useContext(CurrentUserContext);

  const [filmInputValue, setFilmInputValue] = React.useState(searchedFilmName ?? '');

  React.useEffect(() => {
    if (inputTypeNameErrors !== '') {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [inputTypeNameErrors])

  async function handleSubmit(e) {
    e.preventDefault();
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
          onChange={validations}
          onSubmit={handleSubmit}>
          <label className="search-form__input-form-label">
            <input
            onInput={e => setFilmInputValue(e.target.value)}
            placeholder="Фильм"
            defaultValue={searchedFilmName}
            className={`search-form__input-text ${inputTypeNameErrors ? 'search-form__input-text_type_not-valid' : ''}`}
            type="search"
            name="search"
            id="name"
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
        {inputTypeNameErrors && <p className="search-form__input-error">{inputTypeNameErrors}</p>}
        <div className="search-form__checkbox">
          <label className="switch">
            <input type="checkbox"
              onChange={handleChangeCheckboxStatus}
              defaultChecked={checkboxStatus} />
            <span className="slider"></span>
          </label>
          <p className="search-form__span">{SHORT_MOVIES}</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;