import { selectors } from "../utils/constants.js";

export class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleTrashButton,
    handleLikeButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._id = data._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButton;
    this._handleLikeButton = handleLikeButton;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(selectors.element)
      .cloneNode(true);

    return cardElement;
  }
  _removeCard() {
    console.log(this._element);
    this._element.remove();
    this._element = null;
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle("elements__like_active");

  }

  setLikesInfo(like) {

    return this._element.querySelector(".elements__like-counter").textContent =
      like.length;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(selectors.like);
    this._element
      .querySelector(selectors.trash)
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();

      this._handleLikeButton();

    });
    this._cardPicture.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
  /*метод createCard класса Card создает готовую карточку и навешивает слушатели, в DOM не вставляет*/
  createCard() {

    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector(
      selectors.elements__picture
    );
    this._element.querySelector(selectors.element__title).textContent =
      this._name;
    this._element.querySelector(".elements__like-counter").textContent =
      this._like.length;
    console.log(this._like);

    this._cardPicture.alt = this._name;
    this._cardPicture.src = this._link;
    this._setEventListeners();

    return this._element;
  }
}
