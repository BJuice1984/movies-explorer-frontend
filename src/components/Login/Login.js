import React from "react";
import Logo from '../Logo/Logo';
import './Login.css'
import { Link } from 'react-router-dom';
import useValidation from "../../hooks/useValidation";
import { EMAIL, PASSWORD, GLAD_TO_SEE, YOUR_EMAIL, YOUR_PASSWORD, LOGIN, WAITING, NOT_REGISTERED_YET, REGISTRATION, USER_EMAIL_REGEX } from '../../constants/constatnts';

function Login(props) {

  const [buttonDisable, setButtonDisable] = React.useState(true);

  const {
    validations,
    inputTypePasswordErrors,
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

  React.useEffect(() => {
    if ((inputTypePasswordErrors !== ''
      || inputTypeEmailErrors !== '')
      || (formParams.name === ''
      || formParams.email === '')) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [formParams.email, formParams.name, inputTypeEmailErrors, inputTypePasswordErrors])

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
          className={`login__input-text ${inputTypeEmailErrors !== '' ? 'login__input-text_type_not-valid' : ''}`}
          type="email"
          name="email"
          id="email"
          pattern={USER_EMAIL_REGEX}
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
          className={`login__button ${buttonDisable || props.isLoginLoading ? 'login__button_type_disable' : ''}`}
          disabled={buttonDisable || props.isLoginLoading}
          type="submit">{props.isLoginLoading ? WAITING : LOGIN}</button>
      </form>
      <p className="login__text">{NOT_REGISTERED_YET} <Link className={`login__link ${props.isLoginLoading ? 'login__link_type_disable' : ''}`} to="/sign-up">{REGISTRATION}</Link></p>
    </section>
  )
}

export default Login;
