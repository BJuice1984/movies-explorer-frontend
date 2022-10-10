import React from "react";
import './BurgerMenu.css';
import { Link } from 'react-router-dom';

function BurgerMenu({ onMainPage }) {

  return (
    <div className={`burger-menu ${onMainPage ? 'burger-menu_type__visible' : ''}`}>
      <input type="checkbox" className="burger-menu__toggler"></input>
      <div className="burger-menu__hamburger">
        <div className="burger-menu__hamburger-btn"></div>
      </div>
      <div className="burger-menu__blur"></div>
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__item"><Link to='/' className="menu__link">Главная</Link></li>
          <li className="menu__item"><Link to='/movies' className="menu__link">Фильмы</Link></li>
          <li className="menu__item"><Link to='/saved-movies' className="menu__link">Сохраненные фильмы</Link></li>
          <li className="menu__item">
            <button className="menu__btn">
              <Link to='/profile' className="menu__link link_type_account">Аккаунт</Link>
            </button>
          </li>
        </ul>        
      </div>
    </div>
  )

}

export default BurgerMenu;
