import "../pages/index.css";
import {
  selectors,
  formAddEdit,
  initialCards
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/section.js";
import { Popup } from "../components/popup.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";

/*//попапы
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-plus");
const popupImage = document.querySelector(".popup-image");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupsSelectors = [".popup-edit", ".popup-plus", ".popup-image"];*/

//кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__open-popup"
);
const buttonOpenPopupAddCard = document.querySelector(".profile__button-plus");

/*кнопка закрытия попапов
const buttonClosePopupEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);
const buttonClosePopupAddCard = popupAddCard.querySelector(
  ".popup__button-close"
);
const buttonClosePopupImage = document.querySelector(
  ".popup__button-close_image"
);
const buttonSubmitAddCard = popupAddCard.querySelector(".popup__button-save");
*/

/*function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}*/

/*popupsSelectors.forEach((popupSelector) => {
  const popupElement = new Popup(popupSelector);
  popupElement.setEventListeners();
  return popupElement;
});*/

/*popupsSelectors.forEach((popupSelector) => {
  const popupElement = new PopupWithForm(
    popupSelector,
    handleSubmitButtonFormEdit
  );
  popupElement.setEventListeners();
  return popupElement;
});*/

const classPopupEdit = new PopupWithForm(".popup-edit", (formData) => {
  /*document.querySelector(".popup__input_type_name").value = formData.name;
    document.querySelector(".popup__input_type_job").value = formData.dedication;*/
  classUserInfo.setUserInfo({
    name: formData.name,
    dedication: formData.dedication,
  });
  classPopupEdit.closePopup();
});

const classPopupImage = new PopupWithImage(".popup-image");
const classUserInfo = new UserInfo(".profile__title", ".profile__subtitle");

classPopupEdit.setEventListeners();

classPopupImage.setEventListeners();
// Находим форму в DOM
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_plus");

// Находим поля формы в DOM
/*const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_job");

const buttonSavePopupAddCard = document.querySelector("popup__button-save");*/
//Функция открытия-закрытия попапа
/*function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}*/

buttonOpenPopupEditProfile.addEventListener("click", () => {
  const InitialEditData = classUserInfo.getUserInfo();
  classPopupEdit.openPopup();
  document.querySelector(".popup__input_type_name").value =
    InitialEditData.name;
  document.querySelector(".popup__input_type_job").value =
    InitialEditData.dedication;
  /*провозился часов 5, не получилось сделать через setInputValues - ума не приложу почему,
  сделал через поиск прямой в index.js*/
  /*classPopupEdit.setInputValues(classUserInfo.getUserInfo());*/
});

const inputTitle = formAddCard.querySelector(selectors.inputTitle);
const inputReference = formAddCard.querySelector(selectors.inputReference);
//заполнение попапа с именем и занятие

const template = document
  .querySelector(selectors.template)
  .content.querySelector(selectors.element);

/*function handleSubmitButtonFormEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.g
  // Вставьте новые значения с помощью textContent
  classUserInfo.setUserInfo();
  classPopupEdit.closePopup();
  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);
}*/

export function handleCardClick({ name, link }) {
  classPopupImage.openPopup({ name, link });
}

/*const cardsContainer = document.querySelector(selectors.elements);*/

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

/*

function renderCard({ name, link }, place) {
  const cardElement = createCard({ name, link })
  place.prepend(cardElement);

}

function createInitialCards() {
  initialCards.forEach((item) => {
    renderCard(item, cardsContainer);

  });
}

createInitialCards();*/

const formProfile = new FormValidator(formAddEdit, formEdit);
formProfile.enableValidation();

const formCard = new FormValidator(formAddEdit, formAddCard);
formCard.enableValidation();

/*function renderCard(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name: inputTitle.value,
    link: inputReference.value,
  });
  section.addItem(cardElement);
  `  formAddCard.reset();
  classPopupAddCard.closePopup();
  formCard.setDisabledState();
}*/
const classPopupAddCard = new PopupWithForm(".popup-plus", (formData) => {
  const cardElement = createCard({
    name: formData.title,
    link: formData.reference,
  });
  section.addItem(cardElement);
  formAddCard.reset();
  classPopupAddCard.closePopup();

});
classPopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  classPopupAddCard.openPopup();
  formCard.setDisabledState();
});
