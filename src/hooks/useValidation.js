import React from "react";

function useValidation () {

  const [inputTypeNameErrors, setInputTypeNameErrors] = React.useState('');
  const [inputTypeEmailErrors, setInputTypeEmailErrors] = React.useState('');
  const [inputTypePasswordErrors, setInputTypePasswordErrors] = React.useState('');
  const [isEmptyRowError, setIsEmptyRowError] = React.useState(false);

  const validations = (e) => {
    if (e.target.id === 'name')
      return setInputTypeNameErrors(e.target.validationMessage);
    if (e.target.id === 'email')
      return setInputTypeEmailErrors(e.target.validationMessage);
    if (e.target.id === 'password')
    return setInputTypePasswordErrors(e.target.validationMessage);
  }

  const handleEmptyRow = (e) => {
    if (e.target.id === 'search')
      return setIsEmptyRowError(e.target.value.replace(/\s/g,"") === "");
  }

  const resetNameErrors = () => {
    setInputTypeNameErrors('');
  }

  const resetEmailErrors = () => {
    setInputTypeEmailErrors('');
  }

  const resetEmptyRowError = () => {
    setIsEmptyRowError(false);
  }

  return {
    validations,
    resetNameErrors,
    resetEmailErrors,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    inputTypePasswordErrors,
    handleEmptyRow,
    isEmptyRowError,
    resetEmptyRowError
  }

}

export default useValidation;