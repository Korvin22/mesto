import "../pages/index.css";
import { selectors, formAddEdit, initialCards } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";

import { Api } from "../components/Api";

//кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__open-popup"
);
const buttonOpenPopupAddCard = document.querySelector(".profile__button-plus");

const classPopupEdit = new PopupWithForm(".popup-edit", (formData) => {
  classUserInfo.setUserInfo({
    name: formData.name,
    dedication: formData.dedication,
  });
  classPopupEdit.closePopup();
});

const classPopupImage = new PopupWithImage(".popup-image");
const classUserInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__image");

classPopupEdit.setEventListeners();

classPopupImage.setEventListeners();
// Находим форму в DOM
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_plus");

buttonOpenPopupEditProfile.addEventListener("click", () => {
  classPopupEdit.openPopup();
  /*document.querySelector(".popup__input_type_name").value =
    initialEditData.name;
  document.querySelector(".popup__input_type_job").value =
    initialEditData.dedication;*/
  /*провозился часов 5, не получилось сделать через setInputValues - ума не приложу почему,
  сделал через поиск прямой в index.js.
  То есть переменную this._inputList весь класс видит только если она в
  конструкторе? Я думал в любом месте класса, будь то конструктор
  или один из внутренних или внешних методов, это и есть преимущество класса...
  Перенес в конструктор, все заработало. Подскажите, какими инструментами отладки Вы пользуетесь,
  кроме console.log() и рассмотрения ошибок в консоли?*/
  classPopupEdit.setInputValues(classUserInfo.getUserInfo());
});

export function handleCardClick({ name, link }) {
  classPopupImage.openPopup({ name, link });
}

function createCard({ name, link }) {
  const card = new Card({ name, link }, selectors.template, handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardElement = createCard({ name, link });
      section.addItem(cardElement);
    },
  },
  selectors.elements
);

section.renderInitialItems();

const formProfile = new FormValidator(formAddEdit, formEdit);
formProfile.enableValidation();

const formCard = new FormValidator(formAddEdit, formAddCard);
formCard.enableValidation();

const classPopupAddCard = new PopupWithForm(".popup-plus", (formData) => {
  const cardElement = createCard({
    name: formData.title,
    link: formData.reference,
  });
  section.addItem(cardElement);
  classPopupAddCard.closePopup();
});
classPopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  classPopupAddCard.openPopup();
  formCard.setDisabledState();
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "230562f7-78ba-48ea-b99f-12e65ef62aec",
    "Content-Type": "application/json",
  },
});

api.getUserInfo();

api
  .getUserInfo()
  .then((res) => {
    console.log(res);
    classUserInfo.setUserInfo({name:res.name,dedication:res.about,avatar:res.avatar});
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
