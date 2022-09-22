import React from "react";
import Logo from '../Logo/Logo';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile(props) {

  return (
    <section className="profile">
      <Logo />
      <BurgerMenu />
      <h2 className="profile__title">Привет, Ил&#33;</h2>
      <form className="profile__input-form" >
        <label className="profile__input-form-label">
          <span className="profile__input-name">Имя</span>
          <input
          placeholder="Trf"
          value={`Катя`}


          className="profile__input-text"
          type="text"
          name="name"
          id="name"
          required
          minLength="2"
          maxLength="20" />
        </label>
        <label className="profile__input-form-label">
          <span className="profile__input-name">Email</span>
          <input
          placeholder="@@@"
          value={`Катя@`}


          className="profile__input-text" 
          type="email"
          name="email"
          id="email"
          required
          minLength="6"
          maxLength="20" />
        </label>
        <button className="profile__button" type="submit">Редактировать</button>
        <Link className="profile__link" to="/sign-in">Выйти из аккаунта</Link>
      </form>
    </section>
  )
}

export default Profile;
