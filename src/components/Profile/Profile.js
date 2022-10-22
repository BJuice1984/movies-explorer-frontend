import React, { useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import './Profile.css'

function Profile({ onLogout, updateMyProfile }) {

  const currentUser = useContext(CurrentUserContext);

  const [formParams, setFormParams] = React.useState({});
  const [inputDisable, setInputDisable] = React.useState(true);
  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [inputValid, setInputValid] = React.useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  React.useEffect(() => {
    setFormParams({
      name: currentUser.name || '',
      email: currentUser.email || '',
    })
  }, [currentUser])

  const handleInput = () => {
    setInputDisable(false)
    // setButtonDisable(true)
  }

  // React.useEffect(() => {
  //   if (formParams.name === currentUser.name && formParams.email === currentUser.email) {
  //     setButtonDisable(true)
  //     setInputValid(false)
  //   } else {
  //     setButtonDisable(false)
  //     setInputValid(true)
  //   }
  // }, [currentUser.email, currentUser.name, formParams.email, formParams.name])

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
              maxLength="20"
              disabled={inputDisable} />
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
              maxLength="20"
              disabled={inputDisable} />
            </label>
            <button
              onClick={handleInput}
              disabled={buttonDisable}
              className={`profile__button ${buttonDisable ? 'profile__button_type_disable' : inputValid ? 'profile__button_type_valid' : ''}`} 
              type={inputDisable ? "button" : "submit"}>
                {inputDisable ? "Редактировать" : "Сохранить"}
              </button>
            <button className="profile__link" type="button" onClick={onLogout}>Выйти из аккаунта</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile;
