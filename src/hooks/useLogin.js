import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  console.log(currentUser)

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
        setLoggedIn(true);
        navigate('/');
        _getMyProfile();
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
      navigate('/sign-in');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const _getMyProfile = () => {
    Auth.getMyProfile()
    .then((profile) => {
      if (profile) {
        setCurrentUser({ name: profile.name, email: profile.email })
      }
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  return {
    currentUser,
    loggedIn,
    handleRegister,
    handleLogin,
    handleLogout
  };
}

export default useLogin;