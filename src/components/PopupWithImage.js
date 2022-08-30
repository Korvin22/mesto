import { Popup } from "./popup.js";
import { selectors } from "./constants.js";

export class PopupWithImage extends Popup {
  constructor(popup_selector) {
    super(popup_selector);

  }
  openPopup ({name,link}) {
    const popupPicture = this.popup.querySelector(selectors.popup__picture);
    const popupCaption = this.popup.querySelector(selectors.popup__caption);
    popupCaption.textContent = name;
    popupPicture.alt = name;
    popupPicture.src = link;
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);

    /*popupCaption.textContent = name;
    popupPicture.alt = name;
    popupPicture.src = link;*/

  }
}
