export class UserInfo {
  constructor(nameSelector, jobSelector,avatarSelector) {
    this.nameSelector = nameSelector;
    this.jobSelector = jobSelector;
    this.avatarSelector = avatarSelector;
    this.profileTitle = document.querySelector(nameSelector);
    this.profileSubtitle = document.querySelector(jobSelector);
    this.avatar=document.querySelector(avatarSelector);

  }

  getUserInfo() {
    return {
      name:this.profileTitle.textContent,
      dedication: this.profileSubtitle.textContent
    }

  }

  setUserInfo({name,dedication,avatar}) {
    this.profileTitle.textContent = name;
    this.profileSubtitle.textContent = dedication;
    this.avatar.src=avatar;

  }
}
