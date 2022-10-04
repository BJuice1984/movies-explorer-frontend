import React from "react";
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isMainPage }) {

  return (
    <section className={`header ${isMainPage ? 'header_type_main' : ''}`}>
      <div className="header__container">
        <Logo />
        <Link className={`header__reg-button ${isMainPage ? 'header__reg-button_type_visible' : ''}`} to="/sign-up">Регистрация</Link>
        <Link className={`header__entrance-button ${isMainPage ? 'header__entrance-button_type_visible' : ''}`} to="/sign-in">Войти</Link>
      </div>
    </section>
  )
}

export default Header;