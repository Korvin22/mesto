import { selectors } from "./constants.js";

/* const selectors = {
    inputTitle: ".popup__input_type_title",
    inputReference: ".popup__input_type_reference",
    elements: ".elements",
    template: ".element-template",
    element: ".elements__element",
    element__title: ".elements__title",
    elements__picture: ".elements__picture",
    trash: ".elements__trash",
    like: ".elements__like",
    popup__picture: ".popup__picture",
    popup__caption: ".popup__caption",
  };*/

export class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(selectors.like);
    this._element
      .querySelector(selectors.trash)
      .addEventListener("click", () => {
        this._removeCard();
      });
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
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
    this._cardPicture.alt = this._name;
    this._cardPicture.src = this._link;
    this._setEventListeners();
    return this._element;
  }
}

/*function createCard({ name, reference }) {
  const cardElement = template.cloneNode(true);
  const cardPicture = cardElement.querySelector(selectors.elements__picture);
  cardElement.querySelector(selectors.element__title).textContent = name;
  cardPicture.alt = name;
  cardPicture.src = reference;

  return cardElement;
}

function renderCard({ name, reference }, cardsContainer) {
  // Создаем карточку на основе данных
  const cardElement = createCard({ name, reference });
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
}

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();

  renderCard(
    { name: inputTitle.value, reference: inputReference.value },
    cardsContainer
  );
  formAddCard.reset();
  closePopup(popupAddCard);
  setDisabledState(buttonSubmitAddCard, formAdd);
});

*/
