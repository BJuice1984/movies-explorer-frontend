import React, { useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import './Profile.css'

function Profile({ onLogout, updateMyProfile }) {

  const currentUser = useContext(CurrentUserContext);

  const [formParams, setFormParams] = React.useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  React.useEffect(() => {
    setFormParams({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMyProfile(formParams.name, formParams.email);
  }

  return (
    <>
      <Header />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}&#33;</h2>
          <form className="profile__input-form" onSubmit={handleSubmit}>
            <label className="profile__input-form-label">
              <span className="profile__input-name">Имя</span>
              <input
              placeholder="Имя пользователя"
              defaultValue={formParams.name}
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
              defaultValue={formParams.email}
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
            <button className="profile__link" type="button" onClick={onLogout}>Выйти из аккаунта</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile;
