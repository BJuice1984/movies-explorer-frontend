import React from 'react';
// import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
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
          </Routes>
        </div>
      </div>
  );
}

export default App;
