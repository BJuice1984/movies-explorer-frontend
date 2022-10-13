class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка даных: ${res.status}`)
  }

  getInitialMovies() {
    return fetch(this._baseUrl, {
      credentials: this._credentials
    })
      .then(res => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {'Content-Type': 'application/json'}
});