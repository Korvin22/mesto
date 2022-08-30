export class UserInfo {
  constructor(nameInputSelector, jobInputSelector) {
    this.nameInputSelector = nameInputSelector;
    this.jobInputSelector = jobInputSelector;
    this.nameInput = document.querySelector(this.nameInputSelector);
    this.jobInput = document.querySelector(this.jobInputSelector);
    this.profileTitle = document.querySelector(".profile__title");
    this.profileSubtitle = document.querySelector(".profile__subtitle");

  }

  getUserInfo() {

    this.nameInput.value = this.profileTitle.textContent;
    this.jobInput.value = this.profileSubtitle.textContent;
  }

  setUserInfo() {
    this.profileTitle.textContent = this.nameInput.value;
    this.profileSubtitle.textContent = this.jobInput.value;
  }
}
