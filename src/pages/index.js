import "../pages/index.css";
import {
  selectors,
  validationConfig,
  initialCards,
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
let user_id;

buttonOpenPopupAvatar.addEventListener("click", () => {
  copyPopupAvatar.openPopup();
});

const copyPopupEdit = new PopupWithForm(".popup-edit", (formData) => {
  addSpinner(document.querySelector(".popup__button-save"));
  api
    .editProfile(formData.name, formData.dedication)
    .then((res) => {
      copyUserInfo.setUserInfo({
        name: res.name,
        dedication: res.about,
      });
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      removeSpinner(document.querySelector(".popup__button-save"));
    });

  copyPopupEdit.closePopup();
});

const copyPopupImage = new PopupWithImage(".popup-image");
const copyUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__image"
);
const copyPopupAvatar = new PopupWithForm(".popup-avatar", (formData) => {
  addSpinner(document.querySelector(".popup__button-save"));
  api
    .changeAvatar(formData)
    .then((res) => {
      return copyUserInfo.setAvatar(res.avatar);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      removeSpinner(document.querySelector(".popup__button-save"));
    });
  copyPopupAvatar.closePopup();
});
copyPopupAvatar.setEventListeners();

const PopupDelete = new PopupSubmit(".popup-delete", function deleteSubmit(
  _id
) {
  api.deleteCard(_id);
});
PopupDelete.setEventListeners();

const formAvatar = new FormValidator(validationConfig, formAvatar1);
formAvatar.enableValidation();

copyPopupEdit.setEventListeners();

copyPopupImage.setEventListeners();

buttonOpenPopupEditProfile.addEventListener("click", () => {
  copyPopupEdit.openPopup();

  copyPopupEdit.setInputValues(copyUserInfo.getUserInfo());
});

export function handleCardClick({ name, link }) {
  copyPopupImage.openPopup({ name, link });
}

function createCard({ name, link, likes, _id, owner }) {
  const card = new Card(
    { name, link, likes, _id, owner },
    selectors.template,
    handleCardClick,
    function handleTrashButtonClick() {
      PopupDelete.openPopup();
      document
        .querySelector(".popup__button-delete")
        .addEventListener("click", () => {
          api.deleteCard(_id);
          card._removeCard();
          PopupDelete.closePopup();
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
    user_id
  );

  const cardElement = card.createCard();

  return cardElement;
}

const section = new Section(
  {
    renderer: ({ name, link, likes, _id, owner }) => {
      /*if (res.map((item) => item.owner._id) !== "111") {*/

      const cardElement = createCard({ name, link, likes, _id, owner });
      section.addItem(cardElement);
    },
  },
  selectors.elements
);

const formProfile = new FormValidator(validationConfig, formEdit);
formProfile.enableValidation();

const formCard = new FormValidator(validationConfig, formAddCard);
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
    const data = copyUserInfo.getUserInfo({
      name: res.name,
      dedication: res.dedication,
      avatar: res.avatar,
    });
    copyUserInfo.getUserId(res);
    return {
      user_id: copyUserInfo.getUserId(res),
      name: data.name,
      dedication: data.dedication,
      avatar: data.avatar,
    };
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
const InitialCards = api
  .getInitialCard()
  .then((res) => {
    return res;
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
/*Отрисовка начального состояния через Promise.all*/
Promise.all([userData, InitialCards])
  .then(([userData, InitialCards]) => {
    user_id = userData.user_id;

    copyUserInfo.setUserInfo({
      name: userData.name,
      dedication: userData.dedication,
    });
    copyUserInfo.setAvatar(userData.avatar);
    /*if (InitialCards.map((item) => item._id) !== user_id)*/
    section.renderInitialItems(InitialCards);
  })
  .catch((err) => console.log(err));

const copyPopupAddCard = new PopupWithForm(".popup-plus", (formData) => {
  addSpinner(document.querySelector(".popup__button-save"));

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
      document
        .querySelector(".popup__button-delete")
        .addEventListener("click", () => {
          api.deleteCard(res._id);
        });
      return section.addItem(cardElement);
    })
    .catch((err) => console.log(err)).finally(()=>{
      removeSpinner(document.querySelector(".popup__button-save"));
    });
  copyPopupAddCard.closePopup();
});
copyPopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  copyPopupAddCard.openPopup();
  formCard.setDisabledState();
});
