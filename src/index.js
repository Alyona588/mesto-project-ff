import "./pages/index.css";
import {
  openModal,
  closeModal,
  setModalWindowListeners,
  setPopupAnimated,
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

import { renderLoading } from "./components/utils.js";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profilePhoto = document.querySelector(".profile__image");

const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const formChange = document.forms["new-avatar"];

const popupInputLink = popupTypeNewCard.querySelector(".popup__input_type_url");
const popupInputCardName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupAvatarInputUrl = popupTypeNewAvatar.querySelector(
  ".popup__input_type_url"
);

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

const savingAddButton = formAdd.querySelector(".popup__button");
const savingEditButton = formEdit.querySelector(".popup__button");
const savingChangeButton = formChange.querySelector(".popup__button");

let userId = "";

Promise.all([getInformation(), loadCards()])
  .then(([profile, newCards]) => {
    userId = profile._id;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profilePhoto.style.backgroundImage = "url('" + profile.avatar + "')";
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
  .catch(console.error);

//Функция открытия попапа с картинкой
function openPopupImage(item) {
  popupCaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
  openModal(popupTypeImage);
}

//Функция открытия модального окна редактирования профиля
function openEditModal() {
  clearValidation(formEdit, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

//Функция открытия модального окна изменения аватара
function openChangeAvatarModal() {
  openModal(popupTypeNewAvatar);
  clearValidation(formChange, validationConfig);
}

//Функция открытия модального окна добавления карточки
function openAddModal() {
  openModal(popupTypeNewCard);
  clearValidation(formAdd, validationConfig);
}

profileAddButton.addEventListener("click", () => openAddModal());

profileEditButton.addEventListener("click", () => openEditModal());

profilePhoto.addEventListener("click", () => openChangeAvatarModal());

popups.forEach((popup) => {
  setModalWindowListeners(popup);
  setPopupAnimated(popup);
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, savingEditButton);
  editProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupTypeEdit);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, savingEditButton);
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
  renderLoading(true, savingAddButton);
  const newCardData = {
    name: popupInputCardName.value,
    link: popupInputLink.value,
  };
  addNewCard(newCardData.name, newCardData.link)
    .then((card) => {
      addCard(card, userId);
      closeModal(popupTypeNewCard);
      formAdd.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, savingAddButton);
    });
}
formAdd.addEventListener("submit", createNewCard);

//Изменение аватара
function changeOldAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, savingChangeButton);
  changeAvatar(popupAvatarInputUrl.value)
    .then(() => {
      profilePhoto.style.backgroundImage =
        "url('" + popupAvatarInputUrl.value + "')";
      closeModal(popupTypeNewAvatar);
      formChange.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, savingChangeButton);
    });
}

formChange.addEventListener("submit", changeOldAvatar);

enableValidation(validationConfig);
