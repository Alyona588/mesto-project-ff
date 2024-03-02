import { openPopupImage, openModal } from "./modal.js";
const ImagePopup = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");

//Функция создания карточки
function createCard(cardData, deleteCard, openPopupImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content; //Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  //Удаление картинки
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  //Открытие попапа картинки
  cardImage.addEventListener("click", function () {
    openPopupImage(cardData);
    openModal(ImagePopup);
  });

  likeCard(cardElement);

  return cardElement;
}

//Функция удаления карточки
function deleteCard(item) {
  item.remove();
}

//Функция постановки лайка
function likeCard(item) {
  item.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    }
  });
}

//Добавление карточки
function createNewCard(evt) {
  const formAdd = popupNewCard.querySelector(".popup__form");
  const popupLink = popupNewCard.querySelector(".popup__input_type_url");
  const popupName = popupNewCard.querySelector(".popup__input_type_card-name");
  evt.preventDefault();

  const newCardData = {
    name: popupName.value,
    link: popupLink.value,
  };
  placesList.prepend(
    createCard(newCardData, deleteCard, openPopupImage, likeCard)
  );

  formAdd.reset();
}

export { createCard, deleteCard, likeCard, createNewCard };
