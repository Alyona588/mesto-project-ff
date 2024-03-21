//Функция создания карточки
function createCard(
  cardData,
  deleteCard,
  openPopupImage,
  likeCard,
  userId,
  deleteMyCard,
  showLike,
  removeLike
) {
  const cardTemplate = document.querySelector("#card-template").content; //Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".likes_counter");
  const idCard = cardData._id;
  const ownerId = cardData.owner._id;
  const likesArray = cardData.likes;

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likesCounter.textContent = likesArray.length;
  //Удаление картинки
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, idCard, deleteMyCard);
  });

  //Открытие попапа картинки
  cardImage.addEventListener("click", function () {
    openPopupImage(cardData);
  });
  //Проверка, чья карточка и удаление иконки корзинки
  if (ownerId !== userId) {
    deleteButton.removeEventListener("click", () => deleteCard(cardElement));
    deleteButton.remove();
  }
  //Отображение количества лайков в зависимости от того, есть ли на карточке мой лайк
  const likeImage = () => {
    const likeState = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const unlikeState = !likeState;
    if (likeState !== unlikeState) {
      if (unlikeState) {
        showLike(cardData._id)
          .then((res) => {
            likeCard(likeButton);
            likesCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        removeLike(cardData._id)
          .then((res) => {
            likeCard(likeButton);
            likesCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  likesArray.forEach((card) => {
    if (card._id === userId) {
      likeCard(likeButton);
    }
  });

  likeButton.addEventListener("click", () => {
    likeImage();
  });

  return cardElement;
}

//Функция удаления карточки
function deleteCard(item, idCard, deleteMyCard) {
  deleteMyCard(idCard)
    .then(() => {
      item.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция постановки лайка
function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
