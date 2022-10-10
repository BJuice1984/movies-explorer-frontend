import React from "react";
import './BurgerMenu.css';

function BurgerMenu({ onMainPage }) {

  return (
    <div className={`burger-menu ${onMainPage ? 'burger-menu_type__visible' : ''}`}>
      <input type="checkbox" className="burger-menu__toggler"></input>
      <div className="hamburger">
        <div className="hamburger__btn"></div>
      </div>
      <div className="menu__blur"></div>
      <div className="menu">

        <ul className="menu__list">
          <li><a href='#'>Главная</a></li>
          <li><a href='#'>Фильмы</a></li>
          <li><a href='#'>Сохраненные фильмы</a></li>
        </ul>
      </div>
    </div>
  )

}

export default BurgerMenu;
