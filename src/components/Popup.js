export class Popup {
  constructor(popup_selector) {
    this.popup_selector = popup_selector;
    this.popup = document.querySelector(this.popup_selector);
  }
  openPopup() {
    console.log(this.popup);
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      document.querySelector(".popup_opened").classList.remove("popup_opened");
    }
  }

  setEventListeners() {
    this.popup.addEventListener("click", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.closePopup();
      }
    });
  }
}

/*Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.*/
