import React from "react";
import './BurgerMenu.css';
// import { Link } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";

function BurgerMenu({ onMainPage, onLoggedin }) {

  return (
    <div className={`burger-menu ${onMainPage && !onLoggedin ? '' : 'burger-menu_type__visible'}`}>
      <input type="checkbox" className="burger-menu__toggler"></input>
      <div className="burger-menu__hamburger">
        <div className="burger-menu__hamburger-btn"></div>
      </div>
      <div className="burger-menu__blur"></div>
      <div className={`menu ${onMainPage ? 'menu_type_main' : ''}`}>
        <Navigation />
      </div>
    </div>
  )

}

export default BurgerMenu;
