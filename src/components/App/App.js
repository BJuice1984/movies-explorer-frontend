import React from 'react';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import './App.css';

function App() {

  const [userData, setUserData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  const handleRegister = ({ password, email }) => {
    return Auth.register(password, email)
    .then((res) => {
      if (res)  {
        setIsRegister(true)
      }
    })
    .then(() => {
      setInfoTooltipOpen(true);
        history.push("/sign-in")
    })
    .catch(() => {
      setInfoTooltipOpen(true);
      setIsRegister(false)
      history.push("/sign-up")
    })
  }

  const handleLogin = ({ password, email }) => {
    return Auth.authorize(password, email)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
            setUserData(email);
            setLoggedIn(true);
      }
    })
  }


  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    history.push('/sign-in');
  }

  return (
    <div className="page">
        <div className="page__container">
          <Header 
              email={userData}
              handleSignOut={signOut} />
          <Switch>
            <Route path="/sign-up">
              <Register
                onRegClick={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login
                onLoginClick={handleLogin} />
            </Route>
          </Switch>
        </div>
      </div>
  );
}

export default App;
