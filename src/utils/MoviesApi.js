import { BEAT_FILMS_URL } from '../constants/constatnts';

const checkResponse = (res) =>  {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка даных: ${res.status}`)
};

export const getInitialMovies = () => {
  return fetch(`${BEAT_FILMS_URL}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(checkResponse)
}
