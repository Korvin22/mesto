const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
// const popupSaveButtonElement = document.querySelector('.popup__button-save');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_job');// Воспользуйтесь инструментом .querySelector()
nameInput.value = 'Жак-Ив Кусто';
jobInput.value = 'Исследователь океана';

// Получите значение полей jobInput и nameInput из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const openPopupVisibility = function () {
  popupElement.classList.add('popup_opened');

}

const closePopupVisibility = function () {
  popupElement.classList.remove('popup_opened');

}

popupOpenButtonElement.addEventListener('click', openPopupVisibility);

popupCloseButtonElement.addEventListener('click', closePopupVisibility);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.g
  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  //popupSaveButtonElement.addEventListener('click', closePopupVisibility);

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

