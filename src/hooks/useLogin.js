import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { OK_FETCH_ANSWER } from '../constants/constatnts';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user-data")) ?? {});
  const [isUserLoginError, setUserLoginError] = React.useState('');

  const navigate = useNavigate();

  const handleRegister = ({ name, password, email }) => {
    setUserLoginError('');
    return Auth.register(name, password, email)
    .then(() => {
      handleLogin( { password, email });
    })
    .catch((err) => {
      navigate('/sign-up');
      console.log(err);
      setUserLoginError(err);
    })
  }

  const handleLogin = ({ password, email }) => {
    setUserLoginError('');
    return Auth.authorize(password, email)
    .then((data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/');
        setLoggedIn(true);
        setLoggedOut(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err);
      setLoggedIn(false);
      setLoggedOut(true);
      setCurrentUser({});
      localStorage.removeItem("user");
      localStorage.removeItem("user-data");
      localStorage.removeItem("initial-movies");
      localStorage.removeItem("user-searched-movies");
      localStorage.removeItem("user-searched-film-name");
      localStorage.removeItem("checkbox-path-movies-status");
      localStorage.removeItem("user-movies");
      localStorage.removeItem("user-searched-saved-movies");
      localStorage.removeItem("checkbox-path-savedMovies-status");
      localStorage.removeItem("user-searched-saved-film-name");
      navigate('/sign-in');
    })
  }

  const handleLogout = () => {
    setUserLoginError('');
    return Auth.logout()
    .then(() => {
      setLoggedIn(false);
      setLoggedOut(true);
      setCurrentUser({});
      localStorage.removeItem("user");
      localStorage.removeItem("user-data");
      localStorage.removeItem("initial-movies");
      localStorage.removeItem("user-searched-movies");
      localStorage.removeItem("user-searched-film-name");
      localStorage.removeItem("checkbox-path-movies-status");
      localStorage.removeItem("user-movies");
      localStorage.removeItem("user-searched-saved-movies");
      localStorage.removeItem("checkbox-path-savedMovies-status");
      localStorage.removeItem("user-searched-saved-film-name");
      navigate('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err.message)
    })
  }

  async function updateMyProfile(name, email) {
    setUserLoginError('');
    await Auth.updateMyProfile(name, email)
    .then((profile) => {
      if (profile) {
        localStorage.setItem("user-data", JSON.stringify({ name: profile.name, email: profile.email, userID: profile._id }));
      }
    })
    .then(() => {
      setUserLoginError(OK_FETCH_ANSWER);
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err)
    })
    return setCurrentUser(JSON.parse(localStorage.getItem("user-data")));
  }

  const getMyProfile = React.useCallback(async () => {
    setUserLoginError('');
    await Auth.getMyProfile()
    .then((profile) => {
      localStorage.setItem("user-data", JSON.stringify({ name: profile.name, email: profile.email, userID: profile._id }));
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err.message)
    })
    return setCurrentUser(JSON.parse(localStorage.getItem("user-data")));
  }, []);

  return {
    currentUser,
    loggedIn,
    loggedOut,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile,
    isUserLoginError
  };
}

export default useLogin;