const ImagePopup = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
//Функция открытия попапа с картинкой
function openPopupImage(item) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupCaption.textContent = item.name;
  popupImage.src = item.link;
  popupImage.alt = item.name;
}

//Функция открытия модального окна
function openModal(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

//Функция открытия модального окна редактирования профиля
function openEditModal() {
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция закрытия модального окна
function setModalWindowListeners(popupType) {
  const closeButton = popupType.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    popupType.classList.remove("popup_is-opened");
  });

  document.addEventListener("click", function (evt) {
    console.log(evt.target);
    if (evt.target.classList.contains("popup")) {
      evt.target.classList.remove("popup_is-opened");
    }
  });
  document.removeEventListener("keydown", keyHandler);
}

//Функция закрытия модального окна клавишей Esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    popupEdit.classList.remove("popup_is-opened");
    popupNewCard.classList.remove("popup_is-opened");
    ImagePopup.classList.remove("popup_is-opened");
  }
}

//Закрытие модального окна по кнопке сабмит
function closeModalBySubmit(popupType) {
  const submitButton = popupType.querySelector(".popup__button");
  submitButton.addEventListener("click", () => {
    popupType.classList.remove("popup_is-opened");
  });
}

//Плавное открытие и закрытие попапов
function popupAnimated(popupType) {
  popupType.classList.add("popup_is-animated");
}

export {
  openPopupImage,
  openModal,
  openEditModal,
  setModalWindowListeners,
  keyHandler,
  closeModalBySubmit,
  popupAnimated,
};
