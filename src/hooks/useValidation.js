import React from "react";

function useValidation () {

  const [inputTypeNameErrors, setInputTypeNameErrors] = React.useState('');
  const [inputTypeEmailErrors, setInputTypeEmailErrors] = React.useState('');
  const [inputTypePasswordErrors, setInputTypePasswordErrors] = React.useState('');

  const validations = (e) => {
    if (e.target.id === 'name')
      return setInputTypeNameErrors(e.target.validationMessage);
    if (e.target.id === 'email')
      return setInputTypeEmailErrors(e.target.validationMessage);
    if (e.target.id === 'password')
    return setInputTypePasswordErrors(e.target.validationMessage);
  }

  const resetNameErrors = () => {
    setInputTypeNameErrors('');
  }

  const resetEmailErrors = () => {
    setInputTypeEmailErrors('');
  }

  return {
    validations,
    resetNameErrors,
    resetEmailErrors,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    inputTypePasswordErrors
  }

}

export default useValidation;