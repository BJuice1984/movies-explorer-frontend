import React from "react";
import * as Auth from '../utils/MainApi';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);
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
        navigate('/');
        setLoggedIn(true);
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

  const _getMyProfile = () => {
    Auth.getMyProfile()
    .then((profile) => {
      if (profile) {
        setCurrentUser({ name: profile.name, email: profile.email });
      }
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  React.useEffect(() => {
    _getMyProfile();
  }, [loggedIn])

  return {
    currentUser,
    loggedIn,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile
  };
}

export default useLogin;