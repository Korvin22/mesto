export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this.nameSelector = nameSelector;
    this.jobSelector = jobSelector;
    this.avatarSelector = avatarSelector;
    this.profileTitle = document.querySelector(nameSelector);
    this.profileSubtitle = document.querySelector(jobSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.profileTitle.textContent,
      dedication: this.profileSubtitle.textContent,
      avatar: this.profileAvatar.src,
    };
  }

  setUserInfo({ name, dedication }) {
    this.profileTitle.textContent = name;
    this.profileSubtitle.textContent = dedication;
  }

  setAvatar(avatar) {
    this.profileAvatar.src = avatar;
  }
}
