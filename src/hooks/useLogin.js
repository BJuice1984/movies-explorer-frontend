import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedOut, setLoggedOut] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});

  const navigate = useNavigate();

  const handleRegister = ({ name, password, email }) => {
    return Auth.register(name, password, email)
    .then(() => {
      handleLogin( { password, email });
    })
    .catch(() => {
      navigate('/sign-up')
    })
  }

  const handleLogin = ({ password, email }) => {
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
    })
  }

  const handleLogout = () => {
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
    })
  }

  const updateMyProfile = (name, email) => {
    return Auth.updateMyProfile(name, email)
    .then((profile) => {
      if (profile) {
        setCurrentUser({ name: profile.name, email: profile.email });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getMyProfile = React.useCallback(async () => {
    await Auth.getMyProfile()
    .then((profile) => {
      setCurrentUser({ name: profile.name, email: profile.email, userID: profile._id });
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return {
    currentUser,
    loggedIn,
    loggedOut,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile
  };
}

export default useLogin;