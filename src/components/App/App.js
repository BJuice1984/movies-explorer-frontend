import React from 'react';
// import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrnetUserContext';
// import { Routes, Route, useNavigate, Redirect } from 'react-router-dom';
import './App.css';

import useLogin from '../../hooks/useLogin';



// import * as Auth from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';




function App() {

  const {
    currentUser,
    loggedIn,
    handleRegister,
    handleLogin
  } = useLogin();

  console.log(currentUser)

  // const navigate = useNavigate();

  // // const [currentUser, setCurrentUser] = React.useState({});
  // const [loggedIn, setLoggedIn] = React.useState(true);
  // // const [savedFilms, setSavedFilms] = React.useState([]);


  // const handleRegister = ({ name, password, email }) => {
  //   return Auth.register(name, password, email)
  //   .then(() => {
  //     navigate('/sign-in')
  //   })
  //   .catch(() => {
  //     navigate('/sign-up')
  //   })
  // }

  // const handleLogin = ({ password, email }) => {
  //   return Auth.authorize(password, email)
  //   .then((data) => {
  //     if (data) {

  //       setLoggedIn(true);
  //     }
  //   })
  //   .catch(() => {
  //     navigate('/sign-in')
  //   })
  // }

  React.useEffect(() => {
    moviesApi.getInitialMovies()
    .then((movies) => {
      localStorage.setItem("initial-movies", JSON.stringify(movies));
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     navigate('/movies')
  //   }
  // }, [navigate, loggedIn])

  // React.useEffect(() => {
  //   // setIsLoading(true);
  //   if (loggedIn) {
  //     Promise.all([Auth.getInitialUser(), Auth.getInitialFilms()])
  //     .then(([userData, initialFilms]) => {
  //       setCurrentUser(userData);
  //       setSavedFilms(initialFilms)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //     // .finally(() => setIsLoading(false));
  //   }
  // }, [loggedIn]);

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
              currentUser={currentUser}/>} />
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
