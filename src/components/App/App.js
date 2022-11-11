import React from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrnetUserContext';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';
import useLogin from '../../hooks/useLogin';
import useInitialMovies from '../../hooks/useInitialMovies';
import useUserMovies from '../../hooks/useUserMovies';
import usePagination from '../../hooks/usePagination';
import './App.css';
import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';

function App() {

  const location = useLocation();

  const {
    currentUser,
    loggedIn,
    loggedOut,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile,
    isUserLoginError
  } = useLogin();

  const {
    handleSearchFilm,
    localSearchedMovies,
    searchedFilmName,
    handleChangeCheckboxStatusPathMovies,
    checkboxStatusPathMovies,
    isLoading,
    isError,
    clearLocalState
  } = useInitialMovies();

  const {
    localUserMovies,
    handleSearchSavedFilm,
    searchedSavedFilmName,
    handleChangeCheckboxStatusPathSavedMovies,
    checkboxStatusPathSavedMovies,
    isUserMoviesLoading,
    isFirstLoading,
    isSavedMoviesError,
    clearLocalUserState,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  } = useUserMovies();

  const {
    handleLoadMore,
    numberOfFilms
  } = usePagination();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getMyProfile();
    }
  }, [getMyProfile, loggedIn]);

  React.useEffect(() => {
    if (loggedOut) {
      clearLocalState();
      clearLocalUserState();
    }
  }, [clearLocalState, clearLocalUserState, loggedOut]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <PopupInfoTooltip
        // onRegistered={isRegistered}
        err={isUserLoginError || isError || isSavedMoviesError } />
        <div className={`page__container ${location.pathname === '/' ? 'page__container_type_movies' : ''}`}>
          <Routes>
            <Route path="/" element={<Main 
              isLoggedin={loggedIn}/>} />
            <Route path="sign-up"
              element={<Register
              onRegClick={handleRegister}/>} />
            <Route path="sign-in"
              element={<Login
              onLoginClick={handleLogin}/>} />

            <Route element={<ProtectedRoutes loggedIn={loggedIn}/>} >
              <Route path="profile" 
                element={<Profile 
                onLogout={handleLogout}
                updateMyProfile={updateMyProfile}/>} />
              <Route path="movies"
                element={<Movies
                handleSearchFilm={handleSearchFilm}
                localSearchedMovies={localSearchedMovies}
                searchedFilmName={searchedFilmName}
                localUserMovies={localUserMovies}
                handleLoadMore={handleLoadMore}
                numberOfFilms={numberOfFilms}
                handleChangeCheckboxStatusPathMovies={handleChangeCheckboxStatusPathMovies}
                checkboxStatusPathMovies={checkboxStatusPathMovies}
                isLoading={isLoading}
                isError={isError}
                isUserMoviesLoading={isUserMoviesLoading}
                handleGetUserMovies={handleGetUserMovies}
                handleAddUserMovie={handleAddUserMovie}
                handleDeleteUserMovie={handleDeleteUserMovie}/>} />
              <Route path="saved-movies"
                element={<SavedMovies
                handleGetUserMovies={handleGetUserMovies}
                handleDeleteUserMovie={handleDeleteUserMovie}
                localUserMovies={localUserMovies}
                handleSearchSavedFilm={handleSearchSavedFilm}
                searchedSavedFilmName={searchedSavedFilmName}
                isUserMoviesLoading={isUserMoviesLoading}
                isFirstLoading={isFirstLoading}
                isSavedMoviesError={isSavedMoviesError}
                handleChangeCheckboxStatusPathSavedMovies={handleChangeCheckboxStatusPathSavedMovies}
                checkboxStatusPathSavedMovies={checkboxStatusPathSavedMovies}/>} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
