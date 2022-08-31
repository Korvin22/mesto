import { Popup } from "./popup.js";
import { selectors } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popup_selector) {
    super(popup_selector);
    this.popupPicture = this.popup.querySelector(selectors.popup__picture);
    this.popupCaption = this.popup.querySelector(selectors.popup__caption);

  }
  openPopup ({name,link}) {

    this.popupCaption.textContent = name;
    this.popupPicture.alt = name;
    this.popupPicture.src = link;
    super.openPopup();

  }
}
