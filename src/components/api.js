//Мой логин и токен
const auth = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "3ce5af04-c6ad-4a37-8ea8-66b06e336b2d",
    "Content-Type": "application/json",
  },
};

//Проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

//Функция получения информации о пользователе
function getInformation() {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "Get",
    headers: {
      authorization: "3ce5af04-c6ad-4a37-8ea8-66b06e336b2d",
    },
  }).then(checkResponse);
}

//Функция загрузки картинок
function loadCards() {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "Get",
    headers: auth.headers,
  }).then(checkResponse);
}

//Функция редактирования профиля 
function editProfile(name, job) {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "PATCH",
    headers: auth.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(checkResponse);
}

//Функция добавления новой карточки
function addNewCard(name, link) {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "POST",
    headers: auth.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

//Функция удаления своей карточки 
function deleteMyCard(idCard) {
  return fetch(`${auth.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: auth.headers,
  }).then(checkResponse);
}

//Функция изменения картинки аватара
function changeAvatar(url) {
  return fetch(`${auth.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: auth.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(checkResponse);
}

//Функция отображения лайка
function showLike(idCard) {
  return fetch(`${auth.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: auth.headers,
  }).then(checkResponse);
}

//Функция удаления лайка
function removeLike(idCard) {
  return fetch(`${auth.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: auth.headers,
  }).then(checkResponse);
}

export {
  getInformation,
  loadCards,
  editProfile,
  addNewCard,
  deleteMyCard,
  changeAvatar,
  showLike,
  removeLike,
};
