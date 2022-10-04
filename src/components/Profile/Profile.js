import React from "react";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile({ isUserName, isUserEmail }) {

  return (
    <>
      <Header />
      <BurgerMenu />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Илkkkkkkkkkkfffffffffffffdddddddddddddddddddddddkkkk&#33;</h2>
          <form className="profile__input-form" >
            <label className="profile__input-form-label">
              <span className="profile__input-name">Имя</span>
              <input
              placeholder="Имя пользователя"
              value={isUserName}
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
              placeholder="Email пользователя"
              value={isUserEmail}
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
        </div>
      </section>
    </>
  )
}

export default Profile;
