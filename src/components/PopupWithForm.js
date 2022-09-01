import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector(".popup__form");
    this._inputList = this.popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
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

    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this.form.reset();
  }
}
