// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import {
  openModal,
  closeModal,
  setModalWindowListeners,
  popupAnimated,
} from "./components/modal.js";

import { createCard, deleteCard, likeCard } from "./components/card.js";

import {
  validationConfig,
  clearValidation,
  enableValidation,
} from "./components/validation.js";

import {
  getInformation,
  loadCards,
  editProfile,
  addNewCard,
  deleteMyCard,
  changeAvatar,
  showLike,
  removeLike,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profilePhoto = document.querySelector(".profile__image");
const formAdd = popupNewCard.querySelector(".popup__form");
const popupLink = popupNewCard.querySelector(".popup__input_type_url");
const popupName = popupNewCard.querySelector(".popup__input_type_card-name");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const formEdit = popupEdit.querySelector(".popup__form");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const formChange = popupNewAvatar.querySelector(".popup__form");
const popupUrlAvatar = popupNewAvatar.querySelector(".popup__input_type_url");
const newButtonAdd = formAdd.querySelector(".popup__button");
const newButtonEdit = formEdit.querySelector(".popup__button");
const newButtonChange = formChange.querySelector(".popup__button");

let userId = "";
const savingText = "Сохранить...";
const originalText = "Сохранить";

Promise.all([getInformation(), loadCards()])
  .then(([profile, newCards]) => {
    userId = profile._id;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profilePhoto.src = profile.avatar;
    Array.from(newCards).forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          deleteCard,
          openPopupImage,
          likeCard,
          userId,
          deleteMyCard,
          showLike,
          removeLike
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

function renderSaving(button, text) {
  button.textContent = text;
}

//Функция открытия попапа с картинкой
function openPopupImage(item) {
  popupCaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
  openModal(imagePopup);
}

//Функция открытия модального окна редактирования профиля
function openEditModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(formEdit, validationConfig);
}

//Функция открытия модального окна изменения аватара
function openChangeAvatarModal() {
  openModal(popupNewAvatar);
  clearValidation(formChange, validationConfig);
}

//Функция открытия модального окна добавления карточки
function openAddModal() {
  openModal(popupNewCard);
  clearValidation(formAdd, validationConfig);
}

addButton.addEventListener("click", () => openAddModal());

editButton.addEventListener("click", () => openEditModal());

profilePhoto.addEventListener("click", () => openChangeAvatarModal());

popups.forEach((popup) => {
  setModalWindowListeners(popup);
  popupAnimated(popup);
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(newButtonEdit, savingText);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editProfile(nameInput.value, jobInput.value)
    .then(() => {
      closeModal(popupEdit);
      formEdit.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(newButtonEdit, originalText);
    });
}

formEdit.addEventListener("submit", handleFormSubmit);

function addCard(cardData, userId) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    openPopupImage,
    likeCard,
    userId,
    deleteMyCard,
    showLike,
    removeLike
  );
  placesList.prepend(cardElement);
}

//Добавление карточки
function createNewCard(evt) {
  evt.preventDefault();
  renderSaving(newButtonAdd, savingText);
  const newCardData = {
    name: popupName.value,
    link: popupLink.value,
  };
  addNewCard(newCardData.name, newCardData.link)
    .then((card) => {
      addCard(card, userId);
      closeModal(popupNewCard);
      formAdd.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(newButtonAdd, originalText);
    });
}
formAdd.addEventListener("submit", createNewCard);

//Изменение аватара
function changeOldAvatar(evt) {
  evt.preventDefault();
  renderSaving(newButtonChange, savingText);
  changeAvatar(popupUrlAvatar.value)
    .then(() => {
      closeModal(popupNewAvatar);
      profilePhoto.style.backgroundImage =
        "url('" + popupUrlAvatar.value + "')";
      formChange.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderSaving(newButtonChange, originalText);
    });
}

formChange.addEventListener("submit", changeOldAvatar);

enableValidation(validationConfig);
