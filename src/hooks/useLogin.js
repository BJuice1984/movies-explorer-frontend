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
        localStorage.setItem("user", JSON.stringify(data));
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

  // const getMyProfile = () => {
  //   Auth.getMyProfile()
  //   .then((profile) => {
  //     if (profile) {
  //       setCurrentUser({ name: profile.name, email: profile.email, userID: profile._id });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })  
  // }

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

  // const handleGetUserMovies = React.useCallback(async (currentUser) => {
  //   await getUserMovies()
  //       .then((movies) => {
  //         const filtredMovies = movies.filter((movie) => movie.owner === currentUser.userID)
  //         return filtredMovies
  //       })
  //       .then((filtredMovies) => {
  //         localStorage.setItem("user-movies", JSON.stringify(filtredMovies));
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     return setLocalUserMovies(JSON.parse(localStorage.getItem("user-movies")))
  // }, []);

  // React.useEffect(() => {
  //   getMyProfile();
  //   console.log('useLogin', loggedIn)
  // }, [loggedIn])

  return {
    currentUser,
    loggedIn,
    getMyProfile,
    handleRegister,
    handleLogin,
    handleLogout,
    updateMyProfile
  };
}

export default useLogin;