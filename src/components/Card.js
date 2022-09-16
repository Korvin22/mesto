import { selectors } from "../utils/constants.js";

export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleLikeButtonClick,
    user_id,
    owner
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
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
  isLiked() {
    if (this._buttonLike.classList.contains("elements__like_active")) {
      return true;
    } else {
      return false;
    }
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
    if (this._owner._id === this._user_id) {
      console.log("ура!!!!");
      console.log(this._element.querySelector(selectors.trash));
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
    if (this._owner._id !== this._user_id) {
      console.log(this._owner._id);
      this._element.querySelector(selectors.trash).remove();
    }
    this._likes.forEach((item) => {
      if (item._id === this._user_id) {
        this._element
          .querySelector(selectors.like)
          .classList.add("elements__like_active");
      }
    });

    this._setEventListeners();

    return this._element;
  }
}
