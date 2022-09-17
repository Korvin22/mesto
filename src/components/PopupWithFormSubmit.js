import { Popup } from "./Popup.js";

export class PopupSubmit extends Popup {
constructor(popupSelector, deleteCard) {
super(popupSelector);
this._deleteCard = deleteCard;
}

setEventListeners() {
  super.setEventListeners();

}

closePopup() {
  super.closePopup()
}


}
