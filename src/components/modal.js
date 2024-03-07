//Функция открытия любого модального окна
function openModal(popupType) {
  popupType.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}
//Функция закрытия любого модального окна
function closeModal(popupType) {
  popupType.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

//Функция закрытия модального окна
function setModalWindowListeners(popupType) {
  const closeButton = popupType.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popupType));
  popupType.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closeModal(popupType);
    }
  });
}

//Функция закрытия модального окна клавишей Esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

//Плавное открытие и закрытие попапов
function popupAnimated(popupType) {
  popupType.classList.add("popup_is-animated");
}

export {
  openModal,
  closeModal,
  setModalWindowListeners,
  keyHandler,
  popupAnimated,
};
