import "../pages/index.css";
import { selectors, formAddEdit, initialCards } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import { Api } from "../components/Api";
import { Popup } from "../components/Popup";

//кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__open-popup"
);
const buttonTrash = document.querySelector(".elements__trash");
const buttonOpenPopupAddCard = document.querySelector(".profile__button-plus");
// Находим форму в DOM
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_plus");
const formAvatar1 = document.querySelector(".popup__form_avatar");
const buttonOpenPopupAvatar = document.querySelector(".profile__image");

buttonOpenPopupAvatar.addEventListener("click", () => {
  classPopupAvatar.openPopup();
});

const classPopupEdit = new PopupWithForm(".popup-edit", (formData) => {
  classUserInfo.setUserInfo({
    name: formData.name,
    dedication: formData.dedication,
  });
  classPopupEdit.closePopup();
});

const classPopupImage = new PopupWithImage(".popup-image");
const classUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__image"
);
const classPopupAvatar = new PopupWithForm(".popup-avatar", (formData) => {
  api.changeAvatar(formData).then((res) => {
    return classUserInfo.setAvatar(formData.reference);
  });
  classPopupAvatar.closePopup();
});
classPopupAvatar.setEventListeners();
console.log(classPopupAvatar);
const formAvatar = new FormValidator(formAddEdit, formAvatar1);
formAvatar.enableValidation();


classPopupEdit.setEventListeners();

classPopupImage.setEventListeners();


buttonOpenPopupEditProfile.addEventListener("click", () => {
  classPopupEdit.openPopup();

  classPopupEdit.setInputValues(classUserInfo.getUserInfo());
});

export function handleCardClick({ name, link }) {
  classPopupImage.openPopup({ name, link });
}

function createCard({ name, link, likes, _id }) {
  const card = new Card(
    { name, link, likes, _id },
    selectors.template,
    handleCardClick,
    function handleTrashButton() {
      const classPopupDelete = new Popup(".popup-delete");
      classPopupDelete.setEventListeners();
      classPopupDelete.openPopup();
      document
        .querySelector(".popup__button-delete")
        .addEventListener("click", () => {
          this._element.remove();
          classPopupDelete.closePopup();
        });
    },
    function handleLikeButton() {
      if (!this._buttonLike.classList.contains("elements__like_active")) {
        api.deleteLike(_id).then((res) => {
          console.log(res.likes);
          return card.setLikesInfo(res.likes);
        });
      } else
        api.addLike(_id).then((res) => {
          console.log(res.likes);
          return card.setLikesInfo(res.likes);
        });
    }
  );

  const cardElement = card.createCard();
  if (_id !== "6c6ec11c937d29a913374b47") {
    cardElement.querySelector(".elements__trash").remove();
  }
  return cardElement;
}

const formProfile = new FormValidator(formAddEdit, formEdit);
formProfile.enableValidation();

const formCard = new FormValidator(formAddEdit, formAddCard);
formCard.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "230562f7-78ba-48ea-b99f-12e65ef62aec",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((res) => {
    classUserInfo.setUserInfo({
      name: res.name,
      dedication: res.about,
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

api
  .getInitialCard()
  .then((res) => {
    /*console.log(res.map((item) => item.owner._id));*/
    console.log(res);
    const section = new Section(
      {
        items: res,
        renderer: ({ name, link, likes, _id }) => {
          /*if (res.map((item) => item.owner._id) !== "111") {*/

          const cardElement = createCard({ name, link, likes, _id });
          section.addItem(cardElement);
        },
      },
      selectors.elements
    );
    section.renderInitialItems();
    /*if (res.owner._id !== '111'){
    section.renderInitialItems();
    document.querySelectorAll('.elements__trash');}*/

    /*if (res.owner._id !== '6c6ec11c937d29a913374b47')*/
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

api
  .editProfile("Marie Skłodowska Curie", "ученый")
  .then((res) => {
    classUserInfo.setUserInfo({
      name: res.name,
      dedication: res.about,
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

const classPopupAddCard = new PopupWithForm(".popup-plus", (formData) => {
  api
    .addCard(formData.title, formData.reference, formData.likes, formData._id)
    .then((res) => {
      const cardElement = createCard({
        name: formData.title,
        link: formData.reference,
        likes: [],
        _id: "6c6ec11c937d29a913374b47",
      });
      document
        .querySelector(".popup__button-delete")
        .addEventListener("click", () => {
          api.deleteCard(res._id);
        });

      return document.querySelector(selectors.elements).prepend(cardElement);
    });
  classPopupAddCard.closePopup();
});
classPopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  classPopupAddCard.openPopup();
  formCard.setDisabledState();
});

/*const popupEditAvatar = new PopupWithForm(popupAvatar,(dataInputs) => {
  api.changeAvatar(dataInputs)
  .then((data) => {
    user.setUserInfo({avatar: data.avatar, name: data.name, description: data.about});
  })
  })
popupEditAvatar.setEventListeners();*/
