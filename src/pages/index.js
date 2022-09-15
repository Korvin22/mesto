import "../pages/index.css";
import {
  selectors,
  formAddEdit,
  initialCards,
  addSpinner,
  removeSpinner,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";
import { Popup } from "../components/Popup";

let user_id;
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
  console.log(formData);
  api.changeAvatar(formData).then((res) => {
    console.log(formData);
    return classUserInfo.setAvatar(formData.reference);
  });
  classPopupAvatar.closePopup();
});
classPopupAvatar.setEventListeners();

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
    function handleTrashButtonClick() {
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
    function handleLikeButtonClick() {
      if (!this._buttonLike.classList.contains("elements__like_active")) {
        api.deleteLike(_id).then((res) => {
          console.log(res.likes);
          return card.setLikesInfo(res.likes);
        });
      } else
        api.addLike(_id).then((res) => {
          return card.setLikesInfo(res.likes);
        });
    }, user_id
  );

  const cardElement = card.createCard();

  return cardElement;
}

const section = new Section(
  {
    renderer: ({ name, link, likes, _id }) => {
      /*if (res.map((item) => item.owner._id) !== "111") {*/

      const cardElement = createCard({ name, link, likes, _id });
      section.addItem(cardElement);
    },
  },
  selectors.elements
);

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


/*Подготовка к отрисовке начального состояния: @userData и @InitialCards*/
const userData = api
  .getUserInfo()
  .then((res) => {
    const data = classUserInfo.getUserInfo({
      name: res.name,
      dedication: res.dedication,
      avatar: res.avatar,
    });
    classUserInfo.getUserId(res);
    return {
      user_id: classUserInfo.getUserId(res),
      name: data.name,
      dedication: data.dedication,
      avatar: data.avatar,
    };
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
const InitialCards = api
  .getInitialCard().then((res)=>{
    return res
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
/*Отрисовка начального состояния через Promise.all*/
Promise.all([userData, InitialCards])
  .then(([userData, InitialCards]) => {
    user_id = userData.user_id;
    console.log(InitialCards);
    classUserInfo.setUserInfo({
      name: userData.name,
      dedication: userData.dedication,
    });
    classUserInfo.setAvatar(userData.avatar);
    /*if (InitialCards.map((item) => item._id) !== user_id)*/
    section.renderInitialItems(InitialCards);

  })
  .catch((err) => console.log(err));

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
