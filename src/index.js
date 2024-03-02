// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  openPopupImage,
  openModal,
  openEditModal,
  setModalWindowListeners,
  keyHandler,
  closeModalBySubmit,
  popupAnimated,
} from "./components/modal.js";

import {
  createCard,
  deleteCard,
  likeCard,
  createNewCard,
} from "./components/card.js";

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const ImagePopup = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAdd = popupNewCard.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//Добавление массива
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, openPopupImage, likeCard));
});

addButton.addEventListener("click", () => openModal(popupNewCard));

editButton.addEventListener("click", function () {
  openModal(popupEdit);
  openEditModal();
});

setModalWindowListeners(popupEdit);
setModalWindowListeners(popupNewCard);
setModalWindowListeners(ImagePopup);

//Редактирование профиля
const formElement = popupEdit.querySelector(".popup__form");

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formElement.addEventListener(
  "submit",
  handleFormSubmit,
  closeModalBySubmit(popupEdit)
);

popupAnimated(popupEdit);
popupAnimated(popupNewCard);
popupAnimated(ImagePopup);

formAdd.addEventListener(
  "submit",
  createNewCard,
  closeModalBySubmit(popupNewCard)
);
