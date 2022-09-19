import { Popup } from "./Popup.js";

export class PopupSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this.popup.querySelector(".popup__button-delete");
  }

  setsubmitHandler(submitAction) {
    this._handleSubmit = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.closePopup();
    });
  }


}
