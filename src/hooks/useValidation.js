import React from "react";

function useValidation () {

  const [inputTypeNameErrors, setInputTypeNameErrors] = React.useState('');
  const [inputTypeEmailErrors, setInputTypeEmailErrors] = React.useState('');
  const [inputTypeRegexpEmailErrors, setInputTypeRegexpEmailErrors] = React.useState(true);
  const [inputTypePasswordErrors, setInputTypePasswordErrors] = React.useState('');
  const [isEmptyRowError, setIsEmptyRowError] = React.useState(false);

  const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);  

  const validations = (e) => {
    if (e.target.id === 'email') {
      console.log('valid', regex.test(e.target.value))
      console.log(e.target.value)
      setInputTypeRegexpEmailErrors(regex.test(e.target.value));
    }
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

  const resetRegexpEmailErrors = () => {
    setInputTypeRegexpEmailErrors(true);
  }

  return {
    validations,
    resetNameErrors,
    resetEmailErrors,
    resetRegexpEmailErrors,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    inputTypeRegexpEmailErrors,
    inputTypePasswordErrors,
    handleEmptyRow,
    isEmptyRowError,
    resetEmptyRowError
  }

}

export default useValidation;