import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../Login/Login.css';
import useValidation from "../../hooks/useValidation";
import { NAME, EMAIL, PASSWORD, WELCOME, YOUR_NAME, YOUR_EMAIL, YOUR_PASSWORD, REGISTER, ALREADY_REGISTERED, LOGIN } from '../../constants/constatnts';

function Register(props) {

  const [buttonDisable, setButtonDisable] = React.useState(true);

  const {
    validations,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    inputTypePasswordErrors
  } = useValidation();

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

  React.useEffect(() => {
    if ((inputTypePasswordErrors !== ''
      || inputTypeEmailErrors !== ''
      || inputTypeNameErrors !== '')
      || (formParams.name === ''
      || formParams.email === ''
      || formParams.password === '')) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [formParams.email, formParams.name, formParams.password, inputTypeEmailErrors, inputTypeNameErrors, inputTypePasswordErrors])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password || !formParams.name) {
      return;
    }
    props.onRegClick({ password: formParams.password, email: formParams.email, name: formParams.name });
  }

  return (
    <section className="login">
    <Logo />
      <h2 className="login__title">{WELCOME}</h2>
      <form
      className="login__input-form"
      onChange={validations}
      onSubmit={handleSubmit}>
        <label className="login__input-form-label">
          <span className="login__input-name">{NAME}</span>
          <input
          placeholder={YOUR_NAME}
          value={formParams.name}
          onChange={handleChange}
          className={`login__input-text ${inputTypeNameErrors !== '' ? 'login__input-text_type_not-valid' : ''}`}
          type="text"
          name="name"
          id="name"
          required
          minLength="2"
          maxLength="20" />
        </label>
        {inputTypeNameErrors && <p className="login__input-error">{inputTypeNameErrors}</p>}
        <label className="login__input-form-label">
          <span className="login__input-name">{EMAIL}</span>
          <input
          placeholder={YOUR_EMAIL}
          value={formParams.email}
          onChange={handleChange}
          className={`login__input-text ${inputTypeEmailErrors !== '' ? 'login__input-text_type_not-valid' : ''}`}
          type="email"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="40" />
        </label>
        {inputTypeEmailErrors && <p className="login__input-error">{inputTypeEmailErrors}</p>}
        <label className="login__input-form-label">
          <span className="login__input-name">{PASSWORD}</span>
          <input
          placeholder={YOUR_PASSWORD}
          value={formParams.password}
          onChange={handleChange}
          className={`login__input-text ${inputTypePasswordErrors !== '' ? 'login__input-text_type_not-valid' : ''}`}
          type="password"
          name="password"
          id="password"
          required
          minLength="6"
          maxLength="40" />
        </label>
        {inputTypePasswordErrors && <p className="login__input-error">{inputTypePasswordErrors}</p>}
        <button
          className={`login__button login__button_type_register ${buttonDisable ? 'login__button_type_disable' : ''}`}
          type="submit">{REGISTER}</button>
      </form>
      <p className="login__text">{ALREADY_REGISTERED} <Link className="login__link" to="/sign-in">{LOGIN}</Link></p>
    </section>
  )
}

export default Register;
