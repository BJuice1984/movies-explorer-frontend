import React from "react";
import Logo from '../Logo/Logo';
import './Login.css'
import { Link } from 'react-router-dom';
import useValidation from "../../hooks/useValidation";
import { EMAIL, PASSWORD, GLAD_TO_SEE, YOUR_EMAIL, YOUR_PASSWORD, LOGIN, NOT_REGISTERED_YET, REGISTRATION } from '../../constants/constatnts';

function Login(props) {

  const {
    validations,
    inputTypeNameErrors,
    inputTypeEmailErrors,
  } = useValidation();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password){
      return;
    }
    props.onLoginClick({ email: formParams.email, password: formParams.password });
  }

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">{GLAD_TO_SEE}</h2>
      <form
      className="login__input-form"
      onChange={validations}
      onSubmit={handleSubmit}>
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
        <button className="login__button" type="submit">{LOGIN}</button>
      </form>
      <p className="login__text">{NOT_REGISTERED_YET} <Link className="login__link" to="/sign-up">{REGISTRATION}</Link></p>
    </section>
  )
}

export default Login;
