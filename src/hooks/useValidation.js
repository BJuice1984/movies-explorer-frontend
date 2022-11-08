import React from "react";

function useValidation () {

  const [inputTypeNameErrors, setInputTypeNameErrors] = React.useState('');
  const [inputTypeEmailErrors, setInputTypeEmailErrors] = React.useState('');
  const [isValid, setIsValid] = React.useState('false');

  const validations = (e) => {
    console.log('event', e.target.validationMessage)
    if (e.target.id === 'name')
      return setInputTypeNameErrors(e.target.validationMessage);
    if (e.target.id === 'email')
      return setInputTypeEmailErrors(e.target.validationMessage);
  }

  // React.useEffect(() => {
  //   if (inputTypeEmailErrors === '' && inputTypeNameErrors === '')
  //     return setIsValid(true);
  //   return setIsValid(false);
  // }, [inputTypeEmailErrors, inputTypeNameErrors])



  return {
    validations,
    inputTypeNameErrors,
    inputTypeEmailErrors,
    isValid
  }

}

export default useValidation;