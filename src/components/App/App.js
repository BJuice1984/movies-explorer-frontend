import React from 'react';
// import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route } from 'react-router-dom';
// import { Routes, Route, useNavigate, Redirect } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="profile" 
              element={<Profile 
              isUserName={'Катерина'}
              isUserEmail={'Kate@'}/>} />
            <Route path="movies" element={<Movies />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
