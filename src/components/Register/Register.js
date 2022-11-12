import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../Login/Login.css';
import { NAME, EMAIL, PASSWORD, WELCOME, YOUR_NAME, YOUR_EMAIL, YOUR_PASSWORD, REGISTER, ALREADY_REGISTERED, LOGIN } from '../../constants/constatnts';

function Register(props) {

  const [formParams, setFormParams] = React.useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email, name } = formParams;
    props.onRegClick({ password, email, name });
  }

  return (
    <section className="login">
    <Logo />
      <h2 className="login__title">{WELCOME}</h2>
      <form className="login__input-form" onSubmit={handleSubmit}>
        <label className="login__input-form-label">
          <span className="login__input-name">{NAME}</span>
          <input
          placeholder={YOUR_NAME}
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
          <span className="login__input-name">{EMAIL}</span>
          <input
          placeholder={YOUR_EMAIL}
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
          <span className="login__input-name">{PASSWORD}</span>
          <input
          placeholder={YOUR_PASSWORD}
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
        <button className="login__button login__button_type_register" type="submit">{REGISTER}</button>
      </form>
      <p className="login__text">{ALREADY_REGISTERED} <Link className="login__link" to="/sign-in">{LOGIN}</Link></p>
    </section>
  )
}

export default Register;
