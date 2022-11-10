import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../Login/Login.css'

function Register(props) {

  const [formParams, setFormParams] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email, name } = formParams;
    props.onRegClick({ password, email, name })
        .catch(err => {
          setMessage(err.message);
        });
  }

  return (
    <section className="login">
    <Logo />
      <h2 className="login__title">Добро пожаловать&#33;</h2>
      <form className="login__input-form" onSubmit={handleSubmit}>
        <label className="login__input-form-label">
          <span className="login__input-name">Имя</span>
          <input
          placeholder="Ваше имя"
          value={formParams.name}
          onChange={handleChange}
          className="login__input-text"
          type="text"
          name="name"
          id="name"
          required
          minLength="2"
          maxLength="20" />
        </label>
        <label className="login__input-form-label">
          <span className="login__input-name">Email</span>
          <input
          placeholder="Ваша почта"
          value={formParams.email}
          onChange={handleChange}
          className="login__input-text"
          type="text"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="40" />
        </label>
        <label className="login__input-form-label">
          <span className="login__input-name">Пароль</span>
          <input
          placeholder="Ваш пароль"
          value={formParams.password}
          onChange={handleChange}
          className="login__input-text" 
          type="password"
          name="password"
          id="password"
          required
          minLength="6"
          maxLength="40" />
        </label>
        <button className="login__button login__button_type_register" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__text">Уже зарегистрированы&#63; <Link className="login__link" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default Register;
