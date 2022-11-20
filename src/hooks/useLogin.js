import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { OK_FETCH_ANSWER, UNAFTORIZED_ERROR,TOKEN_ERROR, BAD_REQUEST_ERROR } from '../constants/constatnts';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem("user")) ? true : false);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user-data")) ?? {});
  const [isUserLoginError, setUserLoginError] = React.useState('');
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const navigate = useNavigate();

  const clearAllData = React.useCallback(() => {
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
    localStorage.removeItem("checkbox-path-savedMovies-status");
    localStorage.removeItem("user-searched-saved-film-name");
  }, []);

  const handleRegister = ({ name, password, email }) => {
    setIsLoginLoading(true);
    setUserLoginError('');
    return Auth.register(name, password, email)
    .then(() => {
      handleLogin( { password, email });
      setTimeout(() => setIsLoginLoading(false), 200);
    })
    .catch((err) => {
      navigate('/sign-up');
      console.log(err);
      setUserLoginError(err);
      setIsLoginLoading(false);
    })
  }

  const handleLogin = ({ password, email }) => {
    setIsLoginLoading(true);
    setUserLoginError('');
    return Auth.authorize(password, email)
    .then((data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/movies');
        setLoggedIn(true);
        setLoggedOut(false);
        setTimeout(() => setIsLoginLoading(false), 200);
      }
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err);
      clearAllData();
      navigate('/sign-in');
      setIsLoginLoading(false);
    })
  }

  const handleLogout = () => {
    setIsLoginLoading(true);
    setUserLoginError('');
    return Auth.logout()
    .then(() => {
      clearAllData();
      navigate('/');
      setTimeout(() => setIsLoginLoading(false), 200);
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err);
      setIsLoginLoading(false);
    })
  }

  async function updateMyProfile(name, email) {
    setIsLoginLoading(true);
    setUserLoginError('');
    await Auth.updateMyProfile(name, email)
    .then((profile) => {
      if (profile) {
        localStorage.setItem("user-data", JSON.stringify({ name: profile.name, email: profile.email, userID: profile._id }));
      }
    })
    .then(() => {
      setUserLoginError(OK_FETCH_ANSWER);
      setTimeout(() => setIsLoginLoading(false), 200);
    })
    .catch((err) => {
      console.log(err);
      if (err.includes(BAD_REQUEST_ERROR)) {
        setUserLoginError(BAD_REQUEST_ERROR);
      } else {
        setUserLoginError(TOKEN_ERROR);
        clearAllData();        
      }
      setIsLoginLoading(false);
    })
    return setCurrentUser(JSON.parse(localStorage.getItem("user-data")));
  }

  const getMyProfile = React.useCallback(async () => {
    setUserLoginError('');
    await Auth.getMyProfile()
    .then((profile) => {
      localStorage.setItem("user-data", JSON.stringify({ name: profile.name, email: profile.email, userID: profile._id }));
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(TOKEN_ERROR);
      if (err.includes(UNAFTORIZED_ERROR)) {
        clearAllData();
      }
    })
    return setCurrentUser(JSON.parse(localStorage.getItem("user-data")));
  }, [clearAllData]);

  return {
    currentUser,
    loggedIn,
    loggedOut,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile,
    isUserLoginError,
    isLoginLoading,
    clearAllData
  };
}

export default useLogin;