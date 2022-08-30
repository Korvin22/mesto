import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popup_selector, callback) {
    super(popup_selector);
    this.callback = callback;
    this.form = this.popup.querySelector(".popup__form");
    this.input = this.popup.querySelector(".popup__input");
  }
/*не использую метод, так как судя по брифу должен быть один класс PopupWithFrom  для 2 попапов - форма и добавление карточек*/
  _getInputValues() {
    const inputValues = {};
    this.input.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    /*this.popup.querySelector('.popup__form_edit').addEventListener('submit',this.callback);*/

    this.popup.addEventListener("click", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.closePopup();
      }
    });
    this.popup
      .querySelector(".popup__form")
      .addEventListener("submit", this.callback);
  }

  closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.form.reset()

  }
}
