//Функция создания карточки
function createCard(cardData, deleteCard, openPopupImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content; //Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  //Удаление картинки
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  //Открытие попапа картинки
  cardImage.addEventListener("click", function () {
    openPopupImage(cardData);
  });

  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardElement;
}

//Функция удаления карточки
function deleteCard(item) {
  item.remove();
}

//Функция постановки лайка
function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
