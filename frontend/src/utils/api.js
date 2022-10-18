class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    }).then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    }).then(this._checkResponse);
  }

  editProfile({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  createCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, like, token) {
    if (like) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
        method: "PUT",
        body: JSON.stringify({
          like,
        }),
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      }).then(this._checkResponse);
    }
  }

  changeAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}



const api = new Api({
  baseUrl: "https://api.task.students.nomoredomainssbs.ru",
});

export default api;
