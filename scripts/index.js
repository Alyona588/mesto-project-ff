// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector(".places");
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(initialCards, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = initialCards.name;
  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

addButton.addEventListener("click", function () {
  initialCards.forEach((item) => {
    placesList.append(createCard(item, deleteCard));
  });
});
