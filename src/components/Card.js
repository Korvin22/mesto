import { selectors } from "../utils/constants.js";

export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleLikeButtonClick,
    userId,
    owner
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.cardId;
    this._owner = data.owner;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButtonClick;
    this._handleLikeButton = handleLikeButtonClick;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(selectors.element)
      .cloneNode(true);

    return cardElement;
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  isLiked() {
    return this._buttonLike.classList.contains("elements__like_active")
  }

  addActiveLikeState() {
    this._buttonLike.classList.add("elements__like_active");
  }

  removeActiveLikeState() {
    this._buttonLike.classList.remove("elements__like_active");
  }

  setLikesInfo(likes) {
    return (this._counter.textContent = likes.length);
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(selectors.like);
    if (this._owner._id === this._userId) {
      this._element
        .querySelector(selectors.trash)
        .addEventListener("click", () => {
          this._handleTrashButton();
        });
    }
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardPicture.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
  /*метод createCard класса Card создает готовую карточку и навешивает слушатели, в DOM не вставляет*/
  createCard() {
    this._element = this._getTemplate();
    this._counter = this._element.querySelector(".elements__like-counter");
    this._cardPicture = this._element.querySelector(
      selectors.elements__picture
    );
    this._element.querySelector(selectors.element__title).textContent =
      this._name;
    this._counter.textContent = this._likes.length;
    this._cardPicture.alt = this._name;
    this._cardPicture.src = this._link;
    if (this._owner._id !== this._userId) {
      this._element.querySelector(selectors.trash).remove();
    }
    this._likes.find((likeData) => {
      if (likeData._id === this._userId) {
        this._element
          .querySelector(selectors.like)
          .classList.add("elements__like_active");
      }
    });

    this._setEventListeners();

    return this._element;
  }
}
