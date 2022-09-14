export class Api {
  constructor(settings) {
    this._address = settings.baseUrl;
    this._headers = settings.headers;
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  getInitialCard() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  editProfile(newName, newAbout) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
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
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  getLikes() {
    return fetch(`${this._address}/cards `, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".elements__like-counter").textContent =
          data.likes.length;
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  changeAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.reference,
      }),
    })
      .then((res) => {
        res.json();
        console.log(res)
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

}
