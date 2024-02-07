// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector(".places");
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});
