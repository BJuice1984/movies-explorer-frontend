import React from "react";
import Header from "../Header/Header";
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile({ currentUser }) {

  console.log(currentUser.email)

  const [formParams, setFormParams] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <>
      <Header />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}&#33;</h2>
          <form className="profile__input-form" >
            <label className="profile__input-form-label">
              <span className="profile__input-name">Имя</span>
              <input
              placeholder="Имя пользователя"
              value={currentUser.name}
              onChange={handleChange}
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
              value={currentUser.email}
              onChange={handleChange}
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
