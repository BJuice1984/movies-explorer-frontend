import React from "react";
import MainLogo from '../../images/main-logo.svg';
import './Promo.css';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__logo" src={MainLogo} alt='Картинка основной логотип проекта'></img>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его&nbsp;создателя</p>
        <a href="#about-me" className="promo__link">
          <button className="promo__button">Узнать больше</button>
        </a>
      </div>
    </section>
  )
}

export default Promo;