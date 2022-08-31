export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.nameSelector = nameSelector;
    this.jobSelector = jobSelector;
    this.profileTitle = document.querySelector(nameSelector);
    this.profileSubtitle = document.querySelector(jobSelector);

  }

  getUserInfo() {
    return {
      name:this.profileTitle.textContent,
      dedication: this.profileSubtitle.textContent
    }

  }

  setUserInfo({name,dedication}) {
    this.profileTitle.textContent = name;
    this.profileSubtitle.textContent = dedication;
  }
}
