import React from 'react';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrnetUserContext';
import './App.css';

import useLogin from '../../hooks/useLogin';
import { moviesApi } from '../../utils/MoviesApi';




function App() {

  const {
    currentUser,
    loggedIn,
    handleRegister,
    handleLogin,
    handleLogout
  } = useLogin();

  console.log(currentUser, loggedIn)

  React.useEffect(() => {
    moviesApi.getInitialMovies()
    .then((movies) => {
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main 
              isLoggedin={loggedIn}
              />} />
            <Route path="sign-up"
              element={<Register
              onRegClick={handleRegister} />} />
            <Route path="sign-in"
              element={<Login
              onLoginClick={handleLogin} />} />
            <Route path="profile" 
              element={<Profile 
              currentUser={currentUser}
              onLogout={handleLogout}/>} />
            <Route path="movies"
              element={<Movies />} />
            <Route path="saved-movies"
              element={<SavedMovies />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
