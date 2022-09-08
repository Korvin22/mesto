(()=>{"use strict";var e={button:".popup__button-save",inactiveButton:"popup__button-save_disabled",activeButton:"popup__button-save_abled",input:"popup__input"};function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var n=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._form=n,this._selectorButton=this._config.button,this._input=this._config.input,this._inactiveButton=this._config.inactiveButton,this._activeButton=this._config.activeButton}var n,o;return n=e,(o=[{key:"enableValidation",value:function(){var e=this;this._button=this._form.querySelector(this._selectorButton),this._form.addEventListener("input",(function(t){return e._handleFormInput(t,e._button)}))}},{key:"_handleFormInput",value:function(e){var t=e.target;this._showFieldError(t),this._setSubmitButtonState(this._button)}},{key:"setDisabledState",value:function(){this._button.setAttribute("disabled",!0),this._button.classList.add(this._inactiveButton),this._button.classList.remove(this._activeButton)}},{key:"_showFieldError",value:function(e){this._form.querySelector(".".concat(e.id,"-error")).textContent=e.validationMessage}},{key:"_setSubmitButtonState",value:function(){this._form.checkValidity()?(this._button.classList.remove(this._inactiveButton),this._button.classList.add(this._activeButton),this._button.removeAttribute("disabled","")):this.setDisabledState()}}])&&t(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var r=function(){function e(t,n,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._selector=n,this._handleCardClick=o}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._selector).content.querySelector(".elements__element").cloneNode(!0)}},{key:"_removeCard",value:function(){console.log(this._element),this._element.remove(),this._element=null}},{key:"_handleLikeClick",value:function(){this._buttonLike.classList.toggle("elements__like_active")}},{key:"_setEventListeners",value:function(){var e=this;this._buttonLike=this._element.querySelector(".elements__like"),this._element.querySelector(".elements__trash").addEventListener("click",(function(){e._removeCard()})),this._buttonLike.addEventListener("click",(function(){e._handleLikeClick()})),this._cardPicture.addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})}))}},{key:"createCard",value:function(){return this._element=this._getTemplate(),this._cardPicture=this._element.querySelector(".elements__picture"),this._element.querySelector(".elements__title").textContent=this._name,this._cardPicture.alt=this._name,this._cardPicture.src=this._link,this._setEventListeners(),this._element}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var u=function(){function e(t,n){var o=t.items,r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=o,this.renderer=r,this.containerSelector=n,this.container=document.querySelector(this.containerSelector)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this.container.prepend(e)}},{key:"renderInitialItems",value:function(){var e=this;this._items.forEach((function(t){e.renderer(t)}))}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var a=function(){function e(t){var n,o,r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o=function(e){"Escape"===e.key&&r.closePopup()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[n]=o,this.popupSelector=t,this.popup=document.querySelector(this.popupSelector)}var t,n;return t=e,(n=[{key:"openPopup",value:function(){console.log(this.popup),this.popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"closePopup",value:function(){this.popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this.popup.addEventListener("mousedown",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__button-close"))&&e.closePopup()}))}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var o=f(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},p.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function y(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(o);if(r){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e)).popupPicture=t.popup.querySelector(".popup__picture"),t.popupCaption=t.popup.querySelector(".popup__caption"),t}return t=u,(n=[{key:"openPopup",value:function(e){var t=e.name,n=e.link;this.popupCaption.textContent=t,this.popupPicture.alt=t,this.popupPicture.src=n,p(d(u.prototype),"openPopup",this).call(this)}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function _(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var o=k(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},m.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function w(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(o);if(r){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e)).handleFormSubmit=t,n.form=n.popup.querySelector(".popup__form"),n._inputList=n.popup.querySelectorAll(".popup__input"),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){return e[t.name]=t.value}),console.log(e)),e}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"setEventListeners",value:function(){var e=this;m(P(u.prototype),"setEventListeners",this).call(this),this.form.addEventListener("submit",(function(t){t.preventDefault(),e.handleFormSubmit(e._getInputValues())}))}},{key:"closePopup",value:function(){m(P(u.prototype),"closePopup",this).call(this),this.form.reset()}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var j=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nameSelector=t,this.jobSelector=n,this.profileTitle=document.querySelector(t),this.profileSubtitle=document.querySelector(n)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this.profileTitle.textContent,dedication:this.profileSubtitle.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.dedication;this.profileTitle.textContent=t,this.profileSubtitle.textContent=n}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),E=document.querySelector(".profile__open-popup"),L=document.querySelector(".profile__button-plus"),C=new S(".popup-edit",(function(e){B.setUserInfo({name:e.name,dedication:e.dedication}),C.closePopup()})),q=new v(".popup-image"),B=new j(".profile__title",".profile__subtitle");C.setEventListeners(),q.setEventListeners();var R=document.querySelector(".popup__form_edit"),x=document.querySelector(".popup__form_plus");function I(e){var t=e.name,n=e.link;q.openPopup({name:t,link:n})}function T(e){var t=e.name,n=e.link;return new r({name:t,link:n},".element-template",I).createCard()}E.addEventListener("click",(function(){C.openPopup(),C.setInputValues(B.getUserInfo())}));var D=new u({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=T({name:e.name,link:e.link});D.addItem(t)}},".elements");D.renderInitialItems(),new n(e,R).enableValidation();var V=new n(e,x);V.enableValidation();var F=new S(".popup-plus",(function(e){var t=T({name:e.title,link:e.reference});D.addItem(t),F.closePopup()}));F.setEventListeners(),L.addEventListener("click",(function(){F.openPopup(),V.setDisabledState()}))})();