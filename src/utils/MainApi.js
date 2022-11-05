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
    credentials: 'include'
  })
  .then(checkResponse)
};

export const updateMyProfile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
  .then(checkResponse)
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include'
  })
  .then(checkResponse)
}

export const addUserMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: movie.country || 'Неизвестно',
      director: movie.director || 'Неизвестно',
      duration: movie.duration || 'Неизвестно',
      year: movie.year || 'Неизвестно',
      description: movie.description || 'Неизвестно',
      image: `https://api.nomoreparties.co${movie.image.url}`,  //убрать запрос на сервер
      trailerLink: movie.trailerLink || 'https://www.youtube.com/',  // God Save Ozzy bag!!!!
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.image.id,                                        //Не приходит movie.id
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU, 
    })
  })
  .then(checkResponse)
};

export const deleteUserMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(checkResponse)
}

export const getUserMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include'
  })
  .then(checkResponse)
}