import React, { useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrnetUserContext";
import { USER_EMAIL_ERROR_MESSAGE, USER_NAME_ERROR_MESSAGE, NAME, EMAIL, HELLO, SAVE, WAITING, EDIT, LOGOUT_OF_ACCOUNT } from "../../constants/constatnts";
import useValidation from "../../hooks/useValidation";
import useClose from '../../hooks/useClose';
import './Profile.css'

function Profile({ onLogout, isLoginLoading, updateMyProfile }) {

  const {
    validations,
    resetNameErrors,
    resetEmailErrors,
    resetRegexpEmailErrors,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    inputTypeRegexpEmailErrors
  } = useValidation();

  const {
    EscClose
  } = useClose();

  const currentUser = useContext(CurrentUserContext);

  const [formParams, setFormParams] = React.useState({ name: currentUser.name || '', email: currentUser.email || '', });
  const [inputDisable, setInputDisable] = React.useState(true);
  const [buttonDisable, setButtonDisable] = React.useState(false);

  const userData = JSON.parse(localStorage.getItem("user-data"));

  const resetValue = () => {
    setInputDisable(true);
    setButtonDisable(false);
    setFormParams({
      name: userData.name || '',
      email: userData.email || '',
    });
    resetNameErrors();
    resetEmailErrors();
    resetRegexpEmailErrors();
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  React.useEffect(() => {
    setFormParams({
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMyProfile(formParams.name, formParams.email);
    setInputDisable(true);
    setButtonDisable(false);
  }

  // console.log('inputTypeNameErrors !==', inputTypeNameErrors !== '')
  // console.log('inputTypeEmailErrors !==', inputTypeEmailErrors !== '')
  // console.log('inputTypeEmailErrors !==++++++', inputTypeNameErrors !== '' || inputTypeEmailErrors !== '')
  // console.log('inputTypeEmailErrors !==-----', (inputTypeNameErrors !== '' || inputTypeEmailErrors !== '') || !inputTypeRegexpEmailErrors)
  console.log('ProfileRegExp', inputTypeRegexpEmailErrors)

  React.useEffect(() => {
    if ((formParams.name === currentUser.name && formParams.email === currentUser.email && !inputDisable)
        || ((inputTypeNameErrors !== '' || inputTypeEmailErrors !== '') || !inputTypeRegexpEmailErrors)) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [currentUser.email, currentUser.name, formParams.email, formParams.name, inputDisable, inputTypeEmailErrors, inputTypeNameErrors, inputTypeRegexpEmailErrors]);

  EscClose(!inputDisable, resetValue);

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">{HELLO + currentUser.name}&#33;</h2>
        <form 
        className="profile__input-form" 
        id="profile__input-form"
        onChange={validations}
        onSubmit={handleSubmit}>
          <label className="profile__input-form-label">
            <span className="profile__input-name">{NAME}</span>
            <input
            placeholder="Имя пользователя"
            value={formParams.name}
            onChange={handleChange}
            className={`profile__input-text ${inputTypeNameErrors ? 'profile__input-text_type_not-valid' : ''}`}
            type="text"
            name="name"
            id="name"
            required
            minLength="2"
            maxLength="30"
            disabled={inputDisable} />
          </label>
          {inputTypeNameErrors && <p className="profile__input-error">{inputTypeNameErrors}</p>}
          <label className="profile__input-form-label">
            <span className="profile__input-name">{EMAIL}</span>
            <input
            placeholder="Email пользователя"
            value={formParams.email}
            onChange={handleChange}
            className={`profile__input-text ${inputTypeEmailErrors || !inputTypeRegexpEmailErrors ? 'profile__input-text_type_not-valid' : ''}`}
            type="email"
            name="email"
            id="email"
            required
            minLength="6"
            maxLength="30"
            disabled={inputDisable} />
          </label>
          {(inputTypeEmailErrors || !inputTypeRegexpEmailErrors) && <p className="profile__input-error">{inputTypeEmailErrors}</p>}
        </form>
        <div className="errors__container">
          <p className={`profile__input-error_type_info ${inputTypeNameErrors ? '' : 'profile__input-error_type_disable'}`}>{USER_NAME_ERROR_MESSAGE}</p>
          <p className={`profile__input-error_type_info ${inputTypeEmailErrors || !inputTypeRegexpEmailErrors ? '' : 'profile__input-error_type_disable'}`}>{USER_EMAIL_ERROR_MESSAGE}</p>
        </div>
        <div className="buttons__container">
            <button
              onClick={() => setInputDisable(false)}
              disabled={buttonDisable || isLoginLoading}
              className={`profile__button ${buttonDisable ? 'profile__button_type_disable' : !inputDisable ? 'profile__button_type_valid' : ''}`}
              form="profile__input-form"
              type={inputDisable
                || (formParams.name === currentUser.name && formParams.email === currentUser.email && !inputDisable)
                || (inputTypeNameErrors !== '' || inputTypeEmailErrors !== '') ? "button" : "submit"}>
                {isLoginLoading ? WAITING : inputDisable ? EDIT : SAVE}
              </button>
            <button
              className={`profile__link ${inputDisable ? '' : 'profile__link_type_disable'}`}
              type="button"
              disabled={isLoginLoading}
              onClick={onLogout}>{LOGOUT_OF_ACCOUNT}</button>
          </div>
      </section>
    </>
  )
}

export default Profile;
