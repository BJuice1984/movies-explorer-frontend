import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  const handleRegister = ({ name, password, email }) => {
    return Auth.register(name, password, email)
    .then(() => {
      navigate('/sign-in')
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
        navigate('/')
      }
    })
    .catch(() => {
      
    })
  }

  return {
    loggedIn,
    handleRegister,
    handleLogin
  };
}

export default useLogin;