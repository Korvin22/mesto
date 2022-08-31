const selectors = {
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
};

const formAddEdit = {
  button: ".popup__button-save",
  inactiveButton: "popup__button-save_disabled",
  activeButton: "popup__button-save_abled",
  input: "popup__input",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export { selectors, formAddEdit, initialCards };
