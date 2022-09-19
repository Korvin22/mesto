window.onload = function() {
  console.log(document.querySelector('.page'))
  document.querySelector('.page').classList.remove("page_preload");
  };

import "../pages/index.css";
import {
  selectors,
  validationConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddCard,
  formEdit,
  formAddCard,
  formAvatar1,
  buttonOpenPopupAvatar,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";
import { Popup } from "../components/Popup";
import { PopupSubmit } from "../components/PopupWithFormSubmit";
import { addSpinner, removeSpinner } from "../utils/constants";
let userId;

buttonOpenPopupAvatar.addEventListener("click", () => {
  popupAvatarElement.openPopup();
});

const popupEditElement = new PopupWithForm(".popup-edit", (formData) => {
  addSpinner(document.querySelector(".popup-edit"));
  api
    .editProfile(formData.name, formData.dedication)
    .then((res) => {
      userInfoElement.setUserInfo({
        name: res.name,
        dedication: res.about,
      });
      popupEditElement.closePopup();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      removeSpinner(document.querySelector(".popup-edit"));
    });
});

const popupImageElement = new PopupWithImage(".popup-image");
const userInfoElement = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__image"
);
const popupAvatarElement = new PopupWithForm(".popup-avatar", (formData) => {
  addSpinner(document.querySelector(".popup-avatar"));
  api
    .changeAvatar(formData)
    .then((res) => {
      popupAvatarElement.closePopup();
      return userInfoElement.setAvatar(res.avatar);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      removeSpinner(document.querySelector(".popup-avatar"));
    });
});
popupAvatarElement.setEventListeners();

const popupDelete = new PopupSubmit(".popup-delete");
popupDelete.setEventListeners();

const avatarFormValidator = new FormValidator(validationConfig, formAvatar1);
avatarFormValidator.enableValidation();

popupEditElement.setEventListeners();

popupImageElement.setEventListeners();

buttonOpenPopupEditProfile.addEventListener("click", () => {
  popupEditElement.openPopup();

  popupEditElement.setInputValues(userInfoElement.getUserInfo());
});

export function handleCardClick({ name, link }) {
  popupImageElement.openPopup({ name, link });
}

function createCard({ name, link, likes, _id, owner }) {
  const card = new Card(
    { name, link, likes, _id, owner },
    selectors.template,
    handleCardClick,
    function handleTrashButtonClick() {
      popupDelete.openPopup();
      popupDelete.setsubmitHandler(() => {
        api
          .deleteCard(_id)
          .then((res) => {
            card.removeCard();
            popupDelete.closePopup();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    function handleLikeButtonClick() {
      if (card.isLiked()) {
        api
          .deleteLike(_id)
          .then((res) => {
            card.removeActiveLikeState();
            return card.setLikesInfo(res.likes);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      } else {
        api
          .addLike(_id)
          .then((res) => {
            card.addActiveLikeState();
            return card.setLikesInfo(res.likes);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      }
    },
    userId
  );

  const cardElement = card.createCard();

  return cardElement;
}

const section = new Section(
  {
    renderer: ({ name, link, likes, _id, owner }) => {
      const cardElement = createCard({ name, link, likes, _id, owner });
      section.appendItem(cardElement);
    },
  },
  selectors.elements
);

const profileFormValidator = new FormValidator(validationConfig, formEdit);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, formAddCard);
cardFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "230562f7-78ba-48ea-b99f-12e65ef62aec",
    "Content-Type": "application/json",
  },
});

/*Подготовка к отрисовке начального состояния: @userData и @initialCards*/
const userData = api.getUserInfo().then((res) => {
  return {
    userId: res._id,
    name: res.name,
    dedication: res.about,
    avatar: res.avatar,
  };
});

const initialCards = api.getInitialCard().then((res) => {
  return res;
});

/*Отрисовка начального состояния через Promise.all*/
Promise.all([userData, initialCards])
  .then(([userData, initialCards]) => {
    userId = userData.userId;

    userInfoElement.setUserInfo({
      name: userData.name,
      dedication: userData.dedication,
    });
    userInfoElement.setAvatar(userData.avatar);

    section.renderInitialItems(initialCards);
  })
  .catch((err) => console.log(err));

const popupAddCardElement = new PopupWithForm(".popup-plus", (formData) => {
  addSpinner(document.querySelector(".popup-plus"));

  api
    .addCard(formData.title, formData.reference, formData.likes, formData._id)
    .then((res) => {
      const cardElement = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        owner: res.owner,
      });

      popupAddCardElement.closePopup();
      return section.prependItem(cardElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removeSpinner(document.querySelector(".popup-plus"));
    });

});
popupAddCardElement.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  popupAddCardElement.openPopup();
  cardFormValidator.setDisabledState();
});
