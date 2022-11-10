import React from "react";
import Logo from '../Logo/Logo';
import './Login.css'
import { Link } from 'react-router-dom';

function Login(props) {

  const [formParams, setFormParams] = React.useState({
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
    if (!formParams.email || !formParams.password){
      return;
    }
    props.onLoginClick({ email: formParams.email, password: formParams.password })
        .catch(err => {
          setMessage(err.message);
        });
  }

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть&#33;</h2>
      <form className="login__input-form" onSubmit={handleSubmit}>
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
        <button className="login__button" type="submit">Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы&#63; <Link className="login__link" to="/sign-up">Регистрация</Link></p>
    </section>
  )
}

export default Login;
