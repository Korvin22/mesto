class Api {
  constructor(settings) {
    this._address = settings.baseUrl;
    this._headers = settings.headers;
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me `,
    )
  }
}
