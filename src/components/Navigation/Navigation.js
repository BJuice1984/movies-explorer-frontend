import React from "react";
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {

  return(
    <>
      <ul className="menu__list">
        <li className="menu__item"><Link to='/' className="menu__link">Главная</Link></li>
        <li className="menu__item"><Link to='/movies' className="menu__link">Фильмы</Link></li>
        <li className="menu__item"><Link to='/saved-movies' className="menu__link">Сохраненные фильмы</Link></li>
      </ul>
      <button className="menu__btn">
        <Link to='/profile' className="menu__link link_type_account">Аккаунт</Link>
      </button>
    </>
  )
}

export default Navigation;