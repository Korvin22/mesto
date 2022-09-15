export class Api {
  constructor(settings) {
    this._address = settings.baseUrl;
    this._headers = settings.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCard() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editProfile(newName, newAbout) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addCard(newName, newLink, newLike) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newLink,
        likes: newLike,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getLikes() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".elements__like-counter").textContent =
          data.likes.length;
      });
  }
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.reference,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
