import { selectors } from "../utils/constants.js";

export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleLikeButtonClick,
    user_id
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._selector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButtonClick;
    this._handleLikeButton = handleLikeButtonClick;
    this._user_id = user_id;
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

  setLikesInfo(likes) {
    return (this._counter.textContent = likes.length);
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(selectors.like);
    if (this._id === this._user_id){
    this._element
      .querySelector(selectors.trash)
      .addEventListener("click", () => {
        this._handleTrashButton();
      });}
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
    this._counter = this._element.querySelector(".elements__like-counter");
    this._cardPicture = this._element.querySelector(
      selectors.elements__picture
    );
    this._element.querySelector(selectors.element__title).textContent =
      this._name;
    this._counter.textContent = this._likes.length;
    this._cardPicture.alt = this._name;
    this._cardPicture.src = this._link;
    console.log(this._element);
    if (this._id !== this._user_id) {
      this._element.querySelector(selectors.trash).remove();
    }
    this._setEventListeners();

    return this._element;
  }
}
