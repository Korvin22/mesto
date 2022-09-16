import "../pages/index.css";
import {
  selectors,
  formAddEdit,
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

let user_id;

buttonOpenPopupAvatar.addEventListener("click", () => {
  copyPopupAvatar.openPopup();
});

const copyPopupEdit = new PopupWithForm(".popup-edit", (formData) => {
  api
    .editProfile(formData.name, formData.dedication)
    .then((res) => {
      copyUserInfo.setUserInfo({
        name: res.name,
        dedication: res.about,
      });
    })
    .catch((error) => console.log(`Ошибка: ${error}`));

  copyPopupEdit.closePopup();
});

const copyPopupImage = new PopupWithImage(".popup-image");
const copyUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__image"
);
const copyPopupAvatar = new PopupWithForm(".popup-avatar", (formData) => {
  api.changeAvatar(formData).then((res) => {
    console.log(res);
    return copyUserInfo.setAvatar(res.avatar);
  });
  copyPopupAvatar.closePopup();
});
copyPopupAvatar.setEventListeners();

const formAvatar = new FormValidator(formAddEdit, formAvatar1);
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
    { name, link, likes, _id, owner},
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
      if (card.isLiked()) {
        api.deleteLike(_id).then((res) => {
          card.removeActiveLikeState();
          return card.setLikesInfo(res.likes);
        });
      } else {
        api.addLike(_id).then((res) => {
          card.addActiveLikeState();
          return card.setLikesInfo(res.likes);
        });
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
    console.log(InitialCards);
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
  api
    .addCard(formData.title, formData.reference, formData.likes, formData._id)
    .then((res) => {
      console.log(res);
      const cardElement = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        owner:res.owner
      });
      console.log(cardElement);
      document
        .querySelector(".popup__button-delete")
        .addEventListener("click", () => {
          api.deleteCard(res._id);
        });

      return section.addItem(cardElement);
    })
    .catch((err) => console.log(err));
  copyPopupAddCard.closePopup();
});
copyPopupAddCard.setEventListeners();

buttonOpenPopupAddCard.addEventListener("click", function () {
  copyPopupAddCard.openPopup();
  formCard.setDisabledState();
});

/*const popupEditAvatar = new PopupWithForm(popupAvatar,(dataInputs) => {
  api.changeAvatar(dataInputs)
  .then((data) => {
    user.setUserInfo({avatar: data.avatar, name: data.name, description: data.about});
  })
  })
popupEditAvatar.setEventListeners();*/
