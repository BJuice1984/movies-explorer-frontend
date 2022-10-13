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
        getMyProfile();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getMyProfile = () => {
    Auth.getMyProfile()
    .then((profile) => {
      setCurrentUser({ name: profile.name, email: profile.email })})
  }

  return {
    currentUser,
    loggedIn,
    handleRegister,
    handleLogin
  };
}

export default useLogin;