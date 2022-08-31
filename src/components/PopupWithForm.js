import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popup_selector, handleFormSubmit) {
    super(popup_selector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this.popup.querySelectorAll(".popup__input");
    console.log(this._inputList);
    const inputValues = {};
    this._inputList.forEach(
      (input) => (inputValues[input.name] = input.value),
      console.log(inputValues)
    );

    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    /*this.popup.querySelector('.popup__form_edit').addEventListener('submit',this.callback);*/
    console.log(this.popup.querySelector(".popup__form"));
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
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.handleFormSubmit(this._getInputValues());
      });
  }

  closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.form.reset();
  }
}
