const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) =>  {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка даных: ${res.status}`)
};

export const register = (name, password, email) => {
  // const data = JSON.stringify({name, password, email});
  // console.log(data)
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  })
  .then(checkResponse)
};

export const authorize = (password, email) => {
  // const data2 = JSON.stringify({password, email});
  // console.log(data2)
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkResponse)
};

export const getMyProfile = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(checkResponse)
};