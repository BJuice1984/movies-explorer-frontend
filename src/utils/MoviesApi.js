class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._credentials = options.credentials;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка даных: ${res.status}`)
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      credentials: this._credentials
    })
      .then(res => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  credentials: 'include',
  headers: {'Content-Type': 'application/json'}
});