import React from 'react';
// import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route } from 'react-router-dom';
// import { Routes, Route, useNavigate, Redirect } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="sign-up" element={<Register />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
