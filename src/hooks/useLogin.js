import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
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
      console.log({err})
      setUserLoginError(err.message)
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
      setUserLoginError(err.message);
      setLoggedIn(false);
      setLoggedOut(true);
      setCurrentUser({});
      localStorage.clear();
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
      localStorage.clear();
      navigate('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err.message)
    })
  }

  const updateMyProfile = (name, email) => {
    setUserLoginError('');
    return Auth.updateMyProfile(name, email)
    .then((profile) => {
      if (profile) {
        setCurrentUser({ name: profile.name, email: profile.email });
      }
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err.message)
    })
  }

  const getMyProfile = React.useCallback(async () => {
    setUserLoginError('');
    await Auth.getMyProfile()
    .then((profile) => {
      setCurrentUser({ name: profile.name, email: profile.email, userID: profile._id });
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(err);
      setUserLoginError(err.message)
    })
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