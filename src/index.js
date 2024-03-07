// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  openModal,
  closeModal,
  setModalWindowListeners,
  keyHandler,
  popupAnimated,
} from "./components/modal.js";

import { createCard, deleteCard, likeCard } from "./components/card.js";

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAdd = popupNewCard.querySelector(".popup__form");
const popupLink = popupNewCard.querySelector(".popup__input_type_url");
const popupName = popupNewCard.querySelector(".popup__input_type_card-name");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const formEdit = popupEdit.querySelector(".popup__form");

//Функция открытия попапа с картинкой
function openPopupImage(item) {
  popupCaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
  openModal(imagePopup);
}

//Добавление массива
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, openPopupImage, likeCard));
});

//Функция открытия модального окна редактирования профиля
function openEditModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
}

addButton.addEventListener("click", () => openModal(popupNewCard));

editButton.addEventListener("click", () => openEditModal());

popups.forEach((popup) => {
  setModalWindowListeners(popup);
  popupAnimated(popup);
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formEdit.addEventListener("submit", handleFormSubmit);

//Добавление карточки
function createNewCard(evt) {
  evt.preventDefault();
  const newCardData = {
    name: popupName.value,
    link: popupLink.value,
  };
  placesList.prepend(
    createCard(newCardData, deleteCard, openPopupImage, likeCard)
  );
  closeModal(popupNewCard);
  formAdd.reset();
}

formAdd.addEventListener("submit", createNewCard);
