
import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { SEARCH_WORD_REGEX } from '../../constants/config';
import useValidation from '../../utils/useValidation';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSearch, filmsList, shortMovie, storageWord, setShortMovie }) {
  const { error, isValid, setIsValid, checkErrors, setError} = useValidation();
  const { pathname } = useLocation();
  const inputRef = useRef();
  const savedMovies = useContext(SavedMoviesContext);
  const [ lang ] = useContext(LanguageContext);

  const [value, setValue] = useState({});

  useEffect(() => {                         
    if (pathname === '/movies') {
      setValue({ search: storageWord });
    }
  }, []);

  useEffect(() => {                         
    if (pathname === '/saved-movies') {
      setValue({});
    }
  }, [savedMovies]);

  useEffect(() => { 
    if (value.search) {
      checkErrors(inputRef.current); 
    } 
  }, [shortMovie, value]);

  useEffect(() => { 
    if (value.search && isValid) {
      onSearch(value.search, filmsList);
    }
  }, [shortMovie]);

  function checkEmptyInput() {
    checkErrors(inputRef.current); 
  }

  function handleInputValue(e) {
    setError({});
    setValue({ search: e.target.value });
  }

  function handleFocus(e) {
    e.target.select();
  }

  function handleSubmit(e) {
    e.preventDefault();
    checkErrors(inputRef.current);
    if (isValid && value.search) {
      onSearch(value.search, filmsList);
    }
  }

  return (
    <section className="search"> 
      <div className='search__container'>
        <form className="search__form" 
          name='search'
          action='#' 
          method='post'
          noValidate
          onSubmit={handleSubmit}> 
          <div className='search__line'>
            <input className='search__input' 
              ref={inputRef}
              type='search' 
              name='search' 
              placeholder={lang.placeholderMovie}
              required
              pattern={SEARCH_WORD_REGEX}
              value={value.search || ''}
              onFocus={handleFocus}
              onChange={handleInputValue}>
            </input>
            <button className='search__submit-btn' type='submit'></button>
          </div>
          <span className='search__error'>{error.search}</span>
          <FilterCheckbox 
            shortMovie={shortMovie} 
            setShortMovie={setShortMovie} 
            isValid={isValid} 
            value={value} 
            onCheck={checkEmptyInput}/>
        </form>
      </div> 
    </section>
  );
}

export default SearchForm;