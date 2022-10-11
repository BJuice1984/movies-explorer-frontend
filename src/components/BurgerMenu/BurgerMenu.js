import React from "react";
import './BurgerMenu.css';
// import { Link } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";

function BurgerMenu({ onMainPage }) {

  return (
    <div className={`burger-menu ${onMainPage ? 'burger-menu_type__visible' : ''}`}>
      <input type="checkbox" className="burger-menu__toggler"></input>
      <div className="burger-menu__hamburger">
        <div className="burger-menu__hamburger-btn"></div>
      </div>
      <div className="burger-menu__blur"></div>
      <div className="menu">
        <Navigation />
      </div>
    </div>
  )

}

export default BurgerMenu;
