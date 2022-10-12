import React from "react";
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {

  return(
    <>
      <ul className="menu__list">
        <li className="menu__item"><NavLink to='/' end className={({ isActive }) => isActive ? 'menu__link menu__link_type_active' : 'menu__link'}>Главная</NavLink></li>
        <li className="menu__item"><NavLink to='/movies' className={({ isActive }) => isActive ? 'menu__link menu__link_type_active' : 'menu__link'}>Фильмы</NavLink></li>
        <li className="menu__item"><NavLink to='/saved-movies' className={({ isActive }) => isActive ? 'menu__link menu__link_type_active' : 'menu__link'}>Сохраненные фильмы</NavLink></li>
      </ul>
      <button className="menu__btn">
        <Link to='/profile' className="menu__link link_type_account">Аккаунт</Link>
      </button>
    </>
  )
}

export default Navigation;