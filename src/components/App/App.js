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
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';
import useLogin from '../../hooks/useLogin';
import useInitialMovies from '../../hooks/useInitialMovies';
import useUserMovies from '../../hooks/useUserMovies';
import './App.css';

function App() {

  const {
    currentUser,
    loggedIn,
    loggedOut,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile
  } = useLogin();

  const {
    getSavedMovies,
    localMovies,
    setLocalMovies
  } = useInitialMovies();

  const {
    localUserMovies,
    setLocalUserMovies,
    handleAddUserMovie,
    handleDeleteUserMovie,
    handleGetUserMovies
  } = useUserMovies();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getMyProfile();
    }
  }, [getMyProfile, loggedIn]);

  React.useEffect(() => {
    // console.log('loggedOut', loggedOut)
    if (loggedOut) {
      setLocalUserMovies([]);
      setLocalMovies([])
    }
  }, [loggedOut, setLocalMovies, setLocalUserMovies])


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

            <Route element={<ProtectedRoutes
              loggedIn={loggedIn} />} >
              <Route path="profile" 
                element={<Profile 
                onLogout={handleLogout}
                updateMyProfile={updateMyProfile}/>} />
              <Route path="movies"
                element={<Movies
                isLoggedin={loggedIn}
                getSavedMovies={getSavedMovies}
                localMovies={localMovies}
                localUserMovies={localUserMovies}
                handleGetUserMovies={handleGetUserMovies}
                handleAddUserMovie={handleAddUserMovie}
                handleDeleteUserMovie={handleDeleteUserMovie} />} />
              <Route path="saved-movies"
                element={<SavedMovies
                handleGetUserMovies={handleGetUserMovies}
                handleDeleteUserMovie={handleDeleteUserMovie}
                localUserMovies={localUserMovies}/>} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
